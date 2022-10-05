//keeps track of logged in user details
import { getUserDetails } from "../utils/database_functions";
var user = null; //user is first set to null
function uid_setUser(user_id){  //given a user id , set user details with database function
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
        }else{
            user = null;
        }
    })
}
function setUser(user_details){ // set user details when given direct user details
    user =  user_details;
}
export {user,setUser,uid_setUser}