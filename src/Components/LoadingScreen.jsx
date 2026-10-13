
import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      {/* HALO VERT */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-64 w-64 rounded-full bg-primary opacity-20 blur-3xl"
      />

      {/* LOGO SPOTIFY */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{
          opacity: 1,
          scale: [1, 1.08, 1],
          rotate: 0,
        }}
        transition={{
          opacity: { duration: 0.6 },
          rotate: { duration: 0.8 },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-10"
      >
        <svg
          viewBox="0 0 100 100"
          className="h-40 w-40"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Logo Spotify"
        >
          <circle cx="50" cy="50" r="48" fill="#1DB954" />
          <path d="M19 36 C40 28 67 31 82 42" fill="none" stroke="#121212" strokeWidth="8" strokeLinecap="round" />
          <path d="M23 51 C44 44 65 48 77 57" fill="none" stroke="#121212" strokeWidth="7" strokeLinecap="round" />
          <path d="M28 65 C45 59 61 64 72 71" fill="none" stroke="#121212" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* NOM */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 mt-8 text-4xl font-bold text-white"
      >
        Spotify
      </motion.h1>

      {/* TEXTE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 mt-4 text-sm text-text-secondary"
      >
        Préparation de votre espace...
      </motion.p>

      {/* BARRE DE CHARGEMENT */}
      <div className="relative z-10 mt-8 h-1 w-64 overflow-hidden rounded-full bg-surface-hover">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 10, ease: "linear" }}
          className="h-full rounded-full bg-primary"
        />
      </div>
    </motion.div>
  );
}
