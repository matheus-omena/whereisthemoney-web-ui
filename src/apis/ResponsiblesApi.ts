import { CreateUpdateResponsibleModel } from "../models/ResponsibleModel";
import _ApiBase from "./_ApiBase";

export class ResponsiblesApi {
   find(): Promise<any> {
      const r = _ApiBase.get('/responsibles');      
      return r;
   }

   findById(id: string): Promise<any> {
      const r = _ApiBase.get(`/responsibles/${id}`);      
      return r;
   }

   async create(data: CreateUpdateResponsibleModel): Promise<any> {
      const r = await _ApiBase.post('/responsibles', data);      
      return r;
   }

   async update(id: string, data: CreateUpdateResponsibleModel): Promise<any> {      
      const r = await _ApiBase.put(`/responsibles/${id}`, data);      
      return r;
   }

   async delete(id: string): Promise<any> {      
      const r = await _ApiBase.delete(`/responsibles/${id}`);      
      return r;
   }
}
