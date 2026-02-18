/*
  Letter Card Image Generator
  Creates beautiful pixel art styled letter cards for Instagram Stories (1080x1920)
  Uses HTML Canvas to generate shareable images with proper text framing
  Design: 8-bit retro gaming aesthetic with pink/cream Valentine's theme
  Includes @danmced branding footer
*/

export interface Letter {
  id: string;
  recipient: string;
  sender: string;
  message: string;
  createdAt: Date;
}

// Instagram Stories dimensions
const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;

// Color palette matching the pixel art theme
const COLORS = {
  background: "#FFF5E1", // Cream
  primary: "#E63946", // Red
  secondary: "#FFB3D9", // Soft pink
  accent: "#FF6B9D", // Hot pink
  dark: "#2B2D42", // Dark outline
  white: "#FFFFFF",
  lightPink: "#FFE5F0", // Very light pink
};

export const generateLetterCardImage = (letter: Letter): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = STORY_WIDTH;
      canvas.height = STORY_HEIGHT;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Fill background with cream
      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);

      // Draw outer thick border (dark outline)
      ctx.strokeStyle = COLORS.dark;
      ctx.lineWidth = 12;
      ctx.strokeRect(30, 30, STORY_WIDTH - 60, STORY_HEIGHT - 60);

      // Draw inner red border
      ctx.strokeStyle = COLORS.primary;
      ctx.lineWidth = 6;
      ctx.strokeRect(50, 50, STORY_WIDTH - 100, STORY_HEIGHT - 100);

      // Draw decorative pixel hearts in corners
      drawPixelHeart(ctx, 90, 90, 32, COLORS.primary);
      drawPixelHeart(ctx, STORY_WIDTH - 90, 90, 32, COLORS.secondary);
      drawPixelHeart(ctx, 90, STORY_HEIGHT - 90, 32, COLORS.secondary);
      drawPixelHeart(ctx, STORY_WIDTH - 90, STORY_HEIGHT - 90, 32, COLORS.primary);

      // Title
      ctx.fillStyle = COLORS.dark;
      ctx.font = "bold 52px 'Press Start 2P', monospace";
      ctx.textAlign = "center";
      ctx.fillText("VALENTINE'S", STORY_WIDTH / 2, 140);
      ctx.fillText("LETTER", STORY_WIDTH / 2, 210);

      // Decorative line
      ctx.strokeStyle = COLORS.accent;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(120, 250);
      ctx.lineTo(STORY_WIDTH - 120, 250);
      ctx.stroke();

      // Content area with proper padding
      const contentTop = 300;
      const contentBottom = STORY_HEIGHT - 250;
      const contentHeight = contentBottom - contentTop;
      const contentLeft = 100;
      const contentRight = STORY_WIDTH - 100;
      const contentWidth = contentRight - contentLeft;

      // To/From section
      ctx.fillStyle = COLORS.dark;
      ctx.font = "24px 'Press Start 2P', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`TO: ${letter.recipient}`, contentLeft, contentTop + 50);
      ctx.fillText(`FROM: ${letter.sender}`, contentLeft, contentTop + 100);

      // Decorative separator
      ctx.strokeStyle = COLORS.secondary;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(contentLeft, contentTop + 130);
      ctx.lineTo(contentRight, contentTop + 130);
      ctx.stroke();

      // Message text with word wrapping
      ctx.fillStyle = COLORS.dark;
      ctx.font = "20px 'Silkscreen', monospace";
      ctx.textAlign = "left";

      const lineHeight = 32;
      const maxWidth = contentWidth - 40;
      const words = letter.message.split(" ");
      let line = "";
      let y = contentTop + 200;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && line) {
          ctx.fillText(line.trim(), contentLeft + 20, y);
          line = words[i] + " ";
          y += lineHeight;

          // Stop if we're running out of space
          if (y > contentBottom - 100) {
            ctx.fillText(line.trim() + "...", contentLeft + 20, y);
            break;
          }
        } else {
          line = testLine;
        }
      }

      // If we haven't exceeded space, draw the last line
      if (y <= contentBottom - 100 && line) {
        ctx.fillText(line.trim(), contentLeft + 20, y);
      }

      // Footer with branding - @danmced
      ctx.fillStyle = COLORS.accent;
      ctx.font = "18px 'Silkscreen', monospace";
      ctx.textAlign = "center";
      ctx.fillText("@danmced", STORY_WIDTH / 2, STORY_HEIGHT - 60);

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to generate canvas blob"));
        }
      }, "image/png");
    } catch (error) {
      reject(error);
    }
  });
};

// Draw a simple pixel heart shape
const drawPixelHeart = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) => {
  ctx.fillStyle = color;
  const s = size / 8; // Scale unit

  // Heart shape using pixels
  ctx.fillRect(x - 2 * s, y - s, s, s); // Top left bump
  ctx.fillRect(x + s, y - s, s, s); // Top right bump
  ctx.fillRect(x - 3 * s, y, 7 * s, s); // Middle row
  ctx.fillRect(x - 3 * s, y + s, 6 * s, s); // Lower middle
  ctx.fillRect(x - 2 * s, y + 2 * s, 4 * s, s); // Lower
  ctx.fillRect(x - s, y + 3 * s, 2 * s, s); // Bottom point
};

// Download letter card as image
export const downloadLetterCard = async (letter: Letter) => {
  try {
    const blob = await generateLetterCardImage(letter);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `valentine-letter-${letter.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading letter card:", error);
    throw error;
  }
};

// Share directly to Instagram Stories (if available on mobile)
export const directShareToInstagramStories = async (letter: Letter) => {
  try {
    const blob = await generateLetterCardImage(letter);
    const file = new File([blob], `valentine-letter-${letter.id}.png`, {
      type: "image/png",
    });

    // Check if we're on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      // On mobile with Web Share API support
      try {
        await navigator.share({
          files: [file],
          title: "Valentine's Letter",
          text: `Check out this Valentine's letter from ${letter.sender} to ${letter.recipient}! 💕 @danmced`,
        });
      } catch (shareError: unknown) {
        // User cancelled share or error occurred
        if (shareError instanceof Error && shareError.name !== 'AbortError') {
          console.error("Share API error:", shareError);
          // Fallback to download
          await downloadLetterCard(letter);
        }
      }
    } else if (isMobile) {
      // Mobile without Web Share API - create Instagram Stories deep link
      const url = URL.createObjectURL(blob);
      const instagramStoriesUrl = `instagram://stories/share?media_type=image&source_url=${encodeURIComponent(url)}`;
      
      // Try to open Instagram Stories
      const opened = window.open(instagramStoriesUrl, '_blank');
      
      // If Instagram app didn't open, fall back to download
      if (!opened || opened.closed) {
        URL.revokeObjectURL(url);
        await downloadLetterCard(letter);
      }
    } else {
      // Desktop - download the image
      await downloadLetterCard(letter);
    }
  } catch (error) {
    console.error("Error sharing to Instagram Stories:", error);
    throw error;
  }
};
