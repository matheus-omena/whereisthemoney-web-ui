import { Modal } from "flowbite-react";
import { OperationType } from "../../../models/RegistersEnums";
import EditExpenseGroup from "./EditExpenseGroup";
import NewExpenseGroup from "./NewExpenseGroup";

type ExpenseGroupFormModalProps = {
    id?: string;
    showModalForm: boolean;
    onClose: () => void;
    onFinish: () => void;
    operationType: OperationType;
}

export default function ExpenseGroupFormModal(props: ExpenseGroupFormModalProps) {
    const { id, showModalForm, onClose, onFinish, operationType } = props;

    return (
        <Modal
            show={showModalForm}
            size="md"
            popup={true}
            onClose={onClose}
            color="#0f172a"
        >
            <div className="bg-slate-100 dark:bg-zinc-800 rounded-md">
                <Modal.Header />
                <Modal.Body>
                    {
                        operationType === OperationType.CREATE ?
                            <NewExpenseGroup onFinish={onFinish} /> :
                            <EditExpenseGroup id={id!} onFinish={onFinish} />
                    }
                </Modal.Body>
            </div>
        </Modal>
    )
}