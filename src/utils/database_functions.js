//Set up importssetUser
//Imports
import { initializeApp } from 'firebase/app'

import {
  getFirestore, collection, getDocs, doc, query, where, onSnapshot, addDoc, getDoc, startAt, startAfter, endAt, endBefore, orderBy, limit, updateDoc, increment, arrayRemove, arrayUnion, setDoc, serverTimestamp,
  deleteDoc, toDate
} from 'firebase/firestore'

import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, updatePassword, updateEmail, sendPasswordResetEmail
} from 'firebase/auth'

import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'

import { v4 } from 'uuid'
import { setUser, uid_setUser } from './userDetails'

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
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app); //Make a reference to storage part of the database

//Creates the user
async function register(first_name, last_name, dob, id_number, mobile_number, role, email, password) {
  //Will use to return if the the signing up is a success/failure and if it is a success then returns the user as a JSON object
  let arr = [];
  const makeUser = await createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {

      const user_id = cred.user.uid;

      //Adds their display name to their auth token
      updateProfile(auth.currentUser, {
        displayName: first_name + " " + last_name,
      });

      //Creates their document in the users collection 
      setDoc(doc(db, "Users", email), {
        user_login_id: user_id,
        user_first_name: first_name,
        user_last_name: last_name,
        user_DoB: dob,
        user_id: id_number,
        user_email: email,
        user_phone: mobile_number,
        user_role: role,
        user_likes_questions: [],
        user_likes_responses: [],
        user_titles: [],
        user_questions: [],
        user_strikes: [],
        user_responses: []
      })
        .catch(/* istanbul ignore next */(err) => {
          console.log(err.message);
          arr.push("failed");
          arr.push(err);
        })
      arr.push("success")
      var loggedIn = {
        "displayName": first_name,
        "firstName": first_name,
        "lastName": last_name,
        "emailAddress": email,
        "role": role,
        "titles": []
      }
      arr.push(loggedIn);
    })
    .catch(/* istanbul ignore next */(err) => {
      console.log(err.message);
      arr.push("failed");
      arr.push(err);
    })
  return arr;
}
//Logs the user in
async function logIn(email, password) {
  //Will use to return if the the logging in is a success/failure and if it is a success then returns the user as a JSON object
  var pass = "failed";
  var JSONobj;

  const signIn = await signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      pass = "success";
      console.log('user logged in: ', cred.user.displayName)
    })
    .catch(/* istanbul ignore next */(err) => {
      console.log(err.message);
    })

  if (pass === "success") {
    //Get the user object to pass through so that we know what view to use
    const userRef = doc(db, "Users", auth.currentUser.email);

    await getDoc(userRef)
      .then((ret) => {
        //Check that the user document exists
        if (ret.data() == null) {
          console.log("User not logged in");
          return ["failed", null];
        }
        //create the json object
        JSONobj = {
          firstName: ret.data().user_first_name,
          lastName: ret.data().user_last_name,
          emailAddress: ret.data().user_email,
          role: ret.data().user_role,
          titles: ret.data().user_titles
        }
      })
      .catch(/* istanbul ignore next */err => {
        console.log(err.message);
        pass = "failed";
      })


  }
  return [pass, JSONobj];
}

//logging out
function logOut() {
  var pass = "success";;
  signOut(auth)
    .then(() => {
    })
    .catch(/* istanbul ignore next */(err) => {
      console.log(err.message);
      pass = 'failed';
    })
  return pass;
}

//Gets the user's details
async function getUserDetails() {
  //Get a user reference
  var pass = 'failed';
  var JSONobj = null;
  try {
    //Try catch to make sure that the user has logged in
    const userRef = doc(db, "Users", auth.currentUser.email);

    await getDoc(userRef)
      .then((ret) => {
        //Check that the user document exists
        if (ret.data() == null) {
          return [pass, JSONobj]

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
      .catch(/* istanbul ignore next */err => {
        console.log(err.message)
      })

    return [pass, JSONobj];
  }
  catch (e) {
    //User has not logged in
    return [pass, JSONobj];
  }

}
//Gets the usersID so that it can be used for password reset validation
async function CompareUserID(email, id) {
  var arr = [];
  const docRef = doc(db, "Users", email);


  //Gets the id value
  await getDoc(docRef)
    .then((ret) => {
      //Checks that the id exists
      if (ret.data() != null) {
        arr.push("success");
        if (id === ret.data().user_id) {
          arr.push(true);
        }
        else {
          arr.push(false);
        }
      }
      //Id does not exist
      else {
        arr.push('failed');
        arr.push('Not a valid email address');
      }

    })
    //Could not establish a connection with the database and thus failed
    .catch(/* istanbul ignore next */err => {
      arr.push('failed');
      arr.push(err);
    })
  return arr;
}

//Function that changes the user's password
function changePassword(new_password) {
  var arr = ['success'];
  //Resets the password of the currently signed in user
  updatePassword(auth.currentUser, new_password)
    .catch(/* istanbul ignore next */(error) => {
      console.log(error.message);
      arr[0] = 'failed';
      arr.push(error);
    })
  return arr;
}

//Function that will allow for most of the user's details to be changed
async function updateUserDetails(JSONobj) {
  var pass = 'failed';
  var failed_arr = [];
  const userRef = doc(db, "Users", auth.currentUser.email);


  if (JSONobj.first_name != null) {
    //User wants a first_name change
    updateDoc(userRef, {
      user_first_name: JSONobj.first_name
    })
      .catch(/* istanbul ignore next */(error) => {
        console.log(error.message);
        failed_arr.push("firstName_change")
      })
    //Update the name that will be displayed when they log in
    updateProfile(auth.currentUser, {
      displayName: JSONobj.first_name
    })
    pass = "success"
  }

  if (JSONobj.last_name != null) {
    //User wants a last_name change
    updateDoc(userRef, {
      user_last_name: JSONobj.last_name
    })
      .catch(/* istanbul ignore next */(error) => {
        console.log(error.message);
        failed_arr.push("lastName_change")
      })
    pass = "success"
  }

  if (JSONobj.phoneNumber != null) {
    //User wants a last_name change
    updateDoc(userRef, {
      user_phone: JSONobj.phoneNumber
    })
      .catch(/* istanbul ignore next */(error) => {
        console.log(error.message);
        failed_arr.push("phoneNumber_change")
      })
    pass = "success"
  }

  if (JSONobj.role != null) {
    //User wants a role change
    updateDoc(userRef, {
      user_role: JSONobj.role
    })
      .catch(/* istanbul ignore next */(error) => {
        console.log(error.message);
        failed_arr.push("role_change")
      })
    pass = "success"
  }

  if (failed_arr.length > 0) {
    return ["failed", failed_arr]
  }
  return [pass];
}

//Function to get all the questions to display on the home page
async function getAllQuestions(userJSON) {
  const colRef = collection(db, 'Questions');
  var pass = 'failed';
  let JSONarr = [];

  //Check if the user is not banned
  if (userJSON.role > -1) {
    //Get all the docs
    await getDocs(colRef)
      .then((snapshot) => {

        snapshot.docs.forEach((doc) => {
          if (doc.data() != null) {
            pass = 'success'
            if (doc.data().question_reported == 0) {
              //Then the question has not been 'removed' and should be visible
              //Create the JSON representing the question
              var date = doc.data().question_date.toDate();
              var month = date.getUTCMonth() + 1; //months from 1-12
              var day = date.getUTCDate();
              var year = date.getUTCFullYear();
              var Question = {
                "title": doc.data().question_title,
                "likes": doc.data().question_likes,
                "author": doc.data().question_user,
                "question_id": doc.id,
                "desc": doc.data().question_desc,
                "date": day + "/" + month + "/" + year,
              }
              JSONarr.push(Question);
            }

          }
          else {
            return ['failed', []];
          }

        })
      })
  }
  else {
    pass = 'success';
    JSONarr.push("User is banned");
  }

  return [pass, JSONarr];
}

//Function that will allow the user to search for a question
async function searchForQuestion(title){
  const colRef = collection(db, 'Questions');
  var pass = 'success';
  let JSONarr = [];

  //Query to get any documents that match the title that was provided
  var q = query(colRef, where("question_title", ">=", title),where("question_title", "<=", title+ '\uf8ff'));

  await getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        //Check that it didnt fetch an incorrect document
        if(doc.data() != null) {
          if (doc.data().question_reported == 0) {
            //Then the question was not reported and should be displayed
            var Question = {
              "title": doc.data().question_title,
              "likes": doc.data().question_likes,
              "author": doc.data().question_user,
              "question_id": doc.id
            }
            JSONarr.push(Question);
          }
        }
        else{
          //Fetched an incorrect document and thus should auto fail
          return ['failed',[]]
        }
      })
    })
    .catch(/* istanbul ignore next */e => {
      console.log(e);
    })

  return [pass, JSONarr];
}

//Function to create a question
async function askQuestion(title, desc, image, code) {
  const questionsRef = collection(db, "Questions");
  var pass = "success";

  //Creates a new question based on passed in parameters and predefined values
  await addDoc(questionsRef, {
    "question_user": auth.currentUser.displayName,
    "question_title": title,
    "question_desc": desc,
    "question_date": serverTimestamp(),
    "question_likes": 0,
    "question_reported": 0,
    "question_reference": auth.currentUser.email,
    "question_images": [],
    "question_code": code
  })
    .then((docRef) => {

      if (image != null) {
        //Then the user uploaded an image
        var imageRef = ref(storage, `question_images/${docRef.id}/${image.name + v4()}`); //generate the file path

        uploadBytes(imageRef, image) //upload the file
          .then(() => {
            var imageListRef = ref(storage, `question_images/${docRef.id}/`);
            const questRef = doc(db, "Questions", docRef.id)
            listAll(imageListRef).then((response) => { //Get all the images uploaded for that question
              response.items.forEach((item) => {
                getDownloadURL(item).then((url) => { //Get the urls for all those images
                  updateDoc(questRef, {
                    question_images: arrayUnion(url)
                  })
                    .catch(/* istanbul ignore next */e => {
                      pass = "failed";
                    })
                })
              })
            })



          })
      }
      // console.log("Document id = ",docRef.id); Doc id testing
    })
    .catch(/* istanbul ignore next */(e) => {
      pass = "failed"; //Used to symbolise that the creation of the question failed.
    })

  return pass;
}

//function that will help determine if the user has liked a question based on their likes
function hasLiked(question_id, arr) {
  var liked = 0;
  //Loop to go through all the user's likes
  for (let i = 0; i < arr.length; i++) {
    var entry = arr[i];
    var split = entry.split(","); //splits the like from the value
    if (split[0] === question_id) {
      liked = parseInt(split[1]);
      break;
    }
  }
  return liked;
}

//Function to handle the liking and disliking of questions
async function likeQuestion(value, question_id) {
  const questionRef = doc(db, "Questions", question_id);
  var pass = "failed";
  var failed_arr = [];
  var new_likes = 0;

  //In the case that the user has not logged in then they cant vote on a question
  try {
    const userRef = doc(db, "Users", auth.currentUser.email);

    var liked = -3.1415; //arbitrary value that will be used for comparison
    await getDoc(userRef).then(ret => {
      liked = ret.data().user_likes_questions;
      liked = hasLiked(question_id, liked);
    })
      .catch(/* istanbul ignore next */e => {
        return [pass, [e]];
      })

    if (liked == value) {
      //Then the value should not change
      return ["success", failed_arr];
    }
    else {
      //Then the value is different from what they want to change their vote to

      //Fetching the number of likes the question currently has
      var prior_likes = -1;
      await getDoc(questionRef).then((ret) => {
        prior_likes = ret.data().question_likes;
        pass = "success";
        new_likes = prior_likes;
      })
        .catch(/* istanbul ignore next */e => {
          console.log(e);
          failed_arr.push(e);
        })
    }

    //Removing the extra dis/like due to the the user's previous decision
    if (pass === 'success') {

      if (value == 0 || value <= -1 * liked) {
        //There vote is getting changed or deleted
        var concated = (question_id.concat(",", liked)).toString();
        new_likes += (-liked);

        //Removing the like from the user's list
        updateDoc(userRef, {
          user_likes_questions: arrayRemove(concated)
        })
          .catch(/* istanbul ignore next */e => {
            pass = "failed";
            failed_arr.push(e);
          })

        //Updating the likes value
        updateDoc(questionRef, {
          question_likes: new_likes
        })
          .catch(/* istanbul ignore next */e => {
            pass = "failed";
            failed_arr.push(e);
            console.log(e);
          })

      }
    }

    //Adding the actual entries to the likes after taking the necessary ones away
    if (pass === 'success') {
      //Changing the questions liked value
      updateDoc(questionRef, {
        question_likes: new_likes + value
      })
        .catch(/* istanbul ignore next */e => {
          pass = 'failed';
          failed_arr.push(e);
        })

      if (pass === "success" && value != 0) { //Dont include when the value is 0 as we dont want to add it to the user's likes as they removed their like
        //Updating the user's likes
        var concated = (question_id.concat(",", value)).toString();
        updateDoc(userRef, {
          user_likes_questions: arrayUnion(concated)
        })
          .catch(/* istanbul ignore next */e => {
            console.log(e);
            failed_arr.push(e);
          })
      }
    }

  }
  catch (e) /* istanbul ignore next */{
    failed_arr.push(e);
  }

  return [pass, failed_arr];
}

//Function that will be used to get the comments related to a response
async function getComments(response_id) {
  const colRef = collection(db, 'Comments');
  var pass = "failed";
  let JSONarr = [];

  //Make a query requesting for the correct comments
  const q = query(colRef, where("comment_response", "==", response_id));
  const commentsDocsSnap = await getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {

        if (doc.data() != null) {
          pass = 'success'
          var date = doc.data().comment_date.toDate();
          var month = date.getUTCMonth() + 1; //months from 1-12
          var day = date.getUTCDate();
          var year = date.getUTCFullYear();
          
          if (doc.data().comment_reported == 0) {
            //Then the comment was not reported and thus should be seen
            var comment = {
              "id": doc.id,
              "date": day + "/" + month + "/" + year,
              "description": doc.data().comment_desc,
              "response": doc.data().comment_response,
              "user": doc.data().comment_user,
              "code":doc.data().comment_code
            }
            JSONarr.push(comment);
          }
        }
      })
    })
  return [pass, JSONarr]
}

//Function that will get a questions responses and their comments
async function getResponses(question_id, sorting_attribute, sorting_direction, startingValue, limit_num) {
  const colRef = collection(db, 'Responses');
  var pass = 'failed';
  let JSONarr = [];
  //startingValue represents the starting value of sorting attribute i.e. when likes=startingValue
  //limit_num represents how many of the values are returned

  var q;
  //Queries the data
  if (startingValue == null) {
    q = query(colRef, where("response_question", "==", question_id), orderBy(sorting_attribute, sorting_direction), limit(limit_num));
  }
  else {
    q = query(colRef, where("response_question", "==", question_id), orderBy(sorting_attribute, sorting_direction), startAfter(startingValue), limit(limit_num));
  }

  //Will use the following to see if the user liked the response
  var user_likes = [];


  try {
    const userRef = doc(db, "Users", auth.currentUser.email);
    await getDoc(userRef).then(ret => {
      user_likes = ret.data().user_likes_responses;
    })
  }
  catch (e) /* istanbul ignore next */{
    return ["failed", "Auth token expired"]
  }

  await getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data() != null) {
          pass = 'success';
          if (doc.data().response_reported == 0) {
            //Then the response was not reported and should be displayed
            var date = doc.data().response_date.toDate();
            var month = date.getUTCMonth() + 1; //months from 1-12
            var day = date.getUTCDate();
            var year = date.getUTCFullYear();
            var response = {
              "id": doc.id,
              "date": day + "/" + month + "/" + year,
              "description": doc.data().response_desc,
              "likes": doc.data().response_likes,
              "question": doc.data().response_question,
              "mark": doc.data().response_mark,
              "user": doc.data().response_user,
              "hasComments": doc.data().response_hasComment,
              "code":doc.data().response_code
            }
            response.liked = hasLiked(doc.id, user_likes);
            if (doc.data().response_mark != 0) {
              //Then this is the correct answer and thus display it first
              JSONarr.unshift(response);
            }
            else {
              //Not the correct answer
              JSONarr.push(response)
            }
          }
        }
      })
    })
    .catch(/* istanbul ignore next */e => {
      console.log(e);
    })



  return [pass, JSONarr];

}

//Function that will return all data that would be necessary to display the question
async function getQuestionInfo(question_id) {
  //Will return if the request passed/failed and the JSON representing the question
  var pass = 'failed';
  var JSON;

  const questionRef = doc(db, "Questions", question_id);
  await getDoc(questionRef).then(ret => {
    pass = 'success'
    //Set the JSON for the question
    var date = ret.data().question_date.toDate();
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    JSON = {
      "date": day + "/" + month + "/" + year,
      "desc": ret.data().question_desc,
      "likes": ret.data().question_likes,
      "title": ret.data().question_title,
      "user_id": ret.data().question_user,
      "isQuestioner": ret.data().question_reference == auth.currentUser.email, //returns if they asked the question
      "liked": 0, //default value means that the user did not like.
      "images": ret.data().question_images,
      "code": ret.data().question_code
    }
  })


  //Function will return if the user has liked it or not, thus the try catch will be for if the user is not logged in
  try {
    const userRef = doc(db, "Users", auth.currentUser.email);
    if (pass === 'success') {
      await getDoc(userRef).then(ret => {
        var likes = ret.data().user_likes_questions;
        JSON.liked = hasLiked(question_id, likes);
      })
    }
  }
  catch (/* istanbul ignore next */e) {
    //Setting the liked value to an unnecessarily obtuse and specific value so that it can be known that the user has not logged in and thus cannot like the question
    JSON.liked = 3.1415;
    console.log(e);
  }

  return [pass, JSON];

}

//Function that will create a response to a question
async function giveResponse_or_Comment(check, id, desc,code) {
  //If check = 0 then we are making a response else we are giving a comment
  var pass = "success";
  if (check == 0) {
    const responsesRef = collection(db, "Responses");

    //Creates a new question based on passed in parameters and predefined values
    await addDoc(responsesRef, {
      "response_user": auth.currentUser.displayName,
      "response_reference": auth.currentUser.email,
      "response_desc": desc,
      "response_date": serverTimestamp(),
      "response_likes": 0,
      "response_question": id,
      "response_mark": 0,
      "response_reported": 0,
      "response_hasComment": 0,
      "response_code":code
    })
      .catch(/* istanbul ignore next */(e) => {
        pass = "failed"; //Used to symbolise that the creation of the response failed.
      })
    return pass;
  }
  else {
    const commentsRef = collection(db, "Comments");

    //Creates a new question based on passed in parameters and predefined values
    await addDoc(commentsRef, {
      "comment_user": auth.currentUser.displayName,
      "comment_reference": auth.currentUser.email,
      "comment_desc": desc,
      "comment_date": serverTimestamp(),
      "comment_response": id,
      "comment_reported": 0,
      "comment_code":code
    })
      .catch(/* istanbul ignore next */(e) => {
        pass = "failed"; //Used to symbolise that the creation of the comment failed.
      })
    
    //Updating the response to indicate that it now has a comment
    if(pass=="success"){
      updateDoc(doc(db, "Responses", id), {
        response_hasComment: 1
      })
    }
    return pass;
  }

}
//Function that will allow the user to like the response
async function likeResponse(value, response_id) {
  const responseRef = doc(db, "Responses", response_id);
  var pass = "failed";
  var failed_arr = [];
  var new_likes = 0;

  //In the case that the user has not logged in then they cant vote on a response
  try {
    const userRef = doc(db, "Users", auth.currentUser.email);

    var liked = -3.1415; //arbitrary value that will be used for comparison
    await getDoc(userRef).then(ret => {
      liked = ret.data().user_likes_responses;
      liked = hasLiked(response_id, liked);
    })
      .catch(/* istanbul ignore next */e => {
        return [pass, [e]];
      })

    if (liked == value) {
      //Then the value should not change
      return ["success", failed_arr];
    }
    else {
      //Then the value is different from what they want to change their vote to

      //Fetching the number of likes the question currently has
      var prior_likes = -1;
      await getDoc(responseRef).then((ret) => {
        prior_likes = ret.data().response_likes;
        pass = "success";
        new_likes = prior_likes;
      })
        .catch(/* istanbul ignore next */e => {
          console.log(e);
          failed_arr.push(e);
        })
    }

    //Removing the extra dis/like due to the the user's previous decision
    if (pass === 'success') {

      if (value == 0 || value <= -1 * liked) {
        //There vote is getting changed or deleted
        var concated = (response_id.concat(",", liked)).toString();
        new_likes += (-liked);

        //Removing the like from the user's list
        updateDoc(userRef, {
          user_likes_responses: arrayRemove(concated)
        })
          .catch(/* istanbul ignore next */e => {
            pass = "failed";
            failed_arr.push(e);
          })

        //Updating the likes value
        updateDoc(responseRef, {
          response_likes: new_likes
        })
          .catch(/* istanbul ignore next */e => {
            pass = "failed";
            failed_arr.push(e);
            console.log(e);
          })

      }
    }

    //Adding the actual entries to the likes after taking the necessary ones away
    if (pass === 'success') {
      //Changing the questions liked value
      updateDoc(responseRef, {
        response_likes: new_likes + value
      })
        .catch(/* istanbul ignore next */e => {
          pass = 'failed';
          failed_arr.push(e);
        })

      if (pass === "success" && value != 0) { //Dont include when the value is 0 as we dont want to add it to the user's likes as they removed their like
        //Updating the user's likes
        var concated = (response_id.concat(",", value)).toString();
        updateDoc(userRef, {
          user_likes_responses: arrayUnion(concated)
        })
          .catch(/* istanbul ignore next */e => {
            console.log(e);
            failed_arr.push(e);
          })
      }
    }

  }
  catch (e) /* istanbul ignore next */{
    failed_arr.push(e);
  }

  return [pass, failed_arr];
}


//Function that will change the state of correct or incorrect based on user input
async function changeMark(mark, response_id, JSONuser) {

  if (JSONuser.role == 1 || JSONuser.isQuestioner == true) {
    //Then they are the admin ar the question and thus can mark the question as true or false
    //Removing the like from the user's list
    const respRef = doc(db, "Responses", response_id);
    updateDoc(respRef, {
      response_mark: mark
    })
      .catch(/* istanbul ignore next */e => {
        return "failed"; //Update not done successfully
      })
    return "success";
  }
  return 'failed'; //User doesnt have permission to change the marking
}

//Function that will change the report value of a post and will rectify the user's strikes
async function changePostReportValue(table, post, value, JSONuser, report_id) {
  var pass = "failed";
  var user;
  if (JSONuser.role < 1) {
    //Then they are not an admin thus they dont have permissions to change this variable
    return pass;
  }

  if (table == 0) {
    //Then the post_id is for a question
    const questRef = doc(db, "Questions", post);
    pass = "success";

    //Get the user whose strikes we are going to change
    await getDoc(questRef).then(ret => {
      user = ret.data().question_reference;
    })


    //Updating the report value
    updateDoc(questRef, {
      question_reported: value
    })
      .catch(/* istanbul ignore next */e => {
        pass = "failed";
        console.log("Question updating failed");
      })

  }
  else if (table == 1) {
    //Then the post_id is for a response
    const respRef = doc(db, "Responses", post);
    pass = "success";

    //Get the user whose strikes we are going to change
    await getDoc(respRef).then(ret => {
      user = ret.data().response_reference;
    })

    //Updating the report value
    updateDoc(respRef, {
      response_reported: value
    })
      .catch(/* istanbul ignore next */e => {
        pass = "failed";
        console.log("Response updating failed");
      })

  }
  else if (table == 2) {
    //Then the post_id is for a comment
    const commRef = doc(db, "Comments", post);
    pass = "success";

    //Get the user whose strikes we are going to change
    await getDoc(commRef).then(ret => {
      user = ret.data().comment_reference;
    })

    //Updating the report value
    updateDoc(commRef, {
      comment_reported: value
    })
      .catch(/* istanbul ignore next */e => {
        pass = "failed";
        console.log("Comment updating failed");
      })
  }

  if (pass === "success") {
    //So the post was reported, now we need to change the user's strikes value
    const userRef = doc(db, "Users", user);
    var report_ids = [];
    if (value == 0) {
      //Then we need to remove the strike
      updateDoc(userRef, {
        user_strikes: arrayRemove(report_id)
      })

      //Check that the user was not banned
      try {
        //The user had a ban on their account
        var ban_confirmed; //Will use this to check that the user has not already been banned
        getDoc(doc(db, "Bans", user)).then((doc) => {
          report_ids = doc.data().ban_reports;
          ban_confirmed = doc.data().ban_confirmed;
        })
          .catch(/* istanbul ignore next */e => {
            return 'failed';
          })

        //Update their ban doc to no longer include that entry
        updateDoc(doc(db, "Bans", user), {
          ban_reports: arrayRemove(report_id)
        })
          .catch(/* istanbul ignore next */e => {
            return 'failed';
          })

        if (report_ids == 3) {
          //Then we need to remove their account from the banned list
          if (ban_confirmed == 1) {
            //User has been banned and will need to be unbanned
            updateDoc(userRef, {
              user_role: 0
            })
          }
          //delete their ban document
          deleteDoc(doc(db, "Bans", user));
        }
      }
      catch /* istanbul ignore next */(e) {
        //User did not have a ban on their account
      }

    }
    else {
      //Then we need to add the strike
      updateDoc(userRef, {
        user_strikes: arrayUnion(report_id)
      })

      //Check if the user needs to be considered for a ban
      await getDoc(userRef).then((doc) => {
        report_ids = doc.data().user_strikes;
      })
      if (report_ids.length > 2) {
        //Then the user needs to be considered for a ban

        //Create the ban request for the user
        setDoc(doc(db, "Bans", user), {
          ban_user: user,
          ban_reports: report_ids,
          ban_date: serverTimestamp(),
          ban_confirmed: 0
        })
          .catch(/* istanbul ignore next */e => {
            pass = 'failed';
          })
      }
    }
  }

  return pass;
}

//Function that will generate a report
async function createReport(question_id, response_id) {
  var pass = 'success';
  var offender;
  var offence;
  const reportColRef = collection(db, "Reports");//Reference to where to add the report
  if (response_id == null) {
    //Then we are reporting a question

    //Getting the user who wrote the question
    const reportUserRef = doc(db, "Questions", question_id);
    await getDoc(reportUserRef).then((doc) => {
      offender = doc.data().question_reference; //Gets the person who commited the offence
      offence = doc.data().question_desc; //Gets the description which would be the offence
    })
      .catch(/* istanbul ignore next */e => {
        pass = 'failed';
        console.log("Couldnt get question doc");
      })
  }
  else {
    //Then we are reporting a response

    //Getting the user who wrote the question
    const reportUserRef = doc(db, "Responses", response_id);
    await getDoc(reportUserRef).then((doc) => {
      offender = doc.data().response_reference; //Gets the person who commited the offence
      offence = doc.data().response_desc;
      question_id = doc.data().response_question
    })
      .catch(/* istanbul ignore next */e => {
        pass = 'failed';
        console.log("Couldnt get report doc")
      })
  }
  if (pass == 'success') {
    //Adding the document
    //The report reason will be filled in when the admin changes the report value
    await addDoc(reportColRef, {
      report_culprit: offender,
      report_offence: offence,
      report_reporter: auth.currentUser.email,
      report_date: serverTimestamp(),
      report_question: question_id,
      report_response: response_id,
      report_solved: 0,
      report_reason: null
    })
      .catch(/* istanbul ignore next */e => {
        pass = 'failed';
      })
  }

  return pass;
}

//Function that will return all the reports that have not been solved yet
async function getAllReports() {
  const colRef = collection(db, 'Reports');
  var pass = 'failed';
  let JSONarr = [];

  //Get all the docs
  await getDocs(colRef)
    .then((snapshot) => {

      snapshot.docs.forEach((doc) => {
        if (doc.data() != null) {
          pass = 'success'
          if (doc.data().report_solved == 0) {
            //Then the report has not been dealt with and should be visible

            //Create the JSON representing the question
            var Report = {
              id: doc.id,
              date: doc.data().report_date.toDate().toString(),
              offence: doc.data().report_offence,
              question_id: doc.data().report_question,
              response_id: doc.data().report_response
            }
            JSONarr.push(Report);
          }

        }
        else {
          return ['failed', []];
        }

      })
    })
  return [pass, JSONarr];
}

//Function that will display allow the report to be displayed in a nice manner
async function displayReport(reportJSON) {
  var pass = 'failed';
  var JSONarr = []; //will push the JSONs of the question and the report to here
  var JSON;
  const questionRef = doc(db, "Questions", reportJSON.question_id); //Going to get the necessary details do display the question
  await getDoc(questionRef).then(ret => {
    pass = 'success';
    //Set the JSON for the question
    var date = ret.data().question_date.toDate();
    var month = date.getUTCMonth() + 1; //months from 1-12
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    JSON = {
      "date": day + "/" + month + "/" + year,
      "desc": ret.data().question_desc,
      "title": ret.data().question_title,
      "user_id": ret.data().question_user,
      "images": ret.data().question_images,
      "user_reference": ret.data().question_reference,
      "code":ret.data().question_code
    }
    JSONarr.push(JSON);
  })
    .catch(/* istanbul ignore next */e => {
      pass = 'failed';
      console.log("Question ref failed");
    })

  if (reportJSON.response_id != null && pass == 'success') {
    //Then the actual report was far the response
    const responseRef = doc(db, "Responses", reportJSON.response_id); //Going to get the necessary details do display the question
    await getDoc(responseRef).then(ret => {
      pass = 'success';
      //Set the JSON for the response
      var date = ret.data().response_date.toDate();
      var month = date.getUTCMonth() + 1; //months from 1-12
      var day = date.getUTCDate();
      var year = date.getUTCFullYear();
      var JSON = {
        "date": day + "/" + month + "/" + year,
        "desc": ret.data().response_desc,
        "user_id": ret.data().response_user,
        "user_reference": ret.data().response_reference,
        "code":ret.data().response_code
      }
      JSONarr.push(JSON);
    })
      .catch(/* istanbul ignore next */e => {
        pass = 'failed';
        console.log("Response ref failed");
      })
  }
  return [pass, JSONarr]
}

//Function that will close the report
async function changeReportStatus(report_id, value, reason) {
  const repRef = doc(db, "Reports", report_id);
  updateDoc(repRef, {
    report_solved: value,
    report_reason: reason,
    report_closer: auth.currentUser.email
  })
    .catch(/* istanbul ignore next */e => {
      return "failed"; //Update not done successfully
    })
  return "success";
}

//Function that will ban a user
async function banUser(ban_id, user_id, reason) {
  var pass = 'success';
  const userRef = doc(db, "Users", user_id);
  const banRef = doc(db, "Bans", ban_id);

  //Update their role to reflect that they are banned
  updateDoc(userRef, {
    user_role: -1
  })
    .catch(/* istanbul ignore next */e => {
      pass = 'failed';
    })

  if (pass == 'success') {
    //Then update the banned doc to signal that the request has been closed
    updateDoc(banRef, {
      ban_confirmed: 1,
      ban_closer: auth.currentUser.email,
      ban_reason: reason
    })
      .catch(/* istanbul ignore next */e => {
        pass = 'failed';
      })
  }
  return pass
}

//Function that will display all bans
async function getAllBans() {
  const colRef = collection(db, 'Bans');
  var pass = 'failed';
  let JSONarr = [];

  //Get all the docs
  await getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data() != null) {
          pass = 'success'
          if (doc.data().ban_confirmed == 0) {
            //Then the ban has not been considered and should be visible
            //Create the JSON representing the ban
            var date = doc.data().ban_date.toDate();
            var month = date.getUTCMonth() + 1; //months from 1-12
            var day = date.getUTCDate();
            var year = date.getUTCFullYear();
            var Ban = {
              "user": doc.data().ban_user,
              "date": day + "/" + month + "/" + year,
              "ban_id": doc.id
            }
            JSONarr.push(Ban);
          }

        }
        else {
          return ['failed', []];
        }

      })
    })

  return [pass, JSONarr];
}

//Function to get a single ban and the reasons associated with it
async function getBan(ban_id) {
  var pass = 'failed';
  var JSON;
  const banRef = doc(db, "Bans", ban_id);

  //Variables that will store the necessary items to have access to the ban
  var ban_user;
  var ban_date;
  var ban_reports;
  //Get the ban doc
  await getDoc(banRef).then((doc) => {
    ban_user = doc.data().ban_user;
    ban_date = doc.data().ban_date.toDate();
    ban_reports = doc.data().ban_reports;
    pass = 'success';
  })
    .catch(/* istanbul ignore next */e => {
      return [pass, JSON];
    })

  //Iterate over all the reports so that we get the reason for the report
  for (let i = 0; i < ban_reports.length; i++) {
    var reportRef = doc(db, "Reports", ban_reports[i]);
    await getDoc(reportRef).then((doc) => {
      ban_reports[i] = doc.data().report_reason;
    })
      .catch(/* istanbul ignore next */e => {
        return ['failed', JSON];
      })
  }
  //Create the JSON of the ban

  var month = ban_date.getUTCMonth() + 1; //months from 1-12
  var day = ban_date.getUTCDate();
  var year = ban_date.getUTCFullYear();

  JSON = {
    user: ban_user,
    date: day + "/" + month + "/" + year,
    reasons: ban_reports
  }
  return [pass, JSON];
}

//Function that will send the user a password reset email
async function resetPassword(email){
  var pass = 'failed';
  await sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    pass="success";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  console.log(email);
  return pass;
}

//subscribing to auth changes
onAuthStateChanged(auth, (user) => {
  console.log('user status changed: ', user)
  if (user != null) {
    uid_setUser(user.uid); //set user variable on user change
  } else {
    setUser(null);
  }
})

//Exports all the functions
export {
  register, logIn, logOut, getUserDetails, CompareUserID, changePassword, updateUserDetails,
  getAllQuestions, askQuestion, likeQuestion, getQuestionInfo,searchForQuestion,
  giveResponse_or_Comment, getResponses, getComments, changeMark, likeResponse,
  changePostReportValue, createReport, getAllReports, displayReport, changeReportStatus,
  banUser, getAllBans, getBan,resetPassword
}
