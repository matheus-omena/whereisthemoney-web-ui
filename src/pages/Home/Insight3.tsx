import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import SelectMonth from "../../components/General/SelectMonth";
import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { ExpensesApi } from "../../apis/ExpensesApi";
import { useTheme } from "../../contexts/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

type Balance = {
    name: string;
    color: string;
    totalValue: number;
}

export default function Insight3() {
    const { theme } = useTheme();
    const [selectedMonth, setSelectedMonth] = useState<number>(Number(moment().format("MM")));
    const _api = useMemo(() => new ExpensesApi(), []);
    const [labels, setLabels] = useState<string[]>(['']);
    const [colors, setColors] = useState<string[]>(['']);
    const [values, setValues] = useState<number[]>([0]);
    const [balance, setBalance] = useState<Balance[] | undefined>();

    useEffect(() => {
        _api
            .balanceByGroup(selectedMonth)
            .then((r) => setBalance(r.data))
            .catch((e) => console.log('Erro ao carregar balanço por grupos', e))
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
                tempValues.push(Number(item.totalValue.toFixed(2)));
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
                    <span className="font-medium text-zinc-900 dark:text-white">Gastos por Grupo</span>
                </div>
            </div>
            {/* Header */}
            <>
                <SelectMonth setMonth={setSelectedMonth} />
                <div>
                    <Doughnut
                        data={data}
                        height={248}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'right',   
                                    labels: {
                                        usePointStyle: true,
                                        pointStyle: 'circle',
                                        boxWidth: 10,
                                        color: theme === "light" ? "#18181b" : "#f1f5f9",
                                    }                                                                                                                                       
                                },
                                datalabels: {
                                    display: false                                    
                                }
                            }
                        }}
                    />
                </div>
            </>
        </BackgroundAreaDefault>
    )
}