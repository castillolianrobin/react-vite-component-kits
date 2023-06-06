import axios from '@/plugins/axios';
import { CRUDService, type SuccessResponse, type TableResponse } from './types';

class Users extends CRUDService<User, CreateUser>{
  constructor() {
    super('user')
  }

  // Auth
  login(params?: any) {
    return axios.post<SuccessResponse<User>>(`/login`, params);
  }
  logout(params?: any) {
    return axios.post<SuccessResponse<User>>(`/logout`, params);
  }
  register(user: CreateUser) {
    return axios.post<SuccessResponse<User>>(`/register`, user);    
  }
  verifyAccount(params: { email: string, token: string }) {
    return axios.post('/verify-account', params);
  }
}

export default new Users();


/** __TYPE DEFINITION__ */

export interface User<userInfo = UserInfo, userType = UserType> {
  email: string;
  password?: string;
  id: number;
  token?: string; 
  tokenExpiration?: string;
  userInfo?: userInfo;
  userType?: userType;
  updatedAt: string;
  createdAt: string;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  birthday?: string;
}
 
export interface UserType {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface CreateUser extends Modify<User,{
  id?: number;
  password: string, 
  verify_password: string, 
  userInfo: Modify<UserInfo, { birthday: string }>;
  userType?: string;
  updatedAt?: string;
  createdAt?: string;
}> {}

type Modify<T, R> = Omit<T, keyof R> & R;