import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

export const DistortionCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      );
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Outer Ring with Glow */}
      <div
        className={cn(
          "pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full z-[9999] transition-transform duration-300 ease-in-out",
          "h-10 w-10 border-2 border-[hsl(var(--attend-blue))] shadow-[0_0_10px_hsl(var(--attend-blue))]",
          isVisible ? "opacity-50" : "opacity-0",
          isPointer ? "scale-125" : "scale-100", // Ring expands slightly on hover
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      ></div>

      {/* Inner Dot */}
      <div
        className={cn(
          "pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full z-[9999] transition-transform",
          "h-1.5 w-1.5 bg-gray-900", // A darker dot for better visibility
          isVisible ? "opacity-100" : "opacity-0",
        )}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      ></div>
    </>
  );
};