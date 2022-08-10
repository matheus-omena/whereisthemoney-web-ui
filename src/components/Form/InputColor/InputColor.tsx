import { useState } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import "./styles.css"

type InputProps = {
    form: UseFormReturn<FieldValues | any>;
    name: string;
    label?: any;
    className?: string;
    defaultValue?: string | number;
};

export function InputColor(props: InputProps) {
    const [color, setColor] = useState(props.defaultValue);
    
    return (
        <div className={`${props.className} px-2 mb-5`}>
            <label htmlFor={props.name} className="block text-gray-700 text-sm font-bold mb-2">
                {props.label}
            </label>
            <input
                {...props.form.register(props.name)}                
                type="color"
                id={props.name}                
                defaultValue={color}
                onChange={e => setColor(e.target.value)}                
            />
            {props.form.formState.errors[props.name] && (
                <small className="text-red-500 text-xs">
                    <>
                        *{props.form.formState.errors[props.name]?.message || "Valor inválido"}
                    </>
                </small>
            )}
        </div>
    );
}