import { useState } from "react";
import Addtask from "./Components/Addtask";
import Itemtask from "./Components/Itemtask";

export default function App() {
  const [tasks, setTasks] = useState([
    { id: crypto.randomUUID(), title: "Envoyer le devis", status: "À faire" },
    { id: crypto.randomUUID(), title: "Préparer la présentation", status: "En cours" },
    { id: crypto.randomUUID(), title: "Ranger les documents", status: "Terminé" },
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

  // MODIFIER LE STATUT : .map() modifie uniquement la tâche sélectionnée
  const changeStatus = (id, newStatus) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <div className="mx-auto max-w-[1050px] px-6 pt-[110px]">

        <h1 className="mb-[42px] text-[36px] font-bold leading-none">
          Mes tâches
        </h1>

        <Addtask onAddtask={addTask} />

        {tasks.length === 0 ? (
          <div className="flex h-[450px] items-center justify-center">
            <p className="text-[14px] text-text-secondary">
              Aucune tâche
            </p>
          </div>
        ) : (
          <ul className="space-y-[10px]">
            {tasks.map((task) => (
              <Itemtask key={task.id} task={task} onEditTask={editTask} onDeleteTask={deleteTask} onChangeStatus={changeStatus}/>
            ))}
          </ul>
        )}

      </div>
    </main>
  );
}