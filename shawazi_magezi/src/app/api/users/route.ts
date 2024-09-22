const baseUrl = process.env.BASE_URL; 

export async function fetchUsersPerMonth(){ 


  try {
    const response = await fetch(`${baseUrl}/api/count/users/`, {
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
        console.error('Error fetching users:', errorData.detail || '404 response was not ok');
        return null;
      } catch (e) {

        console.error('Unexpected response format from backend:', textResponse);
        return null;
      }
    }

    const result = JSON.parse(textResponse);
    console.log('Fetched users per month successfully:', result);
    return result;
  } catch (error) {
    console.error('Error during fetching users:', error);
    return null;
  }
}
