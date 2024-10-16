'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie } from 'cookies-next';
// import SideBar from '@/app/(buyer)/buyer/SideBarPWA/page';
import SideBar from '@/app/components/SideBarPwa';

const Terms = () => {
  const router = useRouter();
  const [termsData, setTermsData] = useState({
    user_role: '',
    terms_and_conditions: '',
    hasAgreed: false,
  });

  useEffect(() => {
    // Fetching user-specific data from cookies
    const user_role = getCookie('user_role') || '';
    const terms_and_conditions = `Here are the terms and conditions for the ${user_role} portal. Please read them carefully.`;
    const hasAgreed = getCookie('hasAgreed') === 'true';

    setTermsData({
      user_role,
      terms_and_conditions,
      hasAgreed,
    });
  }, []);

  const handleAgreement = () => {
    // Logic to handle agreement to terms
    // You might want to set a new cookie indicating user has agreed
    // Example: setCookie('hasAgreed', true);
    setCookie('hasAgreed', true);
    router.push('/agreementNext'); // Redirect to agreement page after agreeing to the terms
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar userRole={termsData.user_role} />
      <div className="flex-grow p-6">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {termsData.user_role.charAt(0).toUpperCase() + termsData.user_role.slice(1)} Portal Agreement
          </h2>
          <p className="text-gray-600 mb-6">
            {termsData.terms_and_conditions}
          </p>

          {!termsData.hasAgreed ? (
            <button
              onClick={handleAgreement}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              I Agree
            </button>
          ) : (
            <p className="text-green-600">You have already agreed to the terms.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terms;
