import React from "react";
import { cn } from "@/lib/utils";
export const Input=React.forwardRef(function Input({className,...props},ref){return <input ref={ref} className={cn("w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50",className)} {...props}/>});
