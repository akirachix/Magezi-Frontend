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
  

