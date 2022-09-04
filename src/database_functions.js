//Set up imports
//Imports
import { initializeApp }from 'firebase/app'
import {
    getFirestore,collection,getDocs,doc,query,where,onSnapshot,addDoc, getDoc,startAt,startAfter,endAt,endBefore, orderBy,limit, updateDoc, increment, arrayRemove, arrayUnion, setDoc, serverTimestamp,
    deleteDoc,sendPasswordResetEmail
}from 'firebase/firestore'

import{
    getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged, updateProfile, updatePassword, updateEmail
}from 'firebase/auth'
//Firebase object connection
const firebaseConfig = {
    apiKey: "AIzaSyA-6DSz8cM6NtY7gu-uonAu0LgFHzCfTWg",
    authDomain: "witsoverflow-5e429.firebaseapp.com",
    projectId: "witsoverflow-5e429",
    storageBucket: "witsoverflow-5e429.appspot.com",
    messagingSenderId: "1091499652485",
    appId: "1:1091499652485:web:66e28f6abae04303b900ec",
    measurementId: "G-C6EQ71ZXR2"
  };

  //Initialiseing firebase connection
  initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth();

  //Creates the user
  async function register(first_name,last_name,dob,id_number,mobile_number,role,email,password){   
    //Will use to return if the the signing up is a success/failure and if it is a success then returns the user as a JSON object
    let arr = [];
    const makeUser = await createUserWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
      
      const user_id = cred.user.uid;
  
      //Adds their display name to their auth token
      updateProfile(auth.currentUser,{
        displayName: first_name + " " + last_name,
      });
  
      //Creates their document in the users collection 
      setDoc(doc(db,"Users",email),{
        user_login_id:user_id,
        user_first_name: first_name,
        user_last_name:last_name,
        user_DoB: dob,
        user_id: id_number,
        user_email: email,
        user_phone:mobile_number,
        user_role: role,
        user_likes: [],
        user_titles: [],
        user_questions: [],
        user_responses:[]
      })
      .catch((err)=>{
        console.log(err.message);
        arr.push("failed");
        arr.push(err);
      })
      arr.push("success")
      var loggedIn = {
        "displayName": first_name,
        "firstName": first_name,
        "lastName": last_name,
        "DoB": dob,
        "emailAddress": email,
        "phoneNumber": mobile_number
      }
      arr.push(loggedIn);
    })
    .catch((err)=>{
      console.log(err.message);
      arr.push("failed");
      arr.push(err);
    })
    return arr;
  }
  //Logs the user in
async function logIn(email,password){
    //Will use to return if the the logging in is a success/failure and if it is a success then returns the user as a JSON object
    let arr = [];
  
    const signIn = await signInWithEmailAndPassword(auth,email,password)
    .then((cred)=>{
      arr.push("success");
      
      //Passes necessary info for what will be displayed or necessary when logged in
      var loggedIn = {
        "displayName":cred.user.displayName,
        "emailAddress":cred.user.email,
      }
      arr.push(loggedIn);
      console.log('user logged in: ',cred.user.displayName)
    })
    .catch((err)=>{
      console.log(err.message);
      arr.push("failed");
    })
    return arr;
  }

  //logging out
function logOut(){
    var pass = "success";;
    signOut(auth)
    .then(()=>{
    })
    .catch((err)=>{
      console.log(err.message);
      pass='failed';
    })
    return pass;
  }

//Gets the user's details
async function getUserDetails(){  
  //Get a user reference
  var pass = 'failed';
  var JSONobj = null;
  
  try{
    //Try catch to make sure that the user has logged in
    const userRef = doc(db,"Users",auth.currentUser.email);

    await getDoc(userRef)
    .then((ret)=>{
      //Check that the user document exists
      if(ret.data()==null){
        return [pass,JSONobj]

      }
      pass = 'success';
      //create the json object
      JSONobj = {
        DoB: ret.data().user_DoB,
        firstName: ret.data().user_first_name,
        lastName: ret.data().user_last_name,
        phoneNumber: ret.data().user_phone,
        emailAddress: ret.data().user_email,
        role: ret.data().user_role,
        titles: ret.data().user_titles
      }
    })
    .catch(err=>{
      console.log(err.message)
    })

    return [pass,JSONobj];
  }
  catch(e){
    //User has not logged in
    return [pass,JSONobj];
  }
  
}
//Gets the usersID so that it can be used for password reset validation
async function CompareUserID(email,id){
  var arr = [];
  const docRef = doc(db,"Users",email);
  

  //Gets the id value
  await getDoc(docRef)
    .then((ret)=>{
      //Checks that the id exists
      if(ret.data() != null){
        arr.push("success");
        if(id===ret.data().user_id){
          arr.push(true);
        }
        else{
          arr.push(false);
        }
      }
      //Id does not exist
      else{
        arr.push('failed');
        arr.push('Not a valid email address');
      }
     
    })
    //Could not establish a connection with the database and thus failed
    .catch(err=>{
      arr.push('failed');
      arr.push(err);
    })
    return arr;
}

//Function that changes the user's password
function changePassword(new_password){
  var arr = ['success'];
  //Resets the password of the currently signed in user
  updatePassword(auth.currentUser,new_password)
  .catch((error)=>{
    console.log(error.message);
    arr[0]='failed';
    arr.push(error);
  })
  return arr;
}

//Function that will allow for most of the user's details to be changed
async function updateUserDetails(JSONobj){
  var pass = 'failed';
  var failed_arr = [];
  const userRef = doc(db,"Users",auth.currentUser.email);


  if(JSONobj.first_name!=null){
    //User wants a first_name change
    updateDoc(userRef,{
      user_first_name: JSONobj.first_name
    })
    .catch((error)=>{
      console.log(error.message);
      failed_arr.push("firstName_change")
    })
    //Update the name that will be displayed when they log in
    updateProfile(auth.currentUser,{
      displayName: JSONobj.first_name
    })
    pass = "success"
  }

  if(JSONobj.last_name!=null){
    //User wants a last_name change
    updateDoc(userRef,{
      user_last_name: JSONobj.last_name
    })
    .catch((error)=>{
      console.log(error.message);
      failed_arr.push("lastName_change")
    })
    pass = "success"
  }

  if(JSONobj.phoneNumber!=null){
    //User wants a last_name change
    updateDoc(userRef,{
      user_phone: JSONobj.phoneNumber
    })
    .catch((error)=>{
      console.log(error.message);
      failed_arr.push("phoneNumber_change")
    })
    pass = "success"
  }

  if(failed_arr.length>0){
    return ["failed",failed_arr]
  }
  return [pass];
}

//Function to create a question
async function askQuestion(title, desc){
  const questionsRef = collection(db,"Questions");
  var pass = "success";

  //Creates a new question based on passed in parameters and predefined values
  await addDoc(questionsRef,{
    "question_user":auth.currentUser.email,
    "question_title":title,
    "question_desc":desc,
    "question_date": serverTimestamp(),
    "question_likes":0
  })
  .catch((e)=>{
    pass = "failed"; //Used to symbolise that the creation of the question failed.
  })
  return pass;
}

//function that will help determine if the user has liked a question based on their likes
function hasLiked(question_id,arr){
  var liked = 0; 
  //Loop to go through all the user's likes
  for(let i=0;i<arr.length;i++){
    var entry = arr[i];
    var split = entry.split(","); //splits the like from the value
    if(split[0]===question_id){
      liked = parseInt(split[1]);
      break;
    }
  }
  return liked;
}

//Function to handle the liking and disliking of questions
async function likeQuestion(value,question_id){
  const questionRef = doc(db,"Questions",question_id);
  var pass = "failed";
  var failed_arr = [];
  var new_likes = 0;

  //In the case that the user has not logged in then they cant vote on a question
  try{
    const userRef = doc(db,"Users",auth.currentUser.email);

    var liked=-3.1415; //arbitrary value that will be used for comparison
    await getDoc(userRef).then(ret=>{
      liked=ret.data().user_likes;
      liked=hasLiked(question_id,liked);
   })
   .catch(e=>{
      return [pass,[e]];
   })

   if(liked==value){
    //Then the value should not change
    return ["success",failed_arr];
   }
   else{
    //Then the value is different from what they want to change their vote to
    
    //Fetching the number of likes the question currently has
    var prior_likes = -1;
    await getDoc(questionRef).then((ret)=>{
      prior_likes = ret.data().question_likes;
      pass = "success";
      new_likes = prior_likes;
    })
    .catch(e=>{
      console.log(e);
      failed_arr.push(e);
    })
   }

   //Removing the extra dis/like due to the the user's previous decision
   if(pass==='success'){

    if(value==0 || value<=-1*liked){
      //There vote is getting changed or deleted
      var concated = (question_id.concat(",",liked)).toString();
      new_likes += (-liked);
      
      //Removing the like from the user's list
      updateDoc(userRef,{
        user_likes: arrayRemove(concated)
      })
      .catch(e=>{
        pass = "failed";
        failed_arr.push(e);
      })

      //Updating the likes value
      updateDoc(questionRef,{
      question_likes : new_likes
      })
      .catch(e=>{
        pass = "failed";
        failed_arr.push(e);
        console.log(e);
      })

    }
   }

   //Adding the actual entries to the likes after taking the necessary ones away
   if(pass==='success'){
    //Changing the questions liked value
    updateDoc(questionRef,{
      question_likes : new_likes+value
    })
    .catch(e=>{
      pass = 'failed';
      failed_arr.push(e);
    })

    if(pass==="success" && value!=0){ //Dont include when the value is 0 as we dont want to add it to the user's likes as they removed their like
      //Updating the user's likes
      var concated = (question_id.concat(",",value)).toString();
      updateDoc(userRef,{
        user_likes: arrayUnion(concated)
      })
      .catch(e=>{
        console.log(e);
        failed_arr.push(e);
      })
    }
  }
   
  }
  catch(e){ 
    failed_arr.push(e);
  }

  return [pass,failed_arr];
}

//function that will return all data that would be necessary to display the question
async function getQuestionInfo(question_id){
  //Will return if the request passed/failed and the JSON representing the question
  var pass = 'failed';
  var JSON;

  const questionRef = doc(db,"Questions",question_id);
  await getDoc(questionRef).then(ret=>{
    pass = 'success'
    //Set the JSON for the question
    JSON = {
      "date": ret.data().question_date,
      "desc": ret.data().question_desc,
      "likes": ret.data().question_title,
      "user_id":ret.data().question_user,
      "liked":0 //default value means that the user did not like
      }
    })

  //Function will return if the user has liked it or not, thus the try catch will be for if the user is not logged in
  try{
    const userRef = doc(db,"Users",auth.currentUser.email);
    if(pass==='success'){
      await getDoc(userRef).then(ret=>{
        var likes = ret.data().user_likes;
        JSON.liked = hasLiked(question_id,likes);
      })
    }
  }
  catch(e){
    //Setting the liked value to an unnecessarily obtuse and specific value so that it can be known that the user has not logged in and thus cannot like the question
    JSON.liked = 3.1415;
    console.log(e);
  }

  return [pass,JSON];
  
}
  //subscribing to auth changes
  onAuthStateChanged(auth,(user)=>{
    console.log('user status changed: ',user)
  })

  //Exports all the functions
  export{register, logIn,logOut,getUserDetails,CompareUserID,changePassword,updateUserDetails, askQuestion, likeQuestion,getQuestionInfo}
