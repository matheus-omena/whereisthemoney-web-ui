type BackgroundListItemDefaultProps = {
    children: any;
    className?: string;
}

export default function BackgroundListItemDefault(props: BackgroundListItemDefaultProps) {
    const { children, className } = props;
    return (
        <div className={`bg-slate-100 dark:bg-[#181818] p-3 rounded-2xl w-full ${className}`}>
            {children}
        </div>
    )
}