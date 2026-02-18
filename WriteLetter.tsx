/*
  WriteLetter Component - Pixel art styled letter writing interface
  Design Philosophy: 8-bit Retro Gaming Aesthetic
  - Letter writing interface styled like an RPG dialogue box
  - Pixel art parchment background
  - Game-style form inputs with chunky borders
*/

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LetterTemplates from "@/components/LetterTemplates";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "react-i18next";

export default function WriteLetter() {
  const [, setLocation] = useLocation();
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const { t } = useTranslation();

  // tRPC mutation for creating a letter
  const createLetterMutation = trpc.letters.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!to || !from || !message) {
      toast.error(t('writeLetter.validationError'));
      return;
    }

    setIsSubmitting(true);

    try {
      // Create letter via API
      await createLetterMutation.mutateAsync({
        recipient: to,
        sender: from,
        message: message,
      });

      // Show success message
      toast.success(t('writeLetter.successMessage'));
      
      // Navigate to letters page immediately
      setLocation("/letters");
    } catch (error) {
      console.error("Error sending letter:", error);
      toast.error(t('writeLetter.errorMessage'));
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-base sm:text-lg text-foreground">{t('writeLetter.title')}</h1>
          <div className="w-16"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div 
          className="container max-w-3xl mx-auto"
          style={{
            backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/36USrqPeMWp0PVobdiD1hD/sandbox/9khsKPaDQFahkt46YCyBrA-img-2_1770437090000_na1fn_bGV0dGVyLXdyaXRpbmctYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzZVU3JxUGVNV3AwUFZvYmRpRDFoRC9zYW5kYm94LzlraHNLUGFEUUZhaGt0NDZZQ3lCckEtaW1nLTJfMTc3MDQzNzA5MDAwMF9uYTFmbl9iR1YwZEdWeUxYZHlhWFJwYm1jdFltYy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=moleECtlsbkmdUkdb~2epJt-VbkOWuYSW6c~uW8PCalyNrl0ECBAnOXt69gUQhmGOLpOPzBdSRsmgoxbkxAuW40An7L-VGJlX3dnWnZhuo-mbcsVIyzph6iHOP2eqPCT4GlMxd7M-4Luyq8uzB8to7QEG0U58QM1yTeC5mVawVSsMX222rrTHIf-ZzR45tNDt--oqFhVRjCllonZ018ttNlnOfiaXKA3Wd2YBqAS0E-JWqSGIHGWbMQ-2ZUdpwW61ZTYr7EdZT4-seOdGQecvb1hLr8hWUMRTrE3ktnsRJWuEOp6KQL1hzigWEKt0K3goA5RT8I~yQolkgMez4HScQ__')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="bg-card/95 pixel-border-thick p-8">
            <div className="mb-8 text-center">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/36USrqPeMWp0PVobdiD1hD/sandbox/9khsKPaDQFahkt46YCyBrA_1770437091245_na1fn_ZW52ZWxvcGUtaWNvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMzZVU3JxUGVNV3AwUFZvYmRpRDFoRC9zYW5kYm94LzlraHNLUGFEUUZhaGt0NDZZQ3lCckFfMTc3MDQzNzA5MTI0NV9uYTFmbl9aVzUyWld4dmNHVXRhV052YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CAXXgxQrxqunnhETfmqompgo0u-QIfg3v5qrw9RwyLYR4sX5NAcYKoax8fYBSMS9zwUBFUY0M6OFW~VBi8kV6de8pNiapq6BtAqBmU6gfYzbonuXUHTwSF~qKBe8G6P5olE23NyCwRYilQ9~CgsBROhxSR8U3OBS4fl7LasknjcO0tPC9zWyQF~Ny8SQoAyICtnce0tZZT1jSGMv9~igGhg76YtxaEEkr2Oyb4TM8iQszA7Cyyhkga5V-TBGAaslp5d1fQMLm-qdjuw07uqlmUv~rD7qJUlfnQ-M-w-5hVx72iTV9cQ7h1-nqgg3xUD4CWXI1n7Ba11qCfs6V0ZzUQ__"
                alt="Envelope"
                className="w-20 h-20 mx-auto pixel-pulse"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="to" className="text-sm text-foreground">
                  {t('writeLetter.recipientLabel')}
                </Label>
                <Input
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Your Valentine's name"
                  className="pixel-border bg-input text-foreground text-sm"
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="from" className="text-sm text-foreground">
                  {t('writeLetter.senderLabel')}
                </Label>
                <Input
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Your name"
                  className="pixel-border bg-input text-foreground text-sm"
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-foreground">
                  {t('writeLetter.messageLabel')}
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('writeLetter.messagePlaceholder')}
                  className="pixel-border bg-input text-foreground text-sm min-h-[200px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {message.length}/500
                </p>
              </div>

              <div className="flex gap-4 justify-center pt-4 flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  className="pixel-border bg-card text-foreground hover:bg-muted text-sm px-6"
                  onClick={() => setLocation("/")}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="button"
                  className="pixel-border bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm px-6"
                  onClick={() => setTemplatesOpen(true)}
                >
                  📝 {t('writeLetter.useTemplate')}
                </Button>
                <Button
                  type="submit"
                  className="pixel-border bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-6"
                  disabled={isSubmitting || createLetterMutation.isPending}
                >
                  {isSubmitting || createLetterMutation.isPending ? t('common.loading') : t('writeLetter.sendButton')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Letter Templates Modal */}
      <LetterTemplates
        open={templatesOpen}
        onOpenChange={setTemplatesOpen}
        onSelectTemplate={(template) => setMessage(template)}
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
