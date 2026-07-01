import React from "react";
import { motion } from "motion/react";

export default function CelestialHeader() {
  return (
    <div className="w-full flex justify-center items-center gap-4 md:gap-12 py-6 relative select-none z-20">
      
      {/* Left Multi-layered Realistic Clouds Group */}
      <div className="relative hidden sm:flex items-center justify-end w-1/3 h-24">
        {/* Deep background cloud (larger, darker, slower float) */}
        <motion.div
          animate={{ x: [-10, 10, -10], y: [-3, 3, -3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-6 top-2 opacity-35 filter blur-[1px]"
        >
          <svg className="w-28 h-14 text-indigo-400/50" fill="currentColor" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="left-back-cloud-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M20 40a15 15 0 0 1 1-29.9 18 18 0 0 1 33.7-4.1 15 15 0 0 1 25.3 12 15 15 0 0 1 5 22h-65z" fill="url(#left-back-cloud-grad)" />
          </svg>
        </motion.div>

        {/* Foreground cloud (brighter, realistic illuminated edge) */}
        <motion.div
          animate={{ x: [-6, 6, -6], y: [2, -2, 2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-6 opacity-75 filter drop-shadow-[0_4px_12px_rgba(129,140,248,0.15)]"
        >
          <svg className="w-36 h-18 text-slate-200" fill="currentColor" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="left-front-cloud-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="75%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <path d="M20 40a15 15 0 0 1 1-29.9 18 18 0 0 1 33.7-4.1 15 15 0 0 1 25.3 12 15 15 0 0 1 5 22h-65z" fill="url(#left-front-cloud-grad)" />
          </svg>
        </motion.div>
      </div>

      {/* Cozy Glowy Celestial Moon in Center */}
      <motion.div
        animate={{ y: [-5, 5, -5], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center shrink-0 p-4"
      >
        {/* Layered rich amber glows behind the moon */}
        <div className="absolute w-36 h-36 md:w-48 md:h-48 bg-amber-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-24 h-24 md:w-32 md:h-32 bg-yellow-300/10 rounded-full blur-2xl" />

        {/* Detailed Moon SVG */}
        <svg
          className="w-24 h-24 md:w-32 md:h-32 filter drop-shadow-[0_0_20px_rgba(253,224,71,0.4)] transition-all duration-300"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="0.2"
        >
          <defs>
            <linearGradient id="moon-real-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#fffbeb" />
              <stop offset="75%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <mask id="crescent-moon-clip-mask">
              {/* White defines what stays */}
              <path
                d="M12.3 22H12c-5.5 0-10-4.5-10-10S6.5 2 12 2c.8 0 1.6.1 2.4.3-.7.7-1.1 1.6-1.1 2.7 0 2.2 1.8 4 4 4 1.1 0 2-.4 2.7-1.1.2.8.3 1.6.3 2.4 0 5.5-4.5 10-10 10z"
                fill="white"
              />
            </mask>
          </defs>

          {/* Main Moon Body with detailed Gradient */}
          <path
            d="M12.3 22H12c-5.5 0-10-4.5-10-10S6.5 2 12 2c.8 0 1.6.1 2.4.3-.7.7-1.1 1.6-1.1 2.7 0 2.2 1.8 4 4 4 1.1 0 2-.4 2.7-1.1.2.8.3 1.6.3 2.4 0 5.5-4.5 10-10 10z"
            fill="url(#moon-real-gradient)"
          />

          {/* Realistic Subtle Shaded Craters inside the moon (masked) */}
          <g mask="url(#crescent-moon-clip-mask)" opacity="0.16">
            <circle cx="8" cy="12" r="1.3" fill="#78350f" />
            <circle cx="7" cy="16" r="0.9" fill="#78350f" />
            <circle cx="11" cy="17.5" r="1.5" fill="#78350f" />
            <circle cx="9.5" cy="8" r="1" fill="#78350f" />
            <circle cx="5" cy="11" r="0.7" fill="#78350f" />
            <circle cx="13" cy="14" r="1.2" fill="#78350f" />
            
            {/* Crater rims for 3D realism */}
            <circle cx="8.2" cy="12.2" r="1.3" fill="none" stroke="#fef08a" strokeWidth="0.15" />
            <circle cx="11.2" cy="17.7" r="1.5" fill="none" stroke="#fef08a" strokeWidth="0.15" />
          </g>
        </svg>

        {/* Animated Bedtime "Zzz" effects drifting up */}
        <motion.span
          animate={{ y: [-10, -32], x: [0, 8], opacity: [0, 1, 0], scale: [0.8, 1.1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 0 }}
          className="absolute top-2 right-2 text-yellow-200 font-bold text-xs select-none font-serif"
        >
          z
        </motion.span>
        <motion.span
          animate={{ y: [-10, -40], x: [0, 14], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1.3 }}
          className="absolute top-0 -right-2 text-amber-300 font-bold text-sm select-none font-serif"
        >
          Z
        </motion.span>
        <motion.span
          animate={{ y: [-10, -48], x: [0, -10], opacity: [0, 1, 0], scale: [0.7, 1.0, 0.7] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: 2.6 }}
          className="absolute top-3 -left-1 text-yellow-100 font-semibold text-xs select-none font-serif"
        >
          z
        </motion.span>
      </motion.div>

      {/* Right Multi-layered Realistic Clouds Group */}
      <div className="relative flex items-center justify-start w-1/3 h-24">
        {/* Deep background cloud (slower, offset, dark) */}
        <motion.div
          animate={{ x: [10, -10, 10], y: [2, -2, 2] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-6 top-3 opacity-40 filter blur-[1px]"
        >
          <svg className="w-32 h-16 text-indigo-400/50" fill="currentColor" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="right-back-cloud-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path d="M20 40a15 15 0 0 1 1-29.9 18 18 0 0 1 33.7-4.1 15 15 0 0 1 25.3 12 15 15 0 0 1 5 22h-65z" fill="url(#right-back-cloud-grad)" />
          </svg>
        </motion.div>

        {/* Foreground cloud (larger, highlighted glowing cream edge) */}
        <motion.div
          animate={{ x: [8, -8, 8], y: [-3, 3, -3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-5 opacity-80 filter drop-shadow-[0_4px_14px_rgba(129,140,248,0.2)]"
        >
          <svg className="w-40 h-20 text-slate-150" fill="currentColor" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="right-front-cloud-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="75%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <path d="M20 40a15 15 0 0 1 1-29.9 18 18 0 0 1 33.7-4.1 15 15 0 0 1 25.3 12 15 15 0 0 1 5 22h-65z" fill="url(#right-front-cloud-grad)" />
          </svg>
        </motion.div>
      </div>

    </div>
  );
}
