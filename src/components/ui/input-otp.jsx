import React,{createContext,useContext} from "react";
import { cn } from "@/lib/utils";
const OTPContext=createContext({value:"",maxLength:6,onChange:()=>{}});
export function InputOTP({value="",onChange,maxLength=6,children}){return <OTPContext.Provider value={{value,onChange,maxLength}}><div className="relative inline-flex">{children}<input value={value} onChange={(e)=>onChange?.(e.target.value.replace(/\D/g,"").slice(0,maxLength))} inputMode="numeric" autoComplete="one-time-code" maxLength={maxLength} aria-label="Verification code" className="absolute inset-0 h-full w-full cursor-text opacity-0"/></div></OTPContext.Provider>}
export function InputOTPGroup({className,children}){return <div className={cn("flex gap-2",className)}>{children}</div>}
export function InputOTPSlot({index,className}){const{value}=useContext(OTPContext);return <div className={cn("flex h-12 w-10 items-center justify-center rounded-xl border border-input bg-background text-lg font-semibold",className)}>{value[index]||""}</div>}
