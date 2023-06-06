import axios from '@/plugins/axios';
export interface SuccessResponse<T = {}> {
  success: { 
    message: string; 
    data: T;
  };
}


export interface ErrorResponse<T = {}> {
  error: { 
    message: string; 
    data: T;
  };
}

export interface TableResponse<T = {}> {
  data: T[];
  to: number; 
  from: number; 
  total: number; 
  perPage: number; 
  lastPage: number; 
  currentPage: number;
}

export class CRUDService<Model = {}, CreateParams = Model> {
  base = '';

  constructor(base = '') {
    this.base = base;
  }
  
  list(params?: any) {
    return axios.get<TableResponse<Model>>(`/${this.base}`, { params });
  }
  
  show(id: number) {
    return axios.get<Model>(`/${this.base}/${id}`);
  }
  
  create(data: CreateParams) {
    return axios.post<SuccessResponse<Model>>(`/${this.base}/`, data);
  }

  delete(id: number) {
    return axios.post<SuccessResponse>(`/${this.base}/${id}/delete`);
  }
}
