"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeProviderProps {
  mode: string;
  setmode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeProviderProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setmode] = useState("dark");

  const handleThemeChange = () => {
    if (mode === "dark") {
      setmode("light");
      document.documentElement.classList.add("light");
    } else {
      setmode("dark");
      document.documentElement.classList.remove("dark");
    }
  };
//   useEffect(() => {
//     handleThemeChange();
//   }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setmode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
