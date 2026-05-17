import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Ruler, Palette, Home } from 'lucide-react';
import { Construction3D } from './Construction3D.tsx';
import { Building } from '../data.ts';

interface Props {
  building: Building;
}

export const ConstructionSequence = ({ building }: Props) => {
  const [stage, setStage] = useState(0); 

  const stages = [
    { 
      label: "概念草稿", 
      icon: <Ruler className="w-5 h-5" />, 
      desc: "一切始于一张白纸，邬达克根据地块特性勾勒出初步的空间逻辑。",
    },
    { 
      label: "工程蓝图", 
      icon: <Hammer className="w-5 h-5" />, 
      desc: "详细计算荷载与功能分区，结构图纸成为建造的唯一指南。",
    },
    { 
      label: "主体施工", 
      icon: <Palette className="w-5 h-5" />, 
      desc: "脚手架林立，红砖与石材逐渐覆盖骨架，建筑轮廓日趋鲜明。",
    },
    { 
      label: "落成时刻", 
      icon: <Home className="w-5 h-5" />, 
      desc: "建筑完工，它不仅是石头与木材的堆叠，更是邬达克留给上海的交响乐。",
    }
  ];

  return (
    <div className="flex flex-col h-full bg-stone-50/50 p-6 rounded-xl sketch-border">
      {/* Visual Canvas Area */}
      <div className="relative flex-1 bg-white sketch-border overflow-hidden flex items-center justify-center p-4 min-h-[350px]">
        {/* Foundation Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, #000 1px, transparent 1px) 0 0 / 20px 20px' }}></div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key="3d"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full h-full"
          >
            <Construction3D stage={stage} building={building} />
          </motion.div>
        </AnimatePresence>

        {/* Annotations */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={stage}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="absolute bottom-4 right-4 max-w-[240px] bg-white/95 backdrop-blur-sm p-4 sketch-border paper-shadow z-20 pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-2 text-pencil">
              {stages[stage].icon}
              <span className="font-bold font-serif">{stages[stage].label}</span>
            </div>
            <p className="text-xs text-pencil leading-relaxed italic">{stages[stage].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Slider Area */}
      <div className="mt-8">
        <div className="flex justify-between items-end mb-4 pr-2">
          <div className="font-hand text-pencil text-lg">建造进程: {Math.round((stage/3)*100)}%</div>
          <div className="font-serif text-ink font-bold">{building.name}</div>
        </div>

        <div className="relative h-12 flex items-center px-6">
          {/* Progress Line */}
          <div className="absolute left-6 right-6 h-1 bg-stone-200 rounded-full">
            <motion.div 
              className="h-full bg-pencil rounded-full"
              animate={{ width: `${(stage / 3) * 100}%` }}
            />
          </div>

          {/* Markers */}
          {stages.map((_, i) => (
            <button
              key={i}
              onClick={() => setStage(i)}
              className={`absolute -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 cursor-pointer
                ${stage >= i ? 'bg-pencil text-white scale-110 shadow-lg' : 'bg-white text-stone-300 border-2 border-stone-100 hover:border-stone-200'}`}
              style={{ left: `${6 + (i / 3) * (100 - 12)}%` }}
            >
              {stage === i ? stages[i].icon : <span className="text-sm font-hand">{i + 1}</span>}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between mt-2 px-2">
          {stages.map((s, i) => (
            <span key={i} className={`text-[10px] font-hand uppercase tracking-widest ${stage === i ? 'text-pencil font-bold' : 'text-stone-300'}`}>
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
