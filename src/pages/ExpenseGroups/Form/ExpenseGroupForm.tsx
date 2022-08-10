import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Input } from "../../../components/Form/Input";
import Button from "../../../components/Form/Button";
import { Check, Info, X } from "phosphor-react";
import { InputColor } from "../../../components/Form/InputColor/InputColor";
import { CreateUpdateExpenseGroupModel, ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import { ExpenseGroupsApi } from "../../../apis/ExpenseGroupsApi";
import DefaultTransition from "../../../components/General/DefaultTransition";
import { RadioButton } from "../../../components/Form/RadioButton";
import { Modal } from "flowbite-react";

type Props = {
    obj?: ExpenseGroupModel;
    onFinish: () => void;
}

export default function ExpenseGroupForm(props: Props) {
    const [sending, setSending] = useState(false);
    const [showTypeInfo, setShowTypeInfo] = useState(false);
    const _api = useMemo(() => new ExpenseGroupsApi(), []);

    const [selectedType, setSelectedType] = useState(props.obj?.type || 0);
    const [showPaymentDayInput, setShowPaymentDayInput] = useState(props.obj?.type === 1 || false);

    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
    }).required();

    const form = useForm<CreateUpdateExpenseGroupModel>({
        resolver: yupResolver(schema)
    });

    function suggestColorByName(name: String) {
        if (name.toUpperCase().includes('ITAÚ') || name.toUpperCase().includes('ITAU')) form.setValue("color", "#ff7b00");
        if (name.toUpperCase().includes('NUBANK')) form.setValue("color", "#9333ea");
        if (name.toUpperCase().includes('C6')) form.setValue("color", "#18181b");
        if (name.toUpperCase().includes('PORTO')) form.setValue("color", "#0284c7");
        if (name.toUpperCase().includes('RENNER') || name.toUpperCase().includes('BRADESCO') || name.toUpperCase().includes('SANTANDER')) form.setValue("color", "#bd0000");
    }

    const type = form.watch("type");
    useEffect(() => {
        setSelectedType(type);
        setShowPaymentDayInput(String(type) === "1");
    }, [type])

    useEffect(() => {
        if (props.obj)
            setShowPaymentDayInput(props.obj?.type === 1);
        else
            form.setValue("type", 0);
    }, [])

    const onSubmit = (data: any) => {
        const processedData = {
            name: String(data.name),
            color: String(data.color),
            type: Number(form.watch("type")),
            paymentDay: data.paymentDay !== "" ? Number(data.paymentDay) : undefined
        }

        setSending(true);
        if (data.id && data.id != undefined) {
            _api.update(data.id, processedData)
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

    return (
        <DefaultTransition>
            <div className="mb-4">
                {
                    props.obj ?
                        <>
                            <h3 className="text-2xl font-bold mb-2">
                                Edição de grupo de despesas
                            </h3>
                            <p className="text-xs text-zinc-400">Altere apenas as informações que desejar</p>
                        </> :
                        <>
                            <h3 className="text-2xl font-bold mb-2">
                                Crie um novo grupo de despesas!
                            </h3>
                            <p className="text-xs text-zinc-400">Preencha as informações para criar um novo registro.</p>
                        </>
                }
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <input type="hidden" {...form.register("id")} value={props.obj?.id} />
                <div className="flex flex-wrap -mx-2">
                    <Input
                        type="text"
                        name={"name"}
                        form={form}
                        label={"Nome"}
                        className="w-full sm:w-1/1 md:w-4/5 lg:w-4/5 xl:w-4/5"
                        defaultValue={props.obj?.name}
                        onChange={(e: any) => suggestColorByName(e.target.value)}
                    />
                    <InputColor
                        name={"color"}
                        form={form}
                        label={"Cor"}
                        className="w-full sm:w-1/1 md:w-1/5 lg:w-1/5 xl:w-1/5"
                        defaultValue={props.obj?.color}
                    />
                </div>
                <div className="flex flex-wrap -mx-2">
                    <div className="pl-2 flex flex-col w-full sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/2">
                        <div className="flex items-center text-gray-700 mb-2">
                            <span className="text-sm font-bold">Tipo de pagamento</span>
                            <button type="button" className="ml-1 hover:text-sky-400 transition-colors" onClick={() => setShowTypeInfo(true)}>
                                <Info size={18} />
                            </button>
                        </div>
                        <RadioButton
                            form={form}
                            name="type"
                            id="individualPaymentType"
                            label={"Pagamento individual"}
                            value={0}
                            defaultChecked={selectedType === 0}
                        />
                        <RadioButton
                            form={form}
                            name="type"
                            id="totalPaymentType"
                            label={"Pagamento total"}
                            value={1}
                            defaultChecked={selectedType === 1}
                        />
                    </div>
                    {
                        showPaymentDayInput ?
                            <Input
                                type="number"
                                name={"paymentDay"}
                                form={form}
                                label={"Dia de pagamento"}
                                className="w-full sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/2"
                                defaultValue={props.obj?.paymentDay}
                            /> :
                            <></>
                    }
                </div>

                <div className="flex justify-end gap-6">
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
            </form>
            <Modal
                show={showTypeInfo}
                size="sm"
                popup={true}
                onClose={() => setShowTypeInfo(false)}
                color="#0f172a"
            >
                <div className="bg-zinc-800 rounded-md">
                    <Modal.Header>
                        <div className="flex items-center gap-2 text-white p-1">
                            <Info size={20} color="#38bdf8" />
                            <span className="text-lg font-bold">TIPO DE PAGAMENTO</span>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-sm mb-6">
                            <div className="mb-1">
                                <strong>Pagamento individual:</strong>
                            </div>
                            <span className="font-thin">As despesas serão pagas separadamente, cada uma em seu dia específico.</span>
                            <br />
                            <small className="text-sky-400"><strong>Exemplo:</strong> Despesas do mês (contas de luz, água, etc.)</small>
                        </div>
                        <div className="text-sm">
                            <div className="mb-1">
                                <strong>Pagamento total:</strong>
                            </div>
                            <span className="font-thin">O grupo será pago de uma só vez em um dia específico.</span>
                            <br />
                            <small className="text-sky-400"><strong>Exemplo:</strong> Cartões de crédito</small>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </DefaultTransition>
    );
}