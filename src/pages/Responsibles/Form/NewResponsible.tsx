import ResponsibleForm from "./ResponsibleForm";

type NewResponsibleProps = {
    onFinish: () => void;
}

export default function NewResponsible(props: NewResponsibleProps) {
    const { onFinish } = props;

    return (
        <ResponsibleForm onFinish={onFinish} />
    );
}