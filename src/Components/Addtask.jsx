
import { useState } from "react";
import { motion } from "motion/react";

export default function Addtask({ onAddtask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    onAddtask(title.trim());
    setTitle("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      className="mb-8 flex gap-3"
    >
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ajouter une tâche..."
        className="h-14 min-w-0 flex-1 rounded-lg border border-border bg-surface-hover px-4 text-base text-text-primary outline-none placeholder:text-text-secondary focus:border-primary"
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 rounded-full bg-primary px-8 text-sm font-bold text-black transition-colors hover:bg-dark-green"
      >
        Ajouter
      </motion.button>
    </motion.form>
  );
}
