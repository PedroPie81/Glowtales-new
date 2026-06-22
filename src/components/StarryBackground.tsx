import React, { useMemo } from "react";
import { Sparkles } from "lucide-react";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  speed: string;
  color: string;
}

export default function StarryBackground() {
  const starsList = useMemo(() => {
    const list: Star[] = [];
    const animationSpeeds = [
      "animate-twinkle-slow",
      "animate-twinkle-medium",
      "animate-twinkle-fast"
    ];
    const colors = [
      "text-amber-100",
      "text-amber-200",
      "text-blue-200",
      "text-yellow-100",
      "text-indigo-200"
    ];

    for (let i = 0; i < 55; i++) {
      list.push({
        id: i,
        top: Math.random() * 95,
        left: Math.random() * 98,
        size: Math.random() * 5 + 2, // stars size 2px to 7px
        speed: animationSpeeds[i % animationSpeeds.length],
        color: colors[i % colors.length]
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-b from-[#060919] via-[#090d26] to-[#040612]">
      {/* Star Field */}
      {starsList.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full opacity-80 ${star.color} ${star.speed}`}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: "currentColor"
          }}
        />
      ))}

      {/* Ambient Celestial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-indigo-900/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-950/15 blur-[120px]" />
      <div className="absolute top-3/4 left-2/3 w-[300px] h-[300px] rounded-full bg-violet-950/10 blur-[80px]" />

      {/* Cozy Whimsical Clouds (Background only) */}
      <div className="absolute top-12 left-[10%] opacity-15 filter blur-xs animate-float-cloud" style={{ animationDelay: "1s" }}>
        <svg width="180" height="80" viewBox="0 0 180 80" fill="currentColor" className="text-indigo-200">
          <path d="M40 50c0-11 9-20 20-20h5c3-11 13-19 25-19a31 31 0 0 1 31 30c5 0 9 4 9 9s-4 9-9 9h-61c-11 0-20-9-20-20z" opacity="0.6" />
        </svg>
      </div>
      <div className="absolute bottom-24 right-[12%] opacity-10 filter blur-[1px] animate-float-cloud" style={{ animationDelay: "3s" }}>
        <svg width="240" height="100" viewBox="0 0 240 100" fill="currentColor" className="text-violet-300">
          <path d="M50 60c0-13 11-24 24-24h6c4-13 16-23 30-23a37 37 0 0 1 37 36c6 0 11 5 11 11s-5 11-11 11H74c-13 0-24-11-24-24z" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}
