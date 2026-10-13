
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Addtask from "./Components/Addtask";
import Itemtask from "./Components/Itemtask";
import LoadingScreen from "./Components/LoadingScreen";

export default function App() {
  // ÉCRAN DE CHARGEMENT
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // LISTE DES TÂCHES
  const [tasks, setTasks] = useState([
    { id: crypto.randomUUID(), title: "Envoyer le devis", status: "À faire" },
    { id: crypto.randomUUID(), title: "Préparer la présentation", status: "En cours" },
    { id: crypto.randomUUID(), title: "Ranger les documents", status: "Validée" },
  ]);

  // FILTRE ET MODE D'ANIMATION
  const [filterStatus, setFilterStatus] = useState("Toutes");
  const [animationMode, setAnimationMode] = useState("intro");

  // AJOUTER UNE TÂCHE
  const addTask = (title) => {
    setAnimationMode("add");

    const newTask = {
      id: crypto.randomUUID(),
      title,
      status: "À faire",
    };

    setTasks((current) => [...current, newTask]);
  };

  // SUPPRIMER UNE TÂCHE
  const deleteTask = (id) => {
    setAnimationMode("delete");
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  // MODIFIER UNE TÂCHE
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

  // CHANGER DE FILTRE
  const changeFilter = (status) => {
    setAnimationMode("filter");
    setFilterStatus(status);
  };

  // FILTRER LES TÂCHES
  const filteredTasks = tasks.filter((task) =>
    filterStatus === "Toutes" ? true : task.status === filterStatus
  );

  // LISTE DES FILTRES
  const filters = [
    { label: "Toutes", value: "Toutes" },
    { label: "À faire", value: "À faire" },
    { label: "En cours", value: "En cours" },
    { label: "Terminées", value: "Validée" },
  ];

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (

        // ÉCRAN DE CHARGEMENT SPOTIFY
        <LoadingScreen key="loading" />

      ) : (

        // APPLICATION TODO LIST
        <motion.main
          key="app"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-background text-text-primary"
        >
          <div className="mx-auto max-w-5xl px-6 pt-28">

            {/* TITRE */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
              className="mb-10 text-4xl font-bold leading-none"
            >
              Mes tâches
            </motion.h1>

            {/* AJOUTER UNE TÂCHE */}
            <Addtask onAddtask={addTask} />

            {/* FILTRES */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mb-6 flex flex-wrap gap-2"
            >
              {filters.map((filter) => (
                <motion.button
                  key={filter.value}
                  onClick={() => changeFilter(filter.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`h-10 rounded-full px-5 text-sm font-medium transition-colors ${
                    filterStatus === filter.value
                      ? "bg-white font-bold text-black"
                      : "bg-surface-hover text-white hover:bg-neutral-700"
                  }`}
                >
                  {filter.label} (
                  {filter.value === "Toutes"
                    ? tasks.length
                    : tasks.filter((task) => task.status === filter.value).length}
                  )
                </motion.button>
              ))}
            </motion.div>

            {/* LISTE DES TÂCHES */}
            {filteredTasks.length === 0 ? (

              // AUCUNE TÂCHE
              <div className="flex h-96 items-center justify-center">
                <p className="text-sm text-text-secondary">
                  {tasks.length === 0
                    ? "Aucune tâche"
                    : "Aucune tâche dans cette catégorie"}
                </p>
              </div>

            ) : (

              // TÂCHES ANIMÉES
              <ul className="space-y-3">
                <AnimatePresence initial={animationMode === "intro"}>
                  {filteredTasks.map((task, index) => (
                    <Itemtask
                      key={task.id}
                      task={task}
                      index={index}
                      animationMode={animationMode}
                      onEditTask={editTask}
                      onDeleteTask={deleteTask}
                      onChangeStatus={changeStatus}
                    />
                  ))}
                </AnimatePresence>
              </ul>

            )}

          </div>
        </motion.main>

      )}
    </AnimatePresence>
  );
}
