// export const patchAgreement = async (id: string, data: FormData) => {
//   try {
//     const response = await fetch(`/api/agreements/?id=${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to patch agreement. Status: ${response.status}`);
//     }

//     const result = await response.json();
//     return result;
//   } catch (error: any) {
//     console.error('Error patching agreement:', error.message);
//     throw new Error('Failed to patch agreement');
//   }
// };



export const patchAgreement = async (id: string, data: FormData) => {
  try {
    const response = await fetch(`/api/agreements/?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to patch agreement. Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error patching agreement:', error.message);
      throw new Error('Failed to patch agreement');
    } else {
      console.error('An unknown error occurred while patching the agreement');
      throw new Error('Failed to patch agreement');
    }
  }
};
