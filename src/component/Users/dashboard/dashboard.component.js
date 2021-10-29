import './dashboard.component.css'
export const dashboard=(props)=>{
    console.log("props in dashboard are",props)
    return(
        <div className=" content">
            <h2>dashboard</h2>
            <p>please use side navigation menu to use the application</p>
        </div>
    )
}