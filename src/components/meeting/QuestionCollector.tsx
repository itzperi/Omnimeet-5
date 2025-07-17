import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Lightbulb, 
  Plus, 
  Mic, 
  Edit, 
  Trash2, 
  Tag, 
  Clock,
  Star,
  AlertCircle,
  BookOpen,
  Zap,
  Save,
  Download
} from 'lucide-react';

interface Question {
  id: string;
  content: string;
  category: 'important' | 'review' | 'practice';
  timestamp: number;
  context: string;
  tags: string[];
  isStarred: boolean;
  source: 'manual' | 'voice' | 'auto';
}

interface QuestionCollectorProps {
  onQuestionCaptured: () => void;
}

const QuestionCollector = ({ onQuestionCaptured }: QuestionCollectorProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Question['category']>('important');
  const [filter, setFilter] = useState<'all' | Question['category']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Voice command detection simulation
  useEffect(() => {
    if (isListening) {
      const timeout = setTimeout(() => {
        const voiceQuestions = [
          "This is important - What are the main differences between useState and useReducer?",
          "Key concept - How does React's reconciliation algorithm work?",
          "Remember this - What are the benefits of using TypeScript with React?",
          "Important point - When should we use useCallback vs useMemo?"
        ];
        
        const randomQuestion = voiceQuestions[Math.floor(Math.random() * voiceQuestions.length)];
        addQuestion(randomQuestion, 'voice');
        setIsListening(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isListening]);

  const addQuestion = (content: string, source: Question['source'] = 'manual') => {
    const question: Question = {
      id: Date.now().toString(),
      content,
      category: selectedCategory,
      timestamp: Date.now(),
      context: 'Advanced React Patterns Workshop - Component State Management',
      tags: extractTags(content),
      isStarred: false,
      source
    };

    setQuestions(prev => [...prev, question]);
    onQuestionCaptured();
    setNewQuestion('');
  };

  const extractTags = (content: string): string[] => {
    const keywords = ['react', 'hooks', 'state', 'props', 'component', 'typescript', 'performance'];
    return keywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    );
  };

  const toggleStar = (id: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, isStarred: !q.isStarred } : q
    ));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(prev => prev.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    ));
    setEditingQuestion(null);
  };

  const filteredQuestions = questions.filter(question => {
    const matchesFilter = filter === 'all' || question.category === filter;
    const matchesSearch = question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const categoryColors = {
    important: 'bg-red-500/20 text-red-500 border-red-500/30',
    review: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    practice: 'bg-blue-500/20 text-blue-500 border-blue-500/30'
  };

  const categoryIcons = {
    important: AlertCircle,
    review: BookOpen,
    practice: Zap
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
            <Lightbulb className="w-4 h-4 text-meeting-accent" />
            Question Collector
          </h3>
          <Badge variant="secondary" className="bg-meeting-accent/20 text-meeting-accent border-meeting-accent/30">
            {questions.length} captured
          </Badge>
        </div>

        {/* Quick Capture */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isListening ? "default" : "secondary"}
              onClick={() => setIsListening(!isListening)}
              className={`${isListening ? "animate-pulse bg-meeting-danger" : ""} flex-1`}
            >
              <Mic className="w-4 h-4 mr-2" />
              {isListening ? 'Listening...' : '"This is important"'}
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-meeting-surface border-border">
                <DialogHeader>
                  <DialogTitle>Add Question</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="What's the important question or concept?"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="bg-meeting-surface-light border-border"
                  />
                  <Select value={selectedCategory} onValueChange={(value: Question['category']) => setSelectedCategory(value)}>
                    <SelectTrigger className="bg-meeting-surface-light border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="important">
                        <span className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          Important
                        </span>
                      </SelectItem>
                      <SelectItem value="review">
                        <span className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-yellow-500" />
                          Review Later
                        </span>
                      </SelectItem>
                      <SelectItem value="practice">
                        <span className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-500" />
                          Practice
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={() => addQuestion(newQuestion)}
                    disabled={!newQuestion.trim()}
                    className="w-full bg-meeting-primary hover:bg-meeting-primary/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Question
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 bg-meeting-surface-light border-border"
            />
            <Select value={filter} onValueChange={(value: 'all' | Question['category']) => setFilter(value)}>
              <SelectTrigger className="h-8 w-24 bg-meeting-surface-light border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="practice">Practice</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Lightbulb className="w-8 h-8 mx-auto mb-2 text-meeting-accent" />
              <p>No questions captured yet</p>
              <p className="text-xs mt-1">Say "This is important" or click + to add</p>
            </div>
          ) : (
            filteredQuestions.map((question) => {
              const CategoryIcon = categoryIcons[question.category];
              return (
                <Card key={question.id} className="p-3 bg-meeting-surface-light border-border hover:border-meeting-accent/30 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={categoryColors[question.category]}>
                          <CategoryIcon className="w-3 h-3 mr-1" />
                          {question.category}
                        </Badge>
                        {question.source === 'voice' && (
                          <Badge variant="outline" className="text-xs">
                            <Mic className="w-3 h-3 mr-1" />
                            Voice
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleStar(question.id)}
                          className={`h-6 w-6 p-0 ${question.isStarred ? 'text-meeting-accent' : ''}`}
                        >
                          <Star className={`w-3 h-3 ${question.isStarred ? 'fill-current' : ''}`} />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingQuestion(question)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-meeting-surface border-border">
                            <DialogHeader>
                              <DialogTitle>Edit Question</DialogTitle>
                            </DialogHeader>
                            {editingQuestion && (
                              <div className="space-y-4">
                                <Textarea
                                  value={editingQuestion.content}
                                  onChange={(e) => setEditingQuestion({
                                    ...editingQuestion,
                                    content: e.target.value
                                  })}
                                  className="bg-meeting-surface-light border-border"
                                />
                                <Select 
                                  value={editingQuestion.category} 
                                  onValueChange={(value: Question['category']) => 
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      category: value
                                    })
                                  }
                                >
                                  <SelectTrigger className="bg-meeting-surface-light border-border">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="important">Important</SelectItem>
                                    <SelectItem value="review">Review Later</SelectItem>
                                    <SelectItem value="practice">Practice</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button 
                                  onClick={() => updateQuestion(editingQuestion)}
                                  className="w-full bg-meeting-primary hover:bg-meeting-primary/90"
                                >
                                  Update Question
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteQuestion(question.id)}
                          className="h-6 w-6 p-0 text-meeting-danger hover:text-meeting-danger"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-foreground leading-relaxed">
                      {question.content}
                    </p>

                    {question.tags.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap">
                        <Tag className="w-3 h-3 text-muted-foreground" />
                        {question.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(question.timestamp)}
                      </span>
                      <span className="truncate max-w-32">{question.context}</span>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-meeting-surface-light">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Smart question detection active
          </span>
          <Button size="sm" variant="ghost">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCollector;