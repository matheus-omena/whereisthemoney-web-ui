import { ArrowSquareOut, CalendarBlank, Circle, FolderSimple, Strategy, Tag, Trash } from "phosphor-react";
import BackgroundListItemDefault from "../../components/General/BackgroundListItemDefault";
import { ExpenseGroupModel } from "../../models/ExpenseGroupModel";

type ExpenseGroupsListItemProps = {
    item: ExpenseGroupModel;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function ExpenseGroupsListItem(props: ExpenseGroupsListItemProps) {
    const { item, onEdit, onDelete } = props;

    return (
        <BackgroundListItemDefault>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <div className="group flex items-center gap-1 text-sm mb-1 cursor-pointer hover:font-bold" onClick={() => onEdit(item.id)}>
                        {item.name}
                        <Circle color={item.color} size={15} weight="fill" />
                        <ArrowSquareOut size={15} weight="bold" className="hidden group-hover:block group-hover:transition" />
                    </div>
                    <div className="flex items-center gap-1 text-zinc-500 mb-1">
                        <Tag size={12} />
                        <small className="text-xs">Tipo de pagamento: <strong>{item.type === 1 ? "Total" : "Individual"}</strong></small>
                    </div>                    
                    {
                        item.type === 1 ?
                            <div className="flex items-center gap-1 text-zinc-500 mb-1">
                                <CalendarBlank size={12} />
                                <small className="text-xs">Dia de pagamento: <strong>{item?.paymentDay}</strong></small>
                            </div> : <></>
                    }                    
                </div>
                <button className="flex justify-end" onClick={() => onDelete(item.id)}>
                    <Trash weight="bold" size={18} />
                </button>
            </div>
        </BackgroundListItemDefault>
    )
}