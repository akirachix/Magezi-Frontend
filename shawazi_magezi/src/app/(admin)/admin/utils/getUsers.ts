export const fetchUsers = async () => {
  try {
    const response = await fetch('/admin/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchUsers:', error);
    throw error;
  }
};











































// "use client"

// export interface UserData {
//   month: string;
//   landSellers: number;
//   landBuyers: number;
// }

// export const fetchUsersPerMonth = async (): Promise<UserData[]> => {
//   try {
//     const response = await fetch('/api/users', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => ({}));
//       throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();

//     const monthlyUsers: { [key: string]: { landSellers: number, landBuyers: number } } = {};
    
//     if (Array.isArray(data)) {
//       data.forEach((user: any) => {
//         if (!user.someDateField) return;
//         const date = new Date(user.someDateField);
//         if (isNaN(date.getTime())) return;
//         const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
//         if (!monthlyUsers[monthYear]) {
//           monthlyUsers[monthYear] = { landSellers: 0, landBuyers: 0 };
//         }
        
//         if (user.role === 'seller') {
//           monthlyUsers[monthYear].landSellers++;
//         } else if (user.role === 'buyer') {
//           monthlyUsers[monthYear].landBuyers++;
//         }
//       });
//     } else {
//       console.error('Unexpected data structure:', data);
//       return [];
//     }

//     const sortedMonths = Object.keys(monthlyUsers).sort();
    
//     const result = sortedMonths.map(month => ({
//       month,
//       landSellers: monthlyUsers[month].landSellers,
//       landBuyers: monthlyUsers[month].landBuyers
//     }));

//     console.log('Processed users data:', result);
//     return result;
//   } catch (error) {
//     console.error('Error processing users data:', error);
//     throw error;
//   }
// };