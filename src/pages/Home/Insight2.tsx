import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SelectMonth from "../../components/General/SelectMonth";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { ExpensesApi } from "../../apis/ExpensesApi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

type Balance = {
    name: string;
    color: string;
    totalValue: number;
}

export default function Insight2() {
    const [selectedMonth, setSelectedMonth] = useState<number>(Number(moment().format("MM")));
    const _api = useMemo(() => new ExpensesApi(), []);
    const [labels, setLabels] = useState<string[]>(['']);
    const [colors, setColors] = useState<string[]>(['']);
    const [values, setValues] = useState<number[]>([0]);
    const [balance, setBalance] = useState<Balance[] | undefined>();

    useEffect(() => {
        _api
            .balanceByResponsible(selectedMonth)
            .then((r) => setBalance(r.data))
            .catch((e) => console.log('Erro ao carregar balanço por responsáveis', e))
            .finally();
    }, [selectedMonth])

    useEffect(() => {
        if (balance && balance?.length > 0) {
            let tempLabels: string[] = [];
            let tempColors: string[] = [];
            let tempValues: number[] = [];
            balance.map((item) => {
                tempLabels.push(item.name);
                tempColors.push(item.color);
                tempValues.push(item.totalValue);
            })
            setLabels(tempLabels);
            setColors(tempColors);
            setValues(tempValues);
        }
    }, [balance])


    const data = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: colors,
                borderRadius: 10,
                borderWidth: 0,
            },
        ]
    };

    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Insights</span>
                    <span className="font-medium text-zinc-900 dark:text-white">Gastos por Responsável</span>
                </div>
            </div>
            {/* Header */}
            <>
                <SelectMonth setMonth={setSelectedMonth} />
                <div>
                    <Bar
                        data={data}
                        height={170}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                datalabels: {
                                    anchor: 'end',
                                    align: 'start',
                                    color: '#ffffff',
                                    backgroundColor: 'rgba(255,255,255,0.3)',
                                    borderRadius: 5
                                }
                            },
                            scales: {
                                yAxes: {
                                    ticks: {
                                        display: false,
                                    },
                                },
                                gridLines: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </div>
            </>
        </BackgroundAreaDefault>
    )
}