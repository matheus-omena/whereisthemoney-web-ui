import { Modal } from "flowbite-react";
import { ExpenseGroupModel } from "../../../../models/ExpenseGroupModel";
import { OperationType } from "../../../../models/RegistersEnums";
import EditExpense from "./EditExpense";
import NewExpense from "./NewExpense";

type ExpenseFormModalProps = {
    id?: string;
    expenseGroup: ExpenseGroupModel;
    showModalForm: boolean;
    onClose: () => void;
    onFinish: () => void;
    operationType: OperationType;
}

export default function ExpenseFormModal(props: ExpenseFormModalProps) {
    const { id, expenseGroup, showModalForm, onClose, onFinish, operationType } = props;

    return (
        <Modal
            show={showModalForm}
            size="lg"
            popup={true}
            onClose={onClose}
            color="#0f172a"
        >
            <div className="bg-slate-100 dark:bg-zinc-800 rounded-md">
                <Modal.Header />
                <Modal.Body>
                    {
                        operationType === OperationType.CREATE ?
                            <NewExpense expenseGroup={expenseGroup} onFinish={onFinish} /> :
                            <EditExpense id={id!} expenseGroup={expenseGroup} onFinish={onFinish} />
                    }
                </Modal.Body>
            </div>
        </Modal>
    )
}