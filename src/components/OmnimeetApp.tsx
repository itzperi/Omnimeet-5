

import { ThemeProvider } from './Layout/ThemeProvider';
import Header from './Layout/Header';
import HeroSection from './Home/HeroSection';
import FeaturesSection from './Home/FeaturesSection';
import LiveLectureSection from './Home/LiveLectureSection';
import Sidebar from './Dashboard/Sidebar';
import DashboardOverview from './Dashboard/DashboardOverview';
import MeetingInterface from './MeetingInterface';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

type AppView = 'landing' | 'dashboard' | 'meeting';

const OmnimeetApp: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [activeFeature, setActiveFeature] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleStartLearning = (url: string) => {
    console.log('Starting learning with URL:', url);
    setView('dashboard');
  };

  const handleFeatureSelect = (feature: string) => {
    setActiveFeature(feature);
    if (feature === 'live-lecture') {
      setView('meeting');
    }
  };

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'live-lecture':
        return <MeetingInterface />;
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {activeFeature.charAt(0).toUpperCase() + activeFeature.slice(1)} Feature
              </h2>
              <p className="text-muted-foreground">
                This feature is coming soon! Stay tuned for updates.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        {view === 'landing' ? (
          // Landing Page
          <>
            <Header 
              isDarkMode={document.documentElement.classList.contains('dark')}
              toggleTheme={() => document.documentElement.classList.toggle('dark')}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <HeroSection onStartLearning={handleStartLearning} />
            <FeaturesSection />
            <LiveLectureSection />
          </>
        ) : view === 'meeting' ? (
          // Full Meeting Interface
          <MeetingInterface />
        ) : (
          // Dashboard View
          <div className="flex h-screen">
            <Sidebar 
              activeFeature={activeFeature}
              onFeatureSelect={handleFeatureSelect}
              isCollapsed={isSidebarCollapsed}
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Dashboard Header */}
              <header className="border-b border-border bg-background/95 backdrop-blur">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    >
                      {isSidebarCollapsed ? (
                        <PanelLeftOpen className="h-4 w-4" />
                      ) : (
                        <PanelLeftClose className="h-4 w-4" />
                      )}
                    </Button>
                    <h1 className="text-xl font-semibold text-foreground">
                      {activeFeature === 'dashboard' ? 'Dashboard' : 
                       activeFeature.charAt(0).toUpperCase() + activeFeature.slice(1)}
                    </h1>
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setView('landing')}
                  >
                    Back to Home
                  </Button>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-1 overflow-y-auto p-6">
                {renderFeatureContent()}
              </main>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default OmnimeetApp;
