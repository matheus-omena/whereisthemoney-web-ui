interface DefaultTransitionProps {
    className?: string
    children: any
}


export default function DefaultTransition(props: DefaultTransitionProps) {
    const { className, children } = props;    

    return (
        <div className={className ? `animate__animated animate__fadeIn ${className}` : 'animate__animated animate__fadeIn'}>
            {children}
        </div>
    )

}