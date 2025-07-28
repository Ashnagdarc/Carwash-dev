import React from 'react';

export interface DashboardTab {
    id: string;
    label: string;
    icon: React.ElementType;
}

interface DashboardTabsProps {
    tabs: DashboardTab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ tabs, activeTab, onTabChange }) => (
    <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                    }`}
            >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
            </button>
        ))}
    </div>
);

export default DashboardTabs; 