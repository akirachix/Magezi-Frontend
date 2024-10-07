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

export interface User{
    phone_number: string;
    role: string;
    password:string;

}
export interface Transaction {
  date: string;
  status: string;
  amount: string;
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
  phone_number: string;
  password: string;
}

export interface UserData {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  role: string;
}

export interface UserRole {
  userRole: "buyer" | "seller" | "lawyer";
}
