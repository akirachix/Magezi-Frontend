'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
interface Step {
  label: string;
  completed: boolean;
  path: string;
}
const steps: Step[] = [
  { label: 'Land Search', completed: true, path: '/land-search' },
  { label: 'Agreement', completed: true, path: '/agreement' },
  { label: 'Contract', completed: true, path: '/contract' },
  { label: 'Transaction', completed: true, path: '/transaction' },
  { label: 'Land Transfer', completed: false, path: '/land-transfer' }
];
const ProgressBar: React.FC = () => {
  const router = useRouter();
  const handleStepClick = (path: string) => {
    router.push(path);
  };
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleStepClick(step.path)}
                className={`w-6 h-6 rounded-full ${
                  step.completed ? 'bg-primary' : 'bg-gray-300'
                } flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 transition-colors duration-200`}
              >
                {step.completed && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </button>
              <span className="mt-1 text-xs text-center">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 ${steps[index + 1].completed ? 'bg-primary' : 'bg-gray-300'} transition-colors duration-200`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default ProgressBar;