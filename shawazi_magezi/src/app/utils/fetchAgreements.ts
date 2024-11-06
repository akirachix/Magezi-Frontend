
import { AgreementFormData, Term } from "@/app/utils/types";

export const fetchAgreements = async (parcelNumber: string): Promise<{ agreement: AgreementFormData | null; checkedTerms: Record<string, boolean> }> => {
    const response = await fetch(`/api/agreements?parcel_number=${parcelNumber}`);
    if (!response.ok) {
        console.error(`Failed to fetch agreements: ${response.status} ${response.statusText}`);
        throw new Error(`Failed to fetch agreements: ${response.status} ${response.statusText}`);
    }
    const data: AgreementFormData[] = await response.json();
    console.log('Fetched agreements: ', data); // Log data for debugging
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No agreements found");
    }

    const mostRecentAgreement = data.sort((a, b) => b.agreement_id - a.agreement_id)[0];
    
    const initialCheckedTerms =
        mostRecentAgreement.terms?.reduce((acc: Record<string, boolean>, term: Term) => {
            if (term.id) {
                acc[term.id] = false;
            }
            return acc;
        }, {}) || {};

    return { agreement: mostRecentAgreement, checkedTerms: initialCheckedTerms };
};