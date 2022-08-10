import moment from "moment";
import { DotsThreeVertical, Repeat } from "phosphor-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ExpensesApi } from "../../apis/ExpensesApi";
import BackgroundAreaDefault from "../../components/General/BackgroundAreaDefault";
import SelectMonth from "../../components/General/SelectMonth";
import Spinner from "../../components/General/Spinner";
import ExpensesByGroupList from "../Expenses/ExpensesByGroup/ExpensesByGroupList";
import ExpenseGroupsBalance from "./ExpenseGroupsBalance";
import ExpenseGroupsList from "./ExpenseGroupsList";

enum ViewType {
    BALANCE = "balance",
    GROUP_LIST = "group_list",
    EXPENSES = "expenses"
}

export function ExpenseGroupsPreview() {
    const [viewType, setViewType] = useState<ViewType>(ViewType.BALANCE);
    const [groupId, setGroupId] = useState("");
    const [selectedMonth, setSelectedMonth] = useState<number>(Number(moment().format("MM")));
    const actualMonth = Number(moment().format("MM"));
    const _api = useMemo(() => new ExpensesApi(), []);
    const [processingRecurringExpenses, setProcessingRecurringExpenses] = useState(false);

    useEffect(() => {
        setViewType(ViewType.BALANCE);
    }, [])

    useEffect(() => {
        setViewType(groupId !== "" ? ViewType.EXPENSES : ViewType.BALANCE);
    }, [groupId])

    const processRecurringExpenses = () => {
        setProcessingRecurringExpenses(true);
        _api.processNextMonthExpenses()
            .then(r => {
                toast.success("Despesas processadas com sucesso");
            })
            .catch((e) => {
                toast.error(e.message);
                console.log("Erro ao processar despesas cadastro", e);
            })
            .finally(() => setProcessingRecurringExpenses(false));
    }

    return (
        <BackgroundAreaDefault>
            {/* Header */}
            <div className="flex justify-between align-top mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-emerald-600">Balanço</span>
                    <span className="font-medium text-zinc-900 dark:text-white">
                        {
                            viewType === ViewType.EXPENSES ? "Despesas" : "Grupos de despesa"
                        }
                    </span>
                </div>

                <button type="button" className="text-[#535353] hover:text-white transition-colors" onClick={() => setViewType(ViewType.GROUP_LIST)}>
                    <DotsThreeVertical weight="bold" size={30} />
                </button>
            </div>
            {/* Header */}
            <div /*className="max-h-[700px] overflow-auto"*/>
                {
                    viewType === ViewType.BALANCE ?
                        <>
                            <SelectMonth setMonth={setSelectedMonth} />
                            {
                                selectedMonth === (actualMonth + 1) &&
                                <div className="flex justify-end mb-4">
                                    <button
                                        type="button"
                                        onClick={() => processRecurringExpenses()}
                                        className="flex text-xs gap-2 hover:font-bold transition-all"
                                    >
                                        Processar despesas recorrentes
                                        <Repeat size={18} weight="bold" />
                                    </button>
                                </div>
                            }
                            {
                                processingRecurringExpenses ?
                                    <div className="flex justify-center">
                                        <Spinner />
                                    </div> :
                                    <ExpenseGroupsBalance month={selectedMonth} setExpenseGroupId={setGroupId} />
                            }
                        </> :
                        viewType === ViewType.EXPENSES ?
                            <>
                                <SelectMonth setMonth={setSelectedMonth} />
                                <ExpensesByGroupList groupId={groupId} month={selectedMonth} setExpenseGroupId={setGroupId} />
                            </> :
                            viewType === ViewType.GROUP_LIST ?
                                <ExpenseGroupsList onReload={() => setViewType(ViewType.BALANCE)} /> :
                                <></>
                }
            </div>
        </BackgroundAreaDefault>
    );
}