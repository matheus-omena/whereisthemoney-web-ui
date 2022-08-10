import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ExpenseModel } from "../../../../models/ExpenseModel";
import DefaultTransition from "../../../../components/General/DefaultTransition";
import { Check, Info, Trash, X } from "phosphor-react";
import Button from "../../../../components/Form/Button";
import { ExpenseGroupModel } from "../../../../models/ExpenseGroupModel";
import { Input } from "../../../../components/Form/Input";
import { ExpensesApi } from "../../../../apis/ExpensesApi";
import { ResponsiblesApi } from "../../../../apis/ResponsiblesApi";
import { toast } from "react-toastify";
import { ResponsibleModel } from "../../../../models/ResponsibleModel";
import { Select } from "../../../../components/Form/Select";
import Spinner from "../../../../components/General/Spinner";
import { RadioButton } from "../../../../components/Form/RadioButton";
import Swal from "sweetalert2";
import { CategoriesApi } from "../../../../apis/CategoriesApi";
import { CategoryModel } from "../../../../models/CategoryModel";

type ExpenseFormProps = {
    expenseGroup: ExpenseGroupModel;
    obj?: ExpenseModel;
    onFinish: () => void;
}

type SelectProps = {
    label: string;
    value: string;
};

export default function ExpenseForm(props: ExpenseFormProps) {    
    const [sending, setSending] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categoryOptions, setCategoryOptions] = useState<SelectProps[]>();
    const _apiCategory = useMemo(() => new CategoriesApi(), []);
    const _api = useMemo(() => new ExpensesApi(), []);
    const _apiResponsible = useMemo(() => new ResponsiblesApi(), []);
    const [loadingResponsibles, setLoadingResponsibles] = useState(false);
    const [responsibleOptions, setResponsibleOptions] = useState<SelectProps[]>();

    const [isFixed, setIsFixed] = useState(props.obj?.fixedExpenseId !== undefined || false);
    const [isItInstallments, setIsItInstallments] = useState(false);

    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
        value: yup.string().required("O valor é obrigatório"),
        paymentDay: yup.number().required("O dia de pagamento é obrigatório").max(31),
    }).required();

    const form = useForm<any>({
        resolver: yupResolver(schema)
    });

    if (props.obj) {
        form.setValue("responsibleId", props.obj.responsible.id);
        form.setValue("categoryId", props.obj.category?.id);
        form.setValue("paymentDay", props.obj.paymentDay);
    } else (props.expenseGroup)
        form.setValue("paymentDay", props.expenseGroup?.paymentDay);


    const fixed = form.watch("isFixed");
    const isInstallments = form.watch("isItInstallments");

    useEffect(() => {
        setIsFixed(fixed === 'true');
    }, [fixed])

    useEffect(() => {
        setIsLoadingCategories(true);
        _apiCategory.find()
            .then((r) => {
                const option = r.data.map((item: CategoryModel) => {
                    return {
                        label: item.name,
                        value: item.id,
                    };
                });
                setCategoryOptions(option);

                if (r.data.length > 0) form.setValue("categoryId", r.data[0].id);
            })
            .catch((e) => toast.info("Sem categorias disponíveis"))
            .finally(() => setIsLoadingCategories(false));
    }, [_apiCategory]);

    useEffect(() => {
        setIsItInstallments(String(isInstallments) === "true");
    }, [isInstallments])

    useEffect(() => {
        if (props.obj)
            setIsFixed(props.obj?.fixedExpenseId !== "" && props.obj?.fixedExpenseId !== undefined);
    }, [])

    useEffect(() => {
        setLoadingResponsibles(true);
        _apiResponsible.find()
            .then((r) => {
                const option = r.data.map((item: ResponsibleModel) => {
                    return {
                        label: item.name,
                        value: item.id,
                    };
                });
                setResponsibleOptions(option);

                if (r.data.length > 0) form.setValue("responsibleId", r.data[0].id);
            })
            .catch((e) => toast.info("Sem responsáveis disponíveis"))
            .finally(() => setLoadingResponsibles(false));
    }, [_apiResponsible]);

    const onSubmit = (data: any) => {
        const processedData = {
            isFixed: isFixed,
            name: String(data.name),
            value: Number(data.value),
            responsibleId: String(data.responsibleId),
            groupId: String(props.expenseGroup.id),
            categoryId: String(data.categoryId),
            paymentDay: form.getValues("paymentDay") !== "" ? Number(form.getValues("paymentDay")) : undefined,
            totalInstallments: isFixed ? Number(data.totalInstallments) : undefined
        }

        setSending(true);
        if (data.id && data.id != undefined) {
            if (props.obj?.fixedExpenseId) {
                Swal.fire({
                    title: props.obj.name,
                    text: 'Essa é uma despesa recorrente. Deseja atualizar apenas essa ou todas as futuras?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Apenas essa',
                    denyButtonText: `Todas as futuras`,
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        _api.update(data.id, processedData, false)
                            .then(r => {
                                toast.success("Cadastro atualizado com sucesso");
                                props.onFinish();
                            })
                            .catch((e) => {
                                toast.error(e.message);
                                console.log("Erro ao atualizar cadastro", e);
                            })
                            .finally(() => setSending(false));
                    } else if (result.isDenied) {
                        _api.update(data.id, processedData, true)
                            .then(r => {
                                toast.success("Cadastro atualizado com sucesso");
                                props.onFinish();
                            })
                            .catch((e) => {
                                toast.error(e.message);
                                console.log("Erro ao atualizar cadastro", e);
                            })
                            .finally(() => setSending(false));
                    }
                })
            }
            else {
                _api.update(data.id, processedData, false)
                    .then(r => {
                        toast.success("Cadastro atualizado com sucesso");
                        props.onFinish();
                    })
                    .catch((e) => {
                        toast.error(e.message);
                        console.log("Erro ao atualizar cadastro", e);
                    })
                    .finally(() => setSending(false));
            }
        }
        else {
            _api.create(processedData)
                .then(r => {
                    toast.success("Cadastro criado com sucesso");
                    props.onFinish();
                })
                .catch((e) => {
                    toast.error(e.message);
                    console.log("Erro ao criar cadastro", e);
                })
                .finally(() => setSending(false));
        }
    }

    const onDelete = () => {
        Swal.fire({
            title: "Deseja excluir esse registro?",
            text: "Essa ação não poderá ser revertida.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                props.obj?.fixedExpenseId ?
                    Swal.fire({
                        title: props.obj.name,
                        text: 'Essa é uma despesa recorrente. Deseja excluir apenas essa ou todas as futuras?',
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Apenas essa',
                        denyButtonText: `Todas as futuras`,
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            _api
                                .delete(props.obj?.id!, false)
                                .then((r) => {
                                    toast.success("Registro excluído com sucesso");
                                    props.onFinish();
                                })
                                .catch((e) => console.log("Erro ao excluir registro", e))
                                .finally();
                        } else if (result.isDenied) {
                            _api
                                .delete(props.obj?.id!, true)
                                .then((r) => {
                                    toast.success("Registro excluído com sucesso");
                                    props.onFinish();
                                })
                                .catch((e) => console.log("Erro ao excluir registro", e))
                                .finally();
                        }
                    }) :
                    _api
                        .delete(props.obj?.id!, false)
                        .then((r) => {
                            toast.success("Registro excluído com sucesso");
                            props.onFinish();
                        })
                        .catch((e) => console.log("Erro ao excluir registro", e))
                        .finally();
            }
        }).finally();
    }

    return (
        <DefaultTransition>
            <div className="mb-4">
                {
                    props.obj ?
                        <>
                            <h3 className="text-2xl font-bold mb-2">
                                Edição de despesa
                            </h3>
                            <p className="text-xs text-zinc-400">Altere apenas as informações que desejar</p>
                        </> :
                        <>
                            <h3 className="text-2xl font-bold mb-2">
                                Crie uma nova despesa!
                            </h3>
                            <p className="text-xs text-zinc-400">Preencha as informações para criar um novo registro.</p>
                        </>
                }
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <input type="hidden" {...form.register("id")} value={props.obj?.id} />
                <input type="hidden" {...form.register("groupId")} value={props.expenseGroup?.id} />

                <h6 className={"text-gray-700 text-xs text-right font-bold mb-3"}>
                    Grupo: <span style={{ color: props.expenseGroup?.color }}>{props.expenseGroup?.name}</span>
                </h6>

                <div className="flex flex-wrap -mx-2">
                    <Input
                        type="text"
                        name={"name"}
                        form={form}
                        label={"Nome"}
                        className="w-full"
                        defaultValue={props.obj?.name}
                    />
                </div>
                <div className="flex flex-wrap items-end -mx-2">
                    <Input
                        type="number"
                        name={"value"}
                        form={form}
                        label={"Valor (R$)"}
                        className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                        defaultValue={props.obj?.value}
                    />
                    {
                        loadingResponsibles ?
                            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center items-center">
                                <Spinner />
                            </div> :
                            <Select
                                name="responsibleId"
                                form={form}
                                options={responsibleOptions}
                                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                                label={"Responsável"}
                                defaultValue={props.obj?.responsible.id}
                            />
                    }
                </div>
                <div className="flex flex-wrap -mx-2">
                    {
                        isLoadingCategories ?
                            <div className="w-full flex justify-center items-center">
                                <Spinner />
                            </div> :
                            <Select
                                name="categoryId"
                                form={form}
                                options={categoryOptions}
                                className="w-full"
                                label={"Categoria (opcional)"}
                                defaultValue={props.obj?.category?.id}
                            />
                    }
                </div>

                <div className="flex flex-wrap -mx-2">
                    <div className="pl-2 flex flex-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-2">
                        <div className="flex items-center text-gray-700 mb-2">
                            <span className="text-sm font-bold">É recorrente?</span>
                            <button type="button" className="ml-1 hover:text-sky-400 transition-colors">
                                <Info size={18} />
                            </button>
                        </div>
                        {
                            props.obj ?
                                <div className="flex items-center h-10">
                                    <span className="text-sm">{isFixed ? 'Sim' : 'Não'}</span>
                                </div> :
                                <div className="flex gap-10">
                                    <RadioButton
                                        form={form}
                                        name="isFixed"
                                        id="isFixed-1"
                                        label={"Sim"}
                                        value={"true"}
                                        defaultChecked={isFixed}
                                    />
                                    <RadioButton
                                        form={form}
                                        name="isFixed"
                                        id="isFixed-2"
                                        label={"Não"}
                                        value={"false"}
                                        defaultChecked={!isFixed}
                                    />
                                </div>
                        }
                    </div>

                    <Input
                        type="number"
                        name="paymentDay"
                        form={form}
                        label={"Dia de pagamento"}
                        className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                        defaultValue={
                            props.expenseGroup?.type === 0 ?
                                props.obj?.paymentDay :
                                props.expenseGroup?.paymentDay
                        }
                        readonly={props.expenseGroup?.type === 1}
                    />
                </div>
                {
                    isFixed &&
                    <div className="flex flex-wrap -mx-2">
                        <div className="pl-2 flex flex-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-2">
                            <div className="flex items-center text-gray-700 mb-2">
                                <span className="text-sm font-bold">É parcelada?</span>
                            </div>
                            {
                                props.obj ?
                                    <div className="flex items-center h-10">
                                        <span className="text-sm">{isItInstallments ? 'Sim' : 'Não'}</span>
                                    </div> :
                                    <div className="flex gap-10">
                                        <RadioButton
                                            form={form}
                                            name="isItInstallments"
                                            id="isItInstallments-1"
                                            label={"Sim"}
                                            value={"true"}
                                            defaultChecked={isItInstallments}
                                        />
                                        <RadioButton
                                            form={form}
                                            name="isItInstallments"
                                            id="isItInstallments-2"
                                            label={"Não"}
                                            value={"false"}
                                            defaultChecked={!isItInstallments}
                                        />
                                    </div>
                            }
                        </div>

                        {
                            isItInstallments &&
                            <Input
                                type="number"
                                name="totalInstallments"
                                form={form}
                                label={"Qtd. Parcelas"}
                                className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                                defaultValue={props.obj?.totalInstallments}
                                readonly={props.obj !== undefined}
                            />
                        }
                    </div>
                }
                <div className="flex justify-between">
                    {
                        props.obj ?
                            <Button
                                type="button"
                                title={<><Trash className="mr-1" weight="bold" /><span>Excluir</span></>}
                                loading={sending}
                                onClick={() => onDelete()}
                                outline
                            /> :
                            <div></div>
                    }
                    <div className="flex gap-6">
                        <button className="flex items-center justify-center text-sm" onClick={props.onFinish}>
                            <X className="mr-1" weight="bold" />
                            <strong>Cancelar</strong>
                        </button>
                        <Button
                            type="submit"
                            title={<><Check className="mr-1" weight="bold" /><span>Salvar</span></>}
                            loading={sending}
                        />
                    </div>
                </div>
            </form>
        </DefaultTransition>
    );
}