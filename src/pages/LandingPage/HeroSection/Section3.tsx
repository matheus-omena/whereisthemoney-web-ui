import { Folders, UserCircle, Wallet } from "phosphor-react";

export default function Section3() {
  return (
    <section className="bg-white text-zinc-800">
      <div className="container mx-auto py-12">
        <div className="grid sm:grid-cols-4 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
          <div className="col-span-5 py-5">
            {/* <img alt="ILUSTRAÇÃO" src={Illustration} /> */}
          </div>
          <div className="col-span-7 flex flex-col justify-center h-full">
            <h1 className="text-6xl text-zinc-900 leading-snug font-bold mb-5">
              Crie suas próprias
              <br />
              categorias e
              <br />
              grupos de despesa!
            </h1>
            <p className="text-lg mb-20">
              Personalize seu controle e agrupamento de gastos como achar melhor
              <br />e tenha a visão que mais agrada você.
            </p>
            <div>{/* <Button title="Criar uma conta" /> */}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
