'use client';
import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center pt-24 pb-16 px-4">
      {/* Glitch Headline */}
      <div className="relative text-center mb-8">
        <h2 className="text-val-red font-space uppercase tracking-widest text-xs md:text-sm font-bold mb-4 flex items-center justify-center gap-4">
          <span className="w-12 h-[1px] bg-val-red/50"></span>
          Status: Hardstuck Iron (0 RR)
          <span className="w-12 h-[1px] bg-val-red/50"></span>
        </h2>
        <h1 className="font-epilogue font-black text-5xl md:text-7xl lg:text-8xl italic uppercase text-val-light tracking-tighter leading-none mb-2">
          Help me <span className="text-val-red">whiff</span> in<br />style.
        </h1>
      </div>

      {/* Quote Box */}
      <div className="border border-val-red/30 bg-val-red/5 p-6 md:p-8 max-w-2xl text-center mb-10 notched-tr notched-bl relative">
        <p className="font-inter text-val-light/80 text-sm md:text-base italic mb-2">
          "I don't have bad aim, I just have default skins. Science proves that a Kuronami Vandal increases headshot percentage by 420%."
        </p>
        <p className="font-space text-xs text-val-red/70 uppercase">— Source: Trust me bro</p>
      </div>

      {/* Subtext */}
      <p className="font-space text-val-red uppercase text-xs md:text-sm tracking-widest text-center max-w-xl mb-10 font-bold">
        For the price of one latte, you can help a hard-stuck Iron 1 player pretend they have talent with a Kuronami Vandal.
      </p>

      {/* CTA Button */}
      <a 
        href="#armory-access" 
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('armory-access')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="group relative inline-flex items-center justify-center bg-val-red text-white font-space font-bold uppercase tracking-widest px-8 py-4 text-sm hover:bg-white hover:text-val-red transition-colors duration-300 notched-tr notched-bl glitch-hover cursor-pointer"
      >
        Send Emotional Support (VP)
        <span className="absolute inset-0 border border-val-red -translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></span>
      </a>
    </section>
  );
};

export default Hero;
