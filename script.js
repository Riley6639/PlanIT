//variables for the list elements
const todo = document.getElementById("task-list");
const doing = document.getElementById("doing");
const done = document.getElementById("completed");

//variables for the modal
const select = document.querySelector("select");
const modal = document.getElementById("task-modal");
const addOption = document.getElementById("#trigger-modal");
const submit = document.getElementById("submitBtn");
const closeModal = document.getElementById("close-modal");
const modalTask = document.getElementById("modalInput");

//variables for the add and delete buttons
const deleteTask = document.getElementsByClassName("delete");
const addBtn = document.getElementById("addBtn")

//variables for the created task elements
const taskItem = document.getElementsByClassName("task-item");

// array for storing the tasks
let taskStorage = [];
//object for storing tasks
let taskObject = {
    task: "",
    priority: "",
    status: ""
};

// creates a task for the dropdown option selected
function checkForCustomOption(selectElement) {
    // Check if the "Add your own" option is selected
    if (selectElement.value === "add") {
        modal.style.display = "block";
        // the modal will add the option so this is not needed
        // Prompt the user for a new option
        // const newOptionText = selectElement.value;

        // if (newOptionText) {
        //     // Create a new option element
        //     const newOption = document.createElement("option");
        //     newOption.text = newOptionText;
        //     newOption.value = newOptionText.toLowerCase();
        //     // Insert the new option before the "Add your own" option
        //     selectElement.add(newOption, selectElement.options[selectElement.options.length - 1]);
        //     // Set the newly added option as the selected one
        //     selectElement.value = newOption.value;
        // } else {
        //     // If the user cancels the prompt, revert the selection
        //     selectElement.value = selectElement.options[0].value;
        // }
    }
}

// Load tasks from local storage
loadTasksFromLocalStorage();

closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

submit.addEventListener("click", function () {
    modal.style.display = "none";
    // when submit is clicked the new task is added to the list
    createTask(modalTask.value, todo);
});

addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";
});

// Call the checkForCustomOption function when the select element value is "add"
document.querySelectorAll("#work-list, #personal-list, #family-list, #home-list, #health-list, #financial-list, #learning-list").forEach(function (selectElement) {
    selectElement.addEventListener("change", function (event) {
        event.preventDefault();
        checkForCustomOption(event.target);
        createTask(event.target.value, todo);
    });
});

// unecessary code. the addDeleteFunctionality function is called in the createTask function
// Array.from(deleteTask).forEach(function (deleteButton) {
//     deleteButton.addEventListener("click", function () {
//         const taskItem = deleteButton.parentNode;
//         taskItem.parentNode.removeChild(taskItem);
//         const taskIndex = taskStorage.indexOf(taskItem.textContent.replace("Delete", "").trim());
//         if (taskIndex > -1) {
//             taskStorage.splice(taskIndex, 1);
//         }
//         console.log(taskStorage);
//     });
// });
//function to create the dropdown elements
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

// Needs to create a task based on the option selected or the custom option
function createTask(task, listElement) {
    //create the task and delete button elements
    const addTask = document.createElement("li");
    const deleteTask = document.createElement("button");

    //create priority dropdown element
    const priorityOptions = [
        { value: "high", text: "High" },
        { value: "medium", text: "Medium" },
        { value: "low", text: "Low" }
    ]
    const priority = createDropdown(priorityOptions, "priority-list");

    //create status dropdown elements
    const statusOptions = [
        { value: "todo", text: "To Do" },
        { value: "doing", text: "Doing" },
        { value: "done", text: "Done" }
    ]
    const status = createDropdown(statusOptions, "status");

    //configure the delete button
    deleteTask.textContent = "❌";
    deleteTask.classList.add("delete");
    // addDeleteFunctionality(deleteTask);

    //configure the task element
    addTask.textContent = task;
    addTask.classList.add("task-item");
    addTask.appendChild(status);
    addTask.appendChild(priority);
    addTask.appendChild(deleteTask);
    listElement.appendChild(addTask);

    addTask.priority = priority;
    addTask.status = status;

    //push the addtask properties to taskObject
    taskObject = {
        task: task,
        priority: priority.value,
        status: status.value
    };
    taskStorage.push(taskObject);
    console.log(taskStorage);

    //save task to local storage
    saveTasksToLocalStorage();

    // handle priority and status
    handlePriority(addTask);
    handleStatus(addTask);


    // Add event listener to the delete button
    deleteTask.addEventListener("click", function () {
        const taskItem = deleteTask.parentNode;
        taskItem.parentNode.removeChild(taskItem);
        // remove the task from the storage array
        taskStorage.splice(taskStorage.indexOf(taskObject.task), 1);
        saveTasksToLocalStorage();
        console.log(taskStorage);
    });
}


// no longer necessary
// function to delete the task
// function addDeleteFunctionality(deleteButton) {
//     deleteButton.addEventListener("click", function () {
//         const taskItem = deleteButton.parentNode;
//         taskItem.parentNode.removeChild(taskItem);
//         const taskIndex = taskStorage.indexOf(taskItem.textContent.replace("Delete", "").trim());
//         if (taskIndex > -1) {
//             taskStorage.splice(taskIndex, 1);
//         }
//         console.log(taskStorage);
//     });
// }

// needs to have logic to store the user's tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskStorage));
}

function loadTasksFromLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (!storedTasks) {
        return;
    }

    storedTasks.forEach(function (task) {
        let listElement;
        if (task.status === "todo") {
            listElement = todo;
        } else if (task.status === "doing") {
            listElement = doing;
        } else if (task.status === "done") {
            listElement = done;
        }
        createTask(task.task, listElement);

    });
}

// needs to have logic to set the priority of the task
function handlePriority(taskItem) {
    taskItem.priority.addEventListener("change", function () {
        if (taskItem.priority.value === "high") {
            taskItem.style.backgroundColor = "red";
        } else if (taskItem.priority.value === "medium") {
            taskItem.style.backgroundColor = "yellow";
        } else if (taskItem.priority.value === "low") {
            taskItem.style.backgroundColor = "green";
        }
        // update the taskObject with the new priority
        taskObject = {
            task: taskItem.text,
            priority: taskItem.priority.value,
            status: taskItem.status.value
        };
        taskStorage.push(taskObject);
        // update the taskStorage with the new taskObject
        saveTasksToLocalStorage();
    });
}

// when the priortiy is changed the task moves to the appropriate list
function handleStatus(taskItem) {
    taskItem.status.addEventListener("change", function () {
        if (taskItem.status.value === "todo") {
            todo.appendChild(taskItem);
        } else if (taskItem.status.value === "doing") {
            doing.appendChild(taskItem);
        } else if (taskItem.status.value === "done") {
            done.appendChild(taskItem);
        }
        // update the taskObject with the new status
        taskObject = {
            task: taskItem.text,
            priority: taskItem.priority.value,
            status: taskItem.status.value
        };
        taskStorage.push(taskObject);
        // update the taskStorage with the new taskObject
        saveTasksToLocalStorage();
    });
}