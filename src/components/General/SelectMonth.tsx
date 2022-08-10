import moment from "moment";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { months } from "../../models/Months";

type MonthsProps = {
    name: string;
    value: number;
}

type SelectMonthProps = {
    setMonth: (month: number) => void;
}

type ArrowButtonProps = {
    onClick: () => void;
    disabled: boolean;
    children: any;
}

export default function SelectMonth(props: SelectMonthProps) {
    const { setMonth } = props;
    const [monthsExpenses, setMonthsExpenses] = useState<MonthsProps[]>();
    const [selectedMonth, setSelectedMonth] = useState<MonthsProps>();

    useEffect(() => {
        let actualMonth: number = Number(moment().format("MM"));
        let idx: number = months.findIndex(x => x.value === actualMonth);

        let monthsTemp: any = [];
        monthsTemp.push(months[idx - 1]);
        monthsTemp.push(months[idx]);
        monthsTemp.push(months[idx + 1]);

        setMonthsExpenses(monthsTemp);
        setSelectedMonth(monthsTemp[1]);
        setMonth(monthsTemp[1].value);
    }, [])

    const lastMonth = () => {
        let idx = monthsExpenses?.findIndex(x => x.value === selectedMonth?.value)!;
        if (idx > 0) {
            setSelectedMonth(monthsExpenses![idx - 1]);
            setMonth(monthsExpenses![idx - 1].value);
        }
    }

    const nextMonth = () => {
        let idx = monthsExpenses?.findIndex(x => x.value === selectedMonth?.value)!;
        if (idx <= 2) {
            setSelectedMonth(monthsExpenses![idx + 1]);
            setMonth(monthsExpenses![idx + 1].value);
        }
    }

    const ArrowButton = ({ onClick, disabled, children }: ArrowButtonProps) => {
        return (
            <button
                type="button"
                className="bg-slate-100 dark:bg-[#181818] hover:bg-zinc-100 transition-colors hover:text-[#181818] px-4 py-2 rounded-lg disabled:bg-white dark:disabled:bg-[rgb(31,31,31)] disabled:text-white dark:disabled:text-[rgb(31,31,31)]"
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        )
    }

    return (
        <div className="flex items-center justify-between my-5">
            <ArrowButton 
                onClick={lastMonth}
                disabled={monthsExpenses?.findIndex(x => x.value === selectedMonth?.value)! === 0}
                children={<CaretLeft size={15} weight="bold" />}
            />
            <strong>{selectedMonth?.name}</strong>
            <ArrowButton 
                onClick={nextMonth}
                disabled={monthsExpenses?.findIndex(x => x.value === selectedMonth?.value)! === 2}                
                children={<CaretRight size={15} weight="bold" />}
            />
        </div>
    );
}