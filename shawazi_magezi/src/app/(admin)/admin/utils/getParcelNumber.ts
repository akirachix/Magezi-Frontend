export const fetchParcelNumber = async () => {
  try {
    const response = await fetch('/admin/api/land-details', {
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
    console.error('Error in fetchParcelNumber:', error);
    throw error;
  }
};



















// export interface LandPlotsData {
//   month: string;
//   count: number;
// }

// export const fetchParcelNumber = async (): Promise<LandPlotsData[]> => {
//   try {
//     console.log('Fetching land details data...');
//     const response = await fetch('/api/land-details', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });


//     const data = await response.json();
//     console.log('Raw API response:', data);

//     const monthlyParcels: { [key: string]: number } = {};

//     if (Array.isArray(data)) {
//       console.log(`Processing ${data.length} parcels...`);
//       data.forEach((parcel: any) => {
//         if (!parcel.someDateField) {
//           console.warn('Parcel missing date field:', parcel);
//           return;
//         }
//         const date = new Date(parcel.someDateField);
//         if (isNaN(date.getTime())) {
//           console.warn('Invalid date:', parcel.someDateField);
//           return;
//         }
//         const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//         monthlyParcels[monthYear] = (monthlyParcels[monthYear] || 0) + 1;
//       });


//     } else if (data && typeof data === 'object' && data.parcels && Array.isArray(data.parcels)) {
//       console.log(`Processing ${data.parcels.length} parcels...`);
//       data.parcels.forEach((parcel: any) => {
//         if (!parcel.someDateField) {
//           console.warn('Parcel missing date field:', parcel);
//           return;
//         }
//         const date = new Date(parcel.someDateField);
//         if (isNaN(date.getTime())) {
//           console.warn('Invalid date:', parcel.someDateField);
//           return;
//         }
//         const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
//         monthlyParcels[monthYear] = (monthlyParcels[monthYear] || 0) + 1;
//       });
//     } else {
//       console.error('Unexpected data structure:', data);
     
//     }

//     const sortedMonths = Object.keys(monthlyParcels).sort();
    
//     const result = sortedMonths.map(month => ({
//       month,
//       count: monthlyParcels[month],
//     }));

//     console.log('Processed parcel data:', result);
//     return result;
//   } catch (error) {
//     console.error('Error in fetchParcelNumber:', error);
//     throw error;
//   }
// };