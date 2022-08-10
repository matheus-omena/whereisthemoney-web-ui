type BackgroundAreaDefaultProps = {
    children: any;
    className?: string;
}

export default function BackgroundAreaDefault(props: BackgroundAreaDefaultProps) {
    const { children, className } = props;
    return (
        <div className={`bg-white dark:bg-[rgb(31,31,31)] p-5 rounded-2xl ${className}`}>
            {children}
        </div>
    )
}