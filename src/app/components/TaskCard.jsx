"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

function TaskCard({task}) {
    const [edit, setEdit] = useState(false)
    const router = useRouter()
    const [newTitle, setNewTitle] = useState(task.title)
    const [newDescription, setNewDescription] = useState(task.description)
    const handleDelete = async (id) => {
        if (window.confirm('Confirm DELETE?')) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, { method: "DELETE"})
            if (res.status === 204) {
                router.refresh()
            }
        }
    }
    const handleUpdate = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, 
        { 
            method: "PUT",
            body: JSON.stringify({title : newTitle, description : newDescription }),
            headers: {
              "Content-Type": "application/json",
            },
        })
        const data = await res.json()
        setEdit(!edit)
    }
    const handleDone = async (id) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`, { method: "POST"}) 
        if (res.status === 200) {
            router.refresh()
            
        }
    }
  return (
    <div
      className="bg-slate-500 mb-2 rounded-md px-4 py-3 text-slate-200 flex justify-between items-center"
    >
      <div className="flex flex-col" >
        { !edit ? (
            <h3 className="font-bold mb-1 ">{newTitle} {task.done &&<span>✅</span>} </h3>
        ) : (
            <input type="text" className="p-2 bg-slate-200 rounded-md mb-2 border-none text-black" placeholder={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        )}
        {!edit ? (<p>{newDescription}</p>) : (<textarea placeholder={newDescription} className="p-2 bg-slate-200 rounded-md  border-none text-black" rows={1} onChange={(e) => setNewDescription(e.target.value)} />)}
      </div>
      <div className="flex justify-between">
        { edit && ( 
            <button className="bg-orange-500 text-white m-1 rounded-md p-2" onClick={() => handleUpdate(task.id) }>Save</button>
        )

        }
        <button className={(task.done ? "bg-green-500 " : "bg-zinc-500 ") + "text-white m-1 rounded-md p-2"} onClick={() => handleDone(task.id)} >
          {task.done ? "Done Task" : "Pending Task"}
        </button>
        <button className="bg-red-500 text-white m-1 rounded-md p-2" onClick={() => handleDelete(task.id)} >
          Delete Task
        </button>
        <button className="bg-indigo-500 text-white m-1 rounded-md p-2" onClick={() => setEdit(!edit) } >
            Edit Task
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
