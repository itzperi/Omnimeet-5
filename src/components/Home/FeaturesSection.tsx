
import React from 'react';
import { 
  MessageCircle, 
  FileText, 
  Search, 
  BookOpen, 
  Map, 
  Brain, 
  HelpCircle, 
  BarChart3, 
  Video, 
  Mic,
  Monitor,
  Languages,
  Users,
  Camera,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const coreFeatures = [
  {
    icon: Mic,
    title: 'Live Transcript Generator',
    description: 'Real-time speech-to-text with speaker identification and timestamps',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: MessageCircle,
    title: 'AI Video Chatbot',
    description: 'Ask questions about video content and get intelligent responses',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    icon: BookOpen,
    title: 'Exam Research Assistant',
    description: 'Generate comprehensive study guides and exam materials',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    icon: Map,
    title: 'Smart Roadmap Creator',
    description: 'Personalized learning paths based on your goals and progress',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    icon: FileText,
    title: 'PDF Chat Assistant',
    description: 'Interactive document analysis and Q&A with uploaded materials',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    icon: Search,
    title: 'Smart Video Search',
    description: 'Find exact moments in videos with timestamp-based content search',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10'
  },
  {
    icon: Brain,
    title: 'Question Importance Analyzer',
    description: 'AI-powered exam relevance scoring for better focus',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10'
  },
  {
    icon: HelpCircle,
    title: 'Critical Questions Generator',
    description: 'Auto-generated practice questions based on content analysis',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10'
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking Dashboard',
    description: 'Comprehensive learning analytics and performance metrics',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10'
  }
];

const liveFeatures = [
  {
    icon: Video,
    title: 'Live Lecture Enhancement',
    description: 'Record, transcribe, and enhance live lectures with AI-powered tools',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10'
  },
  {
    icon: Monitor,
    title: 'Screen Recording & Sharing',
    description: 'Capture entire screen or specific windows with multi-audio support',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10'
  },
  {
    icon: Languages,
    title: 'Real-time Translation',
    description: 'Live translation of lectures in 100+ languages with context preservation',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10'
  },
  {
    icon: Users,
    title: 'Multi-speaker Recognition',
    description: 'Distinguish and identify different speakers in live sessions',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10'
  },
  {
    icon: Camera,
    title: 'Interactive Meeting Tools',
    description: 'Question collection, alerts, and real-time engagement tracking',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10'
  },
  {
    icon: Settings,
    title: 'Live Analytics Dashboard',
    description: 'Real-time participant engagement and learning effectiveness metrics',
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6">
            AI-Powered Learning Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform any video into an interactive learning experience with our 9 core AI features designed to maximize retention and minimize study time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-6">
            Live Meeting & Collaboration
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enhance live lectures and meetings with powerful recording, transcription, and real-time collaboration tools designed for modern education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {liveFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="px-8 py-3 text-lg rounded-xl">
            Try All Features Free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
