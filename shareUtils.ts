/*
  Sharing utility functions for social media and email
  Supports: Instagram, X (Twitter), Threads, Email
*/

export interface Letter {
  id: string;
  recipient: string;
  sender: string;
  message: string;
  createdAt: Date;
}

// Generate a shareable text preview of the letter
export const generateLetterPreview = (letter: Letter, maxLength: number = 280): string => {
  const preview = `💌 A Valentine's letter from ${letter.sender} to ${letter.recipient}:\n\n"${letter.message.substring(0, maxLength)}${letter.message.length > maxLength ? '...' : ''}"`;
  return preview;
};

// Share to X (Twitter)
export const shareToX = (letter: Letter): void => {
  const text = generateLetterPreview(letter, 240);
  const hashtags = "&hashtags=ValentinesDay,PixelArt,LoveLetters";
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}${hashtags}`;
  window.open(url, "_blank", "width=550,height=420");
};

// Share to Threads
export const shareToThreads = (letter: Letter): void => {
  const text = generateLetterPreview(letter, 500);
  // Threads doesn't have a direct share API, so we provide the text to copy
  // Users will paste it manually on Threads
  const url = `https://www.threads.net/`;
  window.open(url, "_blank");
  // Copy to clipboard for convenience
  navigator.clipboard.writeText(text);
};

// Share to Instagram
export const shareToInstagram = (letter: Letter): void => {
  // Instagram doesn't have a direct web share API
  // We'll open Instagram and copy the text to clipboard
  const text = generateLetterPreview(letter, 2200);
  navigator.clipboard.writeText(text);
  
  // Open Instagram
  const url = `https://www.instagram.com/`;
  window.open(url, "_blank");
};

// Share via Email
export const shareViaEmail = (letter: Letter): void => {
  const subject = `A Valentine's Letter from ${letter.sender}`;
  const body = `Dear ${letter.recipient},\n\n${letter.message}\n\n💌 Sent with love from Valentine's Day Letters\nhttps://valentine-letters.manus.space`;
  
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
};

// Generate a shareable summary card text
export const generateShareCard = (letter: Letter): string => {
  const dateStr = new Date(letter.createdAt).toLocaleDateString();
  return `✨ Valentine's Letter ✨\n\nTo: ${letter.recipient}\nFrom: ${letter.sender}\nDate: ${dateStr}\n\n"${letter.message.substring(0, 150)}${letter.message.length > 150 ? '...' : ''}"\n\nSent by Dani's VPS💕`;
};
