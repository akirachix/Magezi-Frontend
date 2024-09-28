import { LandDetails } from './types';

export const fetchLandDetails = async (parcel_number: string): Promise<LandDetails | null> => {
  try {
    const response = await fetch(`/api/land-detail/?parcel_number=${encodeURIComponent(parcel_number)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: LandDetails = await response.json();
    console.log('Fetched land details:', data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching land details:', error.message);
    } else {
      console.error('Unknown error fetching land details:', error);
    }
    return null; 
  }
};
