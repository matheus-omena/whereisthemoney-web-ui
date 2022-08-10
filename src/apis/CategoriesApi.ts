import { CreateUpdateCategoryModel } from "../models/CategoryModel";
import _ApiBase from "./_ApiBase";

export class CategoriesApi {
   find(): Promise<any> {
      const r = _ApiBase.get('/categories');      
      return r;
   }

   findById(id: string): Promise<any> {
      const r = _ApiBase.get(`/categories/${id}`);      
      return r;
   }

   async create(data: CreateUpdateCategoryModel): Promise<any> {
      const r = await _ApiBase.post('/categories', data);      
      return r;
   }

   async update(id: string, data: CreateUpdateCategoryModel): Promise<any> {      
      const r = await _ApiBase.put(`/categories/${id}`, data);      
      return r;
   }

   async delete(id: string): Promise<any> {      
      const r = await _ApiBase.delete(`/categories/${id}`);      
      return r;
   }
}
