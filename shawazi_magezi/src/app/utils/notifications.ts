
  export const postNotification = async (landId: number, notificationData: Record<string, unknown>,  BASE_URL: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/notify-seller/${landId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to send notification. Error: ${errorMessage}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error posting notification:", error);
      throw error;
    }
  };



