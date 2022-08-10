import CategoryForm from "./CategoryForm";

type NewCategoryProps = {
    onFinish: () => void;
}

export default function NewCategory(props: NewCategoryProps) {
    const { onFinish } = props;

    return (
        <CategoryForm onFinish={onFinish} />
    );
}