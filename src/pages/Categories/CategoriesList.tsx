import { Plus } from "phosphor-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
import { CategoriesApi } from "../../apis/CategoriesApi";
import GoBackButton from "../../components/Form/GoBackButton";
import DefaultTransition from "../../components/General/DefaultTransition";
import { CategoryModel } from "../../models/CategoryModel";
import { OperationType } from "../../models/RegistersEnums";
import CategoriesListItem from "./CategoriesListItem";
import CategoryFormModal from "./Form/CategoryFormModal";

type CategoriesListProps = {
    categories?: CategoryModel[];
    onReload: () => void;
}

export default function CategoriesList(props: CategoriesListProps) {
    const { categories, onReload } = props;
    const _api = useMemo(() => new CategoriesApi(), []);
    const [showModalForm, setShowModalForm] = useState(false);
    const [operationType, setOperationType] = useState<OperationType>(OperationType.CREATE);
    const [actualCategoryId, setActualCategoryId] = useState("");

    const handleCreate = () => {
        setOperationType(OperationType.CREATE);
        setActualCategoryId("");
        setShowModalForm(true);
    }

    const handleEdit = (id: string) => {
        setOperationType(OperationType.EDIT);
        setActualCategoryId(id);
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
                    Adicionar categoria
                    <Plus size={12} weight="bold" />
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {
                    categories?.length === 0 ?
                        <span>Sem categorias cadastradas</span> :

                        categories?.map((item) => {
                            return (                                
                                <CategoriesListItem 
                                    key={item.id}
                                    item={item}
                                    onEdit={handleEdit}
                                    onDelete={onDelete}
                                />
                            );
                        })
                }
            </div>
            <CategoryFormModal 
                id={actualCategoryId}
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