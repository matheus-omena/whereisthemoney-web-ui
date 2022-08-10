export interface ResponsibleModel {
   id: string;
   name: string;  
   color: string; 
   createdAt: Date;
};

export interface CreateUpdateResponsibleModel {   
   name: string;
   color: string;
};