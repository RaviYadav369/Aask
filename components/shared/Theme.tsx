"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "@/context/ThemeProvider";
import Image from "next/image";
import { themes } from "@/constants";
const Theme = () => {
  const { mode, setmode } = useTheme();
  console.log(mode);
  
  return (
    <div className="relative border-none shadow-none bg-transparent">
      <DropdownMenu>
        <DropdownMenuTrigger  className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              className="active-theme"
              width={23}
              height={23}
              alt="light-mode"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              className="active-theme"
              width={23}
              height={23}
              alt="dark-mode"
            />
          )}
        </DropdownMenuTrigger> 
        <DropdownMenuContent className="absolute top-4 -right-1  py-2 dark:border-dark-400 dark:bg-dark-300">
          {themes.map((theme) =>(
            <DropdownMenu  key={theme.value}  >
              <div className="px-2 cursor-pointer py-1 gap-4 items-center dark:focus:bg-dark-400  flex mx-auto w-full" onClick={()=>{setmode(theme.value)
              if(theme.value !== 'system'){
                localStorage.theme = theme.value
              }
              else{
                localStorage.removeItem('theme')
              }
              }}>

              <Image src={theme.icon} width={16} height={16} alt={theme.value} className={`${mode === theme.value && 'active-theme' }`} />
              <p className={`body-semibold  ${mode === theme.value ? 'text-primary-500':"text-dark100_light900"}`}>{theme.label}</p>
              </div>
            </DropdownMenu>

          ))}
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Theme;
