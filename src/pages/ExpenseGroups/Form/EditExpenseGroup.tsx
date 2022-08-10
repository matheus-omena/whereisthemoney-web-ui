import { useEffect, useMemo, useState } from "react";
import { ExpenseGroupsApi } from "../../../apis/ExpenseGroupsApi";
import Spinner from "../../../components/General/Spinner";
import { ExpenseGroupModel } from "../../../models/ExpenseGroupModel";
import ExpenseGroupForm from "./ExpenseGroupForm";

type EditExpenseGroupProps = {
    id: string;
    onFinish: () => void;
}

export default function EditExpenseGroup(props: EditExpenseGroupProps) {
    const { id, onFinish } = props;
    const [loading, setLoading] = useState(false);    
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const [expenseGroup, setExpenseGroup] = useState<ExpenseGroupModel>();

    useEffect(() => {
        setLoading(true);

        if (id)
            _api.findById(id)
                .then(r => {
                    setExpenseGroup(r.data);                    
                })
                .catch(() => console.log("Erro ao carregar cadastro ", id))
                .finally(() => setLoading(false));
    }, [_api, id])

    return (
        <>
            {
                loading ? <Spinner /> :
                    <ExpenseGroupForm obj={expenseGroup} onFinish={onFinish} />
            }
        </>
    );
}