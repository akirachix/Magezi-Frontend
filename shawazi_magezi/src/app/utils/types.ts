export interface ContractData {
  month: string;
  completed: number;
  ongoing: number;
}

export interface NewContractData {
  month: string;
  contracts: number;
}

export interface PaymentData {
  month: string;
  ongoing: number;
  completed: number;
}

export interface UserData {
  month: string;
  sellers: number;
  buyers: number;
}


export type ContractsPerMonth = {
  month: string;    
  count: number;       
};



export type ContractsResponse = ContractsPerMonth[];




export const dummyData = {
  usersPerMonth: [
    { month: 'JAN', sellers: 20, buyers: 30 },
    { month: 'FEB', sellers: 25, buyers: 40 },
    { month: 'MAR', sellers: 15, buyers: 25 },
    { month: 'APR', sellers: 30, buyers: 45 },
    { month: 'MAY', sellers: 20, buyers: 35 },
    { month: 'JUN', sellers: 25, buyers: 40 },
    { month: 'JUL', sellers: 35, buyers: 50 },
  ],
  contractsPerMonth: [
    { month: 'JAN', completed: 10, ongoing: 20 },
    { month: 'FEB', completed: 15, ongoing: 25 },
    { month: 'MAR', completed: 20, ongoing: 30 },
    { month: 'APR', completed: 25, ongoing: 35 },
    { month: 'MAY', completed: 30, ongoing: 40 },
    { month: 'JUN', completed: 35, ongoing: 45 },
    { month: 'JUL', completed: 40, ongoing: 50 },
  ],
  newContractsPerMonth: [
    { month: 'JAN', contracts: 30 },
    { month: 'FEB', contracts: 40 },
    { month: 'MAR', contracts: 25 },
    { month: 'APR', contracts: 35 },
    { month: 'MAY', contracts: 20 },
    { month: 'JUN', contracts: 30 },
    { month: 'JUL', contracts: 45 },
  ],
  ongoingPaymentsPerMonth: [
    { month: 'JAN', ongoing: 10, completed: 5 },
    { month: 'FEB', ongoing: 5, completed: 10 },
    { month: 'MAR', ongoing: 20, completed: 15 },
    { month: 'APR', ongoing: 25, completed: 20 },
    { month: 'MAY', ongoing: 10, completed: 25 },
    { month: 'JUN', ongoing: 35, completed: 30 },
    { month: 'JUL', ongoing: 40, completed: 35 },
  ],
};
