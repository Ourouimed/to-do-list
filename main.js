let InputField = document.querySelector(".to-do-inputs .input-field input"),
    TasksList = document.querySelector(".to-do-tasks"),
    addTask = document.querySelector("#addTask"),
    form = document.querySelector('.input-field'),
    TasksCount = document.querySelector("#tasks-count")
 


function addTaskFunc(){
        // create Task Value
        let taskValue = document.createElement("span")
        taskValue.className = "taskValue"
        taskValue.innerHTML = InputField.value
        // create circle 
        let Cirle = document.createElement("span")
        Cirle.className = "circle"
        // Create Task info 
        let TaskInfo = document.createElement("div")
        TaskInfo.className = "task-info"
        TaskInfo.appendChild(Cirle)
        TaskInfo.appendChild(taskValue)

        // create Delete Task btn
        let deleteTaskBtn = document.createElement("button")
        deleteTaskBtn.setAttribute("id" , "deleteTask")

        // Create Task 
        let task = document.createElement("div")
        task.className = "task"
        task.append(TaskInfo)
        task.append(deleteTaskBtn)
        TasksList.appendChild(task)

        // Apend Tasks
        let tasksData = TasksList.innerHTML

        // Save in localstorage
        localStorage.setItem("tasks-data" , tasksData)

        // tasks count
        TasksCount.innerText = `You have (${TasksList.children.length - TasksList.getElementsByClassName("checked").length}) tasks to do`
        InputField.value = "" 
    }

addTask.addEventListener("click" , ()=>{
    if(InputField.value === ""){
        alert("Please fill the Input")
    }
    else {
        addTaskFunc()
    }
})

form.addEventListener('submit', (event)=>{
    event.preventDefault(); 
    if(InputField.value === ""){
        alert("Please fill the Input")
    }
    else {
        addTaskFunc()
    }
}); 

// Delete Task
TasksList.addEventListener("click" , (e)=>{
    if(e.target.id === 'deleteTask'){
        e.target.parentElement.remove()
        let tasksData = TasksList.innerHTML
        localStorage.setItem("tasks-data" , tasksData)
        TasksCount.innerText = `You have (${TasksList.children.length - TasksList.getElementsByClassName("checked").length}) tasks to do`
    }
    else if(e.target.classList.contains("taskValue") || e.target.classList.contains("circle")){
        e.target.parentElement.parentElement.classList.toggle("checked")
        let tasksData = TasksList.innerHTML
        localStorage.setItem("tasks-data" , tasksData)
        TasksCount.innerText = `You have (${TasksList.children.length - TasksList.getElementsByClassName("checked").length}) tasks to do`
    }
})

//local Storage
let getTasksData = localStorage.getItem("tasks-data")
TasksList.innerHTML = getTasksData

console.log(TasksList.children.length - TasksList.getElementsByClassName("checked").length)
TasksCount.innerText = `You have (${TasksList.children.length - TasksList.getElementsByClassName("checked").length}) tasks to do`
