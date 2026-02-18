/*
  Instagram Share Dialog Integration
  Uses Instagram's Share Dialog API to create stories directly from the web
*/

export interface Letter {
  id: string;
  to: string;
  from: string;
  message: string;
  date: string;
}

// Initialize Instagram Share Dialog
export const initInstagramShare = () => {
  // Load Instagram SDK
  if (!window.FB) {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
    document.body.appendChild(script);

    script.onload = () => {
      if (window.FB) {
        window.FB.init({
          appId: "YOUR_APP_ID", // Will be replaced with actual app ID if needed
          xfbml: true,
          version: "v18.0",
        });
      }
    };
  }
};

// Share to Instagram Stories using Share Dialog
export const shareToInstagramStoriesDialog = async (
  letterCardBlob: Blob,
  letter: Letter
): Promise<void> => {
  try {
    // Convert blob to data URL
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;

      // Use Instagram's Share Dialog
      if (window.FB && window.FB.ui) {
        window.FB.ui(
          {
            method: "share",
            href: window.location.href,
            hashtag: "#ValentineLetters #PixelArt",
            quote: `💌 A Valentine's letter from ${letter.from} to ${letter.to}`,
            display: "popup",
          },
          function (response) {
            if (response && !response.error_code) {
              console.log("Story shared successfully");
            } else {
              console.error("Error sharing story:", response);
            }
          }
        );
        } else {
          // Fallback: Use Web Share API if available
          if (navigator.share) {
            const file = new File([letterCardBlob], `valentine-letter-${letter.id}.png`, {
              type: "image/png",
            });

            navigator.share({
              files: [file],
              title: "Valentine's Letter",
              text: `💌 A Valentine's letter from ${letter.from} to ${letter.to}`,
            }).catch((err) => console.error("Share failed:", err));
          } else {
          // Fallback: Download and open Instagram
          const url = URL.createObjectURL(letterCardBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `valentine-letter-${letter.id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          // Open Instagram Stories
          window.open("https://www.instagram.com/stories/", "_blank");
        }
      }
    };

    reader.readAsDataURL(letterCardBlob);
  } catch (error) {
    console.error("Error sharing to Instagram Stories:", error);
    throw error;
  }
};

// Alternative: Use Instagram's direct share URL scheme
export const shareToInstagramStoriesViaScheme = async (
  letterCardBlob: Blob,
  letter: Letter
): Promise<void> => {
  try {
    // Create a canvas element to render the image
    const img = new Image();
    const url = URL.createObjectURL(letterCardBlob);

    img.onload = () => {
      // Create a temporary canvas
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0);

        // Convert to blob and create download link
        canvas.toBlob((blob) => {
          if (blob) {
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `valentine-letter-${letter.id}.png`;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Open Instagram app or web
            setTimeout(() => {
              // Try to open Instagram app on mobile
              const userAgent = navigator.userAgent.toLowerCase();
              if (userAgent.includes("android")) {
                window.location.href = "instagram://";
              } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
                window.location.href = "instagram://";
              } else {
                // Desktop: open Instagram web
                window.open("https://www.instagram.com/stories/", "_blank");
              }
            }, 500);

            URL.revokeObjectURL(downloadUrl);
          }
        });
      }

      URL.revokeObjectURL(url);
    };

    img.src = url;
  } catch (error) {
    console.error("Error sharing via Instagram scheme:", error);
    throw error;
  }
};

// Declare global FB object
declare global {
  interface Window {
    FB?: {
      init: (config: any) => void;
      ui: (params: any, callback: (response: any) => void) => void;
    };
  }
}
