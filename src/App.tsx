import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { LandingPage } from "./components/landing-page";
import { AuthPage } from "./components/auth-page";
import { OnboardingWizard } from "./components/onboarding-wizard";
import { CheckoutPage } from "./components/checkout-page";
import { Dashboard } from "./components/dashboard";
import { SettingsLayout } from "./components/settings-layout";
import { SettingsGeneral } from "./components/settings-general";
import { VoiceSelection } from "./components/voice-selection";
import { Toaster } from "./components/ui/sonner";

// Landing Page Wrapper
function LandingPageWrapper() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  const handleBookDemo = () => {
    alert('Demo booking would open a calendar widget here!');
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleDirectToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <LandingPage 
      onGetStarted={handleGetStarted}
      onBookDemo={handleBookDemo}
      onSignIn={handleSignIn}
      onDirectToDashboard={handleDirectToDashboard}
    />
  );
}

// Auth Page Wrapper
function AuthPageWrapper() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleComplete = () => {
    navigate('/onboarding');
  };

  return (
    <AuthPage 
      onBack={handleBack}
      onComplete={handleComplete}
    />
  );
}

// Onboarding Wizard Wrapper
function OnboardingWizardWrapper() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleComplete = () => {
    navigate('/checkout');
  };

  return (
    <OnboardingWizard 
      onBack={handleBack}
      onComplete={handleComplete}
    />
  );
}

// Checkout Page Wrapper
function CheckoutPageWrapper() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/onboarding');
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  return (
    <CheckoutPage 
      onBack={handleBack}
      onComplete={handleComplete}
    />
  );
}

// Dashboard Wrapper
function DashboardWrapper() {
  const navigate = useNavigate();
  const params = useParams();
  
  // Extract the current view from URL params
  const currentView = params.view || 'dashboard';
  
  const handleViewChange = (view: string) => {
    if (view === 'dashboard') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard/${view}`);
    }
  };

  return (
    <Dashboard 
      currentView={currentView as any}
      onViewChange={handleViewChange}
      userName="Alex"
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="size-full">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPageWrapper />} />

          {/* Auth Flow */}
          <Route path="/auth" element={<AuthPageWrapper />} />
          <Route path="/onboarding" element={<OnboardingWizardWrapper />} />
          <Route path="/checkout" element={<CheckoutPageWrapper />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardWrapper />} />
          <Route path="/dashboard/:view" element={<DashboardWrapper />} />

          {/* Settings Routes */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<SettingsGeneral />} />
            <Route path="voice" element={<VoiceSelection />} />
          </Route>

          {/* Redirect any unknown routes to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}