import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { User, Building, Mail, Globe, Lock, Bell, Shield, CheckCircle } from 'lucide-react';

export function SettingsGeneral() {
  const [businessName, setBusinessName] = useState('Guardian Legal Associates');
  const [adminEmail, setAdminEmail] = useState('admin@guardianlaw.com');
  const [timeZone, setTimeZone] = useState('EST');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [hipaaCompliance, setHipaaCompliance] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-900 border-gray-800 hover-glow">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-white">Account Settings</CardTitle>
              <CardDescription className="text-gray-400">Manage your business information and security</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-white font-medium flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-400" />
              Business Information
            </h4>
            <div className="space-y-3">
              <div>
                <Label className="text-gray-300">Business Name</Label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-300">Admin Email</Label>
                <Input
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-300">Time Zone</Label>
                <Select value={timeZone} onValueChange={setTimeZone}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                    <SelectItem value="CST">Central Time (CST)</SelectItem>
                    <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                    <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              Security
            </h4>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div>
                <div className="text-white font-medium">Two-Factor Authentication</div>
                <div className="text-gray-400 text-sm">Add an extra layer of security</div>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800 hover-glow">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-white">Notifications</CardTitle>
              <CardDescription className="text-gray-400">Configure how you receive updates</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
            <div>
              <div className="text-white font-medium">SMS Notifications</div>
              <div className="text-gray-400 text-sm">Receive text alerts for calls</div>
            </div>
            <Switch
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
            <div>
              <div className="text-white font-medium">Email Notifications</div>
              <div className="text-gray-400 text-sm">Get email summaries and alerts</div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800 hover-glow">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <CardTitle className="text-white">Compliance</CardTitle>
              <CardDescription className="text-gray-400">Manage regulatory settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
            <div>
              <div className="text-white font-medium">HIPAA Compliance</div>
              <div className="text-gray-400 text-sm">Healthcare data protection</div>
            </div>
            <Switch
              checked={hipaaCompliance}
              onCheckedChange={setHipaaCompliance}
            />
          </div>
        </CardContent>
      </Card>

      <div className="lg:col-span-2 flex justify-end">
        <Button className="bg-white text-black hover:bg-gray-100 hover-glow">
          <CheckCircle className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
