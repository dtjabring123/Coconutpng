import {validation} from './validation.js';

export function validRegistration(user_details){
    var flag = true;
    var error = "";
    //validate both names
    if((!validation.validName(user_details.fname)) | (!validation.validName(user_details.lname)) ){
        flag = false;
        error = "Names should only contain alphabetical characters and not be empty \n";
    }
    //validate phonenum
    if(!validation.validPhoneNum(user_details.phonenum)){
        flag = false;
        error = error + "Phone numbers should be 10 or 13 characters long and only contain numbers or a single  '+' \n";
    }
    //validate idnum
    if(!validation.validID(user_details.id)){
        flag = false;
        error = error + "ID should be 13 characters long and only contain numbers \n";
    }
    //validate Dob
    if(!validation.validDob(user_details.dob)){
        flag = false;
        error = error + "User must be between 18 and 75 years old inclusive to register \n";
    }
    //validate password
    if(!validation.validPassword(user_details.password)){
        flag = false;
        error = error + "Password must be between 6 and 15 characters long inclusive.Password should contain at least 1 uppercase letter, 1 lowercase letter and 1 number \n";
    }
    //check admin code matches 
    if((user_details.admin != null) | (user_details.admin != "" )){
        if(user_details.admin != "admin"){
            flag = false;
            error = error + "Invalid admin code \n";
        }
    }

    return [flag,error];
}