
import React, { useState } from 'react';
import { 
  Video, 
  Mic, 
  Monitor, 
  Camera,
  MessageSquare,
  Brain,
  Languages,
  Users,
  Settings,
  Play,
  Square,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Lightbulb,
  FileText,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Globe,
  Headphones,
  MicIcon,
  Volume2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LiveLectureSection: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string>('recording');

  const recordingFeatures = [
    {
      icon: Monitor,
      title: 'Full Screen Capture',
      description: 'Record entire screen including presentations, whiteboards, and shared content',
      specs: ['4K Resolution', '60fps Recording', 'Multi-Monitor Support'],
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Camera,
      title: 'Application-Specific Recording',
      description: 'Selectively record specific windows and applications',
      specs: ['Window Selection', 'Smart Cropping', 'Privacy Protection'],
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Volume2,
      title: 'Advanced Audio Capture',
      description: 'High-quality system audio and microphone recording',
      specs: ['Noise Suppression', '44.1kHz Audio', 'Echo Cancellation'],
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: Settings,
      title: 'Quality Controls',
      description: 'Adjustable resolution, frame rates, and compression',
      specs: ['720p-4K Options', 'Variable Bitrate', 'Real-time Compression'],
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

  const transcriptionFeatures = [
    {
      icon: Users,
      title: 'Multi-Speaker Diarization',
      description: 'Automatically identify and separate different speakers',
      capabilities: ['Speaker Recognition', 'Voice Fingerprinting', 'Automatic Labeling'],
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    },
    {
      icon: Languages,
      title: 'Real-time Translation',
      description: 'Instant translation across 100+ languages',
      capabilities: ['Context-Aware Translation', 'Technical Terms', 'Cultural Adaptation'],
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10'
    },
    {
      icon: MicIcon,
      title: 'Advanced Audio Processing',
      description: 'AI-powered noise filtering and voice enhancement',
      capabilities: ['Accent Recognition', 'Noise Reduction', 'Voice Clarity'],
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10'
    },
    {
      icon: Globe,
      title: 'Multi-language Detection',
      description: 'Automatically detect and process multiple languages',
      capabilities: ['Language Switching', 'Dialect Support', 'Code-switching'],
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    }
  ];

  const chatbotFeatures = [
    {
      icon: Brain,
      title: 'Real-time Context Understanding',
      description: 'Analyze ongoing conversation and screen content simultaneously',
      features: ['Screen Content Analysis', 'Audio Processing', 'Multi-modal Input'],
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10'
    },
    {
      icon: MessageSquare,
      title: 'Intelligent Q&A System',
      description: 'Answer questions about current or past meeting content',
      features: ['Instant Responses', 'Context Memory', 'Source References'],
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    },
    {
      icon: FileText,
      title: 'Meeting Memory',
      description: 'Remember all discussion points, decisions, and action items',
      features: ['Decision Tracking', 'Action Items', 'Key Concepts'],
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: Lightbulb,
      title: 'Proactive Assistance',
      description: 'Suggest relevant information and clarifications',
      features: ['Smart Suggestions', 'Follow-up Questions', 'Resource Links'],
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10'
    }
  ];

  const questionCollectorFeatures = [
    {
      icon: Search,
      title: 'Intelligent Question Detection',
      description: 'Automatically detect important questions and key points',
      methods: ['Keyword Recognition', 'Tone Analysis', 'Context Understanding'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10'
    },
    {
      icon: AlertCircle,
      title: 'Importance Scoring',
      description: 'AI-powered analysis of question relevance and exam probability',
      methods: ['Emphasis Detection', 'Instructor Cues', 'Topic Weight'],
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: FileText,
      title: 'Auto-categorization',
      description: 'Organize questions by subject, difficulty, and importance',
      methods: ['Topic Clustering', 'Difficulty Assessment', 'Priority Ranking'],
      color: 'text-green-600',
      bgColor: 'bg-green-600/10'
    },
    {
      icon: Download,
      title: 'Smart Export System',
      description: 'Generate formatted study guides and question banks',
      methods: ['PDF Generation', 'Question Banks', 'Study Cards'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-600/10'
    }
  ];

  const renderDemo = () => {
    switch (activeDemo) {
      case 'recording':
        return (
          <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Live Recording Session</span>
                <Badge variant="secondary">1080p • 30fps</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost"><Pause className="w-4 h-4" /></Button>
                <Button size="sm" variant="ghost"><Square className="w-4 h-4" /></Button>
                <Button size="sm" variant="ghost"><Settings className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Monitor className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Screen Recording Preview</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <Clock className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                <span className="block font-medium">Duration</span>
                <span className="text-muted-foreground">45:23</span>
              </div>
              <div className="text-center">
                <Upload className="w-4 h-4 mx-auto mb-1 text-green-500" />
                <span className="block font-medium">Size</span>
                <span className="text-muted-foreground">2.3 GB</span>
              </div>
              <div className="text-center">
                <Users className="w-4 h-4 mx-auto mb-1 text-purple-500" />
                <span className="block font-medium">Speakers</span>
                <span className="text-muted-foreground">3 Active</span>
              </div>
            </div>
          </div>
        );
      case 'transcription':
        return (
          <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <Languages className="w-4 h-4 text-blue-500" />
                Live Transcription & Translation
              </h3>
              <Badge variant="secondary">English → Spanish</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">JS</div>
                <div className="flex-1">
                  <div className="bg-card rounded-lg p-3 border">
                    <p className="text-sm mb-1">"Welcome to today's advanced React patterns workshop..."</p>
                    <p className="text-xs text-muted-foreground italic">"Bienvenidos al taller de patrones avanzados de React de hoy..."</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">MC</div>
                <div className="flex-1">
                  <div className="bg-card rounded-lg p-3 border">
                    <p className="text-sm mb-1">"Can you explain the difference between render props and HOCs?"</p>
                    <p className="text-xs text-muted-foreground italic">"¿Puedes explicar la diferencia entre render props y HOCs?"</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Confidence: 94%</span>
                <span>Languages: 2</span>
                <span>Speakers: 2</span>
              </div>
              <Button size="sm" variant="outline">Export Transcript</Button>
            </div>
          </div>
        );
      case 'chatbot':
        return (
          <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-500" />
                AI Meeting Assistant
              </h3>
              <Badge variant="secondary">Context Aware</Badge>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                  <p className="text-sm">What are the key differences between render props and higher-order components?</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="bg-card rounded-lg p-3 border flex-1">
                  <p className="text-sm">Based on the current discussion, here are the key differences:</p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• <strong>Render Props:</strong> Share code using a function prop</li>
                    <li>• <strong>HOCs:</strong> Return enhanced components</li>
                    <li>• <strong>Modern Approach:</strong> Custom hooks are preferred</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="text-xs">Summarize Discussion</Button>
              <Button size="sm" variant="outline" className="text-xs">Generate Questions</Button>
            </div>
          </div>
        );
      case 'questions':
        return (
          <div className="bg-gradient-to-br from-background to-muted/30 rounded-xl p-6 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                Smart Question Collector
              </h3>
              <Badge variant="secondary">12 Questions Captured</Badge>
            </div>
            <div className="space-y-3">
              <div className="bg-card rounded-lg p-3 border">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="destructive" className="text-xs">High Priority</Badge>
                  <span className="text-xs text-muted-foreground">15:23</span>
                </div>
                <p className="text-sm font-medium mb-1">What is the main benefit of using render props over inheritance?</p>
                <p className="text-xs text-muted-foreground">Detected from: "This is really important for your exam..."</p>
              </div>
              <div className="bg-card rounded-lg p-3 border">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">Medium Priority</Badge>
                  <span className="text-xs text-muted-foreground">18:45</span>
                </div>
                <p className="text-sm font-medium mb-1">How do custom hooks differ from regular functions?</p>
                <p className="text-xs text-muted-foreground">Detected from: "Remember this concept..."</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-xs text-muted-foreground">
                Categories: React Patterns (8), Hooks (4)
              </div>
              <Button size="sm" variant="outline">Export Study Guide</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="live-lecture" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Video className="w-8 h-8 text-primary" />
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
              Live Lecture Technology
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced real-time meeting capabilities that transform live educational sessions with comprehensive recording, AI-powered transcription, and intelligent assistance.
          </p>
        </div>

        {/* Interactive Demo Section */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Interactive Feature Demo</h3>
            <p className="text-muted-foreground">Experience our live meeting features in action</p>
          </div>
          
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="recording" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Recording
              </TabsTrigger>
              <TabsTrigger value="transcription" className="flex items-center gap-2">
                <Languages className="w-4 h-4" />
                Transcription
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Questions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeDemo}>
              {renderDemo()}
            </TabsContent>
          </Tabs>
        </div>

        {/* Feature Categories */}
        <div className="space-y-20">
          {/* Screen Recording System */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Advanced Screen Recording System
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional-grade recording with multi-monitor support, high-quality audio capture, and intelligent compression
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recordingFeatures.map((feature, index) => (
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
                    <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {feature.specs.map((spec, specIndex) => (
                        <Badge key={specIndex} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Multi-Speaker Transcription */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Multi-Speaker Audio Transcription
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AI-powered speaker separation with real-time translation and advanced audio processing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {transcriptionFeatures.map((feature, index) => (
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
                    <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {feature.capabilities.map((capability, capIndex) => (
                        <Badge key={capIndex} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Intelligent Meeting Chatbot */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Intelligent Meeting Chatbot
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Context-aware AI assistant that understands both audio and visual content in real-time
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {chatbotFeatures.map((feature, index) => (
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
                    <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((feat, featIndex) => (
                        <Badge key={featIndex} variant="secondary" className="text-xs">
                          {feat}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Smart Question Collector */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Smart Question Collector System
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Automatically detect, analyze, and organize important questions and key concepts from live lectures
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {questionCollectorFeatures.map((feature, index) => (
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
                    <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                      {feature.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {feature.methods.map((method, methodIndex) => (
                        <Badge key={methodIndex} variant="outline" className="text-xs">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-20 bg-muted/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Technical Specifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Performance</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>4K @ 60fps recording</li>
                <li>Real-time processing</li>
                <li>99.9% uptime</li>
                <li>Sub-100ms latency</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Security</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>End-to-end encryption</li>
                <li>GDPR compliant</li>
                <li>SOC 2 Type II</li>
                <li>Private cloud option</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Global Scale</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>100+ languages</li>
                <li>Global CDN</li>
                <li>Multi-region support</li>
                <li>99.99% availability</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button size="lg" className="px-8 py-3 text-lg rounded-xl">
            Experience Live Lecture Technology
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Join thousands of educators already using Omnimeet's advanced live meeting features
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveLectureSection;
