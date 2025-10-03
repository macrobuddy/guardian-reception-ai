import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { LandingPage } from "./components/landing-page";
import { AuthPage } from "./components/auth-page";
import { OnboardingWizard } from "./components/onboarding-wizard";
import { CheckoutPage } from "./components/checkout-page";
import { Dashboard } from "./components/dashboard";

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

function DashboardWrapper() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const currentView = params['*'] || params.view || 'dashboard';

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
          <Route path="/" element={<LandingPageWrapper />} />

          <Route path="/auth" element={<AuthPageWrapper />} />
          <Route path="/onboarding" element={<OnboardingWizardWrapper />} />
          <Route path="/checkout" element={<CheckoutPageWrapper />} />

          <Route path="/dashboard" element={<DashboardWrapper />} />
          <Route path="/dashboard/:view" element={<DashboardWrapper />} />
          <Route path="/dashboard/*" element={<DashboardWrapper />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}