import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CategoryModel } from "../../../models/CategoryModel";
import { CategoriesApi } from "../../../apis/CategoriesApi";
import { Input } from "../../../components/Form/Input";
import Button from "../../../components/Form/Button";
import { Check, X } from "phosphor-react";
import DefaultTransition from "../../../components/General/DefaultTransition";

type Props = {
    obj?: CategoryModel;
    onFinish: () => void;
}

export default function CategoryForm(props: Props) {
    const [sending, setSending] = useState(false);
    const _api = useMemo(() => new CategoriesApi(), []);

    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
    }).required();

    const form = useForm<CategoryModel>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: any) => {
        setSending(true);
        if (data.id && data.id != undefined) {
            _api.update(data.id, data)
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
            _api.create(data)
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
                                Edição de categoria
                            </h3>
                            <p className="text-xs text-zinc-400">Altere apenas as informações que desejar!</p>
                        </> :
                        <>
                            <h3 className="text-2xl font-bold mb-2">
                                Crie uma nova categoria!
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
                        className="w-full sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1"
                        defaultValue={props.obj?.name}
                    />
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
        </DefaultTransition>
    );
}