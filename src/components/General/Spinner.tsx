import { CircleNotch } from "phosphor-react";

interface Params {
   inline?: boolean;
   notext?: boolean;
   message?: any;
   size?: number;
}

export default function Spinner(props: Params) {
   let divClass: string;

   divClass = "flex w-100 gap-2 my-auto ";
   divClass += props.inline
      ? "justify-center items-center gap-3"
      : "items-center flex-col";
   const size = props.size ? props.size : 40;

   return (
      <div className={divClass}>
         <CircleNotch className="animate-spin" size={size} weight="bold" />
         {!props.notext && (
            <span className="ju components-text">{props.message}</span>
         )}
      </div>
   );
}
