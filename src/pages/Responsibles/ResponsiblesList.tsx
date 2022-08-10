import { Modal } from "flowbite-react";
import { Plus } from "phosphor-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
import { ResponsiblesApi } from "../../apis/ResponsiblesApi";
import GoBackButton from "../../components/Form/GoBackButton";
import DefaultTransition from "../../components/General/DefaultTransition";
import { OperationType } from "../../models/RegistersEnums";
import { ResponsibleModel } from "../../models/ResponsibleModel";
import EditResponsible from "./Form/EditResponsible";
import ResponsibleFormModal from "./Form/ResponsibleFormModal";
import ResponsiblesListItem from "./ResponsiblesListItem";

type ResponsiblesListProps = {
    responsibles?: ResponsibleModel[];
    onReload: () => void;
}

export default function ResponsiblesList(props: ResponsiblesListProps) {
    const { responsibles, onReload } = props;
    const _api = useMemo(() => new ResponsiblesApi(), []);
    const [showModalForm, setShowModalForm] = useState(false);
    const [operationType, setOperationType] = useState<OperationType>(OperationType.CREATE);
    const [actualResponsibleId, setActualResponsibleId] = useState("");

    const handleCreate = () => {
        setOperationType(OperationType.CREATE);
        setActualResponsibleId("");
        setShowModalForm(true);
    }

    const handleEdit = (id: string) => {
        setOperationType(OperationType.EDIT);
        setActualResponsibleId(id);
        setShowModalForm(true);
    }

    const onDelete = (id: string) => {
        Swal.fire({
            title: "Deseja excluir esse registro?",
            text: "Essa ação não poderá ser revertida.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                _api
                    .delete(id)
                    .then((r) => {
                        toast.success("Registro excluído com sucesso");
                        onReload();
                    })
                    .catch((e) => {
                        toast.error("Não foi possível excluir o registro");
                        console.log("Erro ao excluir registro", e);
                    })
                    .finally();
            }
        })
    }

    return (
        <DefaultTransition className="relative overflow-x-auto sm:rounded-lg">
            <div className="flex justify-end mb-4">                
                <button
                    type="button"
                    onClick={handleCreate}
                    className="flex items-center text-xs gap-2"
                >
                    Adicionar responsável
                    <Plus size={12} weight="bold" />
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {
                    responsibles?.length === 0 ?
                        <span>Sem responsáveis cadastrados</span> :

                        responsibles?.map((item) => {
                            return (
                                <ResponsiblesListItem 
                                    key={item.id}
                                    item={item}
                                    onEdit={handleEdit}
                                    onDelete={onDelete}
                                />
                            );
                        })
                }
            </div>
            <ResponsibleFormModal 
                id={actualResponsibleId}
                operationType={operationType}
                showModalForm={showModalForm}
                onClose={() => setShowModalForm(false)}
                onFinish={() => {
                    setShowModalForm(false);
                    onReload();
                }}
            />            
        </DefaultTransition>
    );
}