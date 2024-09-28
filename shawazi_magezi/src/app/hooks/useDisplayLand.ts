import { useEffect, useState } from 'react';
import { LandDetails } from '../utils/types';
import { fetchDisplayLand } from '../utils/getDisplayLand';

export const useDisplayLand = (pks: string[]) => { 
  const [landDetailsList, setLandDetailsList] = useState<LandDetails[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLandDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const detailsPromises = pks.map(pk => fetchDisplayLand(pk)); 
        const data = await Promise.all(detailsPromises); 
        const filteredData = data.filter((item): item is LandDetails => item !== null); 
        setLandDetailsList(filteredData); 
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error('Error fetching land details:', err.message);
          setError(err.message);
        } else {
          console.error('Unknown error fetching land details:', err);
          setError('Error fetching land details');
        }
      } finally {
        setLoading(false);
      }
    };

    if (pks.length > 0) {
      loadLandDetails();
    }
  }, [pks]); 

  return { landDetailsList, loading, error, setError }; 
};

export default useDisplayLand;
