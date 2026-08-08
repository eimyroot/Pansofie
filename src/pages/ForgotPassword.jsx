import React,{useState} from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail,ArrowLeft,Loader2 } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
export default function ForgotPassword(){const[email,setEmail]=useState("");const[loading,setLoading]=useState(false);const[sent,setSent]=useState(false);const handleSubmit=async(e)=>{e.preventDefault();setLoading(true);try{await base44.auth.resetPasswordRequest(email)}catch{}finally{setLoading(false);setSent(true)}};return <AuthLayout icon={Mail} title="Reset password" subtitle="We'll send you a link to reset it" footer={<Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft size={15}/>Back to log in</Link>}>{sent?<div className="text-sm text-muted-foreground leading-relaxed">If an account exists with that email, you'll receive a password reset link shortly.</div>:<form onSubmit={handleSubmit} className="space-y-5"><div className="space-y-2"><Label htmlFor="email">Email address</Label><div className="relative"><Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"/><Input id="email" type="email" autoComplete="email" autoFocus placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} className="pl-10 h-12" required/></div></div><Button type="submit" className="w-full h-12" disabled={loading}>{loading?<><Loader2 size={16} className="animate-spin"/>Sending...</>:"Send reset link"}</Button></form>}</AuthLayout>}
