"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { MessageCircle, X, Zap, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "8801999467873";
const MESSAGE = "Hello! I'm interested in your service.";

// Magnetic hover effect hook
const useMagneticEffect = (strength = 0.3) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return { position, handleMouseMove, handleMouseLeave };
};

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const [particles] = useState<Array<{ id: number; x: number; y: number }>>(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      })),
  );
  const controls = useAnimation();
  const { position, handleMouseMove, handleMouseLeave } =
    useMagneticEffect(0.4);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  // Ripple effect on click
  const handleClick = async () => {
    await controls.start({
      scale: [1, 1.2, 0.8, 1.1, 1],
      transition: { duration: 0.6, ease: "easeInOut" },
    });
    setIsOpen(!isOpen);
  };

  if (pathname === "/auth") return null;

  return (
    <div className="fixed bottom-8 right-8 z-30 flex flex-col items-end gap-4">
      {/* Extended messaging interface */}
      {/* <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, scale: 0.8, filter: "blur(10px)" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="mb-4 w-80 bg-white/10 backdrop-blur-xl border border-white/20 
                rounded-3xl shadow-2xl overflow-hidden relative"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              <div className="relative p-6 bg-linear-to-br from-emerald-500/20 to-teal-600/20">
                <div className="absolute inset-0 bg-linear-to-r from-emerald-400/10 to-transparent" />
                <div className="relative flex items-center gap-3">
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-400 to-green-600 
                      flex items-center justify-center shadow-lg"
                    >
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full 
                      border-2 border-white animate-pulse"
                    />
                  </div>
                  <div>
                    <h3 className="text-black font-semibold text-lg">
                      Lets Chat
                    </h3>
                    <p className="text-emerald-200/80 text-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Typically replies instantly
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl rounded-tl-sm 
                    p-4 text-black/90 text-sm backdrop-blur-sm"
                >
                  <p className="mb-2">{MESSAGE}</p>
                  <div className="flex items-center gap-1 text-emerald-300/60 text-xs">
                    <Zap className="w-3 h-3" />
                    <span>Pre-filled message</span>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-2">
                  {["Custom Order", "Support", "Pricing", "Demo"].map(
                    (item, i) => (
                      <motion.button
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(16, 185, 129, 0.2)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 
                        text-xs font-medium transition-colors"
                      >
                        {item}
                      </motion.button>
                    ),
                  )}
                </div>
              </div>

              <div className="p-4 pt-2">
                <motion.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl
                    bg-linear-to-r from-emerald-500 to-green-600 text-white font-semibold
                    shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40
                    transition-shadow relative overflow-hidden group"
                >
                  <span
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  />
                  <Send className="w-4 h-4" />
                  <span>Start Conversation</span>
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence> */}

      {/* Main Button - Orbital Design */}
      <div
        className="relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Orbital Particles */}
        {particles.map((particle, i) => (
          <motion.span
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-emerald-400/60"
            animate={{
              x: [0, particle.x, 0],
              y: [0, particle.y, 0],
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            style={{
              left: "50%",
              top: "50%",
              marginLeft: -4,
              marginTop: -4,
            }}
          />
        ))}

        {/* Outer Glow Ring */}
        <motion.div
          animate={{
            rotate: 360,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.3 },
          }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/30 
           w-14 h-14 md:w-20 md:h-20 -m-2"
        />

        {/* Secondary Pulse Ring */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl"
        />

        {/* Magnetic Button Core */}
        <motion.a
          animate={controls}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            x: position.x,
            y: position.y,
          }}
          className="relative  w-14 h-14 md:w-16 md:h-16 rounded-full bg-linear-to-br from-emerald-400 via-green-500 
            to-emerald-600 shadow-2xl shadow-emerald-500/30 flex items-center justify-center 
            cursor-pointer border border-white/20 backdrop-blur-sm group"
        >
          {/* Inner Shine */}
          <div
            className="absolute inset-0 rounded-full bg-linear-to-tr from-white/20 to-transparent opacity-0 
            group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Icon Morph */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                onClick={() => setIsOpen(false)}
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <X className="w-7 h-7 text-white drop-shadow-md" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                <MessageCircle className="w-7 h-7 text-white drop-shadow-md" />
                {/* Notification Dot */}
                <span
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full
                  border-2 border-emerald-500 animate-bounce"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ripple on Hover */}
          {isHovered && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-white/40"
            />
          )}
        </motion.a>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl 
                bg-emerald-950 backdrop-blur-md border border-white/20 text-emerald-50 text-sm font-medium 
                whitespace-nowrap shadow-xl"
            >
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 
                w-2 h-2 bg-white/10 border-r border-t border-white/20"
              />
              Chat with us
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
