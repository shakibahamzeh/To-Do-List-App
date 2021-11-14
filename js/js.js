
const form=document.querySelector('.task-wrapper');
const addBtn=document.querySelector('.add-btn');
const textInput = document.querySelector(".task-input");
const listWrapper=document.querySelector('.list-wrapper');
const deleteTask=document.querySelector('.fa-trash');
const dataList=document.querySelectorAll('datalist option');

// fixed in page with refresh
if (localStorage.getItem("tasks")) {
  let tasksHtml = ``;
  const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
  tasksFromStorage.forEach((task) => {
    tasksHtml += `<li class="task-item"><span>${task}<i class="fa fa-check"></i><i class="fa fa-trash"></i></span></li>`;
  });

  listWrapper.innerHTML = tasksHtml;
}

  //Add Tasks in localStorage
form.addEventListener('submit',(e)=>{
  e.preventDefault();
if(textInput.value.trim()===""){
  alert('Please Enter A Task');
}else {
  let saveTasks=[];
  if(localStorage.getItem('tasks')){
    saveTasks=JSON.parse(localStorage.getItem('tasks'));
    saveTasks.push(textInput.value);
    localStorage.setItem('tasks',JSON.stringify(saveTasks))
  }else{
     saveTasks.push(textInput.value);
  localStorage.setItem('tasks',JSON.stringify(saveTasks));
  }
  //Add Tasks 

    const li = document.createElement("li");
    // add class to this li
    li.className = "task-item";
    // add span in li
    const span = document.createElement("span");
    // add form text to span
    span.appendChild(document.createTextNode(textInput.value));
  
    // add delete icon & edit icon in span
    span.innerHTML += '<i class="fa fa-check"></i><i class="fa fa-trash"></i>';
     // add span to list
    li.appendChild(span);
    // add list item to all tasks in ul
    listWrapper.appendChild(li);
    // clear input
     textInput.value = "";
}
})

//delete a task & edit a task
listWrapper.addEventListener('click',(e)=>{
  const text=textInput.innerText;
  const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
  const findIndex = tasksFromStorage.findIndex((task) => task === text);
  tasksFromStorage.splice(findIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksFromStorage));
//delete
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.parentElement.remove();
  }
  //edit
  if(e.target.classList.contains("fa-check")){
    e.target.parentElement.parentElement.style.textDecorationLine="line-through";
    e.target.parentElement.parentElement.style.opacity="0.5";
    e.target.parentElement.parentElement.style.width="330px";
  }
})
