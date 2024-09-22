import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.BASE_URL;

export async function fetchContractsPerMonth(){
  try {
    const response = await fetch(`${baseUrl}/api/count/contracts/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const textResponse = await response.json();
    console.log('Backend response:', textResponse, 'Status:', response.status);

    if (!response.ok) {
      try {
        const errorData = JSON.parse(textResponse);
        console.error('Error fetching contracts:', errorData.detail || 'Network response was not ok');
        return null;
      } catch (e) {

        console.error('Unexpected response format from backend:', textResponse);
        return null;
      }
    }
    const result = JSON.parse(textResponse);
    console.log('Fetched contracts per month successfully:', result);
    return result;
  } catch (error) {
    console.error('Error during fetching contracts:', error);
    return null;
  }
}
