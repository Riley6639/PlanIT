taskList = document.getElementById("task-list");
workList = document.getElementById("work-list");
completed = document.getElementById("completed");
const select = document.getElementById("list");
const modal = document.getElementById("task-modal");
const addOption = document.getElementById("#trigger-modal");
const closeModal = document.getElementById("close-modal");
const newTask = document.getElementById("add")

// need to keep track of tasks and their positon
let taskStorage = [];



// needs to have logic to add new tasks
function checkForCustomOption(selectElement) {
    // Check if the "Add your own" option is selected
    if (selectElement.value === "add") {
        modal.style.display = "block";
        // Prompt the user for a new option
        const newOptionText = newTask.value;

        if (newOptionText) {
            // Create a new option element
            const newOption = document.createElement("option");
            newOption.text = newOptionText;
            newOption.value = newOptionText.toLowerCase();
            // Insert the new option before the "Add your own" option
            selectElement.add(newOption, selectElement.options[selectElement.options.length - 1]);
            // Set the newly added option as the selected one
            selectElement.value = newOption.value;
        } else {
            // If the user cancels the prompt, revert the selection
            selectElement.value = selectElement.options[0].value;
        }
    }
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

// Call the checkForCustomOption function when the select element value is "add"
document.querySelectorAll("#work-list, #personal-list, #family-list, #home-list, #health-list, #financial-list, #learning-list").forEach(function (selectElement) {
    selectElement.addEventListener("change", function (event) {
        event.preventDefault();
        checkForCustomOption(event.target);
        createTask(event);
    });
});


// Needs to create a task based on the option selected
function createTask(event) {
    const option = event.target;
    const task = document.createElement("li");
    task.textContent = option.value;
    task.classList.add("task");
    task.setAttribute("draggable", "true");
    task.addEventListener("dragstart", dragStart);
    task.addEventListener("dragend", dragEnd);
    taskList.appendChild(task);
}

// needs to have logic to move around the tasks
// Create dragStart function to allow the task to be dragged
function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.textContent);
}

// Create dragEnd function to handle the end of dragging
function dragEnd(event) {
    // append element to the list it was dropped on
    const task = document.createElement("li");
    if (event.target.id === "work-list") {
        task.textContent = event.dataTransfer.getData("text/plain");
        task.classList.add("task");
        task.setAttribute("draggable", "true");
        task.addEventListener("dragstart", dragStart);
        task.addEventListener("dragend", dragEnd);
        workList.appendChild(task);
    } else if (event.target.id === "completed") {
        task.textContent = event.dataTransfer.getData("text/plain");
        task.classList.add("task");
        task.setAttribute("draggable", "true");
        task.addEventListener("dragstart", dragStart);
        task.addEventListener("dragend", dragEnd);
        completed.appendChild(task);
    }
    // Handle any necessary cleanup or actions after dragging ends
    event.dataTransfer.clearData();
}




// needs to have logic to display day/week/month

// needs to have logic to store the user's tasks to local storage

// needs to have logic to set the priority of the task

// -needs to have logic to move around the tasks

// -needs to have logic to display day/week/month

// -needs to have logic to store the user's tasks to local storage

// -needs to have logic to set the priority of the task