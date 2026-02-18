/*
  ShareModal Component - Pixel art styled sharing interface
  Design Philosophy: 8-bit Retro Gaming Aesthetic
  Simplified to download and Instagram Stories only
*/

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { directShareToInstagramStories, downloadLetterCard } from "@/lib/letterCardGenerator";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  letter: {
    id: string;
    recipient: string;
    sender: string;
    message: string;
    createdAt: Date;
  } | null;
}

export default function ShareModal({
  open,
  onOpenChange,
  letter,
}: ShareModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useTranslation();

  if (!letter) return null;

  const handleShareInstagramStories = async () => {
    setIsGenerating(true);
    try {
      await directShareToInstagramStories(letter);
      toast.success(t('shareModal.instagramSuccess'));
      onOpenChange(false);
    } catch (error) {
      toast.error(t('shareModal.instagramError'));
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadCard = async () => {
    setIsGenerating(true);
    try {
      await downloadLetterCard(letter);
      toast.success(t('shareModal.downloadSuccess'));
      onOpenChange(false);
    } catch (error) {
      toast.error(t('shareModal.downloadError'));
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pixel-border-thick bg-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base text-foreground">
            {t('shareModal.title')} 💕
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Letter Preview */}
          <div className="bg-muted pixel-border p-4">
            <p className="text-xs text-muted-foreground mb-2">Letter Details:</p>
            <div className="space-y-2">
              <p className="text-sm text-foreground">
                <span className="text-muted-foreground">To:</span> {letter.recipient}
              </p>
              <p className="text-sm text-foreground">
                <span className="text-muted-foreground">From:</span> {letter.sender}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {letter.message}
              </p>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Choose how to save:</p>
            
            <div className="space-y-2">
              {/* Instagram Stories Button */}
              <Button
                className="w-full pixel-border bg-accent text-accent-foreground hover:bg-accent/90 text-sm h-12 flex items-center justify-center"
                onClick={handleShareInstagramStories}
                disabled={isGenerating}
              >
                <span className="mr-2">📸</span>
                {isGenerating ? t('common.loading') : t('viewLetters.shareInstagramButton')}
              </Button>

              {/* Download Button */}
              <Button
                className="w-full pixel-border bg-primary text-primary-foreground hover:bg-primary/90 text-sm h-12 flex items-center justify-center"
                onClick={handleDownloadCard}
                disabled={isGenerating}
              >
                <span className="mr-2">⬇️</span>
                {isGenerating ? t('common.loading') : t('viewLetters.downloadButton')}
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="border-t-2 border-border pt-4">
            <p className="text-xs text-muted-foreground text-center">
              Spread the love 💕
            </p>
          </div>

          {/* Close Button */}
          <Button
            variant="outline"
            className="w-full pixel-border bg-card text-foreground hover:bg-muted text-xs h-10"
            onClick={() => onOpenChange(false)}
          >
            {t('viewLetters.closeButton')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
