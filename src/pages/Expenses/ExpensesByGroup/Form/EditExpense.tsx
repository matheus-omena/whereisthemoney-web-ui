import { useEffect, useMemo, useState } from "react";
import { ExpensesApi } from "../../../../apis/ExpensesApi";
import Spinner from "../../../../components/General/Spinner";
import { ExpenseGroupModel } from "../../../../models/ExpenseGroupModel";
import { ExpenseModel } from "../../../../models/ExpenseModel";
import ExpenseForm from "./ExpenseForm";

type EditExpenseByGroupProps = {    
    id: string;
    expenseGroup: ExpenseGroupModel;
    onFinish: () => void;
}

export default function EditExpense(props: EditExpenseByGroupProps) {    
    const { id, expenseGroup, onFinish } = props;    
    const [loading, setLoading] = useState(false);    
    const _api = useMemo(() => new ExpensesApi(), []);
    const [expense, setExpense] = useState<ExpenseModel>();

    useEffect(() => {
        setLoading(true);

        if (id)
            _api.findById(id)
                .then(r => {                    
                    setExpense(r.data.data);
                })
                .catch(() => console.log("Erro ao carregar cadastro ", id))
                .finally(() => setLoading(false));
    }, [_api, id])

    return (
        <>
            {
                loading ? <Spinner /> :
                    <ExpenseForm obj={expense} expenseGroup={expenseGroup} onFinish={onFinish} />
            }
        </>        
    );
}