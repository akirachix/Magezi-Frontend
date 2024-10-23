import React, { FC, LabelHTMLAttributes, ReactNode } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export const Label: FC<LabelProps> = ({ children, ...props }) => {
  return <label {...props}>{children}</label>;
};
