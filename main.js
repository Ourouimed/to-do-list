const Form = document.querySelector(".task-input"),
    taskInp = document.querySelector(".task-input > input"),
    addTask = document.querySelector("#add-task"),
    taskLen = document.querySelector("#task-len"),
    taskList = document.querySelector(".tasks-list");


// Save tasks To local storage
const SaveTasks = ()=>{
    localStorage.setItem("task-list" , JSON.stringify(taskList.innerHTML))
}

// Checked Task
const CompletedTask = (tasks)=>{
    tasks.forEach(compTask =>{
    compTask.addEventListener("input" , ()=>{
        compTask.parentElement.classList.toggle("checked")
        SaveTasks()
        Uncompleted()
    })
})
}


// Uncompleted Tasks 
const Uncompleted = ()=>{
    let All =document.querySelectorAll(".task")
    s = 0
    All.forEach(el =>{
        if(!el.classList.contains("checked")){
            s++
        }
    })
    taskLen.innerHTML = s
}




// Create Task
const CreateTask = ()=>{
    let Task = document.createElement("li")
    Task.className = "task"
    Task.innerHTML = `
            <input type="checkbox">
            <label id="task-check">
                <ion-icon name="checkmark-outline" role="img" class="md hydrated"></ion-icon>
            </label>
            <label id="task-text">${taskInp.value.trim()}</label>
            <div class="action-btns">
                <button id="update-task">
                    <ion-icon id="update-icon" name="create-outline" role="img" class="md hydrated"></ion-icon>
                </button>
                <button id="remove-task">
                    <ion-icon id="remove-icon" name="trash-outline" role="img" class="md hydrated"></ion-icon>
                </button>
            </div>
    `
    taskList.append(Task)
    let AllTasks = document.querySelectorAll(".task")
    AllTasks.forEach((taskItem , index) =>{
        let CheckInput = taskItem.querySelector(`input[type="checkbox"]`)
        let CheckIcon = taskItem.querySelector(`#task-check`)
        let CheckText = taskItem.querySelector(`#task-text`)
        CheckInput.id = `complete-task${index}`
        CheckIcon.setAttribute("for" , CheckInput.id)
        CheckText.setAttribute("for" , CheckInput.id)
        let Checkinp = taskItem.querySelectorAll(`input[type="checkbox"]`)
        CompletedTask(Checkinp)
    })
    SaveTasks()
    addTask.innerHTML = "Add Task"
    Uncompleted()
}



Form.addEventListener("submit" , e=>{
    e.preventDefault()
    if(taskInp.value.trim() != ""){
        CreateTask()
        taskInp.value = ""
    }
    else {
        alert("Please add your task")
    }
})

// Remove Task
const RemoveTask = (item)=>{
    item.remove()
    Uncompleted()
}

// Update Task
const UpdateTask = (item)=>{
    if(taskInp.value.trim() == ""){
        item.remove()
        taskInp.value = item.children[2].innerHTML
        addTask.innerHTML = "Update Task"
        Uncompleted()
    }
    else {
        alert("Please Add Task First")
    }
}

taskList.addEventListener("click" , (e)=>{
    let Parent = e.target.parentElement.parentElement.parentElement
    if(e.target.id == "remove-icon"){RemoveTask(Parent)}
    else if(e.target.id == "update-icon"){UpdateTask(Parent)}
    SaveTasks()
})

taskList.innerHTML = JSON.parse(localStorage.getItem("task-list"))
let CompletedTasks = document.querySelectorAll(`input[type="checkbox"]`)
CompletedTask(CompletedTasks)
Uncompleted()