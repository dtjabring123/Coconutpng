
export class validation{
    constructor(){}
    //valid email address - has at least 1 @ and .  There is a letter after each . 
    //valid ID num - does ID num match dob? is first couple of letters a valid dob? is dob 13 characters long?
    // valid Name - only contain alphabetical letters and no nums or special characters
    //valid phone num - only numbers, is the length = 10 ? note eliminate any +area code and replace with 0 
    //valid date of birth - compare current date to given dob, is person age > 16 , < 80 ?
    // take into account month for determining final age to be compared, if month < dob_month then age = year-dob_year - 1
    //                                                                  else age = year - dob_year

    static onlyNums(sString){
        if((sString == null) | (sString.length == 0)){
            return false;
        }
       for (let i = 0; i < sString.length; i++) {
        if( !((sString[i] >= "0") && (sString[i] <= "9"))  ){
            return false;
        }
       }
        return true;
    }
    static validEmail(sEmail){
        if(sEmail == null){
            return false;
        }
        if(sEmail.length < 10){
            return false;
        }
        var flag_1 = false; // flag for checking @ is in the email
        var flag_2 = true; // flag for checking after every . there is a letter
        for(let i = 0;i<sEmail.length;i++){
            if(( flag_1 == false) && (sEmail[i] == "@")){
                flag_1 = true;
            }
            if(sEmail[i] == "."){
                try {
                    if(sEmail[i+1]  == "." | sEmail[i+1] == "@"){ // check letter after . is not another . or @ 
                        flag_2 = false;
                    }
                } catch (error) { // . was at end of email address so invalid email
                    flag_2 = false;
                }
            }
        }
        if(flag_1 && flag_2){
            return true;
        }
        else{
            return false;
        }
    }
    static validID(sID){
    if(sID == null){
        return false;
    }
    if(sID.length != 13){
        return false;
    }
    return this.onlyNums(sID);
    }
    static validName(sName){
        if(sName == null){
            return false;
        }
        if(sName.length == 0){
            return false;
        }
        for(let i = 0;i<sName.length;i++){
            if( !(((sName[i]>="a") && (sName[i]<="z")) | ((sName[i]>="A") && (sName[i] <="Z")))){ //if character is not an alphabetical 
                return false;                                                                     //character, return false
            }
        }
        return true;
    }
    static validPhoneNum(sNum){
        if(sNum == null){
            return false;
        }
        sNum = sNum.replace(" ","");
        sNum = sNum.replace("+","");
        if(!((sNum.length == 13) | (sNum.length == 10 ))){ //check length of phone number
            return false;
        }

        return this.onlyNums(sNum);
    }
    static validDob(sDob){
        if(sDob == null){
            return false;
        }
        var current_date = new Date();
        var user_date = new Date(sDob);
        var age = current_date.getFullYear() - user_date.getFullYear();
        //check if user's birthday has not occured yet
        if(current_date.getMonth() < user_date.getMonth()){ // birthday month not yet occcured
            age = age -1;
        }
        else if(current_date.getMonth() == user_date.getMonth()){ //in birthday month
            if(current_date.getDate() < user_date.getDate()){ //birthday not yet occured
                age = age -1;
            }
        }
        if( (age >= 18) && (age <=75) ){ //user has to be 18-75 years old inclusive
            return true;
        }else{
            return false;
        }
    }
    static validPassword(sString){
        if(sString == null) 
        {   
            return false;
        }
        if((sString.length >= 6) && (sString.length<=15)){//password must be at least 6 characters long 
                                                          //password cannot be longer than 15 characters
            var flag_upper = false;
            var flag_lower = false;
            var flag_number = false;
            for(let i = 0;i<sString.length;i++){
                if((sString[i]>= "a") && (sString[i]<= "z")){ //has at least 1 lowercase character
                    flag_lower = true;
                }
                if((sString[i] >= "A") && (sString[i]<="Z")){//has at least 1 capital character 
                    flag_upper = true;
                }
                if((sString[i]>= "0") && (sString[i] <= "9")){ //has at least 1 number
                    flag_number = true;
                }
            }
            if((flag_lower && flag_number) && flag_upper){
                return true;
            }
            else{
                return false;
            }
        }
        return false;
    }

}

