export const fetchAgreements = async () => {
  try {
    const response = await fetch('/api/agreements', {
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





















