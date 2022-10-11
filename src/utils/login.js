import {validation} from './validation.js'

export function validLogin(user_details){ //validates email and password , output = [is details valid? , error message]
    var flag = true;
    var error = "";
    
    if(validation.validEmail(user_details.email) == false){ 
        flag = false;
        error = "Email is not in the correct format \n";
    }
    if(validation.validPassword(user_details.password) == false){
        flag = false;
        error = error + "Passwords must be at least 6 characters long and not longer than 15 characters \n";
    }
    return [flag,error]; 
}

