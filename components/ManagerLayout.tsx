"use client";
import Header from "./Header";
import Footer from "./Footer";
import { ReduxProvider } from "../store/StoreProvider";

import NavDashboard from "./NavDashboard";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <div className="flex">
                <NavDashboard />
                <div className="w-[80%]">
                    {children}
                </div>
            </div>
        </ReduxProvider>
    );
}