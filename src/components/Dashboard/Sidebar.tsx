
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
  Home,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeFeature: string;
  onFeatureSelect: (feature: string) => void;
  isCollapsed: boolean;
}

const features = [
  { id: 'dashboard', icon: Home, title: 'Dashboard' },
  { id: 'transcript', icon: Mic, title: 'Live Transcript' },
  { id: 'chatbot', icon: MessageCircle, title: 'AI Chatbot' },
  { id: 'research', icon: BookOpen, title: 'Research Assistant' },
  { id: 'roadmap', icon: Map, title: 'Smart Roadmap' },
  { id: 'pdf-chat', icon: FileText, title: 'PDF Chat' },
  { id: 'video-search', icon: Search, title: 'Video Search' },
  { id: 'live-lecture', icon: Video, title: 'Live Lecture' },
  { id: 'importance', icon: Brain, title: 'Importance Analyzer' },
  { id: 'questions', icon: HelpCircle, title: 'Question Generator' },
  { id: 'analytics', icon: BarChart3, title: 'Analytics' }
];

const Sidebar: React.FC<SidebarProps> = ({ activeFeature, onFeatureSelect, isCollapsed }) => {
  return (
    <div className={cn(
      "h-full bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-3 mb-8">
            <img 
              src="/lovable-uploads/48414a27-14e7-495e-8864-84c362ed91dc.png" 
              alt="Omnimeet" 
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold text-foreground">Omnimeet</span>
          </div>
        )}

        <nav className="space-y-2">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => onFeatureSelect(feature.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                activeFeature === feature.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <feature.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="truncate text-sm font-medium">{feature.title}</span>
              )}
            </button>
          ))}
        </nav>

        {!isCollapsed && (
          <div className="mt-8 pt-8 border-t border-border">
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <Settings className="h-5 w-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
