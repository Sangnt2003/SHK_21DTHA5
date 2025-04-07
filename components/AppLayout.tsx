"use client";
import Header from "./Header";
import Footer from "./Footer";
import { ReduxProvider } from "../store/StoreProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <Header />
            {children}
            <Footer />
        </ReduxProvider>
    );
}