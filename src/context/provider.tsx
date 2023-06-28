'use client'

import React, {createContext, useState} from "react";
import {Repository} from "@/repository/repository";

interface AppProviderProps {
    children: React.ReactNode
}

type AppContextProps = {
    repository: Repository
}

export const AppContext = createContext<AppContextProps>({
    repository: new Repository()
});

export const AppProvider = ({children}: AppProviderProps) => {
    const repository = new Repository()

    return (
        <AppContext.Provider value={{repository: repository}}>
            {children}
        </AppContext.Provider>
    )
}