//select dom elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

//get already saved todos
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveToDos(){
    localStorage.setItem('todos',JSON.stringify(todos));
}

//create dom node for a todo object and append it to the list
function createToDoNode(todo,index){
    const li = document.createElement('li');

    //completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.margin = '0px 0';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () =>{
        todo.completed = checkbox.checked;

        //strike through when completed
        textSpan.style.textDecoration = todo.completed?'line-through' : "";

        saveToDos();
    })

    //text of the todo 
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '5px 5px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }


    //double click to edit
    textSpan.addEventListener("dblclick", () =>{
        const newText = prompt('edit text', todo.text);
        if (newText !== null){
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveToDos();
        }
    })

    //delete todo
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click',()=>{
        todos.splice(index,1);
        render();
        saveToDos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;

}
//render the todo list from todo array
function render(){
    list.innerHTML = '';

    //recreate each item
    todos.forEach((todo, index) => {
        const node = createToDoNode(todo,index);
        console.log(node,todo);
        list.appendChild(node);
    });
}

function addTodo(){
    const text = input.value.trim();
    if (!text){
        return
    }

    //push new todo object
    todos.push({text: text, completed:false});
    input.value = "";
    render()
    saveToDos()

}

addBtn.addEventListener("click",addTodo);
input.addEventListener('keydown',(e)=>{
    if (e.key == 'Enter'){
        addTodo();
    }
})
render();


