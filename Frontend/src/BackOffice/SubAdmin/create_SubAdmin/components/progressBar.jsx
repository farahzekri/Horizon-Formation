import React from 'react';

const ProgressBar = ({ steps, currentStep }) => {
    return (
        <ol className="flex items-center w-full">
            {steps.map((step, index) => (
                <li key={index} className={`flex w-full items-center ${index < currentStep ? 'text-blue-600 after:border-blue-100 dark:after:border-blue-800' : 'text-gray-500 after:border-gray-100 dark:after:border-gray-700'} after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block`}>
                    <span className={`flex items-center justify-center w-10 h-10 ${index < currentStep ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                        {index < currentStep ? (
                            <svg className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0-2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0-2Z"/>
                            </svg>
                        )}
                    </span>
                </li>
            ))}
        </ol>
    );
};

export default ProgressBar;
