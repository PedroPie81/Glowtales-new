import React from "react";
import { Sparkles, Moon, Brain, Heart, GraduationCap } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 p-6 md:p-10 text-white relative z-10 shadow-2xl">
      
      {/* Whimsical Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 mb-4 text-indigo-300">
          <Brain className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-sky-100 to-indigo-300 tracking-tight leading-snug">
          About Our Sensory-Friendly AI Storybook Mission
        </h1>
        <p className="text-slate-400 text-sm mt-3 max-w-2xl mx-auto italic">
          "Creating customized story worlds where neurodivergent imagination finds comfort, routines find rhythm, and deep interests find celebration."
        </p>
      </div>

      {/* Main Narrative - SEO optimized blocks */}
      <div className="space-y-8 text-slate-300">
        
        {/* Section 1: The Magic of Special Interests */}
        <div className="bg-slate-950/40 p-6 rounded-2xl border border-indigo-950">
          <h2 className="text-lg font-bold text-amber-200 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Empowering Autistic Kids with Custom Stories
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Neurodivergent children (including those with <strong>Autism Spectrum Conditions, ADHD, and Sensory Processing Differences</strong>) often have deep, intense special interests. Rather than distracting them, these interests act as deep neural bridges. By building personalized stories that place a child's favorite locomotive, galaxy, or dinosaur as a source of safety, comfort, and routine, we lower cortisol levels, quiet their nervous systems, and guide them into a peaceful frame of mind.
          </p>
        </div>

        {/* Section 2: Sensory-Safe Storytelling Structures */}
        <div id="therapy-block" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-950/30 border border-indigo-950/80">
            <h3 className="text-sm uppercase tracking-wide font-bold text-sky-300 mb-2 flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Sensory-Safe Reading Paths
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard children's books can contain high-drama scenarios, loud formatting, or complex metaphors that cause bedtime alertness. Our stories are compiled with clear, comfortable linear pacing, therapeutic breathing intervals, and literal reassuring vocabulary designed to prepare active ADHD and tactile minds for deep, calm rest.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/30 border border-indigo-950/80">
            <h3 className="text-sm uppercase tracking-wide font-bold text-indigo-300 mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Gentle Trigger Management
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Whether a child is triggered by storm noises, dogs barking, or specific crawling insects, parents know best. We offer two modes: <strong>Absolute Protection</strong> (never mentioning triggers, guaranteeing a safe, cozy mental sanctuary) or <strong>Gentle Support</strong> (slowly introducing a concept in a soothing, empowering scene with calming exercises) to encourage emotional regulation.
            </p>
          </div>
        </div>

        {/* Section 3: Educational Perspective */}
        <div className="p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/10 flex flex-col md:flex-row gap-5 items-center">
          <div className="p-4 rounded-xl bg-indigo-950/80 text-amber-200 border border-indigo-800">
            <GraduationCap className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-100 mb-1">Pedagogical Alignment</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our generator is built keeping in mind neuro-affirming speech therapy, social narratives, and trauma-informed cognitive science principles. We don't write to "correct" our heroes—we write to support them exactly as they are. In each starry story, the child is the powerful, gentle protagonist who completes space exploration, boards trains, or enjoys sensory moments comfortably.
            </p>
          </div>
        </div>

        {/* Core Slogan Footer */}
        <div className="text-center pt-4 border-t border-indigo-950/60 pb-2">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
            Tailoring Calming Bedtime Worlds, One Star At A Time.
          </span>
        </div>

      </div>
    </div>
  );
}
