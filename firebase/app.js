import { addDoc, auth, collection, createUserWithEmailAndPassword, db } from './firebaseConfig.js';

let emailInp = document.getElementById("email-inp");
let passwordInp = document.getElementById("password-inp");
let registerForm = document.getElementById("register-form");

let formValidation = () => {
    if (emailInp.value.length < 1 || passwordInp.value.length < 1) {
        console.error(new Error("all fields must be failed!")); // alert("all fields must be failed!");
        return false;
    }

    return true;
}


// ADD USER-DATA IN DATABASE
let addUserDataInDb = async (user) => {
    try {
        console.log(user);
        
        let userData = {
            uid: user?.uid,
            displayName: user?.displayName,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
        }
        
        const docRef = await addDoc(collection(db, "users"), userData)
        .then(() => { 
            // console.log("Document written with ID: ", docRef.id);
            console.log('user stored in db');
            window.localStorage.setItem('uid', JSON.stringify(userData.uid))
            
        })
    } catch (error) {
        console.error(new Error('error in adding user to db'));
        console.error(error);
    }
}
// console.log(addUserDataInDb(true));


// CREATE USER
let loginUser = async() => {
    try {

        if (!formValidation) {
            console.error(new Error("user account cannot be created"));
            return;
        }

        if (emailInp.value < 1 || passwordInp.value < 1) {
            alert('please filled all inputs fields!');
        }

        await createUserWithEmailAndPassword(auth, emailInp.value, passwordInp.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log('account login');
            console.log('userCredential => ',user);
            // alert('account login');

            addUserDataInDb(user).then(() => window.location.replace('./pages/dashbord/dashbord.html'))
            // window.location.replace('/Login-Form/pages/dashbord/dashbord.html');

        })
    } catch (error) {
        console.error(error);
    }
}

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginUser();
})
