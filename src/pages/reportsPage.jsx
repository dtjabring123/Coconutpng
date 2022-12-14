import React from "react";
import { Link } from "react-router-dom"
import ReportsBlock from "../components/reports_block";
import ReportedUsersBlock from "../components/reported_users_block";
import "../stylesheets/reports.css";
export default class ReportsPage extends React.Component{
//use 2 components : Reports block , Userbans Blcok

    render(){
        return(
            <div >
                <div className="coloumn">
                {/* handles admin reviewing reported questions/responses */}
                <div className="leftside">
                    <ReportsBlock key={"reporting here"}/>
                </div>
                {/*handles admin banning users under review */}
                <div className="rightside">
                    <ReportedUsersBlock key={"users to ban"}/>
                </div>
                 </div>
                <Link to="/homepage">
                        <button className='buttonstyle'
                            style={{marginTop:10,marginBottom:30}}>
                                Back
                            </button>
                </Link>
                </div>
        )
    }
}