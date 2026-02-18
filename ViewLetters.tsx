/*
  Design Philosophy: 8-bit Retro Gaming Aesthetic
  - Grid-based letter display like game inventory
  - Pixel art cards with chunky borders
  - Game-style modal for reading full letters
  - Interactive emoji reactions
*/

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ShareModal from "@/components/ShareModal";
import ReactionPicker from "@/components/ReactionPicker";
import ReactionDisplay from "@/components/ReactionDisplay";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { getSortedReactions, Reaction } from "@/lib/reactionUtils";
import { useTranslation } from "react-i18next";
import { Copy, Check } from "lucide-react";

interface Letter {
  id: string;
  recipient: string;
  sender: string;
  message: string;
  createdAt: Date;
  reactions?: string | Record<string, number> | null;
}

export default function ViewLetters() {
  const [, setLocation] = useLocation();
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { t } = useTranslation();

  // tRPC queries and mutations
  const { data: allLetters = [], isLoading, refetch } = trpc.letters.getAll.useQuery();
  const addReactionMutation = trpc.letters.addReaction.useMutation();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Convert reactions from JSON string or Record to Reaction[]
  const convertReactionsToArray = (reactions?: string | Record<string, number>): Reaction[] => {
    if (!reactions) return [];
    
    let reactionsObj: Record<string, number>;
    
    if (typeof reactions === 'string') {
      try {
        reactionsObj = JSON.parse(reactions);
      } catch {
        return [];
      }
    } else {
      reactionsObj = reactions;
    }
    
    return Object.entries(reactionsObj).map(([emoji, count]) => ({
      emoji,
      count,
      userReacted: false, // Simplified for now - all reactions are treated equally
    }));
  };

  const handleReaction = async (letterId: string, emoji: string) => {
    try {
      await addReactionMutation.mutateAsync({
        letterId,
        emoji,
      });
      
      // Refetch letters to get updated reactions
      await refetch();
      
      // Update selected letter if it's open
      if (selectedLetter && selectedLetter.id === letterId) {
        const updated = allLetters.find((l) => l.id === letterId);
        if (updated) {
          setSelectedLetter(updated);
        }
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
      toast.error("Failed to add reaction");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-foreground mb-4">{t('common.loading')}</p>
          <div className="animate-spin text-2xl">💕</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card border-b-4 border-border py-4 px-4">
        <div className="container flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-base sm:text-lg text-foreground">{t('viewLetters.title')}</h1>
          <div className="w-16"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 bg-muted">
        <div className="container max-w-6xl mx-auto">
          {allLetters.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-card pixel-border-thick p-8 max-w-md mx-auto">
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/36USrqPeMWp0PVobdiD1hD/sandbox/9khsKPaDQFahkt46YCyBrA_1770437091245_na1fn_ZW52ZWxvcGUtaWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzZVU3JxUGVNV3AwUFZvYmRpRDFoRC9zYW5kYm94LzlraHNLUGFEUUZhaGt0NDZZQ3lCckFfMTc3MDQzNzA5MTI0NV9uYTFmbl9aVzUyWld4dmNHVXRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CAXXgxQrxqunnhETfmqompgo0u-QIfg3v5qrw9RwyLYR4sX5NAcYKoax8fYBSMS9zwUBFUY0M6OFW~VBi8kV6de8pNiapq6BtAqBmU6gfYzbonuXUHTwSF~qKBe8G6P5olE23NyCwRYilQ9~CgsBROhxSR8U3OBS4fl7LasknjcO0tPC9zWyQF~Ny8SQoAyICtnce0tZZT1jSGMv9~igGhg76YtxaEEkr2Oyb4TM8iQszA7Cyyhkga5V-TBGAaslp5d1fQMLm-qdjuw07uqlmUv~rD7qJUlfnQ-M-w-5hVx72iTV9cQ7h1-nqgg3xUD4CWXI1n7Ba11qCfs6V0ZzUQ__"
                  alt="Empty mailbox"
                  className="w-24 h-24 mx-auto mb-6 opacity-50"
                />
                <p className="text-sm text-muted-foreground mb-6">
                  {t('viewLetters.noLetters')}
                </p>
                <Button
                  className="pixel-border bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
                  onClick={() => setLocation("/write")}
                >
                  {t('home.writeButton')}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-foreground">
                      {allLetters.length} {allLetters.length === 1 ? "Letter" : "Letters"}
                    </p>
                  </div>
                  <Button
                    className="pixel-border bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm px-4"
                    onClick={() => setLocation("/write")}
                  >
                    + {t('home.writeButton')}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allLetters.map((letter) => (
                  <div
                    key={letter.id}
                    className="bg-card pixel-border p-6 hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <img 
                        src="https://private-us-east-1.manuscdn.com/sessionFile/36USrqPeMWp0PVobdiD1hD/sandbox/9khsKPaDQFahkt46YCyBrA_1770437091245_na1fn_ZW52ZWxvcGUtaWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzZVU3JxUGVNV3AwUFZvYmRpRDFoRC9zYW5kYm94LzlraHNLUGFEUUZhaGt0NDZZQ3lCckFfMTc3MDQzNzA5MTI0NV9uYTFmbl9aVzUyWld4dmNHVXRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CAXXgxQrxqunnhETfmqompgo0u-QIfg3v5qrw9RwyLYR4sX5NAcYKoax8fYBSMS9zwUBFUY0M6OFW~VBi8kV6de8pNiapq6BtAqBmU6gfYzbonuXUHTwSF~qKBe8G6P5olE23NyCwRYilQ9~CgsBROhxSR8U3OBS4fl7LasknjcO0tPC9zWyQF~Ny8SQoAyICtnce0tZZT1jSGMv9~igGhg76YtxaEEkr2Oyb4TM8iQszA7Cyyhkga5V-TBGAaslp5d1fQMLm-qdjuw07uqlmUv~rD7qJUlfnQ-M-w-5hVx72iTV9cQ7h1-nqgg3xUD4CWXI1n7Ba11qCfs6V0ZzUQ__"
                        alt="Envelope"
                        className="w-12 h-12"
                      />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(letter.createdAt)}
                      </span>
                    </div>
                    
                    <div 
                      className="space-y-2 cursor-pointer"
                      onClick={() => setSelectedLetter(letter)}
                    >
                      <p className="text-sm text-foreground">
                        <span className="text-muted-foreground">To:</span> {letter.recipient}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="text-muted-foreground">From:</span> {letter.sender}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-3 mt-3">
                        {letter.message}
                      </p>
                    </div>

                    {/* Reactions Display */}
                    {letter.reactions && Object.keys(letter.reactions).length > 0 && (
                      <ReactionDisplay
                        reactions={convertReactionsToArray(letter.reactions)}
                        onReactionClick={(emoji) => handleReaction(letter.id, emoji)}
                      />
                    )}
                    
                    <div className="mt-4 flex justify-between items-center gap-2">
                      <span className="text-xs text-primary cursor-pointer hover:underline" onClick={() => setSelectedLetter(letter)}>
                        Read →
                      </span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="pixel-border bg-card text-foreground hover:bg-secondary text-xs h-7 px-2"
                          onClick={() => {
                            const link = `${window.location.origin}/letter/${letter.id}`;
                            navigator.clipboard.writeText(link);
                            setCopiedId(letter.id);
                            setTimeout(() => setCopiedId(null), 2000);
                            toast.success('Link copied!');
                          }}
                        >
                          {copiedId === letter.id ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                        <ReactionPicker
                          onReactionSelect={(emoji) => handleReaction(letter.id, emoji)}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="pixel-border bg-card text-foreground hover:bg-secondary text-xs h-7 px-2"
                          onClick={() => {
                            setSelectedLetter(letter);
                            setShareOpen(true);
                          }}
                        >
                          Share 📤
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Letter Detail Modal */}
      <Dialog open={!!selectedLetter && !shareOpen} onOpenChange={() => setSelectedLetter(null)}>
        <DialogContent className="pixel-border-thick bg-card max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base text-foreground">
              Your Valentine's Letter
            </DialogTitle>
          </DialogHeader>
          
          {selectedLetter && (
            <div 
              className="p-6 space-y-4"
              style={{
                backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/36USrqPeMWp0PVobdiD1hD/sandbox/9khsKPaDQFahkt46YCyBrA-img-2_1770437090000_na1fn_bGV0dGVyLXdyaXRpbmctYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzZVU3JxUGVNV3AwUFZvYmRpRDFoRC9zYW5kYm94LzlraHNLUGFEUUZhaGt0NDZZQ3lCckEtaW1nLTJfMTc3MDQzNzA5MDAwMF9uYTFmbl9iR1YwZEdWeUxYZHlhWFJwYm1jdFltYy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=moleECtlsbkmdUkdb~2epJt-VbkOWuYSW6c~uW8PCalyNrl0ECBAnOXt69gUQhmGOLpOPzBdSRsmgoxbkxAuW40An7L-VGJlX3dnWnZhuo-mbcsVIyzph6iHOP2eqPCT4GlMxd7M-4Luyq8uzB8to7QEG0U58QM1yTeC5mVawVSsMX222rrTHIf-ZzR45tNDt--oqFhVRjCllonZ018ttNlnOfiaXKA3Wd2YBqAS0E-JWqSGIHGWbMQ-2ZUdpwW61ZTYr7EdZT4-seOdGQecvb1hLr8hWUMRTrE3ktnsRJWuEOp6KQL1hzigWEKt0K3goA5RT8I~yQolkgMez4HScQ__')`,
                backgroundSize: 'cover',
              }}
            >
              <div className="bg-card/95 p-4 pixel-border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-foreground mb-1">
                      <span className="text-muted-foreground">To:</span> {selectedLetter.recipient}
                    </p>
                    <p className="text-sm text-foreground">
                      <span className="text-muted-foreground">From:</span> {selectedLetter.sender}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(selectedLetter.createdAt)}
                  </span>
                </div>
                
                <div className="my-6 h-px bg-border"></div>
                
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {selectedLetter.message}
                </p>

                {/* Reactions in Modal */}
                {selectedLetter.reactions && Object.keys(selectedLetter.reactions).length > 0 && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Reactions:</p>
                    <ReactionDisplay
                      reactions={convertReactionsToArray(selectedLetter.reactions)}
                      onReactionClick={(emoji) => handleReaction(selectedLetter.id, emoji)}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 justify-end mt-4 flex-wrap">
                <Button
                  variant="outline"
                  className="pixel-border bg-card text-foreground hover:bg-muted text-sm"
                  onClick={() => setSelectedLetter(null)}
                >
                  Close
                </Button>
                <ReactionPicker
                  onReactionSelect={(emoji) => handleReaction(selectedLetter.id, emoji)}
                />
                <Button
                  className="pixel-border bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm"
                  onClick={() => setShareOpen(true)}
                >
                  Share 📤
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <ShareModal
        open={shareOpen}
        onOpenChange={setShareOpen}
        letter={selectedLetter}
      />

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t-4 border-border">
        <div className="container text-center">
          <p className="text-xs text-muted-foreground">
            with love always, Dani 💕 @danmced
          </p>
        </div>
      </footer>
    </div>
  );
}
