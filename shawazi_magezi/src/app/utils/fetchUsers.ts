const url = '/api/users';


export const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users'); 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return []; 
  }
};






