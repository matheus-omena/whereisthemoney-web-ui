import { useEffect, useMemo, useState } from "react";
import { CategoriesApi } from "../../../apis/CategoriesApi";
import Spinner from "../../../components/General/Spinner";
import { CategoryModel } from "../../../models/CategoryModel";
import CategoryForm from "./CategoryForm";

type EditCategoryProps = {
    id: string;
    onFinish: () => void;
}

export default function EditCategory(props: EditCategoryProps) {
    const { id, onFinish } = props;
    const [loading, setLoading] = useState(false);        
    const _api = useMemo(() => new CategoriesApi(), []);
    const [category, setCategory] = useState<CategoryModel>();

    useEffect(() => {
        setLoading(true);

        if (id)
            _api.findById(id)
                .then(r => {                    
                    setCategory(r.data.data);
                })
                .catch(() => console.log("Erro ao carregar cadastro ", id))
                .finally(() => setLoading(false));
    }, [_api, id])

    return (
        <>
            {
                loading ? <Spinner /> :
                    <CategoryForm obj={category} onFinish={onFinish} />

            }
        </>
    );
}