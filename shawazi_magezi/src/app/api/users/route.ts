const baseUrl = process.env.BASE_URL;
export async function GET() {
  console.log({baseUrl});
  
    try {
      const response = await fetch(`api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        return new Response(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }
      const result = await response.json();
      return new Response(JSON.stringify(result), {
        status: 200,
        statusText: 'User Fetched Successfully',
      });
    } catch (error) {     
      return new Response((error as Error).message, {
        status: 500,
      });
    }
  }









