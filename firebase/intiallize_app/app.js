import { collection, addDoc, db, getFirestore,  doc, setDoc, getDocs, deleteDoc } from "./firebaseConfig.js";

let users = [];
let input = document.getElementById("user");
let add_btn = document.getElementById("add");
let upd_btn = document.getElementById("upd");
let usersDiv = document.querySelector("#users-div");
let editUsers ;





// ADD DATA:
add_btn.addEventListener('click', async() => {
  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "users"), {
    username: input.value,
});
console.log("Document written with ID: ", docRef.id);
} catch (error) {
    console.error(error);
  }
});


// READ DATA:

let readData = async() => {
  try {
    users = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`); 
    // console.log(doc.id, '=>', doc.data());   // alternative method oper wale ka.
    users.push({
      uid: doc.id,
      ...doc.data(),
    })
  })

  console.log('users => ', users);
  
  
} catch (error) {
  console.error(error);
}
};

readData().then(() => {
  renderData();
});

// RENDER DATA:

let renderData = () => {
  usersDiv.innerHTML = '';
  users.map((user) => {

    let userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.id = user.uid;
    userCard.innerHTML = `
    <h2>${user.username}</h2>
    <button class='user-edit-btn'>edit</button>
    <button class='user-delete-btn'>delete</button>
    `;

    userCard.querySelector('.user-edit-btn').addEventListener('click', () => editData(user.uid));
    userCard.querySelector('.user-delete-btn').addEventListener('click', () => deleteData(user.uid));
    
    // USERCARD APPEND ON USERSDIV:
    usersDiv.appendChild(userCard);
  })
}

// DELETE DATA:

let deleteData = async(uid) => {
  try {
    await deleteDoc(doc(db, "users", uid));
    console.log('user deleted!');
  } catch (error) {
    console.error(error);
  }
}