import { Receipt } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Form/Button";
import Illustration from "../../../assets/img/hero-section.jpg"

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="bg-slate-100 text-zinc-900">
            <div className="container mx-auto pt-5 pb-20">
                <nav className="mb-20">
                    <div className="flex flex-wrap justify-between items-center mx-auto">
                        <div className="flex items-center gap-2 text-green-600">
                            <div className="flex flex-col text-xl font-semibold whitespace-nowrap tracking-widest">
                                <span>WHERE'S THE</span>
                                <span className="flex items-center gap-3 font-thin">MONEY? <Receipt size={20} weight="fill" /></span>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <a href="#">Sobre</a>
                            <button className="p-2 px-3 border rounded-lg" onClick={() => navigate("/signin")}>
                                ENTRAR
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="grid sm:grid-cols-4 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
                    <div className="col-span-7 flex flex-col justify-center h-full">
                        <h1 className="text-6xl text-zinc-900 leading-snug font-bold mb-5">
                            Descubra para onde
                            <br />
                            o seu dinheiro está
                            <br />
                            indo
                        </h1>
                        <p className="text-lg mb-20">
                            Faça o controle dos seus gastos de maneira prática, intuitiva e
                            <br />
                            eficiente e tenha um melhor aproveitamento financeiro
                        </p>
                        <div>
                            <Button
                                title="Criar uma conta"
                            />
                        </div>
                    </div>
                    <div className="col-span-5 py-5">
                        <img alt="ILUSTRAÇÃO" src={Illustration} />
                    </div>
                </div>
            </div>
        </section>
    )
}