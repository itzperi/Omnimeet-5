import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, 
  Users, 
  Clock, 
  Lightbulb, 
  MessageSquare, 
  TrendingUp,
  Target,
  Award,
  BarChart3,
  Eye,
  Volume2,
  Brain
} from 'lucide-react';

interface AnalyticsDashboardProps {
  duration: number;
  participants: number;
}

interface EngagementMetric {
  label: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
}

interface ParticipantActivity {
  name: string;
  engagement: number;
  questions: number;
  speaking: number;
  color: string;
}

const AnalyticsDashboard = ({ duration, participants }: AnalyticsDashboardProps) => {
  const [engagementScore, setEngagementScore] = useState(78);
  const [realTimeMetrics, setRealTimeMetrics] = useState<EngagementMetric[]>([]);
  const [participantData, setParticipantData] = useState<ParticipantActivity[]>([]);
  const [topicsDiscussed, setTopicsDiscussed] = useState<string[]>([]);

  // Initialize metrics
  useEffect(() => {
    const metrics: EngagementMetric[] = [
      { label: 'Active Participation', value: 85, trend: 'up', icon: Users },
      { label: 'Question Frequency', value: 12, trend: 'up', icon: Lightbulb },
      { label: 'Audio Quality', value: 94, trend: 'stable', icon: Volume2 },
      { label: 'Focus Score', value: 72, trend: 'down', icon: Eye },
      { label: 'Comprehension', value: 88, trend: 'up', icon: Brain },
      { label: 'Interaction Rate', value: 6.2, trend: 'up', icon: MessageSquare }
    ];

    const participants: ParticipantActivity[] = [
      { name: 'Sarah Chen', engagement: 92, questions: 5, speaking: 18, color: 'bg-blue-500' },
      { name: 'John Smith', engagement: 76, questions: 3, speaking: 12, color: 'bg-green-500' },
      { name: 'Maria Lopez', engagement: 88, questions: 7, speaking: 15, color: 'bg-purple-500' },
      { name: 'David Kim', engagement: 65, questions: 2, speaking: 8, color: 'bg-orange-500' },
      { name: 'Alex Johnson', engagement: 81, questions: 4, speaking: 22, color: 'bg-pink-500' },
      { name: 'Emma Wilson', engagement: 79, questions: 6, speaking: 14, color: 'bg-cyan-500' }
    ];

    const topics = [
      'React Hooks Fundamentals',
      'Component State Management',
      'Custom Hook Patterns',
      'Performance Optimization',
      'Error Boundaries',
      'Context API Usage'
    ];

    setRealTimeMetrics(metrics);
    setParticipantData(participants);
    setTopicsDiscussed(topics);
  }, []);

  // Real-time engagement updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEngagementScore(prev => {
        const change = (Math.random() - 0.5) * 6;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getEngagementLevel = (score: number) => {
    if (score >= 80) return { level: 'High', color: 'text-green-500', bg: 'bg-green-500/20' };
    if (score >= 60) return { level: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-500/20' };
    return { level: 'Low', color: 'text-red-500', bg: 'bg-red-500/20' };
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
      case 'stable':
        return <div className="w-3 h-1 bg-yellow-500 rounded"></div>;
    }
  };

  const overallEngagement = getEngagementLevel(engagementScore);

  return (
    <div className="h-full flex flex-col bg-meeting-surface">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-meeting-secondary" />
            Live Analytics
          </h3>
          <Badge className={`${overallEngagement.bg} ${overallEngagement.color} border-0`}>
            {overallEngagement.level} Engagement
          </Badge>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 bg-meeting-surface-light border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-lg font-semibold">{formatDuration(duration)}</p>
              </div>
              <Clock className="w-5 h-5 text-meeting-primary" />
            </div>
          </Card>

          <Card className="p-3 bg-meeting-surface-light border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Participants</p>
                <p className="text-lg font-semibold">{participants}</p>
              </div>
              <Users className="w-5 h-5 text-meeting-secondary" />
            </div>
          </Card>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Engagement Score */}
          <Card className="p-4 bg-meeting-surface-light border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm">Overall Engagement</h4>
              <span className="text-2xl font-bold">{Math.round(engagementScore)}%</span>
            </div>
            <Progress 
              value={engagementScore} 
              className="h-2 bg-meeting-surface"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Real-time analysis of participant attention and interaction
            </p>
          </Card>

          {/* Real-time Metrics */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Live Metrics
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {realTimeMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} className="p-3 bg-meeting-surface-light border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-meeting-primary" />
                        <span className="text-sm">{metric.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{metric.value}{metric.label.includes('Rate') ? '/min' : metric.label.includes('Score') || metric.label.includes('Quality') || metric.label.includes('Participation') || metric.label.includes('Comprehension') ? '%' : ''}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Participant Breakdown */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              Participant Activity
            </h4>
            <div className="space-y-2">
              {participantData.slice(0, 4).map((participant, index) => (
                <Card key={index} className="p-3 bg-meeting-surface-light border-border">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${participant.color} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium truncate">{participant.name}</span>
                        <span className="text-xs text-muted-foreground">{participant.engagement}%</span>
                      </div>
                      <Progress value={participant.engagement} className="h-1 bg-meeting-surface" />
                      <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                        <span>{participant.questions} questions</span>
                        <span>{participant.speaking}min speaking</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Topics Covered */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Target className="w-4 h-4" />
              Topics Discussed
            </h4>
            <div className="space-y-2">
              {topicsDiscussed.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-meeting-surface-light rounded border border-border">
                  <span className="text-sm">{topic}</span>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(Math.random() * 15) + 5}min
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Insights */}
          <Card className="p-4 bg-gradient-surface border-meeting-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-meeting-accent" />
              <h4 className="font-medium text-sm">Learning Insights</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>High question frequency indicates strong engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Custom hooks topic generated most discussion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Consider reviewing performance optimization concepts</span>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 bg-meeting-surface-light border-border text-center">
              <div className="text-lg font-bold text-meeting-primary">24</div>
              <div className="text-xs text-muted-foreground">Questions Asked</div>
            </Card>
            <Card className="p-3 bg-meeting-surface-light border-border text-center">
              <div className="text-lg font-bold text-meeting-secondary">89%</div>
              <div className="text-xs text-muted-foreground">Comprehension</div>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AnalyticsDashboard;