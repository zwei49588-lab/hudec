import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Map as MapIcon, 
  Compass, 
  Maximize2, 
  BookOpen, 
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Pencil,
  Sparkles,
  ArrowLeft,
  Hammer,
  History
} from 'lucide-react';
import { buildings, type Building } from '../data.ts';
import { VanishingSketch } from './VanishingSketch.tsx';
import { TimeRestorer } from './TimeRestorer.tsx';
import { ConstructionSequence } from './ConstructionSequence.tsx';

interface DistrictViewProps {
  onBack: () => void;
  key?: string;
}

export function DistrictView({ onBack }: DistrictViewProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [showStructure, setShowStructure] = useState(false);
  const [showConstruction, setShowConstruction] = useState(false);
  const [isSketchMode, setIsSketchMode] = useState(false);
  const [isRestoringMode, setIsRestoringMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setIsSketchMode(false);
    setIsRestoringMode(false);
    setShowConstruction(false);
  }, [selectedBuilding?.id, showStructure]);

  const filteredBuildings = buildings.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.function.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mapUrl = "/底图.jpg";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center p-4 md:p-8 bg-paper"
    >
      {/* HUD Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-30 pointer-events-none"
      >
        <div className="pointer-events-auto flex flex-col gap-2">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 font-hand text-xl text-pencil hover:text-ink transition-colors group cursor-pointer bg-white/60 px-3 py-1 rounded-full sketch-border w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            返回城市地图
          </button>
          <div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-ink">
              邬达克在上海
            </h1>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 pointer-events-auto items-end">
          <div className="flex gap-2 relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="搜索历史建筑..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="sketch-border bg-white/90 backdrop-blur px-4 py-2 font-hand text-lg focus:outline-none focus:ring-0"
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 bg-white/80 backdrop-blur sketch-border paper-shadow hover:bg-white transition-colors duration-300 cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
          <div className="font-hand text-lg text-pencil bg-white/60 px-3 py-1 rounded-full whitespace-nowrap">
            已探索 {filteredBuildings.length} 处关键地标
          </div>
        </div>
      </motion.header>

      {/* Main Map Container */}
      <motion.div 
        className="relative w-full max-w-6xl aspect-video bg-white sketch-border paper-shadow overflow-hidden group"
      >
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{ 
              backgroundImage: `url(${mapUrl})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              filter: 'sepia(0.05) contrast(1.05)'
            }}
          />
          <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>

          {filteredBuildings.map((building) => (
            <div
              key={building.id}
              className="absolute group/marker"
              style={{ left: `${building.x}%`, top: `${building.y}%` }}
            >
              <motion.button
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedBuilding(building)}
                className="relative -translate-x-1/2 -translate-y-1/2 p-1 cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white scale-125 -z-10 rounded-lg filter blur-[0.5px] opacity-95 shadow-sm" style={{ clipPath: 'polygon(2% 5%, 98% 0%, 100% 95%, 0% 98%)' }}></div>
                  <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-sm">
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
                <div className={`absolute left-1/2 -translate-x-1/2 opacity-0 group-hover/marker:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-40 ${building.y > 80 ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
                  <div className="bg-white px-3 py-1 sketch-border font-serif text-lg shadow-sm">
                    {building.name}
                  </div>
                </div>
              </motion.button>
            </div>
          ))}
        </div>
        <Compass className="absolute bottom-6 right-6 w-12 h-12 text-pencil opacity-40 rotate-12" />
      </motion.div>

      {/* Detail Modals and Overlays logic stays same but within this component */}
      <AnimatePresence>
        {selectedBuilding && !showStructure && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm"
            onClick={() => setSelectedBuilding(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden sketch-border paper-shadow flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setSelectedBuilding(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full sketch-border transition-colors group cursor-pointer"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden group/img bg-stone-100 flex items-center justify-center p-4">
                {selectedBuilding.image_url ? (
                  isRestoringMode ? (
                    <TimeRestorer imageUrl={selectedBuilding.restoration_url || selectedBuilding.image_url} />
                  ) : (
                    <img 
                      src={selectedBuilding.image_url} 
                      alt={selectedBuilding.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover/img:scale-105"
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center gap-2 text-pencil opacity-40">
                    <BookOpen className="w-12 h-12" />
                    <span className="font-hand text-xl">档案照片缺失</span>
                  </div>
                )}
                
                {selectedBuilding.image_url && (
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsRestoringMode(!isRestoringMode);
                      }}
                      className={`p-2 rounded-full sketch-border transition-all cursor-pointer ${isRestoringMode ? 'bg-pencil text-white shadow-inner scale-110' : 'bg-white/80 hover:bg-white text-pencil hover:scale-110'}`}
                      title={isRestoringMode ? "退出修复" : "进入时光修复模式"}
                    >
                      <Sparkles className={`w-5 h-5 ${isRestoringMode ? 'animate-pulse' : ''}`} />
                    </button>
                  </div>
                )}

                {selectedBuilding.structure_url && !isRestoringMode && (
                  <button 
                    onClick={() => setShowStructure(true)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 cursor-pointer"
                  >
                    <Maximize2 className="w-8 h-8" />
                    <span className="font-hand text-xl">查看内部结构</span>
                  </button>
                )}
              </div>

              <div className="p-8 w-full md:w-1/2 flex flex-col overflow-y-auto">
                <span className="font-hand text-xl text-pencil italic">{selectedBuilding.year}</span>
                <h2 className="font-serif text-3xl font-bold mt-1 text-ink leading-tight">
                  {selectedBuilding.name}
                </h2>
                <div className="flex items-center gap-2 mt-4 text-pencil font-medium">
                  <Compass className="w-4 h-4" />
                  {selectedBuilding.address}
                </div>
                <div className="h-px w-full bg-pencil/10 my-6"></div>
                <p className="text-pencil leading-relaxed font-serif text-lg">
                  {selectedBuilding.description}
                </p>
                <div className="mt-auto pt-8 flex flex-col gap-3">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowStructure(true)}
                      className="flex-1 px-4 py-3 bg-pencil text-white font-medium sketch-border hover:bg-ink transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      结构透视
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setShowConstruction(true)}
                      className="px-4 py-3 bg-white text-pencil font-medium sketch-border hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                      title="建造日志"
                    >
                      <Hammer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStructure && selectedBuilding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-paper p-4 md:p-12 overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <button 
                  onClick={() => setShowStructure(false)}
                  className="flex items-center gap-2 font-hand text-2xl text-pencil hover:text-ink transition-colors mb-2 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6 rotate-180" />
                  返回详情
                </button>
                <h2 className="font-serif text-4xl font-bold text-ink">
                  {selectedBuilding.name} - <span className="italic font-normal">结构详图</span>
                </h2>
              </div>
              <button 
                onClick={() => setShowStructure(false)}
                className="p-4 sketch-border bg-white paper-shadow hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div 
              className="flex-1 relative bg-white sketch-border paper-shadow overflow-hidden flex items-center justify-center group/viewer"
              ref={containerRef}
            >
              <motion.div 
                className={`relative p-8 touch-none transition-transform duration-500 ease-out ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
                animate={{ 
                  x: offset.x,
                  y: offset.y,
                  scale: zoom 
                }}
                drag={zoom > 1 && !isSketchMode}
                onDragEnd={(_, info) => {
                  if (isSketchMode) return;
                  setOffset(prev => ({ 
                    x: prev.x + info.offset.x, 
                    y: prev.y + info.offset.y 
                  }));
                }}
              >
                {selectedBuilding.structure_url ? (
                  <div className="relative">
                    <img 
                      src={selectedBuilding.structure_url} 
                      alt="Structural Drawing" 
                      className="w-full h-auto max-h-[70vh] mix-blend-multiply opacity-80 select-none pointer-events-none"
                      style={{ filter: 'grayscale(1) contrast(1.2)' }}
                    />
                    <VanishingSketch isEnabled={isSketchMode} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-pencil opacity-30 mt-12">
                    <BookOpen className="w-24 h-24" />
                    <p className="font-serif text-2xl font-bold">档案馆暂无此建筑图纸</p>
                  </div>
                )}
              </motion.div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur sketch-border paper-shadow flex gap-4 items-center z-50">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSketchMode(!isSketchMode);
                  }}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${isSketchMode ? 'bg-pencil text-white shadow-inner' : 'hover:bg-neutral-100 text-pencil'}`}
                  title={isSketchMode ? "禁用临摹" : "启用临摹"}
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-zinc-200"></div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoom(z => Math.max(0.5, z - 0.25));
                  }}
                  className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <div className="font-hand text-lg w-12 text-center select-none">
                  {Math.round(zoom * 100)}%
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoom(z => Math.min(4, z + 0.25));
                  }}
                  className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-zinc-200"></div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoom(1);
                    setOffset({ x: 0, y: 0 });
                  }}
                  className="p-1.5 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-end border-t border-pencil/10 pt-4">
              <div className="text-right ml-auto">
                <p className="font-serif font-bold text-lg">建筑图档 No. 042-H</p>
                <p className="font-hand text-lg text-pencil">L.E. Hudec & Co.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConstruction && selectedBuilding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-paper p-4 md:p-12 overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <button 
                  onClick={() => setShowConstruction(false)}
                  className="flex items-center gap-2 font-hand text-2xl text-pencil hover:text-ink transition-colors mb-2 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6 rotate-180" />
                  返回详情
                </button>
                <h2 className="font-serif text-4xl font-bold text-ink">
                  建造全过程 - <span className="italic font-normal">{selectedBuilding.name}</span>
                </h2>
              </div>
              <button 
                onClick={() => setShowConstruction(false)}
                className="p-4 sketch-border bg-white paper-shadow hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 min-h-0">
              <ConstructionSequence 
                building={selectedBuilding}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
