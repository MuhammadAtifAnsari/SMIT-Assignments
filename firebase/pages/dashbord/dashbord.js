import { getAuth, signOut, auth, deleteUser, deleteDoc, doc, query, where, collection, getDocs, db, addDoc } from "../../firebaseConfig.js";

let signOutBtn = document.getElementById('signout-btn');
let deleteBtn = document.getElementById('delete-btn');
let postInp = document.querySelector('#post-inp');
let postBtn = document.querySelector('#post-btn');
let showPosts = document.querySelector('.show-posts')
let userId;
let currentUserData;
let posts = [];


// get user id from local storage
let getUserDataFromLocalStorage = () => {
    userId = JSON.parse(window.localStorage.getItem('uid'));
    console.log('uid => ', userId);
    
}
getUserDataFromLocalStorage();


// user signout
let userSignOut = async () => {
    try {
        const auth = getAuth();
        await signOut(auth).then(() => {
          // Sign-out successful.
          console.log('Sign-out successful.');
        //   window.location.href = '../../../index.html';
          window.location.replace('../../index.html');  
        })
    } catch (error) {
        console.log(error);
    }
}

signOutBtn.addEventListener('click', () => userSignOut());


// delete user account
let userDelete = async () => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        await deleteUser(user).then(() => {
          // User deleted.
          console.log('user deleted!');
          userDeleteFromDb().then(() => {
            window.location.replace('../../index.html');
        })
        // window.location.replace('/Login-Form/index.html');
        })
    } catch (error) {
        console.log('user delete error =>', error);
    }
}


// delete user-data from database
let userDeleteFromDb = async () => {
    try {
        await deleteDoc(doc(db, "users", currentUserData.id));
        console.log('successfully delete user-data from database');
        
    } catch (error) {
        console.error(new Error('error in deleting user from db'));
        console.error(error);
    }
}


// get user-data from database
let getUserDataFromDb = async () => {
    try {
        const q = query(collection(db, "users"), 
        where("uid", "==", userId));  // condition like if-else
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            currentUserData = {       // obj
                id:doc.id,
                ...doc.data()
            }
        });
        
    } catch (error) {
        console.error(new Error('error in getting user data from db'));
        console.error(error);
    }
}

getUserDataFromDb().then(() => {
    console.log('current user data => ', currentUserData);
})

// POSTS SECTION

// create post
let createPost = async () => {
    try {
        if(postInp.value.length < 1) {
            console.log('please fill a post input!');
            alert('please fill a post input!');
            return;
        }

        let newDate = new Date();
        let newPostData = {
            text: postInp.value,
            uid: userId,
            post_id: newDate.getTime(), 
        }

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "posts"), newPostData);
        console.log("post successfully add with doc_id: ", docRef.id);
        posts = [
            ...posts,
            {
                id: docRef.id,
                ...newPostData,
            }
        ]

    } catch (error) {
        console.error(new Error('error in crate post!'));
        console.error(error);
    }
}

postBtn.addEventListener('click', () => createPost());


// read post with query (condition)
let readPostWithQuery = async () => {
    try {
        const q = query(collection(db, "posts"), 
        where("uid", "==", userId));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          posts = [
            ...posts,                    // array spread
            {                            // obj
                id: doc.id,    
                ...doc.data(),
            }
          ]
        });

        console.log(posts);
        
    } catch (error) {
        console.error(new Error('error in read post with query!'));
        console.error(error);
    }
}
 
readPostWithQuery()




//PENDING |

// render post
let renderPost = () => {
    showPosts.innerHTML = ``;

    if (posts.length < 1) {
        showPosts.innerHTML = `<h2>No Posts Yet!</h2>`
        return
    }

    posts.map((post) => {
        let postCard = document.createElement("div");
        postCard.className = "post-card";
        postCard.innerHTML = `
        <div>
            <input type="text" id="${post?.id}" value="${post?.text}" disabled />
        </div>
        
        
        `
    })
}
















deleteBtn.addEventListener('click', () => userDelete());



// GSAP ANIMATION
gsap.from('h1',{
    opacity: 0,
    delay: 1,
    duration: 2,
    y: -30,
});

gsap.from('#signout-btn',{
    opacity: 0,
    delay: 2,
    duration: 2,
    y: -30,
});

gsap.from('#delete-btn',{
    opacity: 0,
    delay: 3,
    duration: 2,
    y: -30,
});
