import { Modal } from "flowbite-react";
import { Plus, Wallet } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
import { ExpenseGroupsApi } from "../../apis/ExpenseGroupsApi";
import GoBackButton from "../../components/Form/GoBackButton";
import DefaultTransition from "../../components/General/DefaultTransition";
import Spinner from "../../components/General/Spinner";
import { ExpenseGroupModel } from "../../models/ExpenseGroupModel";
import { OperationType } from "../../models/RegistersEnums";
import EditExpenseGroup from "./Form/EditExpenseGroup";
import ExpenseGroupsListItem from "./ExpenseGroupsListItem";
import ExpenseGroupFormModal from "./Form/ExpenseGroupFormModal";
import ScrollYArea from "../../components/General/ScrollYArea";

type ExpenseGroupsListProps = {
    onReload: () => void;
}

export default function ExpenseGroupsList(props: ExpenseGroupsListProps) {
    const { onReload } = props;
    const _api = useMemo(() => new ExpenseGroupsApi(), []);
    const [showModalForm, setShowModalForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState<ExpenseGroupModel[]>();
    const [operationType, setOperationType] = useState<OperationType>(OperationType.CREATE);
    const [actualGroupId, setActualGroupId] = useState("");

    const handleCreate = () => {
        setOperationType(OperationType.CREATE);
        setActualGroupId("");
        setShowModalForm(true);
    }

    const handleEdit = (id: string) => {
        setOperationType(OperationType.EDIT);
        setActualGroupId(id);
        setShowModalForm(true);
    }

    const loadRegisters = useCallback(() => {
        setLoading(true);
        _api
            .find()
            .then((r) => {
                setGroups(r.data);
            })
            .catch((e) => console.log("Erro ao carregar os grupos de despesas"))
            .finally(() => setLoading(false));
    }, [_api]);

    useEffect(() => {
        loadRegisters();
    }, [loadRegisters]);

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
                        loadRegisters();
                    })
                    .catch((e) => {
                        toast.error("Não foi possível excluir o registro");
                        console.log("Erro ao excluir registro", e);
                    })
                    .finally(() => setLoading(false));
            }
        })
    }

    return (
        <>
            {loading ?
                <Spinner /> :
                <DefaultTransition>
                    <div className="flex justify-between mb-4">
                        <GoBackButton onClick={onReload} />
                        <button
                            type="button"
                            onClick={handleCreate}
                            className="flex text-xs gap-2"
                        >
                            Adicionar grupo
                            <Plus size={15} weight="bold" />
                        </button>
                    </div>

                    <ScrollYArea maxWidthWindow={1280} scrollbarHeight={613}>
                        <div className="flex flex-col gap-4">
                            {
                                groups?.length === 0 ?
                                    <div className="flex flex-col items-center">
                                        <Wallet size={25} weight="fill" color="#71717a" />
                                        <span className="font-medium text-[#71717a] text-sm mt-2">Sem grupos cadastrados</span>
                                    </div> :
                                    groups?.map((item) => {
                                        return (
                                            <ExpenseGroupsListItem
                                                key={item.id}
                                                item={item}
                                                onEdit={handleEdit}
                                                onDelete={onDelete}
                                            />
                                        );
                                    })
                            }
                        </div>
                    </ScrollYArea>
                    <ExpenseGroupFormModal
                        id={actualGroupId}
                        operationType={operationType}
                        showModalForm={showModalForm}
                        onClose={() => setShowModalForm(false)}
                        onFinish={() => {
                            setShowModalForm(false);
                            onReload();
                        }}
                    />

                </DefaultTransition>
            }
        </>
    );
}