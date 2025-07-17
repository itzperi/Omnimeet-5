import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Download, 
  Copy, 
  User, 
  Clock, 
  Settings,
  Pause,
  Play,
  RotateCcw
} from 'lucide-react';

interface TranscriptEntry {
  id: string;
  speaker: string;
  text: string;
  timestamp: number;
  confidence: number;
  color: string;
}

interface TranscriptPanelProps {
  isRecording: boolean;
}

const TranscriptPanel = ({ isRecording }: TranscriptPanelProps) => {
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock speakers with colors
  const speakers = [
    { name: 'Sarah Chen', color: 'bg-blue-500' },
    { name: 'John Smith', color: 'bg-green-500' },
    { name: 'Maria Lopez', color: 'bg-purple-500' },
    { name: 'David Kim', color: 'bg-orange-500' }
  ];

  // Mock real-time transcript generation
  useEffect(() => {
    if (!isRecording) return;

    const sampleTexts = [
      "Welcome everyone to today's Advanced React Patterns workshop. We'll be covering render props, higher-order components, and custom hooks.",
      "Let's start with render props. This pattern allows us to share code between components using a prop whose value is a function.",
      "The key benefit is that we can abstract stateful behavior without changing the component hierarchy.",
      "Does anyone have questions about how render props differ from higher-order components?",
      "Higher-order components are functions that take a component and return a new component with enhanced functionality.",
      "Custom hooks allow us to extract component logic into reusable functions that can be shared across components."
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < sampleTexts.length) {
        const speaker = speakers[index % speakers.length];
        const newTranscript: TranscriptEntry = {
          id: Date.now().toString(),
          speaker: speaker.name,
          text: sampleTexts[index],
          timestamp: Date.now(),
          confidence: 0.85 + Math.random() * 0.15,
          color: speaker.color
        };
        
        setTranscripts(prev => [...prev, newTranscript]);
        index++;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isRecording]);

  // Auto scroll to bottom
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcripts, autoScroll]);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filteredTranscripts = transcripts.filter(transcript =>
    transcript.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transcript.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyTranscript = () => {
    const fullTranscript = transcripts
      .map(t => `[${formatTimestamp(t.timestamp)}] ${t.speaker}: ${t.text}`)
      .join('\n');
    navigator.clipboard.writeText(fullTranscript);
  };

  return (
    <div className="h-full flex flex-col bg-meeting-surface">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center gap-2">
            <User className="w-4 h-4 text-meeting-primary" />
            Live Transcript
          </h3>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setAutoScroll(!autoScroll)}
              className={autoScroll ? "text-meeting-primary" : ""}
            >
              {autoScroll ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button size="sm" variant="ghost" onClick={copyTranscript}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transcript..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-8 bg-meeting-surface-light border-border"
          />
        </div>
      </div>

      {/* Status */}
      <div className="px-4 py-2 bg-meeting-surface-light border-b border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-meeting-primary animate-pulse' : 'bg-muted'}`} />
            <span className="text-muted-foreground">
              {isRecording ? 'Recording...' : 'Stopped'}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {transcripts.length} entries
          </Badge>
        </div>
      </div>

      {/* Transcript List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {filteredTranscripts.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              {isRecording ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-meeting-primary border-t-transparent rounded-full animate-spin" />
                  <p>Listening for speech...</p>
                </div>
              ) : (
                <p>Start recording to see live transcription</p>
              )}
            </div>
          ) : (
            filteredTranscripts.map((transcript) => (
              <Card key={transcript.id} className="p-3 bg-meeting-surface-light border-border hover:border-meeting-primary/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${transcript.color} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                    {transcript.speaker.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{transcript.speaker}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(transcript.timestamp)}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          transcript.confidence > 0.9 
                            ? 'border-green-500 text-green-500' 
                            : transcript.confidence > 0.8 
                            ? 'border-yellow-500 text-yellow-500'
                            : 'border-red-500 text-red-500'
                        }`}
                      >
                        {Math.round(transcript.confidence * 100)}%
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {transcript.text}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-meeting-surface-light">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Powered by Advanced Speech Recognition</span>
          <Button size="sm" variant="ghost">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TranscriptPanel;