import React from 'react';

const NewsTicker = () => {
  const messages = [
    "BREAKING NEWS: BOTTOM FRAG SPOTTED BLAMING LAG FOR WHIFFING ENTIRE VANDAL MAGAZINE",
    "•",
    "UPDATE: LOCAL SAGE MAIN REFUSES TO HEAL REYNA AFTER 0-12 HALF",
    "•",
    "ALERT: SPIKE DROPPED IN SPAWN AGAIN",
    "•",
    "FINANCIAL REPORT: VP RESERVES AT CRITICAL LOWS",
    "•",
    "SCIENTIFIC STUDY: NO, A NEW KNIFE WON'T FIX YOUR GAME SENSE",
    "•"
  ];

  const content = messages.map((msg, idx) => (
    <span key={idx} className="mx-4 whitespace-nowrap">
      {msg}
    </span>
  ));

  return (
    <div className="w-full bg-val-red text-white font-space text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2 overflow-hidden flex items-center border-b border-val-red/30">
      <div className="flex min-w-max shrink-0 animate-marquee items-center">
        {content}
      </div>
      <div className="flex min-w-max shrink-0 animate-marquee items-center" aria-hidden="true">
        {content}
      </div>
    </div>
  );
};

export default NewsTicker;
