"use strict";

// ----------------------- Variables ------------------------
const toast = document.querySelector(".toast"),
  notif = document.querySelector("#notif"),
  form = document.querySelector("#submitform"),
  taskTitle = document.querySelector("#task"),
  doneElm = document.querySelector("#done"),
  progressElm = document.querySelector("#progress"),
  mainList = document.querySelector(".list"),
  delTask = document.querySelectorAll(".del"),
  editTask = document.querySelectorAll(".edit"),
  checkTask = document.querySelectorAll(".check");

// ----------------------- Task List ------------------------
let task = [
  { id: 1, title: "lorem-1", status: true },
  { id: 2, title: "lorem-2", status: false },
  { id: 3, title: "lorem-3", status: true },
];

// ------------------- Render Task List ---------------------
function renderTaskList(taskList) {
  if (taskList.length) {
    taskList.forEach((task, id) => {
      const taskItem = createElement(
        "li",
        "list_item w-full p-3 flex justify-between border border-gray-200 shadow-lg rounded-md bg-white items-center mb-3",
        `
        <p class="text-xl text-[#5a5a5a]">${task.title}</p>
        <div class="btn-group flex">
            <i data-del=${
              task.id
            } class="del bx bx-trash text-red-500 text-2xl mx-2 cursor-pointer active:text-red-800"></i>
            <i data-edit=${
              task.id
            } class="edit bx bx-edit text-orange-500 text-2xl mx-2 cursor-pointer active:text-orange-800"></i>
            <i data-check=${task.id} class="check bx bx-check-circle ${
          task.status
            ? "text-green-500 active:text-green-800"
            : "text-black active:text-[#000]"
        } text-2xl mx-2 cursor-pointer "></i>
        </div>
      `
      );
      //   taskItem.dataSet.num = id;
      mainList.append(taskItem);
    });
  } else {
    mainList.innerHTML =
      '<h2 class="text-center text-xl text-red-500">Not Found</h2>';
  }
}
renderTaskList(task);

// -------------------- Count Task Done ---------------------
function countTaskDone() {
  const done = task.filter((item) => item.status === true).length;
  doneElm.textContent = done;

  const progress = task.filter((item) => item.status === false).length;
  progressElm.textContent = progress;
}
countTaskDone();

// --------------------- Add New Task -----------------------
function addNewTask() {
  const title = taskTitle.value;
  const newTask = {
    id: Date.now(),
    title: title,
    status: false,
  };
  const check = {
    title: newTask.title.trim().length === 0,
  };
  if (check.title) {
    alert("Enter Task!");
    // toast warning message
  } else {
    task.push(newTask);
    taskTitle.value = "";
    // toast warning message
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask();
  mainList.innerHTML = "";
  renderTaskList(task);
  countTaskDone();
});

// ---------------------- Delete Task -----------------------
mainList.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    const id = e.target.getAttribute("data-del");
    task = task.filter((task) => task.id != id);
    mainList.innerHTML = "";
    renderTaskList(task);
    countTaskDone();
  }
});
