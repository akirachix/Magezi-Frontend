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

