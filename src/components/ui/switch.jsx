import React from "react";
import { cn } from "@/lib/utils";
export function Switch({checked=false,onCheckedChange,className,disabled}){return <button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={()=>onCheckedChange?.(!checked)} className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors disabled:opacity-50",checked?"bg-primary":"bg-muted",className)}><span className={cn("absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform",checked?"translate-x-6":"translate-x-1")}/></button>}
