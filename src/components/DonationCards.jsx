'use client';
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const DonationCards = () => {
  const [customAmount, setCustomAmount] = useState('');
  
  const tiers = [
    {
      id: 'tier1',
      price: 50,
      name: "The 'Pistol Specialist'",
      desc: "It's just a classic, but you pretend it has a right-click feature. Guaranteed to miss 100% of the shots I don't take.",
      btnText: "DROP A CLASSIC",
    },
    {
      id: 'tier2',
      price: 100,
      name: "The 'Full Shield'",
      desc: "Helps me survive exactly 0.5s longer against an Op. Every millisecond counts when you're getting swung by a Reyna.",
      btnText: "BUY FULL SHIELDS",
      highlight: true,
    },
    {
      id: 'tier3',
      price: 500,
      name: "The 'Vandal Giver'",
      desc: "I'll buy the expensive skin and immediately die so you can pick it up. It's an investment for the team, really.",
      btnText: "FUND THE FULL BUY",
    }
  ];

  const handleDonateClick = async (e, tierId) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/payment-links');
      if (res.status === 429) {
        alert("Rate limit exceeded. Please wait a moment before trying again.");
        return;
      }
      const links = await res.json();
      if (links[tierId] && links[tierId] !== '#') {
        window.open(links[tierId], '_blank', 'noopener,noreferrer');
      } else {
        alert("Payment link not configured yet!");
      }
    } catch (error) {
      console.error("Failed to fetch payment links", error);
    }
  };

  const handleCustomDonateClick = async (e) => {
    e.preventDefault();
    if (!customAmount) return;
    
    try {
      const res = await fetch('/api/payment-links');
      if (res.status === 429) {
        alert("Rate limit exceeded. Please wait a moment before trying again.");
        return;
      }
      const links = await res.json();
      if (links.custom && links.custom !== '#') {
        window.open(links.custom, '_blank', 'noopener,noreferrer');
      } else {
        alert("Payment link not configured yet!");
      }
    } catch (error) {
      console.error("Failed to fetch payment links", error);
    }
  };

  return (
    <section id="armory-access" className="w-full flex flex-col items-center py-20 px-4 bg-[#0a1118]">
      <div className="text-center mb-16">
        <p className="font-space text-val-red text-xs tracking-[0.3em] uppercase mb-4">// Armory Access</p>
        <h2 className="font-epilogue font-black text-4xl md:text-5xl italic uppercase text-val-light mb-4">
          Equipment Select
        </h2>
        <p className="font-inter text-val-light/60 text-sm">
          Your small change can change a poor whiff's life.
          <span className="block w-24 h-[2px] bg-val-red mx-auto mt-6"></span>
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-20 mt-6 pt-2">
        {tiers.map((tier, idx) => (
          <div 
            key={idx} 
            className={`relative p-8 flex flex-col h-full bg-[#11161d] border ${tier.highlight ? 'border-val-red' : 'border-val-light/10'} notched-tr notched-bl group transition-all duration-300 hover:border-val-red/50 hover:-translate-y-2 mt-4 md:mt-0`}
          >
            {tier.highlight && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-val-red text-white text-xs font-space uppercase tracking-widest px-4 py-1.5 font-bold shadow-[0_0_15px_rgba(255,70,85,0.5)] border border-val-light/20 z-10 whitespace-nowrap">
                Most Popular (No Cap)
              </div>
            )}
            
            <div className="flex justify-between items-start mb-6">
              <span className="font-space text-val-red text-xs uppercase tracking-widest font-bold">Req Fund</span>
              <span className="font-epilogue font-black text-3xl italic text-val-light">₹{tier.price}</span>
            </div>
            
            <h3 className="font-epilogue font-bold text-xl uppercase italic text-val-light mb-4">
              {tier.name}
            </h3>
            
            <p className="font-inter text-val-light/70 text-sm mb-8 flex-grow">
              "{tier.desc}"
            </p>
            
            <button 
              onClick={(e) => handleDonateClick(e, tier.id)}
              className={`w-full py-4 text-center font-space text-xs font-bold uppercase tracking-widest transition-colors notched-tr notched-bl glitch-hover ${
                tier.highlight 
                  ? 'bg-val-red text-white hover:bg-white hover:text-val-red' 
                  : 'border border-val-light/20 text-val-light hover:border-val-red hover:text-val-red'
              }`}
            >
              {tier.btnText}
            </button>
          </div>
        ))}
      </div>

      {/* Custom Donation */}
      <div className="w-full max-w-2xl bg-[#11161d] border border-val-light/10 p-8 flex flex-col md:flex-row items-center gap-6 notched-tl notched-br">
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-val-red/10 rounded-full text-val-red">
          <ShoppingCart size={20} />
        </div>
        
        <div className="flex-grow w-full text-center md:text-left">
          <h4 className="font-epilogue font-bold text-lg uppercase italic text-val-light mb-1">Custom P2W Top-up</h4>
          <p className="font-inter text-val-light/50 text-xs">Enter a custom amount to fund the delusion.</p>
        </div>
        
        <div className="flex w-full md:w-auto mt-4 md:mt-0">
          <div className="relative flex-grow md:w-32">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-val-red font-space font-bold">₹</span>
            <input 
              type="number" 
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#0a1118] border border-val-light/20 py-3 pl-8 pr-4 text-val-light font-space outline-none focus:border-val-red transition-colors"
            />
          </div>
          <button 
            onClick={handleCustomDonateClick}
            disabled={!customAmount}
            className={`font-space font-bold uppercase text-xs tracking-widest px-6 py-3 transition-colors flex items-center justify-center ${
              customAmount 
                ? 'bg-val-light text-val-dark hover:bg-val-red hover:text-white' 
                : 'bg-val-light/20 text-val-dark/50 cursor-not-allowed'
            }`}
          >
            Inject
          </button>
        </div>
      </div>
      
      <p className="text-center font-space text-[10px] text-val-light/30 uppercase tracking-widest mt-6 max-w-xl">
        * All funds go directly to my Razorpay. No actual Riot Points will be sent to my account. I will buy coffee. And then play worse because of the jitters.
      </p>
    </section>
  );
};

export default DonationCards;
