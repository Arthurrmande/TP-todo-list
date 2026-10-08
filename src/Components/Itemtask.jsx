import { useState } from "react";

export default function Itemtask({ task, onEditTask, onDeleteTask, onChangeStatus }) {
  // Savoir si on modifie
  const [isEditing, setIsEditing] = useState(false);
  // Mémoriser le nouveau titre de la tâche
  const [newTitle, setNewTitle] = useState(task.title);

  // Valider la modification
  const handleEdit = () => {
    if (!newTitle.trim()) return;

    onEditTask(task.id, newTitle.trim());
    setIsEditing(false);
  };

  // Annuler la modification
  const handleCancel = () => {
    setNewTitle(task.title);
    setIsEditing(false);
  };

  return (
    <li className="flex min-h-[86px] items-center gap-3 rounded-[8px] bg-surface px-[22px] text-[16px]">

      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            className="h-[46px] min-w-0 flex-1 rounded-[8px] border border-border bg-surface-hover px-4 outline-none focus:border-primary"
          />
        </>
      ) : (
        <span className={`min-w-0 flex-1 ${task.status === "Validée" ? "text-text-secondary" : ""}`}>
          {task.title}
        </span>
      )}

      {/* STATUT */}
      <select
        value={task.status}
        onChange={(event) => onChangeStatus(task.id, event.target.value)}
        aria-label={`Statut de ${task.title}`}
        className={`w-[120px] rounded-full px-3 py-2 text-center text-[14px] outline-none cursor-pointer ${
          task.status === "Validée"
            ? "bg-green-950 text-primary"
            : "bg-surface-hover text-text-secondary"
        }`}
      >
        <option value="À faire">À faire</option>
        <option value="En cours">En cours</option>
        <option value="Validée">Validée</option>
      </select>

      {/* BOUTONS */}
      {isEditing ? (
        <>
          <button onClick={handleEdit} className="rounded-full bg-primary px-5 py-3 font-bold text-black">
            Valider
          </button>

          <button onClick={handleCancel} className="rounded-full bg-surface-hover px-5 py-3 font-bold">
            Annuler
          </button>
        </>
      ) : (
        <button onClick={() => { setNewTitle(task.title); setIsEditing(true); }} className="rounded-full bg-surface-hover px-5 py-3 font-bold">
          Modifier
        </button>
      )}

      <button onClick={() => onDeleteTask(task.id)} className="px-3 py-3 text-text-secondary hover:text-negative">
        Supprimer
      </button>

    </li>
  );
}