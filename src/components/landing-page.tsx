import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Phone, Calendar, Target, DollarSign, CircleCheck as CheckCircle, Star, Users, Building, Shield, Lock, CreditCard, Info, Eye, FileCheck, UserCheck, Server, Briefcase, Heart, Chrome as Home, Bot, Activity, Sparkles, Zap, ChartBar as BarChart3, Headphones as HeadphonesIcon, MessageSquare, Clock, ChevronRight, ChevronLeft, Scale, Stethoscope, Landmark, Mail, Slack, Plus } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onBookDemo: () => void;
  onSignIn: () => void;
  onDirectToDashboard?: () => void;
}

export function LandingPage({ onGetStarted, onBookDemo, onSignIn, onDirectToDashboard }: LandingPageProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Managing Partner",
      company: "Chen & Associates Law",
      industry: "Law",
      content: "Guardian AI has transformed our client intake process. We've seen a 40% increase in qualified leads and never miss important calls anymore.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Dr. Michael Rodriguez",
      title: "Chief Medical Officer",
      company: "Riverside Clinic",
      industry: "Healthcare",
      content: "The HIPAA compliance and professional handling of patient calls gives us complete peace of mind. Our staff can focus on patient care.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Jennifer Park",
      title: "Financial Advisor",
      company: "Park Wealth Management",
      industry: "Finance",
      content: "The AI handles client inquiries so naturally that most don't realize they're speaking with an AI. It's been a game-changer for our practice.",
      rating: 5,
      avatar: "JP"
    },
    {
      name: "David Thompson",
      title: "Senior Partner",
      company: "Thompson Legal Group",
      industry: "Law",
      content: "Client satisfaction has increased dramatically since implementing Guardian AI. The 24/7 availability is exactly what our clients needed.",
      rating: 5,
      avatar: "DT"
    },
    {
      name: "Dr. Lisa Wang",
      title: "Practice Manager",
      company: "Wang Family Medicine",
      industry: "Healthcare",
      content: "Appointment scheduling has never been smoother. The AI understands medical terminology and handles patient inquiries with remarkable accuracy.",
      rating: 5,
      avatar: "LW"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case 'Law': return Scale;
      case 'Healthcare': return Stethoscope;
      case 'Finance': return Landmark;
      default: return Building;
    }
  };

  const coreFeatures = [
    {
      icon: Phone,
      title: "Smart Call Handling",
      description: "Professional call answering with natural conversation and intelligent routing"
    },
    {
      icon: Calendar,
      title: "Appointment Booking",
      description: "Seamless scheduling integrated with your calendar and CRM systems"
    },
    {
      icon: Target,
      title: "Lead Qualification",
      description: "Intelligent screening to identify and prioritize high-value prospects"
    },
    {
      icon: MessageSquare,
      title: "24/7 Availability",
      description: "Never miss a call with round-the-clock professional coverage"
    }
  ];

  const advancedFeatures = [
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Detailed reports on call performance, trends, and conversion metrics"
    },
    {
      icon: Server,
      title: "CRM Integration",
      description: "Seamless integration with popular CRM platforms and workflows"
    },
    {
      icon: FileCheck,
      title: "Custom Scripts",
      description: "Tailored conversation flows and industry-specific protocols"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "HIPAA, SOX compliance with end-to-end encryption"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center glow-white dark:glow-white">
              <Bot className="w-6 h-6 text-white dark:text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black dark:text-white">Guardian Reception AI</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise AI Receptionist</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Reviews</a>
            <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700 hover-glow" onClick={onDirectToDashboard || onSignIn}>
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section - Interactive Animation Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black hero-grid">
        {/* Interactive Background Elements */}
        <div className="absolute inset-0">
          {/* Grid animation */}
          <div className="absolute inset-0 hero-grid animate-grid-lines"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/60 rounded-full animate-particle-float" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-particle-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/6 w-1.5 h-1.5 bg-white/50 rounded-full animate-particle-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-white/60 rounded-full animate-particle-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-2/5 w-2 h-2 bg-white/40 rounded-full animate-particle-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/2 right-1/3 w-1 h-1 bg-white/50 rounded-full animate-particle-float" style={{animationDelay: '5s'}}></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-particle-float" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/6 right-2/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-particle-float" style={{animationDelay: '2.5s'}}></div>
          
          {/* Subtle wave motion */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-white/3 to-transparent rounded-full blur-3xl animate-mesh-move" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-tl from-white/2 to-transparent rounded-full blur-2xl animate-mesh-move" style={{animationDelay: '5s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-8 bg-white/10 text-white border-white/20 hover:bg-white/15">
              <Sparkles className="w-4 h-4 mr-2" />
              Enterprise AI Receptionist Platform
            </Badge>
            
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
              Never Miss Another
              <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-gradient-move">
                Client Call Again
              </span>
            </h1>
            
            <p className="text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl">
              Guardian Reception AI provides 24/7 professional call handling, appointment scheduling, and lead qualification for law firms, healthcare practices, and financial services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                onClick={onBookDemo}
                className="bg-white text-black text-lg px-10 py-6 rounded-xl hover:bg-gray-100 transition-all duration-300 glow-white-strong hover-glow group"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Book a Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onGetStarted}
                className="text-lg px-10 py-6 rounded-xl border-white/30 text-black hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 animate-white-glow"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Row */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
              Seamlessly integrates with the tools you already use
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-3">
              Google Calendar and Outlook available today. Advanced integrations (HubSpot, Salesforce, Calendly, Slack, Zoho, and more) available in the Dashboard.
            </p>
            {/* Enterprise Credibility Line */}
            <p className="text-sm text-gray-500 dark:text-gray-500 max-w-3xl mx-auto">
              Trusted by professional firms integrating with their existing tools.
            </p>
          </div>
          
          {/* Integration Icons */}
          <TooltipProvider>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center justify-items-center max-w-6xl mx-auto">
              {[
                { name: 'Google Calendar', icon: Calendar, active: true },
                { name: 'Microsoft Outlook', icon: Mail, active: true },
                { name: 'HubSpot', icon: Target, active: false },
                { name: 'Salesforce', icon: Building, active: false },
                { name: 'Calendly', icon: Clock, active: false },
                { name: 'Slack', icon: MessageSquare, active: false },
                { name: 'Zoho', icon: Users, active: false },
                { name: 'More', icon: Plus, active: false }
              ].map((integration, index) => {
                const IntegrationCard = (
                  <div
                    key={integration.name}
                    className={`group relative flex flex-col items-center p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                      integration.active
                        ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:animate-shimmer-glow animate-card-zoom'
                        : 'bg-gray-100 dark:bg-gray-800/50 border border-gray-300/50 dark:border-gray-700/50 opacity-60 hover:opacity-80'
                    } hover:scale-105`}
                  >
                    {/* Active indicator for current integrations */}
                    {integration.active && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
                    )}
                    
                    {/* Lock indicator for future integrations */}
                    {!integration.active && integration.name !== 'More' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-500">
                        <Lock className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                    
                    {/* Shimmer overlay for active integrations */}
                    {integration.active && (
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-subtle-shimmer"></div>
                    )}
                    
                    <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                      integration.active
                        ? 'bg-black dark:bg-white glow-white group-hover:glow-white-strong'
                        : 'bg-gray-400 dark:bg-gray-600'
                    }`}>
                      <integration.icon className={`w-6 h-6 transition-all duration-300 ${
                        integration.active
                          ? 'text-white dark:text-black group-hover:scale-110 group-hover:animate-pulse'
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      integration.active
                        ? 'text-black dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {integration.name}
                    </span>
                    
                    {/* Available badge for active integrations */}
                    {integration.active && (
                      <Badge className="mt-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800 group-hover:animate-pulse">
                        Available
                      </Badge>
                    )}
                    
                    {/* Dashboard badge for inactive integrations */}
                    {!integration.active && integration.name !== 'More' && (
                      <Badge variant="secondary" className="mt-2 text-xs bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-600">
                        Dashboard
                      </Badge>
                    )}
                  </div>
                );

                // Wrap inactive integrations (except "More") with tooltip
                if (!integration.active && integration.name !== 'More') {
                  return (
                    <Tooltip key={integration.name}>
                      <TooltipTrigger asChild>
                        {IntegrationCard}
                      </TooltipTrigger>
                      <TooltipContent 
                        side="top" 
                        className="bg-black/90 dark:bg-white/90 text-white dark:text-black border-gray-600 dark:border-gray-300 backdrop-blur-sm"
                      >
                        <p className="text-sm font-medium">Available once you log in to the Dashboard</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                }

                return IntegrationCard;
              })}
            </div>
          </TooltipProvider>
          
          {/* Bottom note */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              More integrations added regularly. Request specific integrations from your Dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - Core & Advanced */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-6">Everything you need in one AI receptionist</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Professional, reliable, and always available</p>
          </div>
          
          {/* Core Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8 text-center">Core Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="text-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover-elevate animate-card-zoom group">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-2xl flex items-center justify-center glow-silver group-hover:animate-gradient-pulse">
                      <feature.icon className="w-8 h-8 text-white dark:text-black group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Advanced Features */}
          <div>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-8 text-center">Advanced Features</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advancedFeatures.map((feature, index) => (
                <Card key={index} className="text-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover-elevate animate-card-zoom group">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-700 to-black dark:from-gray-300 dark:to-white rounded-2xl flex items-center justify-center glow-silver group-hover:animate-gradient-pulse">
                      <feature.icon className="w-8 h-8 text-white dark:text-black group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Focus with Background Icons */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-6">Trusted by Professional Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Specialized AI for industries that demand excellence</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Scale,
                backgroundIcon: Scale,
                title: "Law Firms",
                description: "HIPAA-compliant call handling with legal intake protocols and client confidentiality protection.",
                features: ["Client intake forms", "Court calendar integration", "Confidential communications"]
              },
              {
                icon: Heart,
                backgroundIcon: Stethoscope,
                title: "Healthcare",
                description: "Medical-grade security with appointment scheduling and patient information management.",
                features: ["HIPAA compliance", "Medical scheduling", "Patient screening"]
              },
              {
                icon: Briefcase,
                backgroundIcon: Landmark,
                title: "Financial Services",
                description: "Secure client communications with compliance monitoring and appointment coordination.",
                features: ["SOX compliance", "Client onboarding", "Secure data handling"]
              }
            ].map((industry, index) => (
              <Card key={index} className="relative border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover-glow group overflow-hidden">
                {/* Background Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:animate-fade-in-icon transition-opacity duration-500">
                  <industry.backgroundIcon className="w-24 h-24 text-gray-200 dark:text-gray-700" />
                </div>
                
                <CardHeader className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-300 rounded-3xl flex items-center justify-center glow-white group-hover:scale-110 transition-transform duration-300">
                    <industry.icon className="w-10 h-10 text-white dark:text-black" />
                  </div>
                  <CardTitle className="text-2xl text-center text-black dark:text-white">{industry.title}</CardTitle>
                  <CardDescription className="text-center text-gray-600 dark:text-gray-400 text-lg">
                    {industry.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <ul className="space-y-3">
                    {industry.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-5 h-5 text-black dark:text-white mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing with Monthly/Yearly Toggle */}
      <section id="pricing" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300 mb-8">Choose the plan that fits your business needs</p>
            
            {/* Monthly/Yearly Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`${!isYearly ? 'text-white' : 'text-gray-400'} transition-colors`}>Monthly</span>
              <Switch 
                checked={isYearly} 
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-white"
              />
              <span className={`${isYearly ? 'text-white' : 'text-gray-400'} transition-colors`}>
                Yearly
                <Badge className="ml-2 bg-white/10 text-white border-white/20">Save 20%</Badge>
              </span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                monthlyPrice: 199,
                yearlyPrice: 159,
                period: "/month",
                minutesIncluded: "500 minutes",
                description: "Best for small businesses",
                features: [
                  "All integrations included",
                  "Email & chat support",
                  "Basic analytics"
                ],
                integrations: [
                  { name: "Google Calendar", icon: Calendar, available: true },
                  { name: "Microsoft Outlook", icon: Mail, available: true },
                  { name: "HubSpot", icon: Target, available: true },
                  { name: "Salesforce", icon: Building, available: true },
                  { name: "Calendly", icon: Clock, available: true },
                  { name: "Slack", icon: MessageSquare, available: true },
                  { name: "Zoho", icon: Users, available: true },
                  { name: "Custom API", icon: Zap, available: true }
                ],
                integrationLabel: "All integrations included from day one",
                cta: "Start 7-Day Free Trial",
                popular: false
              },
              {
                name: "Professional",
                monthlyPrice: 399,
                yearlyPrice: 319,
                period: "/month",
                minutesIncluded: "1,500 minutes",
                description: "Perfect for growing practices",
                features: [
                  "All integrations included",
                  "Priority support",
                  "Advanced analytics & reporting",
                  "Custom greetings/workflows"
                ],
                integrations: [
                  { name: "Google Calendar", icon: Calendar, available: true },
                  { name: "Microsoft Outlook", icon: Mail, available: true },
                  { name: "HubSpot", icon: Target, available: true },
                  { name: "Salesforce", icon: Building, available: true },
                  { name: "Calendly", icon: Clock, available: true },
                  { name: "Slack", icon: MessageSquare, available: true },
                  { name: "Zoho", icon: Users, available: true },
                  { name: "Custom API", icon: Zap, available: true }
                ],
                integrationLabel: "All integrations included from day one",
                cta: "Start 7-Day Free Trial",
                popular: true
              },
              {
                name: "Enterprise",
                monthlyPrice: 799,
                yearlyPrice: 639,
                period: "/month",
                minutesIncluded: "3,000 minutes",
                description: "Scalable for large organizations",
                features: [
                  "All integrations included",
                  "Dedicated account manager",
                  "Multi-location support",
                  "24/7 premium support"
                ],
                integrations: [
                  { name: "Google Calendar", icon: Calendar, available: true },
                  { name: "Microsoft Outlook", icon: Mail, available: true },
                  { name: "HubSpot", icon: Target, available: true },
                  { name: "Salesforce", icon: Building, available: true },
                  { name: "Calendly", icon: Clock, available: true },
                  { name: "Slack", icon: MessageSquare, available: true },
                  { name: "Zoho", icon: Users, available: true },
                  { name: "Custom API", icon: Zap, available: true }
                ],
                integrationLabel: "All integrations included from day one",
                cta: "Start 7-Day Free Trial",
                popular: false
              }
            ].map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-2 transition-all duration-300 hover-gradient ${
                  plan.popular 
                    ? 'border-white bg-white text-black glow-white-strong animate-border-glow animate-gradient-pulse' 
                    : 'border-gray-700 bg-gray-900 text-white hover-glow hover-scale'
                }`}
                style={plan.popular ? {
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)'
                } : undefined}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-black text-white px-6 py-2 animate-mono-glow">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  
                  {/* Minutes Headline with Tooltip */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={`text-3xl font-bold mb-2 cursor-help transition-all duration-300 hover:scale-105 ${
                          plan.popular ? 'text-black hover:text-gray-800' : 'text-white hover:text-gray-200'
                        }`}>
                          {plan.minutesIncluded} / month
                        </div>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="top" 
                        className="bg-black/90 text-white border-gray-600 backdrop-blur-sm max-w-xs"
                      >
                        <p className="text-sm">
                          Minutes are billed per answered call. After the included minutes, additional usage is billed at $0.40/min.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-4xl font-bold">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-lg opacity-70">{plan.period}</span>
                    {isYearly && (
                      <div className="text-sm opacity-70 mt-1">
                        Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                      </div>
                    )}
                  </div>
                  
                  <CardDescription className={plan.popular ? 'text-gray-600' : 'text-gray-400'}>
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${
                          plan.popular ? 'text-black' : 'text-white'
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Simplified Integrations Badge */}
                  <div className="mb-8 flex justify-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className={`inline-flex items-center px-6 py-3 rounded-full border-2 transition-all duration-300 cursor-pointer glass-morphism hover:scale-105 ${
                            plan.popular 
                              ? 'bg-gray-50/80 border-gray-300 hover:bg-gray-100/80 hover:border-gray-400 hover:shadow-lg' 
                              : 'bg-gray-800/80 border-gray-600 hover:bg-gray-700/80 hover:border-gray-500 hover-glow'
                          }`}>
                            <Zap className={`w-4 h-4 mr-2 ${plan.popular ? 'text-black' : 'text-white'}`} />
                            <span className={`text-sm font-medium mr-2 ${
                              plan.popular ? 'text-black' : 'text-white'
                            }`}>
                              Integrations Included
                            </span>
                            <Info className={`w-4 h-4 ${
                              plan.popular ? 'text-gray-600' : 'text-gray-400'
                            }`} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="top" 
                          className="bg-black/95 text-white border-gray-600 backdrop-blur-sm p-4 max-w-sm"
                        >
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-center mb-3">All Integrations Available:</p>
                            <div className="grid grid-cols-4 gap-3">
                              {plan.integrations.map((integration, idx) => (
                                <div 
                                  key={idx}
                                  className="flex flex-col items-center p-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-all duration-200 hover:scale-105"
                                >
                                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mb-1">
                                    <integration.icon className="w-4 h-4 text-black" />
                                  </div>
                                  <p className="text-xs text-center text-gray-300 leading-tight">
                                    {integration.name}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-3 italic">
                              Seamlessly connect with your existing tools
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  {/* CTA Button with Trial Info */}
                  <div className="space-y-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className={`w-full py-6 text-lg transition-all duration-300 relative group ${
                              plan.popular
                                ? 'bg-black text-white hover:bg-gray-800 hover-glow animate-button-pulse'
                                : plan.name === 'Enterprise'
                                  ? 'bg-white text-black hover:bg-gray-100 glow-white hover-scale'
                                  : 'bg-white text-black hover:bg-gray-100 hover:animate-trial-button-glow hover-scale'
                            }`}
                            onClick={onGetStarted}
                          >
                            {plan.cta}
                            {plan.popular && (
                              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-subtle-shimmer"></div>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-black/90 text-white border-gray-600 backdrop-blur-sm"
                        >
                          <p className="text-sm font-medium">7-Day Free Trial Starts Now</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* Trial Details */}
                    <div className="space-y-3">
                      <div className={`flex items-center justify-center text-xs ${
                        plan.popular ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        <span>7-day free trial</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <CreditCard className="w-3 h-3 mr-1" />
                          <span>Credit card required</span>
                        </div>
                      </div>
                      
                      {/* Overage Pricing Note */}
                      <div className={`text-xs text-center px-4 py-2 rounded-lg border ${
                        plan.popular 
                          ? 'bg-gray-50 border-gray-200 text-gray-700' 
                          : 'bg-gray-800 border-gray-700 text-gray-300'
                      }`}>
                        <p className="font-medium mb-1">Additional usage billed at $0.40/min</p>
                        <p className={`text-xs ${
                          plan.popular ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          Transparent pay-as-you-grow pricing
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Trusted by thousands of professionals worldwide</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <Card className="border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover-elevate">
              <CardContent className="pt-8">
                {/* Industry Tag */}
                <div className="text-center mb-6">
                  <Badge className="bg-black dark:bg-white text-white dark:text-black">
                    {(() => {
                      const IconComponent = getIndustryIcon(testimonials[currentTestimonial].industry);
                      return <IconComponent className="w-4 h-4 mr-2" />;
                    })()}
                    {testimonials[currentTestimonial].industry}
                  </Badge>
                </div>
                
                {/* Star Rating with Animation */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-6 h-6 text-black dark:text-white fill-current animate-star-fill" 
                      style={{animationDelay: `${i * 0.1}s`}}
                    />
                  ))}
                </div>
                
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 italic text-center leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="border-t border-gray-200 dark:border-gray-600 pt-6 text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center">
                      <span className="text-white dark:text-black font-bold">
                        {testimonials[currentTestimonial].avatar}
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-black dark:text-white text-lg">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {testimonials[currentTestimonial].title}
                      </div>
                      <div className="text-gray-500 dark:text-gray-500 text-sm">
                        {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover-glow"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover-glow"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-black dark:bg-white' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-8">
              Ready to Never Miss Another Call?
            </h2>
            <p className="text-2xl text-gray-300 mb-12">
              Join thousands of professionals who trust Guardian Reception AI to handle their most important calls.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-white text-black text-xl px-12 py-6 rounded-xl hover:bg-gray-100 transition-all duration-300 glow-white-strong hover-glow group"
              >
                Start Free Trial
                <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onBookDemo}
                className="text-xl px-12 py-6 rounded-xl border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 animate-white-glow"
              >
                <Calendar className="w-6 h-6 mr-2" />
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Glass Morphism */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-16 relative">
        {/* Glowing separator line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-white">Guardian Reception AI</h3>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                The most trusted AI receptionist platform for professional services.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">Product</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li><a href="#features" className="hover:text-black dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-black dark:hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Integration</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">Industries</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Law Firms</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Healthcare</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Financial Services</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Real Estate</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">Support</h4>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2024 Guardian Reception AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Footer with Quick CTAs */}
      <div className="sticky-footer p-4">
        <div className="container mx-auto flex items-center justify-between max-w-4xl">
          <div className="text-white">
            <p className="text-sm">Ready to get started?</p>
          </div>
          <div className="flex space-x-4">
            <Button 
              size="sm" 
              onClick={onGetStarted}
              className="bg-white text-black hover:bg-gray-100 transition-all duration-300 hover-glow"
            >
              Start Free Trial
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onBookDemo}
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}