import ExpenseGroupForm from "./ExpenseGroupForm";

type NewExpenseGroupProps = {
    onFinish: () => void;
}

export default function NewExpenseGroup(props: NewExpenseGroupProps) {
    const { onFinish } = props;

    return (
        <ExpenseGroupForm onFinish={onFinish} />
    );
}