// declare module 'cookie' {
//   interface Cookies {
//     get(name: string): string | undefined;
//     getJSON(name: string): any | undefined;
//     set(name: string, value: any, options?: any): void;
//     remove(name: string, options?: any): void;
//   }

//   const Cookies: Cookies;
//   export = Cookies; 
// }


// export interface Term {
//   text: string;
//   date_created?: string;
//   created_by?: string;
//   id?: number;  
// }

// export interface FormData {
//   terms: Term[];
//   agreement_id: number;
//   parcel_number: string;
//   seller: string;
//   buyer: string;
//   lawyer: string;
//   contract_duration: number;
//   date_created: string;
//   agreed_amount: number;
//   installment_schedule: number; 
//   penalties_interest_rate: number;
//   down_payment: number;
//   buyer_agreed: string;
//   seller_agreed: string;
//   terms_and_conditions: string;
//   transaction_count: number;
//   remaining_amount: number;
//   total_amount_made: number;
//   agreement_hash: string;
//   previous_hash: string;
//   transactions_history: string;
// }

// // export interface UserProfile {
// //   id: number;
// //   phone_number: string;
// //   first_name: string;
// //   last_name: string;
// //   is_active: boolean;
// //   date_joined: string;
// //   role: string;
// //   permissions: string[];
// // }

// export interface AgreementType {
//   agreement_id: Key | null | undefined;
//   id?: number;
//   parcel_number: string;
//   agreed_amount: number;
//   buyer_agreed: boolean;
//   seller_agreed: boolean;
//   date_created: string;
//   terms?: Term[];
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

// export interface ContractReviewPopupProps {
//   onClose: () => void;
//   onAgreementUpdate?: () => void;
//   agreement: AgreementType;
//   userRole: 'buyer' | 'seller' | 'lawyer'; 
//   latestTerm?: Term;
// }

// export interface Transaction {
//   id: number;
//   agreement_id: number;
//   amount: number;
//   date: string;
//   description?: string;
// }

// export interface APIResponse<T> {
//   success: boolean;
//   data?: T;
//   error?: string;
// }


// export enum UserRole {
//   BUYER = 'buyer',
//   SELLER = 'seller',
//   LAWYER = 'lawyer',
//   ADMIN = 'admin'
// }


// export enum AgreementStatus {
//   PENDING = 'pending',
//   ACTIVE = 'active',
//   COMPLETED = 'completed',
//   CANCELLED = 'cancelled'
// }


// export interface AgreementFilters {
//   status?: AgreementStatus;
//   startDate?: string;
//   endDate?: string;
//   minAmount?: number;
//   maxAmount?: number;
//   buyer?: string;
//   seller?: string;
// }


// export interface PaginationParams {
//   page: number;
//   limit: number;
//   totalPages?: number;
//   totalItems?: number;
// }


// export interface PaginatedResponse<T> {
//   items: T[];
//   pagination: PaginationParams;
// }


// export interface AgreementStats {
//   totalAgreements: number;
//   activeAgreements: number;
//   totalValue: number;
//   averageAmount: number;
//   completionRate: number;
// }


// export interface UserPermissions {
//   canCreate: boolean;
//   canEdit: boolean;
//   canDelete: boolean;
//   canApprove: boolean;
//   canView: boolean;
// }


// export interface Notification {
//   id: number;
//   type: 'info' | 'warning' | 'error' | 'success';
//   message: string;
//   date: string;
//   read: boolean;
//   relatedTo?: {
//     type: 'agreement' | 'transaction' | 'user';
//     id: number;
//   };
// }


// export interface AuditLogEntry {
//   id: number;
//   user_id: number;
//   action: string;
//   entity_type: 'agreement' | 'transaction' | 'user';
//   entity_id: number;
//   changes: Record<string, any>;
//   timestamp: string;
//   ip_address?: string;
// }


// export interface Document {
//   id: number;
//   agreement_id: number;
//   type: 'contract' | 'amendment' | 'receipt' | 'other';
//   title: string;
//   file_url: string;
//   uploaded_by: number;
//   upload_date: string;
//   status: 'pending' | 'approved' | 'rejected';
// }


// export interface ErrorState {
//   hasError: boolean;
//   message?: string;
//   code?: string;
//   details?: Record<string, string[]>;
// }


// export interface Settings {
//   notificationsEnabled: boolean;
//   emailNotifications: boolean;
//   smsNotifications: boolean;
//   language: string;
//   timezone: string;
//   currency: string;
//   dateFormat: string;
// }


// export type RequiredProperties<T, K extends keyof T> = T & Required<Pick<T, K>>;
// export type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// export type ReadonlyProperties<T> = {
//   readonly [P in keyof T]: T[P];
// };



declare module 'cookie' {
  interface Cookies {
    get(name: string): string | undefined;
    getJSON<T>(name: string): T | undefined; // Changed any to a generic type
    set(name: string, value: string | object, options?: Record<string, unknown>): void; // Specified type
    remove(name: string, options?: Record<string, unknown>): void; // Specified type
  }

  const Cookies: Cookies;
  export = Cookies; 
}

export interface Term {
  text: string;
  date_created?: string;
  created_by?: string;
  id?: number;  
}

export interface FormData {
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
}

export interface AgreementType {
  agreement_id: Key | null | undefined;
  id?: number;
  parcel_number: string;
  agreed_amount: number;
  buyer_agreed: boolean;
  seller_agreed: boolean;
  date_created: string;
  terms?: Term[];
  buyer?: string;
  seller?: string;
  lawyer?: string;
  contract_duration?: number;
  installment_schedule?: string; 
  penalties_interest_rate?: number;
  down_payment?: number;
  terms_and_conditions?: string;
  transaction_count?: number;
  remaining_amount?: number;
  total_amount_made?: number;
  agreement_hash?: string;
  previous_hash?: string;
  transactions_history?: string;
}

export interface ContractReviewPopupProps {
  onClose: () => void;
  onAgreementUpdate?: () => void;
  agreement: AgreementType;
  userRole: 'buyer' | 'seller' | 'lawyer'; 
  latestTerm?: Term;
}

export interface Transaction {
  id: number;
  agreement_id: number;
  amount: number;
  date: string;
  description?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller',
  LAWYER = 'lawyer',
  ADMIN = 'admin'
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
  changes: Record<string, unknown>; // Changed any to unknown for safer typing
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
