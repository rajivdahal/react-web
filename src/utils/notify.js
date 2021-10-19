import { toast } from "react-toastify";

const Successnotification=(msg)=>{
    toast.success(msg)
}
const Progressnotification=(msg)=>{
    toast.info(msg)
}
const Rejectnotification=(msg)=>{
    toast.error(msg)
}
const Warningnotification=(msg)=>{
    toast.warn(msg)
}

export const notify={
    Successnotification,
    Progressnotification,
    Rejectnotification,
    Warningnotification
}