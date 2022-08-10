import CircularProgress from "../../components/General/CircularProgress";
import { ExpenseGroupBalanceModel } from "../../models/ExpenseGroupModel";

import { getContrastColorName, getContrastColorHex } from "../../utils";

interface ExpenseGroupData {
    group: ExpenseGroupBalanceModel;
    setExpenseGroupId: any;
}

export default function ExpenseGroupBalanceItem(data: ExpenseGroupData) {
    const { id, name, color, totalValue, totalPaid, paymentPercentual } = data.group;

    let textColor = getContrastColorName(color);

    return (
        <button type="button" onClick={() => data.setExpenseGroupId(id)}>
            <div className={`p-3 rounded-2xl hover:saturate-150 hover:transition-all hover:-translate-y-1 hover:scale-100`} style={{ backgroundColor: color }}>
                <div className={`flex items-center justify-between ${textColor}`}>
                    <span className="text-sm text-left line">
                        {name}
                    </span>
                    <div className="flex gap-3 items-center">
                        <div className="flex flex-col">
                            <span className="font-bold text-right">{totalValue.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</span>
                            <small className="text-xs text-right">Pago: {totalPaid.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</small>
                        </div>
                        <div className="w-12 h-12">
                            <CircularProgress
                                value={paymentPercentual}
                                text={paymentPercentual ? `${paymentPercentual?.toFixed(0)}%` : "0%"}
                                textColor={getContrastColorHex(color)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </button>
    )
}