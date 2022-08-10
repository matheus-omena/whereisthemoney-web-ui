import { ExpenseGroupModel } from "../../../../models/ExpenseGroupModel";
import ExpenseForm from "./ExpenseForm";

type NewExpenseProps = {
    expenseGroup: ExpenseGroupModel;
    onFinish: () => void;
}

export default function NewExpense(props: NewExpenseProps) {
    const { expenseGroup, onFinish } = props;

    return (
        <ExpenseForm expenseGroup={expenseGroup} onFinish={onFinish} />
    );
}