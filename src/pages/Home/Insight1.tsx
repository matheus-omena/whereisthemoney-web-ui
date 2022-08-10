import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import SelectMonth from "../../components/General/SelectMonth";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { ExpensesApi } from "../../apis/ExpensesApi";

type Balance = {
    name: string;
    totalValue: number;
}

export default function Insight1() {
    const [selectedMonth, setSelectedMonth] = useState<number>(Number(moment().format("MM")));
    const _api = useMemo(() => new ExpensesApi(), []);
    const [balance, setBalance] = useState<Balance[] | undefined>();

    useEffect(() => {
        _api
            .balanceByCategory(selectedMonth)
            .then((r) => setBalance(r.data))
            .catch((e) => console.log('Erro ao carregar balanço por categoria', e))
            .finally();
    }, [selectedMonth])

    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Insights</span>
                    <span className="font-medium text-zinc-900 dark:text-white">Gastos por Categoria</span>
                </div>
            </div>
            {/* Header */}
            <>
                <SelectMonth setMonth={setSelectedMonth} />
                <div className="flex flex-wrap justify-center -mx-2">
                    {
                        balance?.map((item, idx) => {
                            return (
                                <div key={idx} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 px-2">
                                    <div className="flex flex-col items-center bg-slate-100 dark:bg-[rgba(255,255,255,0.03)] rounded-lg py-3 mb-3">
                                        <span className="text-2xl font-thin">{item.totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                                        <span className="text-xs font-bold">{item.name}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        </BackgroundAreaDefault>
    )
}