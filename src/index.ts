import {v4 as uuidV4} from "uuid"

const list = document.querySelector<HTMLUListElement>("#list")
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const form = document.getElementById("new-task-form") as HTMLFormElement | null



type Task ={id:string, title: string, completed: boolean, createdAt: Date}
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem)

form?.addEventListener('submit', e =>{
    e.preventDefault()
    if(input?.value == ""|| input?.value==null) return 
      const newTask={
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt:new Date()
      }
      tasks.push(newTask);

      addListItem(newTask)
      input.value=" "

})

function addListItem(task: Task){
  const item=document.createElement("li")
  const lable = document.createElement('label');
  const checkBox=document.createElement("input")
  checkBox.classList.add("list-checkbox");
  checkBox.type="checkBox"
  checkBox.addEventListener('change',()=>{
    task.completed= checkBox.checked
    saveTasks();
  })
  checkBox.checked=task.completed
  lable.append(checkBox, task.title)
  item.append(lable)
  list?.append(item)
}

function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}
function loadTasks():Task[]{
  const taskJSON= localStorage.getItem("TASKS")
  if(taskJSON==null)return[];
  return JSON.parse(taskJSON);
}