import { createClient } from "@base44/sdk";
import { appParams } from "@/lib/app-params";

const appId = appParams.appId || import.meta.env.VITE_BASE44_APP_ID;
export const base44 = createClient({ appId });
if (appParams.token) base44.auth.setToken(appParams.token);
