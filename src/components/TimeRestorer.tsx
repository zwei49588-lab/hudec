import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Check } from 'lucide-react';

interface Props {
  imageUrl: string;
  onComplete?: () => void;
}

export const TimeRestorer = ({ imageUrl, onComplete }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [percentage, setPercentage] = useState(0);

  // Initialize and handle resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Set up the "dust" layer
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create a dusty, aged look
    ctx.fillStyle = '#d4c5b0'; // Sepia dust color
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    
    // Add some "grain" and texture
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const size = Math.random() * 2;
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
      ctx.fillRect(x, y, size, size);
    }

    // Add a circular vignette/shadow
    const gradient = ctx.createRadialGradient(
      dimensions.width / 2, dimensions.height / 2, 0,
      dimensions.width / 2, dimensions.height / 2, Math.max(dimensions.width, dimensions.height) / 1.5
    );
    gradient.addColorStop(0, 'rgba(139, 115, 85, 0.2)');
    gradient.addColorStop(1, 'rgba(84, 73, 58, 0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Initial percentage check
    setPercentage(0);
    setIsComplete(false);
    setHasStarted(false);
  }, [dimensions]);

  const checkCompletion = useCallback(() => {
    if (!canvasRef.current || isComplete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    // Sample every 10th pixel for performance
    for (let i = 3; i < pixels.length; i += 40) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const currentPercent = (transparentPixels / (pixels.length / 40)) * 100;
    setPercentage(currentPercent);

    if (currentPercent > 75) {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [isComplete, onComplete]);

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (isComplete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = (e as React.MouseEvent).clientX - rect.left;
      y = (e as React.MouseEvent).clientY - rect.top;
    }

    // Scale coordinates if canvas is resized by CSS
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x * scaleX, y * scaleY, 35, 0, Math.PI * 2);
    ctx.fill();

    if (!hasStarted) setHasStarted(true);
    checkCompletion();
  };

  const handleReset = () => {
    // Force a re-render of the dimensions effect
    setDimensions({ ...dimensions });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full group overflow-hidden sketch-border cursor-crosshair">
      {/* The "Restored" Result (Original Image) */}
      <img 
        src={imageUrl} 
        alt="Original" 
        className="w-full h-full object-cover select-none pointer-events-none" 
      />

      {/* The Mask Layer (Canvas) */}
      <motion.canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        animate={{ opacity: isComplete ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-10 touch-none"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseMove={(e) => isDrawing && scratch(e)}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={(e) => {
          e.preventDefault();
          scratch(e);
        }}
      />

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {!hasStarted && !isComplete && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-white/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/50 shadow-lg flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-pencil animate-pulse" />
                <span className="font-hand text-lg text-pencil lg:text-xl">涂抹揭开尘封的时光</span>
              </div>
            </motion.div>
          )}

          {isComplete && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[2px]"
            >
              <div className="bg-white p-6 rounded-lg sketch-border shadow-xl flex flex-col items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-hand text-2xl text-pencil">修复完成！</h3>
                <p className="text-zinc-500 text-sm italic">时光在你的指尖重现</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                  className="mt-2 pointer-events-auto flex items-center gap-2 px-4 py-2 bg-pencil text-white rounded hover:opacity-90 transition-opacity"
                >
                  <RotateCcw className="w-4 h-4" />
                  再次修复
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
