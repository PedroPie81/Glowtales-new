import React, { useState } from "react";
import { Story, ThemeFont } from "../types";
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowLeft,
  Moon,
  Heart,
  LayoutList,
  Layers,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StoryReaderProps {
  story: Story;
  onBack: () => void;
}

export default function StoryReader({ story, onBack }: StoryReaderProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0); // active page index for Page-by-Page view mode
  const [fontSize, setFontSize] = useState<number>(20); // standard font size in pixels
  const [fontType, setFontType] = useState<ThemeFont>("dyslexic");
  const [viewMode, setViewMode] = useState<"scroll" | "pages">("scroll"); // 'scroll' is continuous scroll, 'pages' is page-by-page

  // Render cozy custom-themed illustration matching the child's interests
  const renderSensoryIllustration = (promptText: string) => {
    const term = promptText.toLowerCase();
    let interestThemeSvg: React.ReactNode = null;

    if (term.includes("train") || term.includes("locomotive") || term.includes("railway")) {
      interestThemeSvg = (
        <svg className="w-20 h-20 text-blue-300 opacity-60" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          <path d="M4 11h2v2H4zm14 0h2v2h-2z" />
        </svg>
      );
    } else if (term.includes("space") || term.includes("rocket") || term.includes("astronaut") || term.includes("galaxy")) {
      interestThemeSvg = (
        <svg className="w-20 h-20 text-indigo-300 opacity-70 animate-bounce" style={{ animationDuration: "6s" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84-4.55C9.5 8.35 10 6.64 10.95 5.5a10.5 10.5 0 0 0 .54 11h-.01a11.13 11.13 0 0 0 4.12-2.13z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707" />
        </svg>
      );
    } else if (term.includes("dinosaur") || term.includes("fossil") || term.includes("triceratops")) {
      interestThemeSvg = (
        <svg className="w-20 h-20 text-emerald-400 opacity-60" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm4-4h-8v-2h8v2zm0-4H7V9h10v2z" />
        </svg>
      );
    } else {
      interestThemeSvg = (
        <svg className="w-20 h-20 text-amber-100 opacity-80 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.37 13.78a1 1 0 00-1.29-.29 8 8 0 11-9.9-9.9 1 1 0 00-.29-1.29A1 1 0 008.6 2.6a10 10 0 1013.06 13.06 1 1 0 00-.29-1.88z" />
        </svg>
      );
    }

    return (
      <div className="relative w-full rounded-2xl bg-slate-950/70 border border-indigo-950 p-5 text-center select-none shadow-md overflow-hidden flex flex-col items-center justify-center min-h-[140px]">
        {/* Soft Background Art Pattern */}
        <div className="absolute inset-0 opacity-5 flex flex-wrap gap-4 p-4 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <Sparkles key={i} className="w-3.5 h-3.5 text-violet-300" />
          ))}
        </div>

        {/* Dynamic Theme Icon */}
        <div className="z-10 mb-3 transform hover:scale-105 transition-transform duration-500">
          {interestThemeSvg}
        </div>

        {/* Cozy Text Label Description */}
        <div className="z-10 max-w-md">
          <p className="text-xs font-medium text-slate-300 italic leading-relaxed px-4">
            "{promptText}"
          </p>
        </div>
      </div>
    );
  };

  const totalPages = story.pages.length + 2; // Cover + story pages + back cover

  return (
    <div id="story-reader" className="w-full max-w-5xl mx-auto rounded-3xl bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 p-5 md:p-8 text-white relative z-10 shadow-2xl overflow-hidden">
      
      {/* Background celestial glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-950/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-950/10 rounded-full blur-3xl pointer-events-none" />

      {/* Reader Toolbox Command Center */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-950/60 pb-5 mb-6 relative z-10">
        
        <button
          onClick={onBack}
          id="reader-back-btn"
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Bookshelf
        </button>

        {/* Control options for parents */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* VIEW MODE SELECTOR */}
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-indigo-950">
            <button
              onClick={() => setViewMode("scroll")}
              id="view-mode-scroll-btn"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                viewMode === "scroll"
                  ? "bg-indigo-600 text-white shadow-md font-extrabold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              Continuous Scroll (No Page Turns)
            </button>
            <button
              onClick={() => {
                setViewMode("pages");
                setCurrentPageIndex(0); // Reset to cover
              }}
              id="view-mode-pages-btn"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
                viewMode === "pages"
                  ? "bg-indigo-600 text-white shadow-md font-extrabold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Page-by-Page
            </button>
          </div>

          {/* Dyslexic/Classic Font Settings */}
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-indigo-950">
            <button
              onClick={() => setFontType("dyslexic")}
              id="reader-font-dyslexic"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                fontType === "dyslexic"
                  ? "bg-indigo-650 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Dyslexia Spacing
            </button>
            <button
              onClick={() => setFontType("serif")}
              id="reader-font-serif"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                fontType === "serif"
                  ? "bg-indigo-650 text-white shadow-md font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Classic Storybook
            </button>
          </div>

          {/* Font Sizes */}
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-indigo-950">
            <button
              onClick={() => setFontSize(Math.max(16, fontSize - 2))}
              className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-bold"
              title="Smaller font"
            >
              A-
            </button>
            <span className="text-xs px-1 text-slate-300 font-mono select-none">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(30, fontSize + 2))}
              className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-bold"
              title="Larger font"
            >
              A+
            </button>
          </div>

        </div>

      </div>

      {viewMode === "scroll" ? (
        /* ---------------------------------------------------- */
        /* CONTINUOUS SCROLL MODE (NO PAGE TURNS IS COMMITTED!) */
        /* ---------------------------------------------------- */
        <div id="continuous-story-scroll" className="space-y-12 py-4 max-w-4xl mx-auto text-left relative z-10">
          
          {/* Cozy Splash Header */}
          <div id="scroll-header-panel" className="text-center p-6 md:py-10 border border-yellow-500/10 rounded-2xl bg-[#090e29]/50 relative overflow-hidden">
            <div className="absolute top-4 right-4 animate-float-cloud">
              <Moon className="w-10 h-10 text-yellow-105 fill-yellow-200/20" />
            </div>
            
            <span className="text-[10px] tracking-widest font-mono text-indigo-305 uppercase bg-indigo-950/70 border border-indigo-900/40 px-3 py-1 rounded-full mb-4 inline-block">
              Continuous Bedtime Scroll
            </span>

            <h1 className="text-3.5xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 tracking-tight leading-snug mb-3 font-serif">
              {story.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400 mb-6 font-mono">
              <span className="bg-slate-950/80 px-2.5 py-1 rounded-full">
                Protagonist: {story.parameters.childName} (Age {story.parameters.childAge})
              </span>
              <span className="bg-slate-950/80 px-2.5 py-1 rounded-full">
                Tone: {story.parameters.style}
              </span>
              <span className="bg-slate-950/80 px-2.5 py-1 rounded-full">
                Length: {story.parameters.length}
              </span>
            </div>

            <p className="text-slate-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
              This starry story is compiled specifically to suit your child's interest in the wonders of <strong className="text-amber-250 font-semibold">{story.parameters.interests}</strong>. Keep scrolling down to read the full magical tale together!
            </p>
          </div>

          {/* Sequential Page Content - Large High-Width Design */}
          <div className="space-y-10">
            {story.pages.map((page, index) => (
              <div 
                key={page.pageNumber} 
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-[#080d26]/40 border border-indigo-950/60"
              >
                {/* Visual Illustration panel */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3">
                  {renderSensoryIllustration(page.illustrationPrompt)}
                </div>

                {/* Expanded Wide Reading Panel */}
                <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-300 block">
                    Chapter {page.pageNumber} of {story.pages.length}
                  </span>
                  
                  <div
                    className={`text-slate-100 font-medium ${
                      fontType === "dyslexic" ? "font-dyslexic-friendly" : "font-serif leading-relaxed tracking-wide text-justify"
                    }`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {page.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Moral & Closing Section */}
          <div id="scroll-footer-panel" className="text-center p-8 border border-indigo-500/10 rounded-2xl bg-[#070b24]/50">
            <div className="text-yellow-200 mb-4 inline-block">
              <Moon className="w-10 h-10 animate-pulse" />
            </div>

            <h2 className="text-2xl font-extrabold text-indigo-200 tracking-tight mb-2 font-serif">
              Peaceful Moral Summary
            </h2>

            <div 
              className={`text-slate-200 max-w-xl mx-auto leading-relaxed italic p-5 bg-indigo-950/30 rounded-2xl border border-indigo-900/30 ${
                fontType === "dyslexic" ? "font-dyslexic-friendly" : "font-serif text-lg"
              }`}
              style={{ fontSize: `${fontSize}px` }}
            >
              "{story.moral}"
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={onBack}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs uppercase rounded-xl tracking-wider hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                Finish Bedtime Story
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* ---------------------------------------------------- */
        /* EXPANDED PAGE-BY-PAGE VIEW MODE WITH EXPANDED WIDTH   */
        /* ---------------------------------------------------- */
        <div className="relative min-h-[460px] flex flex-col justify-between py-2 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPageIndex}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {/* COVER PAGE */}
              {currentPageIndex === 0 && (
                <div id="story-cover-panel-pbp" className="flex flex-col items-center justify-center text-center p-6 md:py-16 border border-yellow-500/10 rounded-2xl bg-[#090e29]/70 relative overflow-hidden">
                  <div className="absolute top-4 right-4 animate-float-cloud">
                    <Moon className="w-12 h-12 text-yellow-105 fill-yellow-200/20" />
                  </div>
                  
                  <div className="w-20 h-20 rounded-full bg-indigo-950/80 flex items-center justify-center p-4 border border-indigo-500/30 mb-6 text-amber-300 shadow-xl">
                    <BookOpen className="w-10 h-10" />
                  </div>

                  <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 tracking-tight leading-snug mb-4 max-w-3xl font-serif">
                    {story.title}
                  </h1>

                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 mb-8 font-mono">
                    <span className="bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/40">
                      Hero: {story.parameters.childName} (Age {story.parameters.childAge})
                    </span>
                    <span className="bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-900/40">
                      Theme: {story.parameters.style}
                    </span>
                    <span className="bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/40">
                      {story.pages.length} Pages
                    </span>
                  </div>

                  <p className="text-slate-300/95 max-w-lg text-sm leading-relaxed mb-8">
                    Personalized with love to cherish your special passion for <strong className="text-amber-200 font-semibold">{story.parameters.interests}</strong>. Let's step into this starry world together.
                  </p>

                  <button
                    onClick={() => setCurrentPageIndex(1)}
                    id="start-pbp-btn"
                    className="px-8 py-3.5 bg-gradient-to-r from-yellow-300 to-amber-400 text-slate-950 font-bold tracking-wide text-xs rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all uppercase flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    Open Storybook
                  </button>
                </div>
              )}

              {/* STORY PAGES WITH LARGER TEXT WIDTH CAPACITY */}
              {currentPageIndex > 0 && currentPageIndex <= story.pages.length && (
                <div id="story-pages-pbp-panel" className="space-y-6">
                  {/* Visual Illustration stacked beautifully to allow MAXIMUM readable width below */}
                  <div className="max-w-2xl mx-auto">
                    {renderSensoryIllustration(story.pages[currentPageIndex - 1].illustrationPrompt)}
                  </div>

                  {/* Wide Text Area - beautifully stretched for quick reading with fewer lines */}
                  <div className="max-w-4xl mx-auto bg-slate-950/35 border border-indigo-950/60 p-6 md:p-8 rounded-2xl space-y-3">
                    <span className="text-[11px] tracking-widest font-mono text-indigo-305 uppercase flex items-center gap-1.5 justify-center">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
                      Page {currentPageIndex} of {story.pages.length}
                    </span>
                    
                    <div
                      id={`story-page-text-pbp-${currentPageIndex}`}
                      className={`text-slate-100 text-center font-medium ${
                        fontType === "dyslexic" ? "font-dyslexic-friendly" : "font-serif leading-relaxed tracking-wide"
                      }`}
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {story.pages[currentPageIndex - 1].text}
                    </div>
                  </div>
                </div>
              )}

              {/* MORAL WRAP PAGE */}
              {currentPageIndex === story.pages.length + 1 && (
                <div id="story-moral-pbp-panel" className="flex flex-col items-center justify-center text-center p-6 md:py-16 border border-indigo-500/10 rounded-2xl bg-[#070b24]/80 relative overflow-hidden">
                  <div className="text-yellow-250 mb-5 animate-pulse">
                    <Moon className="w-14 h-14" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-200 tracking-tight mb-4 font-serif">
                    A Quiet Promise
                  </h2>

                  <div 
                    className={`text-slate-200 max-w-xl mb-8 leading-relaxed italic p-6 bg-indigo-950/40 rounded-2xl border border-indigo-900/30 ${
                      fontType === "dyslexic" ? "font-dyslexic-friendly" : "font-serif text-lg"
                    }`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    "{story.moral}"
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => setCurrentPageIndex(0)}
                      className="px-6 py-2.5 bg-slate-800 hover:bg-slate-705 text-slate-200 text-xs font-semibold rounded-xl uppercase tracking-wider transition-all"
                    >
                      Read again
                    </button>
                    <button
                      onClick={onBack}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 text-xs font-bold rounded-xl tracking-wider transition-all uppercase flex items-center gap-1.5"
                    >
                      <Heart className="w-4 h-4" />
                      Close Book
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Book Footer / Navigation Controls for Page-by-page */}
          <div className="flex items-center justify-between border-t border-indigo-950/60 pt-5 mt-6 relative z-10 text-xs text-slate-400 font-mono select-none">
            
            <button
              onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
              disabled={currentPageIndex === 0}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentPageIndex === 0
                  ? "opacity-30 cursor-not-allowed text-slate-600"
                  : "text-slate-300 hover:bg-slate-850 hover:text-white"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <span className="bg-slate-950/50 px-3 py-1.5 rounded-full font-semibold">
              {currentPageIndex === 0 
                ? "Story Cover" 
                : currentPageIndex === story.pages.length + 1 
                ? "Story Moral" 
                : `Page ${currentPageIndex} of ${story.pages.length}`}
            </span>

            <button
              onClick={() => setCurrentPageIndex(Math.min(totalPages - 1, currentPageIndex + 1))}
              disabled={currentPageIndex === totalPages - 1}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentPageIndex === totalPages - 1
                  ? "opacity-30 cursor-not-allowed text-slate-600"
                  : "text-slate-300 hover:bg-slate-850 hover:text-white"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
