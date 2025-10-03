import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { ArrowLeft, Shield } from "lucide-react";

interface AuthPageProps {
  onBack: () => void;
  onComplete: () => void;
}

export function AuthPage({ onBack, onComplete }: AuthPageProps) {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendCode = () => {
    if (email) {
      setStep('otp');
    }
  };

  const handleVerifyCode = () => {
    if (otp.length === 6) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-slate-900">Guardian Reception AI</span>
          </div>
        </div>

        <Card className="border-slate-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="text-sm text-slate-500">
                Step {step === 'email' ? '1' : '2'} of 2
              </div>
            </div>
            <CardTitle className="text-2xl">
              {step === 'email' ? 'Get Started' : 'Verify Your Email'}
            </CardTitle>
            <CardDescription>
              {step === 'email' 
                ? 'Enter your email to create your account'
                : `We sent a verification code to ${email}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'email' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-slate-300"
                  />
                </div>
                <Button 
                  onClick={handleSendCode}
                  disabled={!email}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                >
                  Send Code
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <Label htmlFor="otp" className="text-center block">Enter 6-digit code</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="border-slate-300" />
                        <InputOTPSlot index={1} className="border-slate-300" />
                        <InputOTPSlot index={2} className="border-slate-300" />
                        <InputOTPSlot index={3} className="border-slate-300" />
                        <InputOTPSlot index={4} className="border-slate-300" />
                        <InputOTPSlot index={5} className="border-slate-300" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button 
                    onClick={handleVerifyCode}
                    disabled={otp.length !== 6}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    Verify & Continue
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setStep('email')}
                    className="w-full text-slate-600"
                  >
                    Didn't receive code? Try again
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}