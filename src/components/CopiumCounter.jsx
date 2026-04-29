'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CopiumCounter = () => {
  const [copiumCount, setCopiumCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Fetch initial count from backend
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/copium');
        if (res.ok) {
          const data = await res.json();
          setCopiumCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch copium count", error);
      }
    };
    fetchCount();
  }, []);

  const handleInhale = async () => {
    const increment = 1;
    
    // Optimistic update
    setCopiumCount(prev => prev + increment);
    
    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    // Persist to backend
    try {
      await fetch('/api/copium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ increment })
      });
    } catch (error) {
      console.error("Failed to update copium count", error);
      // Revert if failed (optional, but keep it simple for now)
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center py-24 px-4">
      <div className="w-full max-w-3xl bg-[#0f1923] border border-val-light/10 p-10 flex flex-col items-center text-center relative overflow-hidden group">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-val-red"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-val-red"></div>

        <h2 className="font-epilogue font-black text-3xl uppercase italic text-val-light mb-8">
          Still not convinced to<br />donate?
        </h2>

        <button
          onClick={handleInhale}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative px-8 py-4 bg-transparent border border-val-light/30 text-val-light font-space font-bold tracking-widest uppercase text-sm hover:border-val-red hover:text-val-red transition-all duration-300 mb-10 z-10"
        >
          Inhale Copium
          {isHovered && (
            <motion.div 
              layoutId="outline"
              className="absolute -inset-1 border border-val-red opacity-50 z-[-1]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            />
          )}
        </button>

        <div className="flex flex-col items-center">
          <p className="font-space text-val-red uppercase text-[10px] tracking-[0.3em] font-bold mb-2">
            Global Monitoring System
          </p>
          <div className="flex items-end gap-2">
            <h3 className="font-epilogue font-black text-4xl md:text-5xl italic text-val-light uppercase">
              Mg of Copium Inhaled: 
            </h3>
            <motion.span 
              key={copiumCount}
              initial={isAnimating ? { scale: 1.5, color: '#ff4655' } : {}}
              animate={{ scale: 1, color: '#ff4655' }}
              className="font-epilogue font-black text-4xl md:text-5xl italic text-val-red uppercase"
            >
              {copiumCount.toLocaleString()}
            </motion.span>
          </div>
        </div>

        <p className="font-space text-[8px] text-val-light/20 uppercase tracking-widest mt-8">
          WARNING: LETHAL DOSES OF COPIUM MAY LEAD TO DELUSIONS OF BEING "RADIANT BOUND IN 2026".
        </p>
      </div>
    </section>
  );
};

export default CopiumCounter;
