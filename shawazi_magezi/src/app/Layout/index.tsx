'use client';

import React from 'react';



export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
    <Layout>
    <div>
              
            </div>

            <div className="flex-grow p-4">
                {children}
            </div>

      </Layout>
           
      </div>
    );
}