const baseUrl = '/api/agreements';
export const fetchData = async () => {
  try {
    const url =  `${baseUrl}`
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching agreements:', (error as Error).message);
    throw error;
  }
};