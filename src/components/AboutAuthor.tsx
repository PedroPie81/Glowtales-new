import React from "react";
import { Heart, Mail, Sparkles, BookOpen, Stars } from "lucide-react";

export default function AboutAuthor() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 p-6 md:p-10 text-white relative z-10 shadow-2xl">
      
      {/* Whimsical Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-pink-950/80 border border-pink-500/30 mb-4 text-pink-300">
          <Heart className="w-8 h-8 fill-pink-500/20" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 tracking-tight leading-snug">
          Meet Peter: A Devoted Autism Dad
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto italic">
          Father of 2 boys, builder of starry worlds, advocate for neurodiverse comfort.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-indigo-100 text-sm leading-relaxed mt-6">
        
        {/* Decorative Profile Silhouette Card */}
        <div className="w-48 h-48 rounded-2xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-indigo-900 border-2 border-slate-700/50 flex flex-col items-center justify-center text-center p-4 relative z-10 shrink-0">
          <div className="absolute top-2 right-2 opacity-35 animate-pulse">
            <Stars className="w-5 h-5 text-amber-300" />
          </div>
          <div className="w-20 h-20 rounded-full bg-slate-800 border bg-indigo-550/10 border-indigo-500/30 flex items-center justify-center text-3xl font-bold font-serif text-pink-200 mb-3 shadow-md select-none">
            P
          </div>
          <h3 className="font-bold text-slate-100 text-sm tracking-tight">Peter A. J.</h3>
          <p className="text-[11px] text-pink-300/80 uppercase tracking-widest font-mono font-semibold mt-1">Dad of Two Boys</p>
        </div>

        {/* Peter's Narrative Letter */}
        <div className="space-y-5 text-slate-300">
          
          <p>
            Hello there! I'm <strong>Peter</strong>, and I want to welcome you from the bottom of my heart to this starry corner of the internet. 
          </p>

          <p>
            As a <strong>dad of two wonderful boys</strong>, my path changed when my eldest son was diagnosed on the autism spectrum. Living with autism inside my immediate household—and seeing similar neurodivergent beauty in my wider family of <strong>beloved cousins and nephews</strong>—revealed a major challenge: finding standard children's books that actually clicked.
          </p>

          <p>
            Often, commercial text uses confusing metaphoric phrases, sudden loud dramatic shifts, or overstimulating page layout colors. Most of all, they rarely featured my son's intense, passionate <strong>special interests</strong>. If he wanted to read about deep-sea submarine valves or railway steam manifolds, we usually had to read dry technical manuals before bed!
          </p>

          <div className="p-5 rounded-2xl bg-pink-900/10 border border-pink-500/20 italic text-slate-200">
            "I wanted children to close their eyes feeling secure, heard, and deeply understood. By weaving their favorite special interests into peaceful routine stories, we convert nighttime hyperactive energy into comforting, dreamy rest."
          </div>

          <p>
            That's why I created this completely free space. Our generator utilizes the brilliant <strong>Gemini 3.5 Flash server-side engine</strong> to merge parameters you specify—names, interests, triggers, ages—into standard story pages geared to calm sensory overload. There are no corporate backers or sneaky subscriptions here: just one parent building resources for another.
          </p>

          {/* Contact Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Mail className="w-4 h-4 text-pink-400" />
              <span>Contact: <strong>peteradamj@gmail.com</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-200 uppercase bg-amber-950/30 px-3 py-1.5 rounded-xl border border-amber-900/30">
              <Sparkles className="w-3.5 h-3.5" />
              Family First Always
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
