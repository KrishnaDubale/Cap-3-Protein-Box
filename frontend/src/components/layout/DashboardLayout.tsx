import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DashboardNavbar } from './DashboardNavbar';

export const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-secondary/30">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardNavbar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="mx-auto max-w-6xl animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
