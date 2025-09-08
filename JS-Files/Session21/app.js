


const taskinput = document.getElementById("task-input");
const dateinput = document.getElementById("date-input");
const addbutton = document.getElementById("add-button");
const editbutton = document.getElementById("edit-button");
const alertmessage = document.getElementById("alert-message");
const todosbody = document.querySelector("tbody");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllbutton = document.getElementById("delete-all-button");
const filterbutton = document.querySelectorAll(".filter-todos")
   
const saveToLocalStorage = () => {
    localStorage.setItem("todos",JSON.stringify(todos));
} 


const generateId = ()=>
{
return Math.round(Math.random() * Math.random() * Math.pow(10,15)).toString();
};
generateId();





const showalert = (message, type) =>
{
alertmessage.innerHTML = "";
const alert = document.createElement("p");
alert.innerText = message;
alert.classList.add("alert");
alert.classList.add(`alert-${type}`);
alertmessage.append(alert);
setTimeout(() => {
    alert.style.display = "none";
}, 2000);

};





const displaytodos = (data) => 

{
    const todolist = data || todos;
    todosbody.innerHTML = "";

    console.log(todolist);  
    if(!todolist.length)
    {
        todosbody.innerHTML = "<tr><td colspan= '4'>No Task Found!</td></tr>";
        return;
    }




    todolist.forEach(todo => {
        todosbody.innerHTML = todosbody.innerHTML += `
        <tr>
         <td>${todo.task}</td>
         <td>${todo.date || "No Date" }</td>
         <td>${todo.compeleted ? "completed": "pending"}</td>
         <td>
         <button onclick = "editHandeler('${todo.id}')">Edit</button>
         <button onclick = "toggleHandeler('${todo.id}')">
         ${todo.compeleted ? "Undo" : "Do" }
         </button>
         <button onclick = "deleteHandeler('${todo.id}')">Delete</button>

         </td>
        </tr>
        `;
    });
};

displaytodos();


todosbody.innerHTML = ""; 

 
const addhandeler  = () =>{
    const task = taskinput.value;
    const date = dateinput.value;
    const todo = {
        id: generateId(),
        compeleted :false,
        task,
        date,
    };

    if(task)
    {
        todos.push(todo);
        saveToLocalStorage();
        displaytodos();
        taskinput.value = "";
        dateinput.value = "";
        console.log(todos);
        showalert("Todo added successfully","success")
    }
    else
    {
        showalert("Please Enter a todo!","error");
    }0``
};


displaytodos();


const deleteallhandeler = () =>
{
    if (todos.length)
    {
     todos = []; 
     saveToLocalStorage();
     displaytodos();  
     showalert("All todos Cleared Successfully","success");
    }
    else
    {
     showalert("no todos to clear","error");
    }
    
}


const deleteHandeler = (id)=>
{
    const newTodos = todos.filter(todo => todo.id !== id);
    todos = newTodos;
    saveToLocalStorage();
    displaytodos();
    showalert("Todo deleted succesfully","success");
}



const toggleHandeler = (id) => {
    /*const newtodos = todos.map((todo) => {
        if (todo.id === id){
            return{
                ...todo,
                compeleted : !todo.compeleted,
            }
        }
        else 
        {
            return todo;

        }
    });
    todos = newtodos;*/

    const todo = todos.find((todo) => todo.id === id);
    todo.compeleted = !todo.compeleted;
    console.log(todo)

    saveToLocalStorage();
    displaytodos();
    showalert("Todo Status Changed successfully","success");
};


const editHandeler = id => {
    const todo = todos.find(todo => todo.id === id);
    taskinput.value = todo.task;
    dateinput.value = todo.date;
    addbutton.style.display = "none";
    editbutton.style.display = "inLine-block";
    editbutton.dataset.id = id;
}

const applyEditHandeler = (event) => {
    const id = event.target.dataset.id;
    const todo = todos.find((todo) => todo.id === id);
    todo.task = taskinput.value;
    todo.daate = dateinput.value;
    taskinput.value = "";
    dateinput.value = "";
    addbutton.style.display = "inLine-block";
    editbutton.style.display = "none";
    saveToLocalStorage();
    displaytodos();
    showalert("todo edited successfully","success")
};

const filterHandeler = event =>
{
    let filteredtodos = null;
    const filter = event.target.dataset.filter;
    switch(filter)
    {
        case "pending":
        filteredtodos = todos.filter(todo => todo.compeleted === false);
        break;

        case "Completed":
        filteredtodos = todos.filter(todo => todo.compeleted === true);
        break;

        default: 
        filteredtodos = todos;
        break;
    }
    displaytodos(filteredtodos);

}


window.addEventListener("Load",()=> displaytodos());
addbutton.addEventListener("click",addhandeler);
deleteAllbutton.addEventListener("click",deleteallhandeler);
editbutton.addEventListener("click",applyEditHandeler)
filterbutton.forEach((button) => {
    button.addEventListener("click",filterHandeler)
});
