
import { useState } from "react";

export default function Itemtask({ task, onEditTask, onDeleteTask, onChangeStatus }) {
  // Savoir si on modifie
  const [isEditing, setIsEditing] = useState(false);

  // Mémoriser le nouveau titre
  const [newTitle, setNewTitle] = useState(task.title);

  // Mémoriser le nouveau statut
  const [newStatus, setNewStatus] = useState(task.status);

  // VALIDER la modification
  const handleEdit = () => {
    if (!newTitle.trim()) return;

    onEditTask(task.id, newTitle.trim());
    onChangeStatus(task.id, newStatus);
    setIsEditing(false);
  };

  // ANNULER la modification
  const handleCancel = () => {
    setNewTitle(task.title);
    setNewStatus(task.status);
    setIsEditing(false);
  };

  return (
    <li className="flex min-h-24 items-center gap-3 rounded-lg bg-surface px-6 text-base">

      {/* TITRE */}
      {isEditing ? (
        <input
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          className="h-12 min-w-0 flex-1 rounded-lg border border-border bg-surface-hover px-4 outline-none focus:border-primary"
        />
      ) : (
        <span className={`min-w-0 flex-1 ${task.status === "Validée" ? "text-text-secondary" : ""}`}>
          {task.title}
        </span>
      )}

      {/* STATUT */}
      {isEditing ? (
        <select
          value={newStatus}
          onChange={(event) => setNewStatus(event.target.value)}
          aria-label={`Statut de ${task.title}`}
          className="w-32 cursor-pointer rounded-full bg-surface-hover px-3 py-2 text-center text-sm text-text-secondary outline-none focus:border-primary"
        >
          <option value="À faire">À faire</option>
          <option value="En cours">En cours</option>
          <option value="Validée">Terminée</option>
        </select>
      ) : (
        <span className={`w-32 rounded-full px-3 py-2 text-center text-sm ${task.status === "Validée" ? "bg-green-950 text-primary" : "bg-surface-hover text-text-secondary"}`}>
          {task.status === "Validée" ? "Terminée" : task.status}
        </span>
      )}

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
        <button onClick={() => { setNewTitle(task.title); setNewStatus(task.status); setIsEditing(true); }} className="rounded-full bg-surface-hover px-5 py-3 font-bold">
          Modifier
        </button>
      )}

      <button onClick={() => onDeleteTask(task.id)} className="px-3 py-3 text-text-secondary hover:text-negative">
        Supprimer
      </button>

    </li>
  );
}
