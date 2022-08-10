import { createContext, useContext, useEffect, useState } from "react";

export type ThemeContextData = {
    theme: string;
    setTheme: any;    
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const useTheme = () => {
    return useContext(ThemeContext);    
};

export default function ThemeContextProvider(props: any) {
    const [theme, setTheme] = useState(localStorage.getItem("@MyFinances:theme") || "dark");

    useEffect(() => {
        const root = window.document.documentElement;

        const oldTheme = theme === "dark" ? "light" : "dark";

        root.classList.remove(oldTheme);
        root.classList.add(theme);
        localStorage.setItem("@MyFinances:theme", theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}