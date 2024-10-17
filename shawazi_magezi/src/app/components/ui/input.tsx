import React from 'react';

export const Input = (props: React.JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>) => {
    return <input {...props} />;
};
