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

import { AgreementFormData } from "./types";

export const fetchAgreements = async (parcelNumber: string): Promise<AgreementFormData[]> => {
  try {
    const response = await fetch(`/api/agreements?parcel_number=${parcelNumber}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch agreements: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Invalid agreement data format");
    }
    return data;
  } catch (error) {
    console.error('Error fetching agreements:', error);
    throw error;
  }
};
