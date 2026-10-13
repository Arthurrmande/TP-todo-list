
import { useState } from "react";
import Addtask from "./Components/Addtask";
import Itemtask from "./Components/Itemtask";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: crypto.randomUUID(), title: "Envoyer le devis", status: "À faire" },
    { id: crypto.randomUUID(), title: "Préparer la présentation", status: "En cours" },
    { id: crypto.randomUUID(), title: "Ranger les documents", status: "Validée" },
  ]);

  // AJOUTER une tâche
  const addTask = (title) => {
    const newTask = { id: crypto.randomUUID(), title, status: "À faire" };
    setTasks((current) => [...current, newTask]);
  };

  // SUPPRIMER une tâche avec .filter()
  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  // MODIFIER une tâche avec .map()
  const editTask = (id, newTitle) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  // MODIFIER LE STATUT
  const changeStatus = (id, newStatus) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // FILTRER LES TÂCHES
  const [filterStatus, setFilterStatus] = useState("Toutes");

  const filteredTasks = tasks.filter((task) =>
    filterStatus === "Toutes" ? true : task.status === filterStatus
  );

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <div className="mx-auto max-w-5xl px-6 pt-28">

        <h1 className="mb-10 text-4xl font-bold leading-none">
          Mes tâches
        </h1>

        <div className="mb-6 flex flex-wrap gap-2">
          <button onClick={() => setFilterStatus("Toutes")} className={`h-10 rounded-full px-5 text-sm font-medium ${filterStatus === "Toutes" ? "bg-white text-black font-bold" : "bg-surface-hover text-white"}`}> Toutes ({tasks.length}) </button>
          <button onClick={() => setFilterStatus("À faire")} className={`h-10 rounded-full px-5 text-sm font-medium ${filterStatus === "À faire" ? "bg-white text-black font-bold" : "bg-surface-hover text-white"}`}> À faire ({tasks.filter((task) => task.status === "À faire").length}) </button>
          <button onClick={() => setFilterStatus("En cours")} className={`h-10 rounded-full px-5 text-sm font-medium ${filterStatus === "En cours" ? "bg-white text-black font-bold" : "bg-surface-hover text-white"}`}> En cours ({tasks.filter((task) => task.status === "En cours").length}) </button>
          <button onClick={() => setFilterStatus("Validée")} className={`h-10 rounded-full px-5 text-sm font-medium ${filterStatus === "Validée" ? "bg-white text-black font-bold" : "bg-surface-hover text-white"}`}> Terminées ({tasks.filter((task) => task.status === "Validée").length}) </button>
        </div>

        <Addtask onAddtask={addTask} />

        {filteredTasks.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-sm text-text-secondary">
              {tasks.length === 0 ? "Aucune tâche" : "Aucune tâche dans cette catégorie"}
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <Itemtask key={task.id} task={task} onEditTask={editTask} onDeleteTask={deleteTask} onChangeStatus={changeStatus} />
            ))}
          </ul>
        )}

      </div>
    </main>
  );
}
