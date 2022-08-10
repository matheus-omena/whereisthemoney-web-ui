import { Modal } from "flowbite-react";
import { OperationType } from "../../../models/RegistersEnums";
import EditCategory from "./EditCategory";
import NewCategory from "./NewCategory";

type CategoryFormModalProps = {
    id?: string;
    showModalForm: boolean;
    onClose: () => void;
    onFinish: () => void;
    operationType: OperationType;
}

export default function CategoryFormModal(props: CategoryFormModalProps) {
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
                            <NewCategory onFinish={onFinish} /> :
                            <EditCategory id={id!} onFinish={onFinish} />
                    }
                </Modal.Body>
            </div>
        </Modal>
    )
}