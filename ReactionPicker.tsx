/*
  ReactionPicker Component - Pixel art styled reaction selector
  Design Philosophy: 8-bit Retro Gaming Aesthetic
*/

import { Button } from "@/components/ui/button";
import { AVAILABLE_REACTIONS } from "@/lib/reactionUtils";
import { useState } from "react";

interface ReactionPickerProps {
  onReactionSelect: (emoji: string) => void;
  disabled?: boolean;
}

export default function ReactionPicker({
  onReactionSelect,
  disabled = false,
}: ReactionPickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleReactionClick = (emoji: string) => {
    onReactionSelect(emoji);
    setShowPicker(false);
  };

  return (
    <div className="relative inline-block">
      <Button
        size="sm"
        variant="outline"
        className="pixel-border bg-card text-foreground hover:bg-secondary text-xs h-7 px-2"
        onClick={() => setShowPicker(!showPicker)}
        disabled={disabled}
      >
        😊 React
      </Button>

      {showPicker && (
        <div className="absolute bottom-full mb-2 left-0 bg-card pixel-border p-2 z-50 flex gap-1 flex-wrap w-40">
          {AVAILABLE_REACTIONS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReactionClick(emoji)}
              className="text-2xl hover:scale-125 transition-transform cursor-pointer p-1"
              title={`React with ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
