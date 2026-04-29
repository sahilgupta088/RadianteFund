'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Progress = () => {
  const [currentAmount, setCurrentAmount] = useState(330);
  const targetAmount = 2000; // Kuronami Bundle roughly or standard
  
  useEffect(() => {
    // Fetch real donation total from backend
    const fetchProgress = async () => {
      try {
        const res = await fetch('/api/progress');
        if (res.ok) {
          const data = await res.json();
          if (data.totalAmount) {
            setCurrentAmount(data.totalAmount);
          }
        }
      } catch (error) {
        console.error("Failed to fetch progress", error);
      }
    };
    
    fetchProgress();
    
    // Optional: Refresh progress periodically
    const interval = setInterval(fetchProgress, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, []);
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 px-4">
      {/* Glitch Spike Title */}
      <div className="relative text-center mb-10 w-full max-w-4xl">
        <div className="absolute inset-0 bg-val-red/5 blur-3xl rounded-full"></div>
        <h2 className="font-epilogue font-black text-6xl md:text-8xl italic uppercase text-val-red tracking-tighter leading-none animate-pulse text-shadow-glitch">
          SPIKE IS<br />TICKING...
        </h2>
      </div>

      {/* Alert Banner */}
      <div className="bg-val-red/10 border border-val-red/40 px-6 py-3 flex items-center gap-4 mb-12 notched-tl notched-br">
        <span className="bg-val-red text-white text-xs font-bold px-2 py-1 uppercase tracking-wider font-space">Alert:</span>
        <p className="font-space text-val-red text-xs md:text-sm uppercase tracking-widest">
          Every second without a premium skin is another round lost to a default classic. The psychological damage is irreversible.
        </p>
      </div>

      {/* Terminal UI Progress Box */}
      <div className="w-full max-w-3xl bg-[#111] border border-val-red/20 p-8 notched-tr notched-bl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-val-red to-transparent opacity-50"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-val-red/50 flex items-center justify-center relative">
              <div className="absolute inset-1 rounded-full border border-val-red/20 animate-spin-slow"></div>
              <div className="w-4 h-4 bg-val-red rounded-sm animate-ping"></div>
            </div>
            <div>
              <p className="font-space text-val-red uppercase text-xs tracking-widest font-bold">Signal Strength: {Math.round(percentage)}%</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-space text-val-light/60 uppercase text-xs tracking-widest mb-1">Target: Kuronami Bundle</p>
            <p className="font-space text-val-light font-bold text-lg tracking-widest">₹{targetAmount} (2375 VP)</p>
          </div>
        </div>

        {/* The Bar */}
        <div className="w-full h-4 bg-[#222] relative overflow-hidden mb-4 border border-[#333]">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-val-red"
          >
            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
          </motion.div>
        </div>

        <div className="flex justify-between items-center text-xs font-space text-val-light/50 uppercase tracking-widest">
          <span>₹{currentAmount} Committed</span>
          <span>Code: VP-73 Detonator</span>
        </div>
      </div>

      <p className="font-inter text-val-red text-xs italic mt-6 opacity-70">
        * BEEP... BEEP... BEEP... (If it reaches 100%, I promise to top frag for one whole match)*
      </p>
    </section>
  );
};

export default Progress;
