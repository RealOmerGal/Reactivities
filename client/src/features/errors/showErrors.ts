import { toast } from "react-toastify";
export default function showErrors(errors: any) {
    for (const [key, value] of Object.entries(errors)) {
        //@ts-ignore
        value.map(msg => toast.error(msg));
    }
}