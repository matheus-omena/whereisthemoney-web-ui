import { Folders, UserCircle, Wallet } from "phosphor-react";

export default function Section2() {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-7 text-white">
            Tenha controle de tudo!
          </h2>
          <p className="mb-10">
            Acompanhe seus gastos através de{" "}
            <strong>diferentes perspectivas</strong>.
            <br />
            Veja seus gastos por:
          </p>
          <div className="flex justify-center gap-20 items-center">
            <div className="flex flex-col gap-5">
              <div className="bg-white text-zinc-700 w-[120px] h-[120px] rounded-full flex items-center justify-center">
                <Folders weight="fill" size={50} />
              </div>
              <div className="bg-[rgba(255,255,255,0.2)] rounded-lg text-sm p-1">
                <strong>Categoria</strong>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-white text-zinc-700 w-[120px] h-[120px] rounded-full flex items-center justify-center">
                <UserCircle weight="fill" size={50} />
              </div>
              <div className="bg-[rgba(255,255,255,0.2)] rounded-lg text-sm p-1">
                <strong>Responsável</strong>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-white text-zinc-700 w-[120px] h-[120px] rounded-full flex items-center justify-center">
                <Wallet weight="fill" size={50} />
              </div>
              <div className="bg-[rgba(255,255,255,0.2)] rounded-lg text-sm p-1">
                <strong>Grupos</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
