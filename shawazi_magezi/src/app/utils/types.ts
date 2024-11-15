import { ReactNode } from 'react';
import { setCookie as setNextCookie, getCookie as getNextCookie } from 'cookies-next';
export const setCookie = (name: string, value: string, options = {}) => {
  setNextCookie(name, value, { ...options, maxAge: 60 * 60 * 24 });
};
export const getCookie = (name: string) => {
  return getNextCookie(name);
};
export const removeCookie = (name: string) => {
  setNextCookie(name, '', { maxAge: -1 });
};
export const getUserRole = () => {
  return getCookie('role') as string | undefined;
};
export const setUserData = (userData: {
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
}) => {
  setCookie('first_name', userData.first_name);
  setCookie('last_name', userData.last_name);
  setCookie('phone_number', userData.phone_number);
  setCookie('role', userData.role);
};
export const clearUserData = () => {
  removeCookie('first_name');
  removeCookie('last_name');
  removeCookie('phone_number');
  removeCookie('role');
  removeCookie('isLoggedIn');
};
export const setUsers = (users: UserSignup[]) => {
  setCookie('users', JSON.stringify(users));
};
export const getUsers = (): UserSignup[] => {
  const usersString = getCookie('users');
  return usersString ? JSON.parse(usersString) : [];
};
export interface UserSignup {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: string;
}
export interface LandDetails {
  land_details_id: number;
  parcel_number: string;
  date_acquired: string;
  land_description: string;
  price: number;
  owner_name: string;
  previous_owner?: string;
  national_id: string;
  address: string;
  date_sold?: string;
  date_purchased?: string;
  location_name: string;
  latitude: string;
  longitude: string;
}
export interface User {
  id: string;
  last_name: string;
  first_name: string;
  phone_number: string;
  role: string;
  password: string;
}
export interface Transaction {
  date: string;
  status: string;
  amount: string;
}
export interface NotificationData {
  message: string;
  timestamp: string;
  type: string;
}
export interface UserProfile {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  role: string;
  permissions: string[];
}
export interface User {
  phone_number: string;
  role: string;
  password: string;
}
export interface UserLogin {
  role: unknown;
  phone_number: string;
  password: string;
}
export interface UserDatas {
  name: ReactNode;
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: 'buyer' | 'seller' | 'lawyer';
}
export interface LandPlot {
  owner_name: string;
  latitude: number;
  longitude: number;
  id: string;
  location_name: string;
}
declare module 'cookie' {
  interface Cookies {
    get(name: string): string | undefined;
    getJSON<T>(name: string): T | undefined;
    set(name: string, value: string | object, options?: Record<string, unknown>): void;
    remove(name: string, options?: Record<string, unknown>): void;
  }
  const Cookies: Cookies;
}
export interface Term {
  text: string;
  date_created?: string;
  created_by?: string;
  id?: number | string;
  effectiveDate?: string;
  description: string;
  value: string;
}
export interface AgreementFormData {
  terms: Term[];
  agreement_id: number;
  parcel_number: string;
  seller: string;
  buyer: string;
  lawyer: string;
  contract_duration: number;
  date_created: string;
  agreed_amount: number;
  installment_schedule: number;
  penalties_interest_rate: number;
  down_payment: number;
  buyer_agreed: string;
  seller_agreed: string;
  terms_and_conditions: string;
  transaction_count: number;
  remaining_amount: number;
  total_amount_made: number;
  agreement_hash: string;
  previous_hash: string;
  transactions_history: string;
  agreement: string;
}
// export interface AgreementType {
//   agreement_id: string | null | undefined;
//   id?: number;
//   parcel_number: string;
//   agreed_amount: number;
//   buyer_agreed: boolean;
//   seller_agreed: boolean;
//   date_created: string;
//   terms?: string;
//   buyer?: string;
//   seller?: string;
//   lawyer?: string;
//   contract_duration?: number;
//   installment_schedule?: string;
//   penalties_interest_rate?: number;
//   down_payment?: number;
//   terms_and_conditions?: string;
//   transaction_count?: number;
//   remaining_amount?: number;
//   total_amount_made?: number;
//   agreement_hash?: string;
//   previous_hash?: string;
//   transactions_history?: string;
// }
  export interface AgreementType {
    agreement_id: number;  // Ensure this is required
    buyer?: {
        first_name: string;
        last_name: string;
    };
    seller?: {
        first_name: string;
        last_name: string;
    };
    parcel_number?: {
        latitude: number | string; // Update to match actual response type
        longitude: number | string; // Update to match actual response type
    };
    agreed_amount?: number;
    down_payment?: number;
    installment_schedule?: number;
    penalties_interest_rate?: number;
    date_created: string;
    terms_and_conditions?: string;
    total_amount_made?: number;
    remaining_amount?: number;
    buyer_agreed?: boolean;
    seller_agreed?: boolean;
    transactions_history?: [];
    agreement_hash?: string;
    previous_hash?: string;
    lawyer?: string;
    terms?: string;
}
    // agreement_id: number;
  // seller: { email: string };
  // buyer: { email: string };
  // agreed_amount: number;
  // buyer_agreed: boolean;
  // seller_agreed: boolean;
// export interface AgreementType {
//   agreement_id: number;
//   seller: { email: string };
//   buyer: { email: string };
//   agreed_amount: number;
//   buyer_agreed: boolean;
//   seller_agreed: boolean;
//   date_created: string;
//   terms_and_conditions?: string;
//   transactions_history: any[];
// }
export interface ContractReviewPopupProps {
  onClose: () => void;
  onAgreementUpdate: () => void;
  onSubmit: (response: { buyer_agreed?: boolean; seller_agreed?: boolean }) => Promise<void>;
  latestTerm?: Term;
  agreement: AgreementFormData;
  userRole: UserRole;
}
export interface Transaction {
  id: number;
  agreement_id: number;
  date: string;
  description?: string;
}
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
export enum UserRole {
  EMPTY = "",
  BUYER = 'buyer',
  SELLER = 'seller',
  LAWYER = 'lawyer',
  ADMIN = 'admin',
}
export enum AgreementStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}
export interface AgreementFilters {
  status?: AgreementStatus;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  buyer?: string;
  seller?: string;
}
export interface PaginationParams {
  page: number;
  limit: number;
  totalPages?: number;
  totalItems?: number;
}
export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationParams;
}
export interface AgreementStats {
  totalAgreements: number;
  activeAgreements: number;
  totalValue: number;
  averageAmount: number;
  completionRate: number;
}
export interface UserPermissions {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  canView: boolean;
}
export interface Notification {
  createdat: string | number | Date;
  timestamp: string | number | Date;
  id: number;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  date: string;
  read: boolean;
  relatedTo?: {
    type: 'agreement' | 'transaction' | 'user';
    id: number;
  };
}
export interface AuditLogEntry {
  id: number;
  user_id: number;
  action: string;
  entity_type: 'agreement' | 'transaction' | 'user';
  entity_id: number;
  changes: Record<string, unknown>;
  timestamp: string;
  ip_address?: string;
}
export interface Document {
  id: number;
  agreement_id: number;
  type: 'contract' | 'amendment' | 'receipt' | 'other';
  title: string;
  file_url: string;
  uploaded_by: number;
  upload_date: string;
  status: 'pending' | 'approved' | 'rejected';
}
export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
  details?: Record<string, string[]>;
}
export interface Settings {
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: string;
  timezone: string;
  currency: string;
  dateFormat: string;
}
export type RequiredProperties<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type ReadonlyProperties<T> = {
  readonly [P in keyof T]: T[P];
};