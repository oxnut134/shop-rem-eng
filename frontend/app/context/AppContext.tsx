"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [executing, setExecuting] = useState(false);
    const [currentPage, setCurrentPage] = useState("");
    const [language, setLanguage] = useState(process.env.NEXT_PUBLIC_LANG || "en");

    return (
        <AppContext.Provider value={{
            executing, setExecuting,
            currentPage, setCurrentPage,
            language, setLanguage,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);
