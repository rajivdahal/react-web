import {notify} from './notify'
export const errorHandler=(error)=>{
    let customErrMessage="something went wrong"
    
    let err=error.response
    let errmsg=err.data.msg3.msg
    notify.Errornotification(errmsg||customErrMessage)
}