export const postNotifications = async (phoneNumber: string, formData: FormData) => {
  try {
      const response = await fetch(`/api/notify-seller/${phoneNumber}/`, {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit notification');
      }

      return await response.json();
  } catch (error) {
      console.error('Failed to post notification:', (error as Error).message);
      throw new Error('Failed to post notification');
  }
};