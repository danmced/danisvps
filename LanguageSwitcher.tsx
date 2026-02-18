import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="pixel-border bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground"
    >
      {i18n.language === 'en' ? 'ES' : 'EN'}
    </Button>
  );
}
