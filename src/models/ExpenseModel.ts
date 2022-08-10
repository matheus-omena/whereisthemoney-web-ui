export interface ExpenseModel {
   id: string;
   name: string;
   value: number;
   paymentDay: number;
   paymentMonth: number;
   totalInstallments: number;
   currentInstallment: number;
   isPaid: boolean;
   dateItWasPaid: Date;
   responsible: {
      id: string;
      name: string;
   };
   group: {
      id: string;
      name: string;
      color: string;
      type: number;
   };
   category: {
      id: string;
      name: string;
   };
   fixedExpenseId: string;
};

export interface CreateUpdateExpenseModel {
   id?: string;
   name: string;
   isFixed: boolean;
   value: number;
   responsibleId: string;
   groupId: string;
   categoryId?: string;
   paymentDay?: number;
   totalInstallments?: number;
};