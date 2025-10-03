import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Switch } from "./ui/switch";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { ArrowLeft, ArrowRight, Shield, CheckCircle, Calendar, MessageSquare, Target, Clock, Mail, Phone, Building, Globe, Bot, Sparkles, Star, Scale, Stethoscope, Landmark, Home, Monitor, GraduationCap, Utensils, ShoppingCart, Users, Wrench, Heart, MapPin, X, Lock, Info, Slack, Zap, CreditCard } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface OnboardingWizardProps {
  onBack: () => void;
  onComplete: () => void;
}

export function OnboardingWizard({ onBack, onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1 - Account Setup
    email: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
    
    // Step 2 - Business Details
    companyName: '',
    industry: '',
    businessPhone: '',
    timezone: '',
    
    // Step 3 - Preferences & Integrations
    calendarIntegration: 'none',
    callHandling: '',
    emailNotifications: true,
    smsNotifications: true,
    
    // Step 4 - Plan Selection
    selectedPlan: 'professional'
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Account Setup", description: "Secure your account" },
    { number: 2, title: "Business Details", description: "Tell us about your business" },
    { number: 3, title: "Preferences & Integrations", description: "Customize your AI" },
    { number: 4, title: "Confirmation & Plan", description: "Complete your setup" }
  ];

  const industries = [
    { value: 'law', label: 'Law Firms', icon: Scale },
    { value: 'healthcare', label: 'Healthcare', icon: Stethoscope },
    { value: 'finance', label: 'Financial Services', icon: Landmark },
    { value: 'real-estate', label: 'Real Estate', icon: Home },
    { value: 'technology', label: 'Technology & IT Services', icon: Monitor },
    { value: 'education', label: 'Education & Tutoring', icon: GraduationCap },
    { value: 'hospitality', label: 'Hospitality (Hotels, Restaurants, Travel)', icon: Utensils },
    { value: 'retail', label: 'Retail & E-Commerce', icon: ShoppingCart },
    { value: 'consulting', label: 'Consulting & Professional Services', icon: Users },
    { value: 'home-services', label: 'Home Services (Plumbing, HVAC, Cleaning, etc.)', icon: Wrench },
    { value: 'non-profit', label: 'Non-Profit & Community Organizations', icon: Heart },
    { value: 'government', label: 'Government & Public Sector', icon: Building }
  ];

  const timezones = [
    { value: 'EST', label: 'Eastern Time (EST)' },
    { value: 'CST', label: 'Central Time (CST)' },
    { value: 'MST', label: 'Mountain Time (MST)' },
    { value: 'PST', label: 'Pacific Time (PST)' }
  ];

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 199,
      period: 'month',
      minutesIncluded: '500 minutes',
      description: 'Best for small businesses',
      features: [
        'All integrations included',
        'Email & chat support',
        'Basic analytics'
      ],
      integrations: [
        { name: 'Google Calendar', icon: Calendar, available: true },
        { name: 'Microsoft Outlook', icon: Mail, available: true },
        { name: 'HubSpot', icon: Target, available: true },
        { name: 'Salesforce', icon: Building, available: true },
        { name: 'Calendly', icon: Clock, available: true },
        { name: 'Slack', icon: MessageSquare, available: true },
        { name: 'Zoho', icon: Users, available: true },
        { name: 'Custom API', icon: Zap, available: true }
      ],
      recommended: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 399,
      period: 'month',
      minutesIncluded: '1,500 minutes',
      description: 'Perfect for growing practices',
      features: [
        'All integrations included',
        'Priority support',
        'Advanced analytics & reporting',
        'Custom greetings/workflows'
      ],
      integrations: [
        { name: 'Google Calendar', icon: Calendar, available: true },
        { name: 'Microsoft Outlook', icon: Mail, available: true },
        { name: 'HubSpot', icon: Target, available: true },
        { name: 'Salesforce', icon: Building, available: true },
        { name: 'Calendly', icon: Clock, available: true },
        { name: 'Slack', icon: MessageSquare, available: true },
        { name: 'Zoho', icon: Users, available: true },
        { name: 'Custom API', icon: Zap, available: true }
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 799,
      period: 'month',
      minutesIncluded: '3,000 minutes',
      description: 'Scalable for large organizations',
      features: [
        'All integrations included',
        'Dedicated account manager',
        'Multi-location support',
        '24/7 premium support'
      ],
      integrations: [
        { name: 'Google Calendar', icon: Calendar, available: true },
        { name: 'Microsoft Outlook', icon: Mail, available: true },
        { name: 'HubSpot', icon: Target, available: true },
        { name: 'Salesforce', icon: Building, available: true },
        { name: 'Calendly', icon: Clock, available: true },
        { name: 'Slack', icon: MessageSquare, available: true },
        { name: 'Zoho', icon: Users, available: true },
        { name: 'Custom API', icon: Zap, available: true }
      ],
      recommended: false
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSendVerificationCode = () => {
    if (formData.email) {
      // Simulate sending verification code
      setTimeout(() => {
        // In real app, this would trigger email sending
      }, 1000);
    }
  };

  const handleVerifyEmail = () => {
    if (formData.verificationCode.length === 6) {
      setEmailVerified(true);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return emailVerified && formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword;
      case 2:
        return formData.companyName && formData.industry && formData.businessPhone && formData.timezone;
      case 3:
        return formData.callHandling;
      case 4:
        return formData.selectedPlan;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 mono-mesh-texture">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header with Logo and Progress */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center glow-white">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div className="text-left">
              <h1 className="text-white text-2xl font-bold">Guardian Reception AI</h1>
              <p className="text-gray-400 text-sm">Enterprise AI Receptionist Setup</p>
            </div>
          </div>

          {/* Step Progress Indicator */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center space-x-4">
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        currentStep >= step.number
                          ? 'bg-white text-black border-white glow-white'
                          : 'bg-transparent text-gray-400 border-gray-600'
                      }`}
                    >
                      {currentStep > step.number ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-6 left-6 w-16 h-0.5 transition-all duration-300 ${
                          currentStep > step.number
                            ? 'bg-white glow-white'
                            : 'bg-gray-600'
                        }`}
                      />
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${
                      currentStep >= step.number ? 'text-white' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-white to-gray-300 h-2 rounded-full transition-all duration-500 glow-white"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="bg-gray-900 border-gray-700 hover-glow">
          <CardHeader className="border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack} 
                className="text-white hover:bg-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {currentStep < totalSteps && (
                <Button 
                  onClick={handleNext} 
                  disabled={!isStepValid()}
                  className="bg-white text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed glow-white"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
            <CardTitle className="text-white text-xl">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            {/* Step 1: Account Setup */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address *
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="flex-1 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                      disabled={emailVerified}
                    />
                    {!emailVerified && (
                      <Button 
                        onClick={handleSendVerificationCode}
                        disabled={!formData.email}
                        variant="outline"
                        className="border-gray-600 text-[rgba(0,0,0,1)] hover:bg-gray-800 disabled:opacity-50"
                      >
                        Send Code
                      </Button>
                    )}
                    {emailVerified && (
                      <div className="flex items-center text-green-400">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>

                {formData.email && !emailVerified && (
                  <div className="space-y-4">
                    <Label className="text-white">Enter 6-digit verification code</Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={formData.verificationCode}
                        onChange={(value) => updateFormData('verificationCode', value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="border-gray-600 text-white" />
                          <InputOTPSlot index={1} className="border-gray-600 text-white" />
                          <InputOTPSlot index={2} className="border-gray-600 text-white" />
                          <InputOTPSlot index={3} className="border-gray-600 text-white" />
                          <InputOTPSlot index={4} className="border-gray-600 text-white" />
                          <InputOTPSlot index={5} className="border-gray-600 text-white" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <Button 
                      onClick={handleVerifyEmail}
                      disabled={formData.verificationCode.length !== 6}
                      className="w-full bg-white text-black hover:bg-gray-100 disabled:opacity-50"
                    >
                      Verify Email
                    </Button>
                  </div>
                )}

                {emailVerified && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Create Password *
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter secure password"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">
                        Confirm Password *
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                      />
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="text-red-400 text-sm">Passwords don't match</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-white">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-white">
                    Industry *
                  </Label>
                  <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-white">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {industries.map((industry) => (
                        <SelectItem 
                          key={industry.value} 
                          value={industry.value}
                          className="text-white hover:bg-gray-700 focus:bg-gray-700"
                        >
                          <div className="flex items-center space-x-2">
                            <industry.icon className="w-4 h-4" />
                            <span>{industry.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessPhone" className="text-white">
                    Business Phone Number *
                  </Label>
                  <Input
                    id="businessPhone"
                    placeholder="(555) 123-4567"
                    value={formData.businessPhone}
                    onChange={(e) => updateFormData('businessPhone', e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                  />
                  <p className="text-gray-400 text-sm">
                    This will be forwarded to your Guardian AI receptionist
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-white">
                    Time Zone *
                  </Label>
                  <Select value={formData.timezone} onValueChange={(value) => updateFormData('timezone', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-white">
                      <SelectValue placeholder="Select your timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {timezones.map((tz) => (
                        <SelectItem 
                          key={tz.value} 
                          value={tz.value}
                          className="text-white hover:bg-gray-700 focus:bg-gray-700"
                        >
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Preferences & Integrations */}
            {currentStep === 3 && (
              <div className="space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-2">
                  <h2 className="text-white text-2xl font-bold">Customize your AI — Connect your calendars and tools</h2>
                  <p className="text-gray-400 text-lg">Start with your core calendar now. Advanced integrations can be enabled later in the Dashboard.</p>
                </div>

                {/* Calendar Integration */}
                <div className="space-y-4">
                  <Label className="text-white text-lg">Calendar Integration</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'google', label: 'Google Calendar', icon: Calendar },
                      { id: 'outlook', label: 'Microsoft Outlook', icon: Mail }
                    ].map((option) => (
                      <Card 
                        key={option.id}
                        className={`cursor-pointer transition-all duration-300 ${
                          formData.calendarIntegration === option.id
                            ? 'bg-white text-black border-white glow-white'
                            : 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover-glow'
                        }`}
                        onClick={() => updateFormData('calendarIntegration', option.id)}
                      >
                        <CardContent className="pt-6 text-center">
                          <option.icon className="w-8 h-8 mx-auto mb-3" />
                          <p className="font-semibold">{option.label}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Info className="w-4 h-4" />
                    <p>Other scheduling platforms like Calendly, Acuity, and Doodle can be connected later in your Dashboard.</p>
                  </div>
                </div>

                {/* Advanced Integrations */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Label className="text-white text-lg">Advanced Integrations</Label>
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300 border-gray-600">
                      Available in Dashboard
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'HubSpot', icon: Target },
                      { name: 'Salesforce', icon: Building },
                      { name: 'Slack', icon: MessageSquare },
                      { name: 'Zoho CRM', icon: Users },
                      { name: 'Calendly', icon: Calendar }
                    ].map((integration) => (
                      <Card 
                        key={integration.name}
                        className="bg-gray-800/50 border-gray-700 opacity-60 cursor-not-allowed"
                      >
                        <CardContent className="pt-6 text-center relative">
                          <div className="absolute top-2 right-2">
                            <Lock className="w-4 h-4 text-gray-500" />
                          </div>
                          <integration.icon className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                          <p className="text-sm text-gray-400">{integration.name}</p>
                          <Badge variant="outline" className="mt-2 text-xs border-gray-600 text-gray-500">
                            Dashboard
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Info className="w-4 h-4" />
                    <p>Advanced integrations are available after onboarding, directly from your Dashboard.</p>
                  </div>
                </div>

                {/* Call Handling Preferences */}
                <div className="space-y-4">
                  <Label className="text-white text-lg">Call Handling Preferences *</Label>
                  <RadioGroup 
                    value={formData.callHandling} 
                    onValueChange={(value) => updateFormData('callHandling', value)}
                    className="space-y-4"
                  >
                    {[
                      {
                        value: 'ai-receptionist',
                        title: 'AI Receptionist',
                        description: 'Full AI-powered call handling with intelligent routing',
                        icon: Bot
                      },
                      {
                        value: 'appointment-first',
                        title: 'Appointment-First Routing',
                        description: 'Prioritize appointment booking over other inquiries',
                        icon: Calendar
                      },
                      {
                        value: 'lead-qualification',
                        title: 'Lead Qualification',
                        description: 'Focus on qualifying and scoring potential leads',
                        icon: Target
                      }
                    ].map((option) => (
                      <Card 
                        key={option.value}
                        className={`cursor-pointer transition-all duration-300 ${
                          formData.callHandling === option.value
                            ? 'bg-white text-black border-white glow-white'
                            : 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover-glow'
                        }`}
                        onClick={() => updateFormData('callHandling', option.value)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-4">
                            <RadioGroupItem value={option.value} className="mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <option.icon className="w-5 h-5" />
                                <h3 className="font-semibold">{option.title}</h3>
                              </div>
                              <p className="text-sm opacity-80">{option.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </RadioGroup>
                </div>

                {/* Notification Preferences */}
                <div className="space-y-4">
                  <Label className="text-white text-lg">Notification Preferences</Label>
                  <Card className="bg-gray-800 border-gray-600">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-300" />
                          <div>
                            <p className="text-white font-semibold">Email Notifications</p>
                            <p className="text-gray-400 text-sm">Get notified about calls and messages</p>
                          </div>
                        </div>
                        <Switch 
                          checked={formData.emailNotifications}
                          onCheckedChange={(checked) => updateFormData('emailNotifications', checked)}
                        />
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MessageSquare className="w-5 h-5 text-gray-300" />
                          <div>
                            <p className="text-white font-semibold">SMS Notifications</p>
                            <p className="text-gray-400 text-sm">Urgent alerts via text message</p>
                          </div>
                        </div>
                        <Switch 
                          checked={formData.smsNotifications}
                          onCheckedChange={(checked) => updateFormData('smsNotifications', checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation & Plan Selection */}
            {currentStep === 4 && (
              <div className="space-y-8">
                {/* Summary Card */}
                <Card className="bg-gray-800 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Setup Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Company</p>
                        <p className="text-white font-semibold">{formData.companyName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Industry</p>
                        <p className="text-white font-semibold">
                          {industries.find(i => i.value === formData.industry)?.label}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Phone</p>
                        <p className="text-white font-semibold">{formData.businessPhone}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Time Zone</p>
                        <p className="text-white font-semibold">
                          {timezones.find(t => t.value === formData.timezone)?.label}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Plan Selection */}
                <div className="space-y-4">
                  <Label className="text-white text-lg">Choose Your Plan</Label>
                  <div className="grid md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                      <Card 
                        key={plan.id}
                        className={`cursor-pointer transition-all duration-300 relative border-2 hover-gradient ${
                          formData.selectedPlan === plan.id
                            ? plan.recommended
                              ? 'border-white bg-white text-black glow-white-strong animate-border-glow animate-gradient-pulse'
                              : 'bg-white text-black border-white glow-white-strong'
                            : 'border-gray-700 bg-gray-900 text-white hover-glow hover-scale'
                        }`}
                        style={formData.selectedPlan === plan.id && plan.recommended ? {
                          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)'
                        } : undefined}
                        onClick={() => updateFormData('selectedPlan', plan.id)}
                      >
                        {plan.recommended && (
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
                                  formData.selectedPlan === plan.id && plan.recommended ? 'text-black hover:text-gray-800' : 'text-white hover:text-gray-200'
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
                            <span className="text-4xl font-bold">${plan.price}</span>
                            <span className="text-lg opacity-70">/{plan.period}</span>
                          </div>
                          
                          <CardDescription className={formData.selectedPlan === plan.id && plan.recommended ? 'text-gray-600' : 'text-gray-400'}>
                            {plan.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          <ul className="space-y-4 mb-8">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center">
                                <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${
                                  formData.selectedPlan === plan.id && plan.recommended ? 'text-black' : 'text-white'
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
                                    formData.selectedPlan === plan.id && plan.recommended
                                      ? 'bg-gray-50/80 border-gray-300 hover:bg-gray-100/80 hover:border-gray-400 hover:shadow-lg' 
                                      : 'bg-gray-800/80 border-gray-600 hover:bg-gray-700/80 hover:border-gray-500 hover-glow'
                                  }`}>
                                    <Zap className={`w-4 h-4 mr-2 ${formData.selectedPlan === plan.id && plan.recommended ? 'text-black' : 'text-white'}`} />
                                    <span className={`text-sm font-medium mr-2 ${
                                      formData.selectedPlan === plan.id && plan.recommended ? 'text-black' : 'text-white'
                                    }`}>
                                      Integrations Included
                                    </span>
                                    <Info className={`w-4 h-4 ${
                                      formData.selectedPlan === plan.id && plan.recommended ? 'text-gray-600' : 'text-gray-400'
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

                          {/* Overage Pricing Note */}
                          <div className="space-y-3">                        
                            {/* Overage Pricing Note */}
                            <div className={`text-xs text-center px-4 py-2 rounded-lg border ${
                              formData.selectedPlan === plan.id && plan.recommended
                                ? 'bg-gray-50 border-gray-200 text-gray-700' 
                                : 'bg-gray-800 border-gray-700 text-gray-300'
                            }`}>
                              <p className="font-medium mb-1">Additional usage billed at $0.40/min</p>
                              <p className={`text-xs ${
                                formData.selectedPlan === plan.id && plan.recommended ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                Transparent pay-as-you-grow pricing
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button 
                    onClick={handleNext}
                    className="flex-1 bg-white text-black text-lg py-6 hover:bg-gray-100 glow-white-strong group"
                  >
                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Start Free Trial
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 text-lg py-6 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book a Demo
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}