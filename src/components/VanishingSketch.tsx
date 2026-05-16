import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

interface Stroke {
  points: Point[];
  id: number;
}

interface Props {
  isEnabled: boolean;
  color?: string;
  lineWidth?: number;
  fadeDuration?: number; // in ms
}

export const VanishingSketch = ({ 
  isEnabled, 
  color = "#4a4a4a", 
  lineWidth = 3,
  fadeDuration = 2000 
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [activeStroke, setActiveStroke] = useState<Point[] | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const nextStrokeId = useRef(0);
  const requestRef = useRef<number>(null);

  // Resize handler
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent): { x: number, y: number } | null => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    } else {
      return null;
    }

    return {
      x: (clientX - rect.left) * (canvasRef.current.width / rect.width),
      y: (clientY - rect.top) * (canvasRef.current.height / rect.height)
    };
  };

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isEnabled) return;
    const coords = getCoordinates(e.nativeEvent);
    if (!coords) return;
    setActiveStroke([{ ...coords, timestamp: Date.now() }]);
  }, [isEnabled]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!activeStroke || !isEnabled) return;
    const coords = getCoordinates(e instanceof Event ? e : e.nativeEvent);
    if (!coords) return;
    
    setActiveStroke(prev => prev ? [...prev, { ...coords, timestamp: Date.now() }] : null);
  }, [activeStroke, isEnabled]);

  const endDrawing = useCallback(() => {
    if (activeStroke) {
      setStrokes(prev => [...prev, { points: activeStroke, id: nextStrokeId.current++ }]);
      setActiveStroke(null);
    }
  }, [activeStroke]);

  // Handle global mouse up to stop drawing if user leaves the canvas
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      endDrawing();
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [endDrawing]);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;

    const now = Date.now();

    // Utility to render points
    const renderPoints = (points: Point[]) => {
      if (points.length < 2) return;
      
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i+1];
        
        const age = now - p2.timestamp;
        const opacity = Math.max(0, 1 - age / fadeDuration);
        
        if (opacity <= 0) continue;

        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    };

    // Render historical strokes
    strokes.forEach(stroke => renderPoints(stroke.points));
    
    // Render current active stroke
    if (activeStroke) {
      renderPoints(activeStroke);
    }

    // Cleanup old strokes
    setStrokes(prev => prev.filter(stroke => {
      if (stroke.points.length === 0) return false;
      const lastPoint = stroke.points[stroke.points.length - 1];
      return now - lastPoint.timestamp < fadeDuration;
    }));

    requestRef.current = requestAnimationFrame(animate);
  }, [dimensions, color, lineWidth, fadeDuration, strokes, activeStroke]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className={`w-full h-full ${isEnabled ? 'cursor-none pointer-events-auto' : 'pointer-events-none'}`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={(e) => {
          if (isEnabled && activeStroke) {
            e.preventDefault();
          }
          draw(e);
        }}
        onTouchEnd={endDrawing}
      />
    </div>
  );
};
