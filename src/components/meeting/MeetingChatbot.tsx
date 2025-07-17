import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Brain, 
  Send, 
  Mic, 
  Clock, 
  User, 
  Bot,
  Lightbulb,
  Search,
  BookOpen,
  Zap
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  context?: string;
}

interface MeetingChatbotProps {
  meetingContext: string;
}

const MeetingChatbot = ({ meetingContext }: MeetingChatbotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      type: 'assistant',
      content: `Hello! I'm your AI meeting assistant. I've been following the "${meetingContext}" and I'm here to help answer questions, clarify concepts, or provide additional context about what's being discussed. What would you like to know?`,
      timestamp: Date.now(),
    };
    setMessages([welcomeMessage]);
  }, [meetingContext]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on what was just discussed about render props, this pattern is particularly useful when you need to share stateful logic between components without changing their structure. The key is that the component receiving the render prop controls what to render, while the providing component manages the state.",
        "Great question! The main difference between Higher-Order Components and Custom Hooks is that HOCs return enhanced components, while custom hooks return stateful values and functions. Custom hooks are generally preferred in modern React because they're more composable and don't create wrapper hell.",
        "From the current discussion, it sounds like you're asking about performance optimization. Remember that React.memo, useMemo, and useCallback should be used judiciously - premature optimization can sometimes hurt performance more than help it.",
        "That's an excellent point about component composition. The pattern being demonstrated right now follows the principle of 'composition over inheritance' which makes components more flexible and reusable.",
        "I noticed the instructor just covered this topic 3 minutes ago. To summarize: Custom hooks allow you to extract component logic into reusable functions, and they can use other hooks internally while following the same rules of hooks."
      ];

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: Date.now(),
        context: `Referenced from: ${meetingContext} discussion`
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Mock voice input simulation
    if (!isListening) {
      setTimeout(() => {
        setInput("What was the main difference between render props and HOCs?");
        setIsListening(false);
      }, 2000);
    }
  };

  const quickQuestions = [
    "Summarize the key points so far",
    "What are the best practices mentioned?",
    "Can you explain the current concept again?",
    "What are the common pitfalls to avoid?"
  ];

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
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium flex items-center gap-2">
            <Brain className="w-4 h-4 text-meeting-secondary" />
            AI Assistant
          </h3>
          <Badge variant="secondary" className="bg-meeting-secondary/20 text-meeting-secondary border-meeting-secondary/30">
            Context Aware
          </Badge>
        </div>
        
        <div className="text-xs text-muted-foreground bg-meeting-surface-light p-2 rounded border">
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>Following: {meetingContext}</span>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="p-3 border-b border-border bg-meeting-surface-light">
        <div className="flex items-center gap-1 mb-2">
          <Lightbulb className="w-3 h-3 text-meeting-accent" />
          <span className="text-xs font-medium">Quick Questions</span>
        </div>
        <div className="grid grid-cols-1 gap-1">
          {quickQuestions.slice(0, 2).map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => setInput(question)}
              className="h-6 text-xs justify-start text-left hover:bg-meeting-surface"
            >
              {question}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    message.type === 'user' 
                      ? 'bg-meeting-primary text-primary-foreground' 
                      : 'bg-meeting-secondary text-secondary-foreground'
                  }`}>
                    {message.type === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  </div>
                  
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-meeting-primary text-primary-foreground'
                      : 'bg-meeting-surface-light border border-border'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.context && (
                      <div className="mt-2 pt-2 border-t border-border/30">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Search className="w-3 h-3" />
                          <span>{message.context}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-meeting-secondary rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3" />
                </div>
                <div className="bg-meeting-surface-light border border-border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-meeting-secondary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-meeting-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-meeting-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-meeting-surface-light">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about the current topic..."
              className="bg-meeting-surface border-border"
              disabled={isLoading}
            />
          </div>
          
          <Button
            size="sm"
            variant={isListening ? "default" : "secondary"}
            onClick={toggleVoiceInput}
            className={isListening ? "animate-pulse" : ""}
          >
            <Mic className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-meeting-primary hover:bg-meeting-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send</span>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-meeting-accent" />
            <span>Real-time context</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingChatbot;