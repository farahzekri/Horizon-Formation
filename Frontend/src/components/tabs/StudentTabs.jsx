import React from 'react';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="border-b bg-white rounded-t-lg border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {tabs.map((tab) => (
                    <li key={tab.key} className="me-2">
                        <button
                            type="button"
                            className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
                                activeTab === tab.key
                                    ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                                    : 'border-transparent'
                            }`}
                            onClick={() => onTabChange(tab.key)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tabs;
