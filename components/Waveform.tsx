
import React, { useEffect, useRef } from 'react';

interface WaveformProps {
  isPlaying: boolean;
  isPaused: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ isPlaying, isPaused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);
      
      const barCount = 60;
      const barWidth = width / barCount;
      const centerY = height / 2;

      for (let i = 0; i < barCount; i++) {
        let barHeight = 2;
        if (isPlaying && !isPaused) {
          const freq = (i + offset) * 0.15;
          const amplitude = Math.sin(freq) * Math.cos(freq * 0.8) * 12;
          barHeight = 4 + Math.abs(amplitude);
        }
        const x = i * barWidth;
        ctx.fillStyle = isPlaying && !isPaused ? '#818CF8' : '#334155';
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x + 1, centerY - barHeight/2, barWidth - 2, barHeight, 2) : ctx.rect(x + 1, centerY - barHeight/2, barWidth - 2, barHeight);
        ctx.fill();
      }
      if (isPlaying && !isPaused) offset += 0.2;
    };
    draw();
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isPlaying, isPaused]);

  return <canvas ref={canvasRef} width={600} height={40} className="w-full h-full" />;
};

export default Waveform;
