import NewsTicker from "@/components/NewsTicker";
import Hero from "@/components/Hero";
import Progress from "@/components/Progress";
import DonationCards from "@/components/DonationCards";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import CopiumCounter from "@/components/CopiumCounter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full relative">
      <div className="fixed top-0 w-full z-40">
        <NewsTicker />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-val-red/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-val-red/5 blur-[100px] rounded-full"></div>
      </div>
      
      {/* Add padding top to account for fixed news ticker */}
      <div className="w-full pt-12">
        <Hero />
      </div>
      <Progress />
      <DonationCards />
      <TestimonialsSlider />
      <CopiumCounter />
      
      <footer className="w-full py-10 flex flex-col items-center justify-center border-t border-val-light/10 mt-20">
        <h3 className="font-epilogue font-black italic uppercase text-val-light tracking-[0.2em] mb-4">
          The Bottom Frag's Bottle Fund
        </h3>
        <p className="font-space text-xs text-val-light/50 text-center max-w-lg mb-6 uppercase tracking-widest">
          "Maybe if I buy the whole bundle I'll actually start playing like the people in those montages I watch while queuing."
        </p>
        <div className="flex gap-8 font-space text-[10px] text-val-red font-bold uppercase tracking-widest">
          <span>K/D: <span className="text-val-light">0.42</span></span>
          <span>Headshot %: <span className="text-val-light">3.2%</span></span>
          <span>Rank: <span className="text-val-light">Iron 1</span></span>
        </div>
      </footer>
    </main>
  );
}
