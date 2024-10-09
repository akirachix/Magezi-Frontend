export const fetchAgreements = async () => {
  try {
    const response = await fetch('/admin/api/agreements', {
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
    console.error('Error in fetchAgreements:', error);
    throw error;
  }
};
























// export interface AgreementsData {
//   month: string;
//   count: number;
// }

// export const fetchAgreementsPerMonth = async (): Promise<AgreementsData[]> => {
//   try {
    
//     const response = await fetch('/api/agreements', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });


//     const data = await response.json();
//     console.log('Raw API response:', data);

//     const monthlyAgreement: { [key: string]: number } = {};

//     if (Array.isArray(data)) {
//       console.log(`Processing ${data.length} parcels...`);
//       data.forEach((parcel: any) => {
//         if (!parcel.someDateField) {
//           console.warn('Agreements missing date field:', parcel);
//           return;
//         }
//         const date = new Date();
//         if (isNaN(date.getTime())) {
//           console.warn('Invalid date:', parcel.someDateField);
//           return;
//         }
//         const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//         monthlyAgreement[monthYear] = (monthlyAgreement[monthYear] || 0) + 1;
//       });
//     } else if (data && typeof data === 'object' && data.parcels && Array.isArray(data.agreement)) {
//       console.log(`Processing ${data.agreement.length} parcels...`);
//       data.agreements.forEach((agreement: any) => {
//         if (!agreement.someDateField) {
//           console.warn('Parcel missing date field:', agreement);
//           return;
//         }
//         const date = new Date(agreement.someDateField);
//         if (isNaN(date.getTime())) {
//           console.warn('Invalid date:', agreement.someDateField);
//           return;
//         }
//         const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//         monthlyAgreement[monthYear] = (monthlyAgreement[monthYear] || 0) + 1;
//       });
//     } else {
//       console.error('Unexpected data structure:', data);
     
//     }

//     const sortedMonths = Object.keys(monthlyAgreement).sort();
    
//     const result = sortedMonths.map(month => ({
//       month,
//       count: monthlyAgreement[month],
//     }));

//     console.log('Processed Agreement data:', result);
//     return result;
//   } catch (error) {
//     console.error('Error in fetchPAgreementNumber:', error);
//     throw error;
//   }
// };