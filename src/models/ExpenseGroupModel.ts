export interface ExpenseGroupModel {
   id: string;
   name: string;  
   color: string; 
   type: number;
   paymentDay?: number;
};
export interface CreateUpdateExpenseGroupModel { 
   id?: string;
   name: string;  
   color: string; 
   type: number;
   paymentDay?: number;   
};

export interface ExpenseGroupBalanceModel { 
   id: string;
   name: string;  
   color: string; 
   totalValue: number;
   totalPaid: number;
   paymentPercentual: number;   
};