'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mockComments = [
  {
    id: 1,
    name: "Angry Reyna Main (Rank: Iron 2)",
    text: "He spent 200 customizing his crosshair instead of practicing his recoil. We lost 13-5."
  },
  {
    id: 2,
    name: "Exhausted Sage (G3 Smurf)",
    text: "Please buy him a skin. He's been using the default pistol for 5 acts and it's physically painful to spectate."
  },
  {
    id: 3,
    name: "Random Cypher (In The Corner)",
    text: "Donated ₹1. He still hasn't dropped me a gun. 10/10 immersion."
  },
  {
  id: 4,
  name: "Tilted Jett (Peaked Silver 1)",
  text: "Bought a new mouse for better aim. Still dashes into 5 people every round. Science can't explain this."
},
{
  id: 5,
  name: "Silent Omen (Definitely Not AFK)",
  text: "Donated ₹20 hoping he'd speak. He didn't. Just more mysterious smoke placements."
},
{
  id: 6,
  name: "Overconfident Phoenix (Hardstuck Bronze)",
  text: "Said 'trust me bro' before flashing the entire team. Donation well spent."
},
{
  id: 7,
  name: "Eco Round Economist",
  text: "Gave ₹50 but he's still forcing every round. Financial decisions remain questionable."
},
{
  id: 8,
  name: "Backseat Coach (Dead Since Round 2)",
  text: "Donated just to say 'play slow' while spectating. Truly impactful gameplay."
},
{
  id: 9,
  name: "Lagging Duelist (Ping: 120ms)",
  text: "Invested ₹30 in hope of smoother gameplay. Instead, witnessed teleportation mechanics."
},
{
  id: 10,
  name: "Clutch-or-Kick Specialist",
  text: "Donated ₹50 for confidence boost. He saved. In a 1v1. Legendary."
},
];

const TestimonialsSlider = () => {
  const [comments, setComments] = useState(mockComments);
  const [currentIndex, setCurrentIndex] = useState(0);



  useEffect(() => {
    // Auto slider
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % comments.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [comments.length]);

  return (
    <section className="w-full py-20 px-4 flex flex-col items-center border-t border-val-light/5">
      <h2 className="font-epilogue font-black text-3xl md:text-4xl italic uppercase text-val-light tracking-tighter mb-16 text-center">
        What the "Team" Says
      </h2>

      <div className="w-full max-w-4xl relative min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center px-8">
              <span className="text-val-red font-epilogue text-6xl leading-none absolute -top-8 left-4 opacity-50">"</span>
              <p className="font-inter text-val-light text-lg md:text-xl italic mb-6 relative z-10">
                {comments[currentIndex].text}
              </p>
              <p className="font-space text-val-red uppercase text-xs tracking-widest font-bold">
                — {comments[currentIndex].name}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 mt-8">
        {comments.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-val-red w-6' : 'bg-val-light/20'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSlider;
