import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { 
  Languages, 
  ArrowRightLeft, 
  Volume2, 
  Copy, 
  Download,
  Settings,
  Zap
} from 'lucide-react';

interface TranslationEntry {
  id: string;
  original: string;
  translated: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: number;
  confidence: number;
}

interface TranslationPanelProps {
  enabled: boolean;
}

const TranslationPanel = ({ enabled }: TranslationPanelProps) => {
  const [translations, setTranslations] = useState<TranslationEntry[]>([]);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [autoDetect, setAutoDetect] = useState(true);
  const [realTimeMode, setRealTimeMode] = useState(true);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  // Mock translation data
  useEffect(() => {
    if (!enabled) return;

    const sampleTranslations = [
      {
        original: "Welcome everyone to today's Advanced React Patterns workshop.",
        translated: "Bienvenidos todos al taller de Patrones Avanzados de React de hoy.",
      },
      {
        original: "Let's start with render props and their implementation.",
        translated: "Comencemos con render props y su implementación.",
      },
      {
        original: "The key benefit is code reusability across components.",
        translated: "El beneficio clave es la reutilización de código entre componentes.",
      }
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < sampleTranslations.length) {
        const newTranslation: TranslationEntry = {
          id: Date.now().toString(),
          original: sampleTranslations[index].original,
          translated: sampleTranslations[index].translated,
          sourceLanguage: sourceLanguage,
          targetLanguage: targetLanguage,
          timestamp: Date.now(),
          confidence: 0.92 + Math.random() * 0.08
        };
        
        setTranslations(prev => [...prev, newTranslation]);
        index++;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [enabled, sourceLanguage, targetLanguage]);

  const getLanguageInfo = (code: string) => {
    return languages.find(lang => lang.code === code) || languages[0];
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  const copyTranslation = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex flex-col bg-meeting-surface">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center gap-2">
            <Languages className="w-4 h-4 text-meeting-secondary" />
            Live Translation
          </h3>
          <div className="flex items-center gap-2">
            <Switch
              checked={enabled}
              className="data-[state=checked]:bg-meeting-secondary"
            />
            <Button size="sm" variant="ghost">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">From</label>
              <Select 
                value={sourceLanguage} 
                onValueChange={setSourceLanguage}
                disabled={autoDetect}
              >
                <SelectTrigger className="h-8 bg-meeting-surface-light border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={swapLanguages}
              className="mt-5 p-2"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </Button>

            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">To</label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className="h-8 bg-meeting-surface-light border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Settings */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Switch 
                checked={autoDetect} 
                onCheckedChange={setAutoDetect}
                className="data-[state=checked]:bg-meeting-secondary"
              />
              <span className="text-muted-foreground">Auto-detect</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                checked={realTimeMode} 
                onCheckedChange={setRealTimeMode}
                className="data-[state=checked]:bg-meeting-secondary"
              />
              <span className="text-muted-foreground">Real-time</span>
              <Zap className="w-3 h-3 text-meeting-accent" />
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="px-4 py-2 bg-meeting-surface-light border-b border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-meeting-secondary animate-pulse' : 'bg-muted'}`} />
            <span className="text-muted-foreground">
              {enabled ? 'Translating...' : 'Translation disabled'}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {translations.length} translations
          </Badge>
        </div>
      </div>

      {/* Translation History */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {translations.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {enabled ? (
                <div className="flex flex-col items-center gap-2">
                  <Languages className="w-8 h-8 text-meeting-secondary" />
                  <p>Waiting for speech to translate...</p>
                </div>
              ) : (
                <p>Enable translation to start</p>
              )}
            </div>
          ) : (
            translations.map((translation) => (
              <Card key={translation.id} className="p-4 bg-meeting-surface-light border-border">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatTimestamp(translation.timestamp)}</span>
                    <Badge 
                      variant="outline" 
                      className="border-meeting-secondary text-meeting-secondary"
                    >
                      {Math.round(translation.confidence * 100)}% confident
                    </Badge>
                  </div>

                  {/* Original Text */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium flex items-center gap-1">
                        {getLanguageInfo(translation.sourceLanguage).flag}
                        {getLanguageInfo(translation.sourceLanguage).name}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyTranslation(translation.original)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground bg-meeting-surface p-2 rounded border">
                      {translation.original}
                    </p>
                  </div>

                  {/* Translated Text */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium flex items-center gap-1">
                        {getLanguageInfo(translation.targetLanguage).flag}
                        {getLanguageInfo(translation.targetLanguage).name}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyTranslation(translation.translated)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground bg-meeting-secondary/10 p-2 rounded border border-meeting-secondary/20">
                      {translation.translated}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-meeting-surface-light">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Powered by Neural Translation
          </span>
          <Button size="sm" variant="ghost">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TranslationPanel;