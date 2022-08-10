import { ArrowSquareOut, Circle, Trash } from "phosphor-react";
import BackgroundListItemDefault from "../../components/General/BackgroundListItemDefault";
import { ResponsibleModel } from "../../models/ResponsibleModel";

type ResponsiblesListItemProps = {
    item: ResponsibleModel;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function ResponsiblesListItem(props: ResponsiblesListItemProps) {
    const { item, onEdit, onDelete } = props;

    return (
        <BackgroundListItemDefault>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <div className="group flex items-center gap-1 text-sm cursor-pointer hover:font-bold" onClick={() => onEdit(item.id)}>
                        {item.name}
                        <Circle color={item.color} size={15} weight="fill" />
                        <ArrowSquareOut size={15} weight="bold" className="hidden group-hover:block group-hover:transition" />
                    </div>
                </div>
                <button className="flex justify-end" onClick={() => onDelete(item.id)}>
                    <Trash weight="bold" size={18} />
                </button>
            </div>
        </BackgroundListItemDefault>
    )
}