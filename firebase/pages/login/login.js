import { signInWithEmailAndPassword, auth, getAuth } from "../../firebaseConfig.js";

let emailInp = document.getElementById("email-inp");
let passwordInp = document.getElementById("password-inp");
let form = document.querySelector(".form");

// form validation
let formValidation = () => {
    if (emailInp.value.length < 1 || passwordInp.value.length < 1) {
        console.error(new Error("all fields must be failed!"));
        // alert("all fields must be failed!");
        return false;
    }
    
    return true;
}
// console.log(formValidation());

let loginUser = async () => {
    try {
        if (!formValidation()) {
            console.error(new Error("user account cannot be created"));
            // alert("user account cannot be created!");
            return;
        }    
            // user login request
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, emailInp.value, passwordInp.value)
              .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('login successfull!');
                console.log('user credential: ' ,user);
                // alert('user login successfully');
                // let userUid = JSON.stringify(user.uid);
                // Window.localStorage.setItem("uid",userUid);

                window.localStorage.setItem('uid', JSON.stringify(user.uid));
                window.location.replace('../dashbord/dashbord.html');   // window.location.replace('/Login-Form/pages/dashbord/dashbord.html');                
              });
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener("submit",(e) => {
    e.preventDefault();
    loginUser();
});



//GSAP ANIMATION
gsap.from('.container',{
    delay: 1,
    duration: 2,
    scale: 0,
    rotate: 360,   
});
