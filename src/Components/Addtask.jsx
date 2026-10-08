import { useState } from "react";

export default function Addtask({ onAddtask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title === "") return;

    onAddtask(title);
    setTitle("");
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-[32px] flex gap-[12px]">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ajouter une tâche..."
        className="h-[54px] flex-1 rounded-[8px] border border-border bg-surface-hover px-[16px] text-[16px] text-text-primary outline-none placeholder:text-text-secondary focus:border-primary"
      />

      <button className="h-[54px] rounded-full bg-primary px-[32px] text-[14px] font-bold text-black transition-colors hover:bg-dark-green">
        Ajouter
      </button>
    </form>
  );
}