import { Button } from "@/components/ui/button";
import { useParams, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2, Copy, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Letter {
  id: string;
  sender: string;
  recipient: string;
  message: string;
  reactions: string | null;
  createdAt: Date;
}

export default function LetterDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);

  const { data: letter, isLoading, error } = trpc.letters.getById.useQuery(
    { id: id || "" },
    { enabled: !!id }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 to-pink-100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-foreground">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !letter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 to-pink-100">
        <div className="text-center">
          <p className="text-foreground mb-4">Letter not found</p>
          <Button
            onClick={() => setLocation("/letters")}
            className="pixel-border bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Back to Letters
          </Button>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    const link = `${window.location.origin}/letter/${id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reactions = letter.reactions ? JSON.parse(letter.reactions) : [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-200 to-pink-100 p-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {/* Letter Card */}
          <div className="bg-card pixel-border-thick p-8 space-y-6">
            {/* Header */}
            <div className="text-center border-b-2 border-border pb-4">
              <div className="text-3xl mb-2">📮</div>
              <h1 className="text-xl font-bold text-foreground">
                {i18n.language === "es" ? "Tu Carta de San Valentín" : "Your Valentine's Letter"}
              </h1>
            </div>

            {/* Letter Content */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted pixel-border p-3">
                  <p className="text-xs text-muted-foreground font-bold">
                    {i18n.language === "es" ? "Para" : "To"}
                  </p>
                  <p className="text-sm font-bold text-foreground">{letter.recipient}</p>
                </div>
                <div className="bg-muted pixel-border p-3">
                  <p className="text-xs text-muted-foreground font-bold">
                    {i18n.language === "es" ? "De" : "From"}
                  </p>
                  <p className="text-sm font-bold text-foreground">{letter.sender}</p>
                </div>
              </div>

              {/* Message */}
              <div className="bg-muted pixel-border p-4 min-h-32">
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {letter.message}
                </p>
              </div>

              {/* Reactions */}
              {reactions.length > 0 && (
                <div className="bg-muted pixel-border p-3">
                  <p className="text-xs text-muted-foreground font-bold mb-2">
                    {i18n.language === "es" ? "Reacciones" : "Reactions"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {reactions.map((reaction: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-1 bg-card pixel-border px-2 py-1">
                        <span className="text-lg">{reaction.emoji}</span>
                        <span className="text-xs text-foreground">{reaction.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="text-center border-t-2 border-border pt-4">
                <p className="text-xs text-muted-foreground">@danmced</p>
              </div>
            </div>

            {/* Share Link Button */}
            <div className="border-t-2 border-border pt-4 flex gap-3">
              <Button
                onClick={handleCopyLink}
                className="flex-1 pixel-border bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {i18n.language === "es" ? "¡Copiado!" : "Copied!"}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {i18n.language === "es" ? "Copiar Enlace" : "Copy Link"}
                  </>
                )}
              </Button>
              <Button
                onClick={() => setLocation("/letters")}
                className="flex-1 pixel-border bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
              >
                {i18n.language === "es" ? "Volver" : "Back"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
