import moment from 'moment';

export const formatDate = (date, format = 'YYYY-MM-DD') => {
    if (!date) return;
    return moment(date).format(format)
}

export const relativeTime=(date,type="hour")=>{
    if(!date){
        return
    }
    return moment(date).startOf(type).fromNow()
}