import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { useAuth } from "../../contexts/AuthContext";
import { LoginModel } from "../../models/Auth/LoginModel";
import { Link } from "react-router-dom";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import { Receipt } from "phosphor-react";

export default function SignIn() {
    const schema = yup.object({
        email: yup.string().email().required("O e-mail é obrigatório"),
        password: yup.string().required("A senha é obrigatória"),
    }).required();

    const form = useForm<LoginModel>({
        resolver: yupResolver(schema)
    });
    const auth = useAuth();

    const onSubmit = (data: LoginModel) => {
        auth.Login(data);
    };

    return (
        <div className="h-screen flex flex-col gap-5 justify-center items-center">
            <div className="flex items-center gap-2 text-green-600">
                <span className=" self-center text-xl font-semibold whitespace-nowrap tracking-widest">WHERE'S THE MONEY?</span>
                <Receipt size={20} weight="fill" />
            </div>
            <BackgroundAreaDefault className="w-full max-w-xs">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Input type="email" name="email" form={form} label="E-mail" />
                    <Input type="password" name="password" form={form} label="Senha" />

                    <button type="submit" className="bg-emerald-600 w-full p-2 rounded-md mt-4 font-bold">Entrar</button>
                    <div className="text-center mt-3 text-xs">
                        <span>Não tem uma conta? <Link to="/register"><strong>Registre-se</strong></Link></span>
                    </div>
                </form>
            </BackgroundAreaDefault>
        </div>
    );
}