import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Compass, Navigation } from 'lucide-react';

interface CityViewProps {
  onEnterDistrict: () => void;
  key?: string;
}

export function CityView({ onEnterDistrict }: CityViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen bg-[#f4f1ea] overflow-hidden flex flex-col items-center justify-center font-serif"
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/parchment.png")' }}></div>
      
      {/* City Map Container */}
      <div className="relative w-full max-w-4xl aspect-[16/10] bg-[#e8e4d9] sketch-border shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Background Map Image */}
        <img 
          src="/上海底图.png" 
          alt="Map" 
          className="absolute inset-0 w-full h-full object-contain opacity-80"
        />

        {/* City Title Overlay */}
        <div className="absolute top-12 left-12">
          <h1 className="text-6xl font-bold text-ink/80 tracking-tighter">邬达克在上海</h1>
        </div>

        {/* Interactive District Anchors */}
        {[
          { id: 'changning', name: '长宁-武康路历史区', left: '24%', top: '83%' },
          { id: 'jingan', name: '静安历史街区', left: '32%', top: '56%' },
          { id: 'putuo', name: '普陀苏河湾区', left: '18%', top: '33%' },
          { id: 'hongkou', name: '虹口多伦路区', left: '58%', top: '37%' },
          { id: 'huangpu', name: '黄浦外滩历史区', left: '44%', top: '50%' },
          { id: 'pudong', name: '浦东陆家嘴区', left: '72%', top: '31%' },
        ].map((district, index) => (
          <motion.div 
            key={district.id}
            className="absolute z-20"
            style={{ left: district.left, top: district.top }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + (index * 0.1), type: 'spring' }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnterDistrict}
              className="relative -translate-x-1/2 -translate-y-1/2 p-1 cursor-pointer group"
            >
              <div className="relative">
                {/* Ripple effect - visible only on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-full h-full bg-pencil rounded-full"
                  />
                </div>

                <div className="absolute inset-0 bg-white scale-125 -z-10 rounded-lg filter blur-[0.5px] opacity-95 shadow-sm" style={{ clipPath: 'polygon(2% 5%, 98% 0%, 100% 95%, 0% 98%)' }}></div>
                <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <path 
                    d="M20 5 L35 15 L35 35 L5 35 L5 15 Z" 
                    fill="#fff" 
                    stroke="#4a4a4a" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <path d="M15 25 L15 35 M25 25 L25 35 M12 18 H28" stroke="#4a4a4a" strokeWidth="2" />
                </svg>
              </div>
            </motion.button>
          </motion.div>
        ))}

        {/* Decorative Compass */}
        <div className="absolute bottom-12 right-12 opacity-30">
          <Compass className="w-16 h-16 text-pencil animate-[spin_20s_linear_infinite]" />
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ background: 'linear-gradient(90deg, #000 1px, transparent 1px) 0 0 / 40px 40px, linear-gradient(#000 1px, transparent 1px) 0 0 / 40px 40px' }}></div>
      </div>

      {/* Intro Text */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center max-w-2xl px-6"
      >
        <h2 className="text-3xl font-serif text-ink mb-4">重寻邬达克的上海足迹</h2>
        <p className="text-pencil font-serif leading-relaxed italic">
          “上海的建筑是石头的交响乐，而邬达克是其中最动人的旋律。”
          <br />
          从全城视野出发，挖掘藏在石库门与公寓里的历史回响。
        </p>
      </motion.div>
    </motion.div>
  );
}
