import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { useAuth } from "../../contexts/AuthContext";
import { RegisterModel } from "../../models/Auth/RegisterModel";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";

export default function Register() {
    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
        email: yup.string().email().required("O e-mail é obrigatório"),        
        password: yup.string().required("A senha é obrigatória"),
    }).required();

    const form = useForm<RegisterModel>({
        resolver: yupResolver(schema)
    });
    const auth = useAuth();

    const onSubmit = (data: RegisterModel) => {
        auth.Register(data);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <BackgroundAreaDefault className="w-full max-w-xs">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Input type="text" name="name" form={form} label="Nome" />
                    <Input type="email" name="email" form={form} label="E-mail" />
                    <Input type="password" name="password" form={form} label="Senha" />

                    <button type="submit" className="bg-emerald-600 w-full p-2 rounded-md mt-4 font-bold">Cadastrar</button>
                </form>
            </BackgroundAreaDefault>
        </div>
    );
}