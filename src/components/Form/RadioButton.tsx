import { FieldValues, UseFormReturn } from "react-hook-form";

type Props = {
   form: UseFormReturn<FieldValues | any>;
   label: any;
   name: string;
   id?: string;
   className?: string;
   checked?: boolean;
   defaultChecked?: boolean;
   value?: string | number;
};

export function RadioButton(props: Props) {
   var radioId = props.name;
   if (props.id)
      radioId = props.id;

   return (
      <div className={props.className}>
         <div className="flex items-center gap-2 mb-2">
            <input
               {...props.form.register(props.name)}               
               type="radio"
               name={props.name}
               id={radioId}
               checked={props.checked}
               defaultChecked={props.defaultChecked}               
               value={props.value}
               className="border-none focus:ring-0 focus:outline-none bg-slate-300 dark:bg-white"
            />
            <label
               className="text-zinc-900 dark:text-white text-sm"
               htmlFor={radioId}
            >
               {props.label}
            </label>
         </div>
         {props.form.formState.errors[props.name] && (
            <small className="text-danger">
                <>
                    {props.form.formState.errors[props.name]?.message}
                </>
            </small>
         )}
      </div>
   );
}
