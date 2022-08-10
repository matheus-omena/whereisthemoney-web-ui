import { ArrowSquareOut, Trash } from "phosphor-react";
import BackgroundListItemDefault from "../../components/General/BackgroundListItemDefault";
import { CategoryModel } from "../../models/CategoryModel"

type CategoriesListItemProps = {
    item: CategoryModel;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function CategoriesListItem(props: CategoriesListItemProps) {
    const { item, onEdit, onDelete } = props;

    return (
        <BackgroundListItemDefault>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <div className="group flex items-center gap-1 text-sm cursor-pointer hover:font-bold" onClick={() => onEdit(item.id)}>
                        {item.name}
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