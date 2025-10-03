import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { ArrowLeft, Shield, CreditCard, Lock, CheckCircle } from "lucide-react";

interface CheckoutPageProps {
  onBack: () => void;
  onComplete: () => void;
}

export function CheckoutPage({ onBack, onComplete }: CheckoutPageProps) {
  const [selectedPlan] = useState({
    name: "Professional",
    price: 399,
    period: "month",
    features: [
      "500 calls included",
      "CRM integrations", 
      "Multi-language support",
      "Priority support",
      "Advanced routing"
    ]
  });

  const [billingData, setBillingData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });

  const handleInputChange = (field: string, value: string) => {
    setBillingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Simulate payment processing
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const isFormValid = () => {
    return billingData.cardNumber && billingData.expiryDate && billingData.cvv && 
           billingData.name && billingData.email;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-900">Guardian Reception AI</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Lock className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Plan Summary</CardTitle>
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600">Most Popular</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedPlan.name}</h3>
                    <p className="text-sm text-slate-600">Perfect for growing businesses</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${selectedPlan.price}</div>
                    <div className="text-sm text-slate-600">per {selectedPlan.period}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label className="text-base">Included features:</Label>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${selectedPlan.price}.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${selectedPlan.price}.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-green-800">30-day money-back guarantee</p>
                    <p className="text-sm text-green-600">Cancel anytime with no questions asked</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Information</span>
                </CardTitle>
                <CardDescription>Your payment information is encrypted and secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={billingData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="border-slate-300"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={billingData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className="border-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={billingData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className="border-slate-300"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={billingData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-slate-300"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={billingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="border-slate-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Acme Corporation"
                    value={billingData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="border-slate-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={billingData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="border-slate-300"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="San Francisco"
                      value={billingData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="border-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={billingData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger className="border-slate-300">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      placeholder="94105"
                      value={billingData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      className="border-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select value={billingData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="border-slate-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-lg py-6"
            >
              Start Subscription - ${selectedPlan.price}/month
            </Button>
            
            <p className="text-center text-sm text-slate-500">
              By subscribing, you agree to our Terms of Service and Privacy Policy. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}