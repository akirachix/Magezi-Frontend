const baseUrl = process.env.BASE_URL; 


export async function fetchPaymentsPerMonth(){
  
  if (!baseUrl) {
    console.error('BASE_URL is not defined in the environment variables.');
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/api/count/payments/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const textResponse = await response.text();
    console.log('Backend response:', textResponse, 'Status:', response.status);

    if (!response.ok) {
      try {
        const errorData = JSON.parse(textResponse);
        console.error('Error fetching ongoing payments:', errorData.detail || 'Network response was not ok');
        return null;
      } catch (e) {
    
        console.error('Unexpected response format from backend:', textResponse);
        return null;
      }
    }

    const result = JSON.parse(textResponse);
    console.log('Fetched ongoing payments per month successfully:', result);
    return result;
  } catch (error) {
    console.error('Error during fetching ongoing payments:', error);
    return null;
  }
}
