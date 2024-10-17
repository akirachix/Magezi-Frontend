import { LandDetails } from './types';

export const fetchDisplayLand = async (pk: string): Promise<LandDetails | null> => {
  try {
    const response = await fetch(`/api/land-detail/?pk=${encodeURIComponent(pk)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      return null;
    }

    const data: LandDetails = await response.json();
    console.log('Fetched land details:', data);
    return data;
  } catch (error) {
    console.error('Error fetching land details:', error);
    throw error;
  }
};
