/*
  Dancing Cupid Animation Component
  Displays a fun pixel art cupid dancing after letter submission
  Design Philosophy: 8-bit retro gaming aesthetic with smooth animations
*/

import { useEffect, useState } from "react";
import "./DancingCupidAnimation.css";

interface DancingCupidAnimationProps {
  onAnimationComplete?: () => void;
  duration?: number; // Duration in milliseconds
}

export default function DancingCupidAnimation({
  onAnimationComplete,
  duration = 3000,
}: DancingCupidAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onAnimationComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <div className="dancing-cupid-container">
      {/* Overlay backdrop */}
      <div className="cupid-overlay" />

      {/* Main animation container */}
      <div className="cupid-animation-wrapper">
        {/* Cupid character - using SVG for pixel-perfect rendering */}
        <div className="cupid-character dancing-cupid">
          <svg
            viewBox="0 0 64 80"
            width="128"
            height="160"
            className="cupid-svg"
          >
            {/* Head */}
            <rect x="20" y="8" width="24" height="24" fill="#F4A460" />

            {/* Hair - blonde */}
            <rect x="16" y="4" width="4" height="4" fill="#FFD700" />
            <rect x="20" y="0" width="24" height="4" fill="#FFD700" />
            <rect x="44" y="4" width="4" height="4" fill="#FFD700" />
            <rect x="16" y="8" width="4" height="4" fill="#FFD700" />
            <rect x="44" y="8" width="4" height="4" fill="#FFD700" />

            {/* Eyes */}
            <rect x="24" y="12" width="4" height="4" fill="#000000" />
            <rect x="36" y="12" width="4" height="4" fill="#000000" />

            {/* Smile */}
            <rect x="24" y="20" width="4" height="4" fill="#FF69B4" />
            <rect x="28" y="20" width="4" height="4" fill="#FF69B4" />
            <rect x="32" y="20" width="4" height="4" fill="#FF69B4" />
            <rect x="36" y="20" width="4" height="4" fill="#FF69B4" />

            {/* Body - white dress/tunic */}
            <rect x="16" y="32" width="32" height="24" fill="#FFFFFF" />

            {/* Arms - left */}
            <rect x="8" y="36" width="8" height="4" fill="#F4A460" />
            <rect x="4" y="40" width="4" height="8" fill="#F4A460" />

            {/* Arms - right */}
            <rect x="48" y="36" width="8" height="4" fill="#F4A460" />
            <rect x="56" y="40" width="4" height="8" fill="#F4A460" />

            {/* Wings - left */}
            <polygon
              points="12,28 8,20 16,24"
              fill="#E0FFFF"
              stroke="#87CEEB"
              strokeWidth="1"
            />

            {/* Wings - right */}
            <polygon
              points="52,28 56,20 48,24"
              fill="#E0FFFF"
              stroke="#87CEEB"
              strokeWidth="1"
            />

            {/* Legs - left */}
            <rect x="20" y="56" width="4" height="12" fill="#F4A460" />

            {/* Legs - right */}
            <rect x="40" y="56" width="4" height="12" fill="#F4A460" />

            {/* Heart in hand */}
            <rect x="4" y="44" width="4" height="4" fill="#FF0000" />
            <rect x="8" y="44" width="4" height="4" fill="#FF0000" />
            <rect x="6" y="48" width="4" height="4" fill="#FF0000" />
          </svg>
        </div>

        {/* Floating hearts around cupid */}
        <div className="floating-hearts">
          <div className="heart heart-1">❤️</div>
          <div className="heart heart-2">💕</div>
          <div className="heart heart-3">❤️</div>
          <div className="heart heart-4">💕</div>
          <div className="heart heart-5">❤️</div>
        </div>

        {/* Success message */}
        <div className="success-message">
          <p className="message-text">Letter Sent!</p>
          <p className="message-subtext">Cupid approves! 💌</p>
        </div>
      </div>
    </div>
  );
}
