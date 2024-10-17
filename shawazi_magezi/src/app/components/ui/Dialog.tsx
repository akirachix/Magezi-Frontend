import React from 'react';

interface DialogProps {
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ children }) => {
  return <div className="dialog">{children}</div>;
};

export const DialogContent: React.FC<DialogProps> = ({ children }) => {
  return <div className="dialog-content">{children}</div>;
};

export const DialogHeader: React.FC<DialogProps> = ({ children }) => {
  return <div className="dialog-header">{children}</div>;
};

export const DialogTitle: React.FC<DialogProps> = ({ children }) => {
  return <h2 className="dialog-title">{children}</h2>;
};

export const DialogFooter: React.FC<DialogProps> = ({ children }) => {
  return <div className="dialog-footer">{children}</div>;
};