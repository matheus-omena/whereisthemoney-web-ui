import { Folders, UserCircle, Wallet } from "phosphor-react";

export default function Section3() {
    return (
        <section className="bg-green-500 text-white">
            <div className="container mx-auto py-12">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-7">Tenha controle de tudo!</h2>
                    <p className="mb-10">
                        Acompanhe seus gastos através de diferentes perspectivas.
                        <br />
                        Veja seus gastos por:
                    </p>
                    <div className="flex justify-center gap-20 items-center">
                        <div className="flex flex-col gap-5">
                            <div className="bg-green-500 text-white w-[120px] h-[120px] rounded-full flex items-center justify-center">
                                <Folders weight="fill" size={50} />
                            </div>
                            <span>Categoria</span>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="bg-green-500 text-white w-[120px] h-[120px] rounded-full flex items-center justify-center">
                                <UserCircle weight="fill" size={50} />
                            </div>
                            <span>Responsável</span>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="bg-green-500 text-white w-[120px] h-[120px] rounded-full flex items-center justify-center">
                                <Wallet weight="fill" size={50} />
                            </div>
                            <span>Grupos de despesa</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}