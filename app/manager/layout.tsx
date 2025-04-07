
import { ReduxProvider } from "store/StoreProvider";
import "../../public/css/global-tailwindcss.css";
import ManagerLayout from "@/components/ManagerLayout";

export default async function appLayout({
    children
} : {
    children : React.ReactNode
}) {
   return <ManagerLayout>{children}</ManagerLayout>;

}
