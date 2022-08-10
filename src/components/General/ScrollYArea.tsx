import { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

type ScrollYAreaProps = {
    maxWidthWindow: number;
    scrollbarHeight: number;
    children: any
}

export default function ScrollYArea(props: ScrollYAreaProps) {
    const { maxWidthWindow, scrollbarHeight, children } = props;
    const [windowSize, setWindowSize] = useState(getWindowSize());

    function getWindowSize() {
        const { innerWidth } = window;
        return { innerWidth };
    }

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <>
            {
                windowSize.innerWidth > maxWidthWindow ?
                    <Scrollbars style={{ height: scrollbarHeight }}>
                        {children}
                    </Scrollbars> :
                    children
            }
        </>

    )
}