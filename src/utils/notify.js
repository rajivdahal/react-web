import { toast } from "react-toastify";

const Successnotification=(msg)=>{
    toast.success(msg)
}
const Progressnotification=(msg)=>{
    toast.info(msg)
}
const Errornotification=(msg)=>{
    toast.error(msg)
}
const Warningnotification=(msg)=>{
    toast.warn(msg)
}

export const notify={
    Successnotification,
    Progressnotification,
    Errornotification,
    Warningnotification
}