import FormTasks from "./components/FormTasks"
import ListTasks from "./components/ListTasks"

export const dynamic = "force-dynamic"

function HomePage() {
  return (
    <div className="container mx-auto">
      <h1>Tareas</h1>
      <div className="container flex gap-x-100">
        <FormTasks />
        <ListTasks />
      </div>
    </div>
  )
}

export default HomePage