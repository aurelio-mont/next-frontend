import TaskCard from "./TaskCard"

async function loadTasks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`)
  const tasks = await res.json()
  return tasks 
}

async function ListTasks() {
  const tasks = await loadTasks()
  return (
    <div
    className='bg-slate-700 p-4 w-full'
    ><h2>Lista de tareas</h2>
      {
        tasks.map(task => (
          <TaskCard task={task} key={task.id} />
        ))
      }
    </div>
  )
}

export default ListTasks