/*
  ReactionDisplay Component - Shows emoji reactions with counts
  Design Philosophy: 8-bit Retro Gaming Aesthetic
*/

import { Reaction } from "@/lib/reactionUtils";

interface ReactionDisplayProps {
  reactions: Reaction[];
  onReactionClick?: (emoji: string) => void;
}

export default function ReactionDisplay({
  reactions,
  onReactionClick,
}: ReactionDisplayProps) {
  if (reactions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {reactions.map((reaction) => (
        <button
          key={reaction.emoji}
          onClick={() => onReactionClick?.(reaction.emoji)}
          className={`pixel-border px-2 py-1 text-xs flex items-center gap-1 transition-colors ${
            reaction.userReacted
              ? "bg-secondary text-secondary-foreground"
              : "bg-muted text-foreground hover:bg-secondary/50"
          }`}
          title={`${reaction.count} ${reaction.emoji}`}
        >
          <span className="text-sm">{reaction.emoji}</span>
          <span className="text-xs font-bold">{reaction.count}</span>
        </button>
      ))}
    </div>
  );
}
