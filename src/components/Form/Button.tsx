import { CircleNotch } from "phosphor-react";

type ButtonProps = {
  title: string | React.ReactNode;
  type?: "button" | "submit";
  onClick?: any;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  outline?: boolean;
};

export default function Button(props: ButtonProps) {
  const defaultType = props.type ? props.type : "button";

  return (
    <button
      type={defaultType}
      className={`
        ${props.className} border-emerald-600 ${
        props.outline
          ? "border bg-transparent text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
          : "bg-gradient-to-r from-emerald-600 to-teal-500 hover:bg-gradient-to-r hover:from-emerald-800 hover:to-teal-700 text-white transition-colors"
      } text-sm flex justify-center items-center px-4 py-2 rounded-full gap-1`}
      onClick={props.onClick}
      disabled={props.loading || props.disabled}
    >
      {props.loading ? (
        <CircleNotch className="animate-spin" size={10} weight="bold" />
      ) : (
        props.title
      )}
    </button>
  );
}
