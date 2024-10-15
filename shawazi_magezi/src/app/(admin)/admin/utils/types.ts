export interface User {
  dateCreated: string;
  role: 'buyer' | 'seller' | 'lawyer';
}


export interface LandPlot {
  id: string;
  location_name: string;
}

export interface MonthlyUserCount {
  month: string;
  buyers: number;
  sellers: number;
}

export interface Transaction {
  id: number; 
  status: 'Pending' | 'Complete';
}



