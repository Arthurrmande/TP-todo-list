
import { useState } from "react";
import { motion } from "motion/react";

export default function Itemtask({ task, index, animationMode, onEditTask, onDeleteTask, onChangeStatus }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
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

  // DÉMARRER la modification
  const startEdit = () => {
    setNewTitle(task.title);
    setNewStatus(task.status);
    setIsEditing(true);
  };

  // ANIMATIONS
  const taskAnimation = {
    intro: {
      initial: { opacity: 0, y: 30 },
      transition: { duration: 0.5, delay: 1.2 + index * 0.2, ease: "easeOut" },
    },
    add: {
      initial: { opacity: 0, y: 20, scale: 0.97 },
      transition: { duration: 0.3, ease: "easeOut" },
    },
    delete: {
      initial: false,
      transition: { duration: 0.25 },
    },
    filter: {
      initial: false,
      transition: { duration: 0 },
    },
  };

  const animation = taskAnimation[animationMode];

  return (
    <motion.li
      initial={animation.initial}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={animationMode === "filter" ? undefined : { opacity: 0, x: -80, transition: { duration: 0.25 } }}
      transition={animation.transition}
      layout={animationMode !== "filter"}
      whileHover={{ backgroundColor: "#202020" }}
      className="flex min-h-24 items-center gap-3 rounded-lg bg-surface px-6 text-base"
    >

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
          <motion.button onClick={handleEdit} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full bg-primary px-5 py-3 font-bold text-black">
            Valider
          </motion.button>

          <motion.button onClick={handleCancel} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full bg-surface-hover px-5 py-3 font-bold">
            Annuler
          </motion.button>
        </>
      ) : (
        <motion.button onClick={startEdit} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full bg-surface-hover px-5 py-3 font-bold">
          Modifier
        </motion.button>
      )}

      <motion.button onClick={() => onDeleteTask(task.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-3 text-text-secondary hover:text-negative">
        Supprimer
      </motion.button>

    </motion.li>
  );
}
