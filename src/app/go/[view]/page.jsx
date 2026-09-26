import GoAuthenticatedPage from "../../../components/experiences/GoAuthenticatedPage";
export default async function Page({params}){const {view}=await params;return <GoAuthenticatedPage view={view}/>;}
