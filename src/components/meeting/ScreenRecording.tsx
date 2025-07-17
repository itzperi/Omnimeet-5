import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Users, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Camera,
  RotateCcw,
  Settings
} from 'lucide-react';

interface ScreenRecordingProps {
  isRecording: boolean;
  isScreenSharing: boolean;
}

const ScreenRecording = ({ isRecording, isScreenSharing }: ScreenRecordingProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState<'HD' | '4K'>('HD');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initialize camera stream
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.log('Camera access denied:', err));
    }
  }, []);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Main Video/Screen Area */}
      <Card className="flex-1 bg-meeting-surface border-meeting-primary/20 overflow-hidden">
        <div className="relative h-full">
          {isScreenSharing ? (
            <div className="h-full bg-gradient-surface flex items-center justify-center">
              <div className="text-center">
                <Monitor className="w-16 h-16 text-meeting-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Screen Sharing Active</h3>
                <p className="text-muted-foreground">Your entire screen is being shared</p>
              </div>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover rounded-lg"
            />
          )}

          {/* Recording Status Overlay */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-meeting-danger rounded-full animate-pulse" />
              <Badge variant="destructive" className="bg-meeting-danger/90">
                REC
              </Badge>
            </div>
          )}

          {/* Quality Badge */}
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-black/50 text-white border-white/20">
              {quality}
            </Badge>
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setQuality(quality === 'HD' ? '4K' : 'HD')}
                className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 border-white/20 text-white hover:bg-black/70"
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Participant Grid */}
      <div className="grid grid-cols-4 gap-2 h-24">
        {[1, 2, 3, 4].map((participant) => (
          <Card key={participant} className="bg-meeting-surface border-meeting-primary/20 overflow-hidden">
            <div className="h-full relative bg-gradient-surface flex items-center justify-center">
              <div className="w-8 h-8 bg-meeting-primary/20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-meeting-primary" />
              </div>
              <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1 rounded">
                User {participant}
              </div>
              {participant === 1 && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-meeting-primary rounded-full animate-pulse" />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Recording Info */}
      <Card className="p-3 bg-meeting-surface border-meeting-primary/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Quality:</span>
            <span className="text-meeting-primary font-medium">{quality} 1080p</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Storage:</span>
            <span className="text-foreground">2.3 GB / 50 GB</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScreenRecording;