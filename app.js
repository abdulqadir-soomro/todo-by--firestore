
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";

import { getFirestore , collection, addDoc, getDocs, doc, deleteDoc,updateDoc} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js"


const firebaseConfig = {
  apiKey: "AIzaSyCqasf-D5xuoGNAuP0XwcVl4NqWyztnEqs",
  authDomain: "todos-app-7c966.firebaseapp.com",
  projectId: "todos-app-7c966",
  storageBucket: "todos-app-7c966.firebasestorage.app",
  messagingSenderId: "943208535521",
  appId: "1:943208535521:web:7749e2d526fac20cbb6ea0"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const todosCollection = collection(db, "todos");



async function addTodo() {
    let todo = document.getElementById("todo-input").value;
    document.getElementById("todos-list").innerHTML = "";
    try {
        const docRef= await addDoc(todosCollection,{
            id: new Date().getTime(),
            Task:todo
        
        })
        getTodos();
        console.log("Document written with ID: ", docRef.id);
        document.getElementById("todo-input").value = "";
       
        
    } catch (error) {
        console.error("Error adding document: ", error);
        
    }

}

document.getElementById("add-button").addEventListener("click", addTodo);




// async function getTodos() {

//     const querySnapshot = await getDocs(todosCollection);
//     querySnapshot.forEach((doc) => {
//         let todo = doc.data();
//         let todoElement = document.createElement("li");
//         todoElement.innerHTML = `id:${todo.id} ==>Task:${todo.Task} `;
//         document.getElementById("todos-list").appendChild(todoElement);
//     });
// }


// getTodos();


async function deleteTodo(docId) {
    try {
        await deleteDoc(doc(db, "todos", docId));
        console.log("Todo deleted with ID:", docId);
        getTodos(); // Refresh UI
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}

// Function to update a todo
async function updateTodo(docId, oldTask) {
    let newTask = prompt("Update Task:", oldTask);
    if (newTask === null || newTask.trim() === "") return; // Cancel update if empty

    try {
        const todoRef = doc(db, "todos", docId);
        await updateDoc(todoRef, { Task: newTask });
        console.log("Todo updated:", docId);
        getTodos(); // Refresh UI
    } catch (error) {
        console.error("Error updating todo:", error);
    }
}

// Function to fetch and display todos
async function getTodos() {
    document.getElementById("todos-list").innerHTML = ""; // Clear list before updating
    const querySnapshot = await getDocs(todosCollection);

    querySnapshot.forEach((doc) => {
        let todo = doc.data();
        let todoElement = document.createElement("li");
        todoElement.innerHTML = `
            Task: ${todo.Task} 
            <button onclick=" updateTodo('${doc.id}', '${todo.Task}')">Edit</button>
            <button onclick=" deleteTodo('${doc.id}')">Delete</button>
        `;
        document.getElementById("todos-list").appendChild(todoElement);

    });

}

document.getElementById("add-button").addEventListener("click", addTodo);


window.deleteTodo = deleteTodo;
window.updateTodo = updateTodo;

getTodos();



