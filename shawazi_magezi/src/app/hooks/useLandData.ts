import { useEffect, useState } from 'react';
import { LandDetails } from '../utils/types';
import { fetchLandDetails } from '../utils/getLandDetails'; 

export const useLandData = (parcelNumber: string) => {
  const [land, setLandDetails] = useState<LandDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLandDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchLandDetails(parcelNumber);
        setLandDetails(data);  // Set the land data here
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

    if (parcelNumber) {
      loadLandDetails();
    }
  }, [parcelNumber]);

  return { land, loading, error, setError };
};

export default useLandData;























// import { useEffect, useState } from 'react';
// import { LandDetails } from '../utils/types';
// import { fetchLandDetails } from '../utils/getLandDetails'; 

// export const useLandData = (parcelNumber: string) => {
//   const [land, setLandDetails] = useState<LandDetails | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadLandDetails = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await fetchLandDetails(parcelNumber);
//         setLandDetails(null);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           console.error('Error fetching land details:', err.message);
//           setError(err.message);
//         } else {
//           console.error('Unknown error fetching land details:', err);
//           setError('Error fetching land details');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (parcelNumber) {
//       loadLandDetails();
//     }
//   }, [parcelNumber]); 

//   return { land, loading, error, setError };
// };

// export default useLandData;
