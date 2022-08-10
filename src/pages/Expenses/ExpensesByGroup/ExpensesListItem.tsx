import moment from "moment";
import { ArrowSquareOut, CalendarBlank, FolderSimple, Repeat, UserCircle } from "phosphor-react";
import BackgroundListItemDefault from "../../../components/General/BackgroundListItemDefault";
import { ExpenseModel } from "../../../models/ExpenseModel";

type ExpensesListItemProps = {
    item: ExpenseModel;
    showPaymentButton: boolean;
    onEdit: (id: string) => void;
    onPay: (id: string) => void;
}

export default function ExpensesListItem(props: ExpensesListItemProps) {
    const { item, showPaymentButton, onEdit, onPay } = props;

    return (
        <BackgroundListItemDefault key={item.id} className="relative">
            {
                item.fixedExpenseId &&
                <div className="text-zinc-500 absolute -right-0 -top-1">
                    <Repeat size={18} weight="bold" />
                </div>
            }
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <div className="group flex items-center gap-1 text-sm mb-1 cursor-pointer hover:font-bold">
                        <div className="flex gap-1 text-sm" onClick={() => onEdit(item.id)}>
                            <span>
                                {`${item.name} ${item.totalInstallments ? `(${item.currentInstallment}/${item.totalInstallments}) ` : ' '}`}
                                <strong>{Number(item.value).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</strong>
                            </span>
                        </div>
                        <ArrowSquareOut size={15} weight="bold" className="hidden group-hover:block group-hover:transition" />
                    </div>
                    <div className="flex items-center gap-1 text-zinc-500 mb-1">
                        <CalendarBlank size={12} />
                        <small className="text-xs">Data para pagamento: <strong>{item.paymentDay}/{item.paymentMonth}</strong></small>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-500 mb-1">
                        <UserCircle size={12} weight="fill" />
                        <small className="text-xs">Responsável: <strong>{item.responsible.name}</strong></small>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-500">
                        <FolderSimple size={12} />
                        <small className="text-xs">Categoria: <strong>{item.category?.name}</strong></small>
                    </div>
                </div>
                {
                    item.isPaid ?
                        <div className="flex flex-col items-end">
                            <small className="text-zinc-500">PAGO EM</small>
                            <strong className="text-xs">{moment(item.dateItWasPaid).format("DD/MM/YYYY")}</strong>
                        </div> :
                        showPaymentButton &&
                        <button className="bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-700 text-sm font-bold rounded-lg p-2" onClick={() => onPay(item.id)}>
                            PAGAR
                        </button>
                }
            </div>
        </BackgroundListItemDefault>
    )
}