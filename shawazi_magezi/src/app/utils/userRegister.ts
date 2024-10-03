
export const signupUser = async (userData: {
    first_name: string;
    last_name: string;
    phone_number: string;
    password: string;
    confirm_password: string;
    role: string;
    
  }) => {
    
    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Signup failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };
  