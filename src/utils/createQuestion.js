

export function validQuestion(user_details){
    //check if question title is null/empty
    if(user_details.title == null){
        return false;
    }
    if(!(user_details.title.length > 0)){
        return false;
    }
    return true;
}