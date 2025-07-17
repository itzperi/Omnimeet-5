import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  Square, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff,
  Monitor,
  Volume2,
  VolumeX,
  Settings,
  Users,
  MessageSquare,
  Brain,
  Download,
  Languages,
  Lightbulb,
  Activity,
  Clock,
  FileText
} from 'lucide-react';
import ScreenRecording from './meeting/ScreenRecording';
import TranscriptPanel from './meeting/TranscriptPanel';
import TranslationPanel from './meeting/TranslationPanel';
import MeetingChatbot from './meeting/MeetingChatbot';
import QuestionCollector from './meeting/QuestionCollector';
import AnalyticsDashboard from './meeting/AnalyticsDashboard';

interface MeetingState {
  isRecording: boolean;
  isMicOn: boolean;
  isCameraOn: boolean;
  isScreenSharing: boolean;
  participants: number;
  duration: number;
  questionsCollected: number;
  currentLanguage: string;
  translationEnabled: boolean;
}

const MeetingInterface = () => {
  const [meetingState, setMeetingState] = useState<MeetingState>({
    isRecording: false,
    isMicOn: true,
    isCameraOn: true,
    isScreenSharing: false,
    participants: 8,
    duration: 0,
    questionsCollected: 0,
    currentLanguage: 'English',
    translationEnabled: false
  });

  const [activePanel, setActivePanel] = useState<'transcript' | 'translation' | 'chatbot' | 'questions' | 'analytics'>('transcript');

  // Timer for meeting duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (meetingState.isRecording) {
      interval = setInterval(() => {
        setMeetingState(prev => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [meetingState.isRecording]);

  const toggleRecording = () => {
    setMeetingState(prev => ({ ...prev, isRecording: !prev.isRecording }));
  };

  const toggleMic = () => {
    setMeetingState(prev => ({ ...prev, isMicOn: !prev.isMicOn }));
  };

  const toggleCamera = () => {
    setMeetingState(prev => ({ ...prev, isCameraOn: !prev.isCameraOn }));
  };

  const toggleScreenSharing = () => {
    setMeetingState(prev => ({ ...prev, isScreenSharing: !prev.isScreenSharing }));
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderPanel = () => {
    switch (activePanel) {
      case 'transcript':
        return <TranscriptPanel isRecording={meetingState.isRecording} />;
      case 'translation':
        return <TranslationPanel enabled={meetingState.translationEnabled} />;
      case 'chatbot':
        return <MeetingChatbot meetingContext="Advanced React Patterns Workshop" />;
      case 'questions':
        return <QuestionCollector onQuestionCaptured={() => 
          setMeetingState(prev => ({ ...prev, questionsCollected: prev.questionsCollected + 1 }))
        } />;
      case 'analytics':
        return <AnalyticsDashboard duration={meetingState.duration} participants={meetingState.participants} />;
      default:
        return <TranscriptPanel isRecording={meetingState.isRecording} />;
    }
  };

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="bg-meeting-surface border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">Omnimeet Live</h1>
            </div>
            <Badge variant="secondary" className="bg-meeting-primary/20 text-meeting-primary border-meeting-primary/30">
              Advanced React Patterns Workshop
            </Badge>
          </div>

          <div className="flex items-center gap-6">
            {/* Meeting Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(meetingState.duration)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{meetingState.participants}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                <span>{meetingState.questionsCollected}</span>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant={meetingState.isRecording ? "destructive" : "default"}
                size="sm"
                onClick={toggleRecording}
                className={meetingState.isRecording ? "animate-pulse-meeting" : ""}
              >
                {meetingState.isRecording ? (
                  <>
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Record
                  </>
                )}
              </Button>

              <Button
                variant={meetingState.isMicOn ? "secondary" : "destructive"}
                size="sm"
                onClick={toggleMic}
              >
                {meetingState.isMicOn ? (
                  <Mic className="w-4 h-4" />
                ) : (
                  <MicOff className="w-4 h-4" />
                )}
              </Button>

              <Button
                variant={meetingState.isCameraOn ? "secondary" : "destructive"}
                size="sm"
                onClick={toggleCamera}
              >
                {meetingState.isCameraOn ? (
                  <Camera className="w-4 h-4" />
                ) : (
                  <CameraOff className="w-4 h-4" />
                )}
              </Button>

              <Button
                variant={meetingState.isScreenSharing ? "default" : "secondary"}
                size="sm"
                onClick={toggleScreenSharing}
              >
                <Monitor className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Video/Screen */}
        <div className="flex-1 p-4">
          <ScreenRecording 
            isRecording={meetingState.isRecording}
            isScreenSharing={meetingState.isScreenSharing}
          />
        </div>

        {/* Right Panel - Interactive Tools */}
        <div className="w-96 border-l border-border bg-meeting-surface-light">
          {/* Panel Tabs */}
          <div className="border-b border-border p-2">
            <div className="grid grid-cols-5 gap-1">
              <Button
                variant={activePanel === 'transcript' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActivePanel('transcript')}
                className="text-xs"
              >
                <FileText className="w-4 h-4" />
              </Button>
              <Button
                variant={activePanel === 'translation' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActivePanel('translation')}
                className="text-xs"
              >
                <Languages className="w-4 h-4" />
              </Button>
              <Button
                variant={activePanel === 'chatbot' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActivePanel('chatbot')}
                className="text-xs"
              >
                <Brain className="w-4 h-4" />
              </Button>
              <Button
                variant={activePanel === 'questions' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActivePanel('questions')}
                className="text-xs"
              >
                <Lightbulb className="w-4 h-4" />
              </Button>
              <Button
                variant={activePanel === 'analytics' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActivePanel('analytics')}
                className="text-xs"
              >
                <Activity className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="h-[calc(100%-60px)]">
            {renderPanel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingInterface;