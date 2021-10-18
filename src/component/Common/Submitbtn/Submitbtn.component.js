import React from "react";

export const Submitbtn=(props)=>{
    const enabledlabel=props.enabledlabel || "Submit"
    const disabledlabel=props.disabledlabel || "Submitting...."
    let btn=props.issubmitting?
                            <button className="btn btn-primary disabled">{disabledlabel}</button>
                            :
                            <button className="btn btn-primary" type="submit">{enabledlabel}</button>
   return btn
}