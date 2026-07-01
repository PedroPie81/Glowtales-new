import React, { useMemo } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  speed: string;
  color: string;
  delay: string;
  duration: string;
  opacity: number;
  glow: boolean;
}

export default function StarryBackground() {
  const starsList = useMemo(() => {
    const list: Star[] = [];
    const animationSpeeds = [
      "animate-twinkle-slow",
      "animate-twinkle-medium",
      "animate-twinkle-fast"
    ];
    
    // Realistic night sky color palette for stars
    const colors = [
      "text-white",
      "text-amber-100",
      "text-amber-200",
      "text-blue-100",
      "text-blue-200",
      "text-indigo-100",
      "text-yellow-100",
      "text-slate-100"
    ];

    // Generate 130 stars of different sizes and depths for realism
    for (let i = 0; i < 130; i++) {
      let size = 0.8;
      let opacity = 0.3;
      let glow = false;

      // Grouping into realistic layers (deep field, middle twilight, prominent foreground)
      if (i < 75) {
        // Layer 1: Tiny, faint, deep-space stars
        size = Math.random() * 0.5 + 0.7; // 0.7px to 1.2px
        opacity = Math.random() * 0.4 + 0.2; // 0.2 to 0.6 opacity
      } else if (i < 115) {
        // Layer 2: Medium twinkling stars
        size = Math.random() * 0.8 + 1.2; // 1.2px to 2.0px
        opacity = Math.random() * 0.4 + 0.5; // 0.5 to 0.9 opacity
      } else {
        // Layer 3: Brighter, prominent glowing stars
        size = Math.random() * 1.0 + 2.0; // 2.0px to 3.0px
        opacity = Math.random() * 0.3 + 0.7; // 0.7 to 1.0 opacity
        glow = true;
      }

      list.push({
        id: i,
        top: Math.random() * 98,
        left: Math.random() * 98,
        size: parseFloat(size.toFixed(2)),
        speed: animationSpeeds[i % animationSpeeds.length],
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: `${(Math.random() * 7).toFixed(1)}s`,
        duration: `${(Math.random() * 5 + 3).toFixed(1)}s`,
        opacity: parseFloat(opacity.toFixed(2)),
        glow
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-[#040614] via-[#070b22] to-[#03040c]">
      
      {/* High-Fidelity Realistic Star Field */}
      {starsList.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full ${star.color} ${star.speed}`}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "currentColor",
            animationDelay: star.delay,
            animationDuration: star.duration,
            opacity: star.opacity,
            boxShadow: star.glow 
              ? `0 0 ${star.size * 2.5}px currentColor` 
              : "none",
          }}
        />
      ))}

      {/* Rare Realistic Shooting Stars with long delays & elegant trails */}
      {/* Shooting Star 1 */}
      <div 
        className="absolute top-[12%] right-[15%] w-24 h-[1px] bg-gradient-to-l from-white via-indigo-100 to-transparent opacity-0 animate-shooting-star-1"
        style={{
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.4)"
        }}
      />
      {/* Shooting Star 2 */}
      <div 
        className="absolute top-[28%] right-[5%] w-28 h-[1px] bg-gradient-to-l from-amber-100 via-white to-transparent opacity-0 animate-shooting-star-2"
        style={{
          boxShadow: "0 0 6px rgba(254, 243, 199, 0.3)"
        }}
      />
      {/* Shooting Star 3 */}
      <div 
        className="absolute top-[6%] right-[38%] w-20 h-[1.2px] bg-gradient-to-l from-white via-sky-100 to-transparent opacity-0 animate-shooting-star-3"
        style={{
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
        }}
      />

      {/* Ambient Celestial Deep Space Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-950/10 blur-[130px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-blue-950/15 blur-[140px]" />
      <div className="absolute top-3/4 left-2/3 w-[350px] h-[350px] rounded-full bg-violet-950/10 blur-[110px]" />

      {/* Cozy Whimsical Clouds (Soft background layer) */}
      <div className="absolute top-24 left-[12%] opacity-10 filter blur-[2px] animate-float-cloud" style={{ animationDelay: "1s" }}>
        <svg width="220" height="90" viewBox="0 0 180 80" fill="currentColor" className="text-indigo-900/30">
          <path d="M40 50c0-11 9-20 20-20h5c3-11 13-19 25-19a31 31 0 0 1 31 30c5 0 9 4 9 9s-4 9-9 9h-61c-11 0-20-9-20-20z" />
        </svg>
      </div>
      <div className="absolute bottom-32 right-[15%] opacity-8 filter blur-[2px] animate-float-cloud" style={{ animationDelay: "4.5s" }}>
        <svg width="280" height="110" viewBox="0 0 240 100" fill="currentColor" className="text-indigo-950/40">
          <path d="M50 60c0-13 11-24 24-24h6c4-13 16-23 30-23a37 37 0 0 1 37 36c6 0 11 5 11 11s-5 11-11 11H74c-13 0-24-11-24-24z" />
        </svg>
      </div>
    </div>
  );
}
