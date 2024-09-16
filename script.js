//variables for the list elements
const lists = document.querySelectorAll("#task-list, #doing, #completed");
const todo = document.getElementById("task-list");
const doing = document.getElementById("doing");
const done = document.getElementById("completed");

//variables for the modal
const modal = document.getElementById("task-modal");
const addOption = document.getElementById("trigger-modal");
const submit = document.getElementById("submitBtn");
const closeModal = document.getElementById("close-modal");
const modalTask = document.getElementById("modal-input");
const modalTaskPriority = document.getElementById("priority-list");
const modalTaskStatus = document.getElementById("status");

//variables for the add and delete buttons
const deleteTask = document.querySelector(".delete");
const addBtn = document.getElementById("addBtn")

//variables for the created task elements
let taskItems = [];

// array for storing the task data
let taskStorage = [];

// function to store and retrieve taskStorage in local storage
function storeTasksInLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskStorage));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks"));
}

// function that takes the modal input and stores it to the taskStorage array
function storeModalInput() {
    taskObject = {
        task: modalTask.value,
        priority: modalTaskPriority.value,
        status: modalTaskStatus.value
    }
    taskStorage.push(taskObject);
    storeTasksInLocalStorage();
}

// function that takes the dropdown selection and stores it to the taskStorage array
function storeDropdownSelection(event) {
    taskObject = {
        task: event.value,
        priority: "",
        status: ""
    }
    if (taskObject.status === "" || taskObject.priority === "") {
        taskObject.status = "todo";
        taskObject.priority = "low";
    }
    taskStorage.push(taskObject);
    storeTasksInLocalStorage();
}

//function that shows the modal
function showModal() {
    modal.style.display = "block";
}

// function that creates dropdowns from the options provided
function createDropdown(options, id) {
    const dropdown = document.createElement("select");
    dropdown.id = id;
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.text;
        dropdown.appendChild(opt);
    });
    return dropdown;
}

// function that creates a task given a task name status and priority
function createTask(task, status, priority) {
    const newTask = document.createElement("li");
    newTask.textContent = task;
    newTask.style.color = "#333";
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete");

    const priorityOptions = [
        { value: "high", text: "High" },
        { value: "medium", text: "Medium" },
        { value: "low", text: "Low" }
    ];

    const statusOptions = [
        { value: "todo", text: "To Do" },
        { value: "doing", text: "Doing" },
        { value: "done", text: "Done" }
    ];

    const statusEl = createDropdown(statusOptions, "task-status");
    const priorityEl = createDropdown(priorityOptions, "task-priority");

    // Set the selected value for status and priority
    statusEl.value = status;
    priorityEl.value = priority;

    newTask.appendChild(statusEl);
    newTask.appendChild(priorityEl);
    newTask.appendChild(deleteBtn);
    newTask.setAttribute("data-id", task);

    if (priority === "high") {
        newTask.style.backgroundColor = "red";
    } else if (priority === "medium") {
        newTask.style.backgroundColor = "yellow";
    } else if (priority === "low") {
        newTask.style.backgroundColor = "lime";
    }

    if (status === "todo") {
        todo.appendChild(newTask);
    } else if (status === "doing") {
        doing.appendChild(newTask);
    } else if (status === "done") {
        done.appendChild(newTask);
    }

    taskItems.push(newTask);
}

// function that renders the tasks from the objects in the taskStorage array
function renderTasks() {
    todo.innerHTML = "";
    doing.innerHTML = "";
    done.innerHTML = "";

    taskStorage.forEach(taskObject => {
        createTask(taskObject.task, taskObject.status, taskObject.priority);
    });
}

// function that retrieves data from local storage and renders the tasks to the page
function init() {
    const storedTasks = getTasksFromLocalStorage();
    if (storedTasks) {
        taskStorage = storedTasks;
    }
    renderTasks();
}

// event listener that deletes a task when the delete button is clicked
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
        const taskId = event.target.parentElement.getAttribute("data-id");
        const taskIndex = taskStorage.findIndex(task => task.task === taskId);
        taskStorage.splice(taskIndex, 1);
        storeTasksInLocalStorage();
        renderTasks();
    }
});

// event listener that changes the status and priority of a task in the taskStorage array and on the page
document.addEventListener("change", function (event) {
    if (event.target.id === "task-status" || event.target.id === "task-priority") {
        const taskId = event.target.parentElement.getAttribute("data-id");
        const taskIndex = taskStorage.findIndex(task => task.task === taskId);
        if (taskIndex !== -1) {
            if (event.target.id === "task-status") {
                taskStorage[taskIndex].status = event.target.value;
            } else if (event.target.id === "task-priority") {
                taskStorage[taskIndex].priority = event.target.value;
            }
            storeTasksInLocalStorage();
            renderTasks();
        }
    }
});

//event listener that opens the modal when the add button is clicked or the dropdown selection is made
addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    showModal();
});

//event listener that shows modal wehn add option is selected
document.addEventListener("change", function (event) {
    event.preventDefault();
    if (event.target.value === "add") {
        showModal();
    }
});

//event listener that closes the modal when the close button is clicked
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

//event listener that renders a task when the submit button is clicked
submit.addEventListener("click", function (event) {
    event.preventDefault();
    storeModalInput();
    renderTasks();
    modal.style.display = "none";
});

//event listener that renders a task when the dropdown selection is made
document.querySelectorAll("#work-list, #personal-list, #family-list, #home-list, #health-list, #financial-list, #learning-list").forEach(function (selectElement) {
    selectElement.addEventListener("change", function (event) {
        event.preventDefault();
        storeDropdownSelection(event.target);
        renderTasks();
    });

});

//call init functin to render tasks on page load
init();