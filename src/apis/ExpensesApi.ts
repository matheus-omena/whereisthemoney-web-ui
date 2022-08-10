import { CreateUpdateExpenseModel } from "../models/ExpenseModel";
import _ApiBase from "./_ApiBase";

export class ExpensesApi {
   find(): Promise<any> {
      const r = _ApiBase.get('/expenses');      
      return r;
   }

   findById(id: string): Promise<any> {
      const r = _ApiBase.get(`/expenses/${id}`);      
      return r;
   }

   findByGroup(groupId: string, month: number): Promise<any> {
      const r = _ApiBase.get(`/expenses/bygroup/${groupId}/month/${month}`);
      return r;
   }

   async create(data: CreateUpdateExpenseModel): Promise<any> {
      const r = await _ApiBase.post('/expenses', data);      
      return r;
   }

   async update(id: string, data: CreateUpdateExpenseModel, updateLinkedFixedExpense: boolean): Promise<any> {      
      const r = await _ApiBase.put(`/expenses/${id}/updateLinkedFixedExpense/${updateLinkedFixedExpense}`, data);
      return r;
   }

   async delete(id: string, deleteLinkedFixedExpense: boolean): Promise<any> {   
      const r = await _ApiBase.delete(`/expenses/${id}/deleteLinkedFixedExpense/${deleteLinkedFixedExpense}`);      
      return r;
   }
   
   async processNextMonthExpenses(): Promise<any> {      
      const r = await _ApiBase.put(`/expenses/processNextMonthExpenses`);      
      return r;
   }

   async pay(id: string): Promise<any> {      
      const r = await _ApiBase.put(`/expenses/pay/${id}`);      
      return r;
   }

   async payGroup(id: string, month: number): Promise<any> {      
      const r = await _ApiBase.put(`/expenses/paygroup/${id}/month/${month}`);      
      return r;
   }

   async balanceByResponsible(month: number): Promise<any> {
      const r = _ApiBase.get(`/expenses/balancebyresponsibles/month/${month}`);
      return r;
   }

   async balanceByGroup(month: number): Promise<any> {
      const r = _ApiBase.get(`/expenses/balancebygroups/month/${month}`);
      return r;
   }

   async balanceByCategory(month: number): Promise<any> {
      const r = _ApiBase.get(`/expenses/balancebycategories/month/${month}`);
      return r;
   }
}
