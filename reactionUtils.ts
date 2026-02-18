/*
  Reaction utilities for emoji reactions on letters
  Supports: ❤️, 😍, 🥰, 😊, 💕, ✨
*/

export interface Reaction {
  emoji: string;
  count: number;
  userReacted?: boolean;
}

export interface LetterReactions {
  [emoji: string]: Reaction;
}

// Available reaction emojis
export const AVAILABLE_REACTIONS = ["❤️", "😍", "🥰", "😊", "💕", "✨"];

// Add or remove a reaction from a letter
export const toggleReaction = (
  reactions: LetterReactions,
  emoji: string,
  userReacted: boolean
): LetterReactions => {
  const newReactions = { ...reactions };

  if (!newReactions[emoji]) {
    newReactions[emoji] = {
      emoji,
      count: 0,
      userReacted: false,
    };
  }

  if (userReacted) {
    // Remove reaction
    newReactions[emoji].count = Math.max(0, newReactions[emoji].count - 1);
    newReactions[emoji].userReacted = false;

    // Remove emoji if count is 0
    if (newReactions[emoji].count === 0) {
      delete newReactions[emoji];
    }
  } else {
    // Add reaction
    newReactions[emoji].count += 1;
    newReactions[emoji].userReacted = true;
  }

  return newReactions;
};

// Get total reaction count
export const getTotalReactionCount = (reactions: LetterReactions): number => {
  return Object.values(reactions).reduce((sum, reaction) => sum + reaction.count, 0);
};

// Get reactions sorted by count (most popular first)
export const getSortedReactions = (reactions: LetterReactions): Reaction[] => {
  return Object.values(reactions)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Show max 6 reactions
};

// Format reactions for display
export const formatReactionsDisplay = (reactions: LetterReactions): string => {
  const sorted = getSortedReactions(reactions);
  return sorted.map((r) => `${r.emoji} ${r.count}`).join(" ");
};
