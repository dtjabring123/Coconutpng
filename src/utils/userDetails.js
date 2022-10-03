//keeps track of logged in user details
import { getUserDetails } from "../utils/database_functions";
var user = null;
function uid_setUser(user_id){
    let succ = getUserDetails(user_id);
    Promise.resolve(succ).then((ret)=>{
        if(ret[0] == "success"){
            user = {
                emailAddress : ret[1].emailAddress,
                firstName : ret[1].firstName,
                lastName : ret[1].lastName,
                role : ret[1].role,
                titles : ret[1].titles
            };
            console.log("updating user to ");
            console.log(user);
        }else{
            user = null;
            console.log("user is ")
            console.log(user);
        }
    })
}
function setUser(user_details){
    user =  user_details;
    console.log("user is");
    console.log(user);
}
export {user,setUser,uid_setUser}