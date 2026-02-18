/*
  LetterTemplates Component - Template selection and customization
  Design Philosophy: 8-bit Retro Gaming Aesthetic
*/

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LETTER_TEMPLATES, getThemeInfo, getAllThemes } from "@/lib/letterTemplates";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface LetterTemplatesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (template: string) => void;
}

export default function LetterTemplates({
  open,
  onOpenChange,
  onSelectTemplate,
}: LetterTemplatesProps) {
  const { i18n } = useTranslation();
  const [selectedTheme, setSelectedTheme] = useState<"romantic" | "funny" | "friendship">(
    "romantic"
  );
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const themes = getAllThemes();
  const themeTemplates = LETTER_TEMPLATES.filter((t) => t.theme === selectedTheme);
  const currentTemplate = LETTER_TEMPLATES.find((t) => t.id === selectedTemplate);

  const handleSelectTemplate = () => {
    if (currentTemplate) {
      const template = i18n.language === "es" ? currentTemplate.templateEs : currentTemplate.template;
      onSelectTemplate(template);
      onOpenChange(false);
      setSelectedTemplate(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pixel-border-thick bg-card max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base text-foreground">
            {i18n.language === "es" ? "Elige una Plantilla de Carta" : "Choose a Letter Template"} 📝
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Theme Selection */}
          <div className="space-y-3">
            <p className="text-sm text-foreground font-bold">{i18n.language === "es" ? "Selecciona Tema:" : "Select Theme:"}</p>
            <div className="grid grid-cols-3 gap-3">
              {themes.map((theme) => {
                const info = getThemeInfo(theme);
                return (
                  <button
                    key={theme}
                    onClick={() => {
                      setSelectedTheme(theme);
                      setSelectedTemplate(null);
                    }}
                    className={`pixel-border p-4 text-center transition-colors ${
                      selectedTheme === theme
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{info.emoji}</div>
                    <div className="text-xs font-bold">{info.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{info.description}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Template Selection */}
          <div className="space-y-3">
            <p className="text-sm text-foreground font-bold">{i18n.language === "es" ? "Selecciona Plantilla:" : "Select Template:"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {themeTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`pixel-border p-4 text-left transition-colors ${
                    selectedTemplate === template.id
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-card text-foreground hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{template.emoji}</span>
                    <span className="text-sm font-bold">{i18n.language === "es" ? template.nameEs : template.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{i18n.language === "es" ? template.descriptionEs : template.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Template Preview */}
          {currentTemplate && (
            <div className="space-y-3 border-t-2 border-border pt-6">
              <p className="text-sm text-foreground font-bold">{i18n.language === "es" ? "Vista Previa:" : "Preview:"}</p>
              <div className="bg-muted pixel-border p-4 max-h-48 overflow-y-auto">
                <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed">
                  {i18n.language === "es" ? currentTemplate.templateEs : currentTemplate.template}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                💡 {i18n.language === "es" ? "Consejo: Puedes personalizar esta plantilla después de seleccionarla. Reemplaza [RECIPIENT] y [YOUR NAME] con nombres reales." : "Tip: You can customize this template after selecting it. Replace [RECIPIENT] and [YOUR NAME] with actual names."}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end border-t-2 border-border pt-6">
            <Button
              variant="outline"
              className="pixel-border bg-card text-foreground hover:bg-muted text-sm"
              onClick={() => onOpenChange(false)}
            >
              {i18n.language === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button
              className="pixel-border bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
              onClick={handleSelectTemplate}
              disabled={!selectedTemplate}
            >
              {i18n.language === "es" ? "Usar Esta Plantilla" : "Use This Template"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
