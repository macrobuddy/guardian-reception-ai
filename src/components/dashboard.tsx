import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LayoutDashboard, Phone, Settings, Users, CreditCard, CircleCheck as CheckCircle, Circle, Plus, ChartBar as BarChart3, Calendar, ArrowRight, Shield, Clock, TrendingUp, Target, PhoneCall, ArrowDown, ArrowUp, FileText, ListFilter as Filter, Bot, Sparkles, Zap, Eye, TriangleAlert as AlertTriangle, Lightbulb, ExternalLink, Search, Download, StickyNote, UserPlus, X, ChevronDown, PhoneIncoming, PhoneMissed, MessageSquare, SquareCheck as CheckSquare, CircleAlert as AlertCircle, CirclePlay as PlayCircle, CirclePause as PauseCircle, Send, Key, Puzzle, FileSliders as Sliders, Bell, Code, User, Mail, Globe, Lock, Smartphone, Upload, Trash2, CreditCard as Edit, Copy, Webhook, Database, Activity, Building, Calendar as CalendarIcon, TrendingDown, ChartPie as PieChartIcon, ChartBar as BarChartIcon, ChartLine as LineChartIcon, ChevronRight, UserCheck, UserX, MoveHorizontal as MoreHorizontal, Crown, UserCog, History, Briefcase, CircleHelp as HelpCircle, BookOpen, MessageCircle, Bug, Video as VideoIcon, ExternalLink as ExternalLinkIcon, Star, ChevronUp, Volume2, Play, Mic, Speaker, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface DashboardProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userName?: string;
}

export function Dashboard({ currentView, onViewChange, userName = "Alex" }: DashboardProps) {
  const navigate = useNavigate();
  const [callFilter, setCallFilter] = useState<'all' | 'appointments' | 'leads' | 'missed'>('all');
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Check if we're in the voice selection view
  const isVoiceSelection = currentView === 'settings/voice';
  
  // Usage data
  const usageProgress = (342 / 1500) * 100; // Professional plan: 1,500 minutes
  const usageStats = {
    minutesUsed: 342,
    totalMinutes: 1500,
    callsAnswered: 89,
    callsMissed: 3,
    answerRate: 96.7,
    avgDuration: "4m 32s",
    conversionRate: 73.2,
    appointmentsBooked: 28,
    leadsQualified: 37
  };

  // Usage progress color logic
  const getUsageColor = () => {
    if (usageProgress >= 95) return 'text-red-400';
    if (usageProgress >= 80) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getUsageProgressColor = () => {
    if (usageProgress >= 95) return 'bg-red-500';
    if (usageProgress >= 80) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getUsageTooltip = () => {
    if (usageProgress >= 95) return 'Running low on minutes — upgrade to avoid interruptions';
    if (usageProgress >= 80) return 'Approaching your monthly limit';
    return 'Usage is within normal range';
  };

  // Team data (mock)
  const teamData = [
    { name: 'Alex', minutes: 200 },
    { name: 'Sarah', minutes: 142 }
  ];

  const checklistItems = [
    { id: 1, title: "Setup greeting", description: "Customize your AI's welcome message", completed: true },
    { id: 2, title: "Connect calendar", description: "Enable appointment booking", completed: true },
    { id: 3, title: "Forward number", description: "Forward your business calls to activate your receptionist", completed: true },
    { id: 4, title: "Make test call", description: "Test your AI receptionist", completed: true }
  ];

  const allCalls = [
    { 
      id: 1, 
      caller: "Sarah Johnson", 
      time: "2 min ago", 
      duration: "3m 25s",
      intent: "Appointment", 
      outcome: "Booked", 
      type: "inbound",
      category: "appointments"
    },
    { 
      id: 2, 
      caller: "Mike Chen", 
      time: "15 min ago", 
      duration: "2m 18s",
      intent: "Quote Request", 
      outcome: "Qualified", 
      type: "inbound",
      category: "leads"
    },
    { 
      id: 3, 
      caller: "Lisa Brown", 
      time: "1 hour ago", 
      duration: "5m 42s",
      intent: "Consultation", 
      outcome: "Booked", 
      type: "inbound",
      category: "appointments"
    },
    { 
      id: 4, 
      caller: "David Wilson", 
      time: "2 hours ago", 
      duration: "1m 15s",
      intent: "General Info", 
      outcome: "Message", 
      type: "inbound",
      category: "leads"
    },
    { 
      id: 5, 
      caller: "Unknown", 
      time: "3 hours ago", 
      duration: "0m 00s",
      intent: "Unknown", 
      outcome: "Missed", 
      type: "inbound",
      category: "missed"
    }
  ];

  // Filter calls based on selected filter
  const filteredCalls = callFilter === 'all' 
    ? allCalls 
    : allCalls.filter(call => call.category === callFilter);

  // Calculate checklist completion
  const completedItems = checklistItems.filter(item => item.completed).length;
  const checklistProgress = (completedItems / checklistItems.length) * 100;
  const isChecklistComplete = completedItems === checklistItems.length;

  // Trigger confetti when checklist is complete
  useEffect(() => {
    if (isChecklistComplete && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isChecklistComplete, showConfetti]);

  // Call Logs Component
  const CallLogsView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState('today');
    const [callTypeFilter, setCallTypeFilter] = useState('all');
    const [selectedCall, setSelectedCall] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Mock call logs data
    const callLogs = [
      {
        id: 1,
        callerName: "Sarah Johnson",
        phoneNumber: "+1 (555) 123-4567",
        type: "appointment",
        status: "booked",
        duration: "5m 32s",
        timestamp: "Today, 2:45 PM",
        fullTimestamp: "2024-01-15 14:45:00",
        transcript: "Hi, I'd like to schedule an appointment for next week. I'm looking for a consultation regarding my personal injury case from the car accident last month. I'm available Tuesday or Wednesday afternoon.",
        aiSummary: "Caller wants to schedule consultation for personal injury case. Available Tuesday/Wednesday afternoons. Case involves car accident from last month.",
        outcome: "Appointment scheduled for Tuesday 3:00 PM",
        tags: ["personal-injury", "consultation", "new-client"]
      },
      {
        id: 2,
        callerName: "Michael Chen",
        phoneNumber: "+1 (555) 987-6543",
        type: "lead",
        status: "qualified",
        duration: "3m 18s",
        timestamp: "Today, 1:22 PM",
        fullTimestamp: "2024-01-15 13:22:00",
        transcript: "Hello, I was referred by my friend Tom. I need help with a business contract review. The other party is pressuring me to sign quickly, but I want to make sure I understand all the terms first.",
        aiSummary: "Referral from Tom. Needs business contract review. Feels pressured to sign quickly. Wants to understand terms before committing.",
        outcome: "Qualified lead - contract review inquiry",
        tags: ["contract-review", "referral", "business-law"]
      },
      {
        id: 3,
        callerName: "Unknown Caller",
        phoneNumber: "+1 (555) 234-5678",
        type: "missed",
        status: "missed",
        duration: "0m 0s",
        timestamp: "Today, 12:15 PM",
        fullTimestamp: "2024-01-15 12:15:00",
        transcript: "",
        aiSummary: "Missed call - no voicemail left",
        outcome: "Follow-up call needed",
        tags: ["missed", "follow-up-needed"]
      },
      {
        id: 4,
        callerName: "Emily Rodriguez",
        phoneNumber: "+1 (555) 345-6789",
        type: "message",
        status: "message-taken",
        duration: "2m 45s",
        timestamp: "Today, 11:30 AM",
        fullTimestamp: "2024-01-15 11:30:00",
        transcript: "Hi, this is Emily Rodriguez. I'm calling to follow up on my divorce case. I had some questions about the property division documents I received. Could someone please call me back when they have a chance?",
        aiSummary: "Existing client Emily Rodriguez following up on divorce case. Has questions about property division documents. Requests callback.",
        outcome: "Message taken - callback scheduled",
        tags: ["existing-client", "divorce", "follow-up"]
      },
      {
        id: 5,
        callerName: "David Park",
        phoneNumber: "+1 (555) 456-7890",
        type: "appointment",
        status: "booked",
        duration: "4m 12s",
        timestamp: "Yesterday, 4:30 PM",
        fullTimestamp: "2024-01-14 16:30:00",
        transcript: "I need to reschedule my appointment from Wednesday to Friday if possible. Something came up at work that I can't move. I hope that's not too much trouble.",
        aiSummary: "Existing client David Park requesting to reschedule Wednesday appointment to Friday due to work conflict.",
        outcome: "Appointment rescheduled to Friday 2:00 PM",
        tags: ["existing-client", "reschedule", "appointment-change"]
      }
    ];

    // Insights data
    const insights = {
      callsAnswered: 127,
      callsMissed: 8,
      conversionRate: 73.2,
      avgDuration: "4m 18s"
    };

    // Filter calls based on current filters
    const filteredCalls = callLogs.filter(call => {
      const matchesSearch = searchQuery === '' || 
        call.callerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.phoneNumber.includes(searchQuery) ||
        call.transcript.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = callTypeFilter === 'all' || call.type === callTypeFilter;
      
      return matchesSearch && matchesType;
    });

    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'appointment': return <Calendar className="w-4 h-4" />;
        case 'lead': return <Target className="w-4 h-4" />;
        case 'message': return <MessageSquare className="w-4 h-4" />;
        case 'missed': return <PhoneMissed className="w-4 h-4" />;
        default: return <Phone className="w-4 h-4" />;
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'booked': return 'text-green-400 bg-green-400/10 border-green-400/20';
        case 'qualified': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
        case 'missed': return 'text-red-400 bg-red-400/10 border-red-400/20';
        case 'message-taken': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      }
    };

    const getTypeColor = (type: string) => {
      switch (type) {
        case 'appointment': return 'text-green-400';
        case 'lead': return 'text-blue-400';
        case 'message': return 'text-yellow-400';
        case 'missed': return 'text-red-400';
        default: return 'text-gray-400';
      }
    };

    return (
      <div className="space-y-6">
        {/* Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <PhoneIncoming className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">{insights.callsAnswered}</p>
                  <p className="text-gray-400 text-sm">Calls Answered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <PhoneMissed className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">{insights.callsMissed}</p>
                  <p className="text-gray-400 text-sm">Calls Missed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">{insights.conversionRate}%</p>
                  <p className="text-gray-400 text-sm">Conversion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white">{insights.avgDuration}</p>
                  <p className="text-gray-400 text-sm">Avg Duration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search calls by name, number, or transcript..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </div>

                {/* Call Type Filter */}
                <div className="flex gap-2">
                  {['all', 'appointments', 'leads', 'messages', 'missed'].map((type) => (
                    <Button
                      key={type}
                      variant={callTypeFilter === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCallTypeFilter(type)}
                      className={`capitalize ${
                        callTypeFilter === type 
                          ? 'bg-white text-black hover:bg-gray-100' 
                          : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {/* Date Range */}
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                {/* Export */}
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call Logs Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-300">Caller</TableHead>
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Duration</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Time</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow 
                    key={call.id} 
                    className="border-gray-800 hover:bg-gray-800/30 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedCall(call);
                      setIsDetailsOpen(true);
                    }}
                  >
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{call.callerName}</p>
                        <p className="text-gray-400 text-sm">{call.phoneNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${getTypeColor(call.type)}`}>
                        {getTypeIcon(call.type)}
                        <span className="capitalize">{call.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{call.duration}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(call.status)} capitalize`}>
                        {call.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{call.timestamp}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-400 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCall(call);
                          setIsDetailsOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Call Details Sheet */}
        <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <SheetContent className="w-full sm:max-w-xl bg-gray-900 border-gray-800 text-white">
            <SheetHeader>
              <SheetTitle className="text-white flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(selectedCall?.type)} bg-current/20`}>
                  {selectedCall && getTypeIcon(selectedCall.type)}
                </div>
                <div>
                  <h3>{selectedCall?.callerName}</h3>
                  <p className="text-gray-400 text-sm font-normal">{selectedCall?.phoneNumber}</p>
                </div>
              </SheetTitle>
              <SheetDescription className="text-gray-400">
                {selectedCall?.timestamp} • {selectedCall?.duration}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* AI Summary */}
              <div>
                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-400" />
                  AI Summary
                </h4>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300">{selectedCall?.aiSummary}</p>
                </div>
              </div>

              {/* Call Outcome */}
              <div>
                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-green-400" />
                  Outcome
                </h4>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-300">{selectedCall?.outcome}</p>
                </div>
              </div>

              {/* Full Transcript */}
              <div>
                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  Full Transcript
                </h4>
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 max-h-60 overflow-y-auto">
                  <p className="text-gray-300 leading-relaxed">
                    {selectedCall?.transcript || "No transcript available for this call."}
                  </p>
                </div>
              </div>

              {/* Tags */}
              {selectedCall?.tags && selectedCall.tags.length > 0 && (
                <div>
                  <h4 className="font-medium text-white mb-3">Tags</h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedCall.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                  <StickyNote className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send to CRM
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  };

  // Voice Selection Component
  const VoiceSelectionView = ({ onBack }: { onBack?: () => void }) => {
    const [selectedVoice, setSelectedVoice] = useState('sophia');
    const [playingVoice, setPlayingVoice] = useState<string | null>(null);

    const voices = [
      {
        id: 'sophia',
        name: 'Sophia',
        description: 'Warm & Friendly',
        personality: 'Professional with a welcoming tone, perfect for client-facing interactions',
        preview: 'Hello, thank you for calling Guardian Legal Associates. How may I assist you today?'
      },
      {
        id: 'james',
        name: 'James',
        description: 'Professional & Calm',
        personality: 'Authoritative and reassuring, ideal for legal consultations',
        preview: 'Good afternoon, this is Guardian Legal Associates. I\'m here to help with your legal needs.'
      },
      {
        id: 'alex',
        name: 'Alex',
        description: 'Clear & Concise',
        personality: 'Direct and efficient, great for busy practices',
        preview: 'Guardian Legal Associates, how can I direct your call?'
      },
      {
        id: 'grace',
        name: 'Grace',
        description: 'Elegant & Refined',
        personality: 'Sophisticated and polished, perfect for high-end clientele',
        preview: 'Thank you for contacting Guardian Legal Associates. I would be delighted to assist you.'
      }
    ];

    const handlePreviewVoice = (voiceId: string) => {
      setPlayingVoice(voiceId);
      // Simulate audio playback
      setTimeout(() => {
        setPlayingVoice(null);
      }, 3000);
    };

    const handleSelectVoice = (voiceId: string) => {
      setSelectedVoice(voiceId);
    };

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">Choose Your Receptionist's Voice</h1>
            <div className="text-gray-400">Preview and select the voice your AI receptionist will use for all calls</div>
          </div>
          {onBack && (
            <Button
              variant="outline"
              onClick={onBack}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Settings
            </Button>
          )}
        </div>

        {/* Voice Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {voices.map((voice) => (
            <Card 
              key={voice.id} 
              className={`bg-gray-900 border-gray-800 hover-glow transition-all duration-300 ${
                selectedVoice === voice.id 
                  ? 'ring-2 ring-white/30 bg-gray-800 animate-mono-glow' 
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Voice Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedVoice === voice.id 
                          ? 'bg-white/20 animate-subtle-pulse' 
                          : 'bg-gray-700'
                      }`}>
                        <Mic className={`w-6 h-6 ${
                          selectedVoice === voice.id ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{voice.name}</h3>
                        <div className="text-gray-400 text-sm">{voice.description}</div>
                      </div>
                    </div>
                    {selectedVoice === voice.id && (
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center animate-mono-glow">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Voice Description */}
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="text-gray-300 text-sm mb-3">{voice.personality}</div>
                    <div className="bg-gray-700 rounded p-3 border-l-4 border-blue-400">
                      <div className="text-gray-200 text-sm italic">"{voice.preview}"</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreviewVoice(voice.id)}
                      disabled={playingVoice === voice.id}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white flex-1"
                    >
                      {playingVoice === voice.id ? (
                        <>
                          <Volume2 className="w-4 h-4 mr-2 animate-pulse" />
                          Playing...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Preview
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={() => handleSelectVoice(voice.id)}
                      className={`flex-1 ${
                        selectedVoice === voice.id
                          ? 'bg-white text-black hover:bg-gray-100 animate-subtle-shimmer'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {selectedVoice === voice.id ? (
                        <>
                          <div className="w-4 h-4 mr-2 bg-black rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          Selected
                        </>
                      ) : (
                        'Select Voice'
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Voice Options */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Speaker className="w-5 h-5 text-blue-400" />
              Voice Settings
            </CardTitle>
            <CardDescription className="text-gray-400">
              Fine-tune your AI receptionist's voice characteristics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-300">Speaking Speed</Label>
                <Select defaultValue="normal">
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="slow">Slow</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="fast">Fast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Voice Pitch</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Formality Level</Label>
                <Select defaultValue="professional">
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Helper Text */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500/20 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
            </div>
            You can change this anytime. New calls will use the updated voice immediately.
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-white text-black hover:bg-gray-100 hover-glow">
            <CheckCircle className="w-4 h-4 mr-2" />
            Save Voice Settings
          </Button>
        </div>
      </div>
    );
  };

  // Settings Component
  const SettingsView = () => {
    const [businessName, setBusinessName] = useState('Guardian Legal Associates');
    const [adminEmail, setAdminEmail] = useState('admin@guardianlaw.com');
    const [timeZone, setTimeZone] = useState('EST');
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [callStyle, setCallStyle] = useState('professional');
    const [routingLogic, setRoutingLogic] = useState('hybrid');
    const [smsNotifications, setSmsNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [notificationFrequency, setNotificationFrequency] = useState('realtime');
    const [hipaaCompliance, setHipaaCompliance] = useState(true);
    const [gdprCompliance, setGdprCompliance] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('viewer');

    // Mock data for integrations
    const integrations = [
      { 
        name: 'Google Calendar', 
        logo: '📅', 
        connected: true, 
        description: 'Sync appointments and availability' 
      },
      { 
        name: 'Outlook', 
        logo: '📧', 
        connected: false, 
        description: 'Calendar and email integration' 
      },
      { 
        name: 'HubSpot', 
        logo: '🔶', 
        connected: true, 
        description: 'CRM and lead management' 
      },
      { 
        name: 'Salesforce', 
        logo: '☁️', 
        connected: false, 
        description: 'Sales and customer data' 
      },
      { 
        name: 'Slack', 
        logo: '💬', 
        connected: true, 
        description: 'Team notifications and alerts' 
      },
      { 
        name: 'Zoho', 
        logo: '🔧', 
        connected: false, 
        description: 'Business suite integration' 
      }
    ];

    // Mock team members
    const teamMembers = [
      { 
        id: 1, 
        name: 'Sarah Johnson', 
        email: 'sarah@guardianlaw.com', 
        role: 'Admin', 
        lastActive: '2 hours ago' 
      },
      { 
        id: 2, 
        name: 'Michael Chen', 
        email: 'michael@guardianlaw.com', 
        role: 'Manager', 
        lastActive: '1 day ago' 
      },
      { 
        id: 3, 
        name: 'Emily Rodriguez', 
        email: 'emily@guardianlaw.com', 
        role: 'Viewer', 
        lastActive: '3 days ago' 
      }
    ];

    const handleInviteMember = () => {
      if (inviteEmail) {
        // In real app, this would send an invitation
        alert(`Invitation sent to ${inviteEmail} as ${inviteRole}`);
        setInviteEmail('');
        setInviteRole('viewer');
      }
    };

    const generateApiKey = () => {
      const newKey = 'gai_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      alert(`New API Key generated: ${newKey}`);
    };

    // Show Voice Selection view if in voice sub-route
    if (currentView === 'settings/voice') {
      return <VoiceSelectionView onBack={() => onViewChange('settings')} />;
    }

    return (
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">Settings</h1>
            <p className="text-gray-400">Manage your Guardian AI configuration and preferences</p>
          </div>
        </div>

        {/* Settings Navigation */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={currentView === 'settings' ? 'default' : 'outline'}
            onClick={() => onViewChange('settings')}
            className={`${
              currentView === 'settings'
                ? 'bg-white text-black hover:bg-gray-100'
                : 'border-gray-600 text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            General
          </Button>
          <Button
            variant={currentView === 'settings/voice' ? 'default' : 'outline'}
            onClick={() => onViewChange('settings/voice')}
            className={`${
              currentView === 'settings/voice'
                ? 'bg-white text-black hover:bg-gray-100'
                : 'border-gray-600 text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Mic className="w-4 h-4 mr-2" />
            Voice Selection
          </Button>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Account Settings */}
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
              {/* Business Info */}
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

              {/* Security */}
              <div className="space-y-4 border-t border-gray-800 pt-6">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  Security
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Two-Factor Authentication</Label>
                      <p className="text-gray-500 text-sm">Add an extra layer of security</p>
                    </div>
                    <Switch
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>

              {/* Billing */}
              <div className="space-y-4 border-t border-gray-800 pt-6">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  Billing & Subscription
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300">Current Plan</p>
                      <p className="text-white font-medium">Professional - $399/month</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-400/20">
                      Active
                    </Badge>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Payment Method
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      Invoices
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Puzzle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-white">Integrations</CardTitle>
                  <CardDescription className="text-gray-400">Connect with your favorite tools and services</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{integration.logo}</div>
                      <div>
                        <p className="text-white font-medium">{integration.name}</p>
                        <p className="text-gray-400 text-sm">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${
                        integration.connected 
                          ? 'bg-green-500/20 text-green-400 border-green-400/20' 
                          : 'bg-gray-500/20 text-gray-400 border-gray-400/20'
                      }`}>
                        {integration.connected ? 'Connected' : 'Not Connected'}
                      </Badge>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        {integration.connected ? 'Manage' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Preferences */}
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-white">AI Preferences</CardTitle>
                  <CardDescription className="text-gray-400">Configure how your AI receptionist behaves</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-gray-300">Call Handling Style</Label>
                <Select value={callStyle} onValueChange={setCallStyle}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="friendly">Friendly & Conversational</SelectItem>
                    <SelectItem value="professional">Professional & Direct</SelectItem>
                    <SelectItem value="concise">Concise & Efficient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Routing Logic</Label>
                <Select value={routingLogic} onValueChange={setRoutingLogic}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="appointment-first">Appointment-First</SelectItem>
                    <SelectItem value="lead-first">Lead Qualification First</SelectItem>
                    <SelectItem value="hybrid">Hybrid (Context-Aware)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300">Greeting Library</Label>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Audio
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Scripts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <CardTitle className="text-white">Notifications</CardTitle>
                  <CardDescription className="text-gray-400">Configure how and when you receive alerts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <div>
                      <Label className="text-gray-300">SMS Notifications</Label>
                      <p className="text-gray-500 text-sm">Receive text alerts for urgent calls</p>
                    </div>
                  </div>
                  <Switch
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-green-400" />
                    <div>
                      <Label className="text-gray-300">Email Notifications</Label>
                      <p className="text-gray-500 text-sm">Get summaries and reports via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Notification Frequency</Label>
                <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Team Management */}
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-white">Team Management</CardTitle>
                  <CardDescription className="text-gray-400">Invite and manage team members</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Invite Section */}
              <div className="space-y-3">
                <Label className="text-gray-300">Invite Team Member</Label>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white flex-1"
                  />
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleInviteMember} className="bg-white text-black hover:bg-gray-100">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </div>

              {/* Team Members List */}
              <div className="space-y-3">
                <Label className="text-gray-300">Current Team Members</Label>
                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <p className="text-gray-400 text-sm">{member.email}</p>
                        <p className="text-gray-500 text-xs">Last active: {member.lastActive}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {member.role}
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-white">Advanced Settings</CardTitle>
                  <CardDescription className="text-gray-400">API access, compliance, and enterprise features</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* API Keys */}
              <div className="space-y-3">
                <Label className="text-gray-300 flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-400" />
                  API Keys & Webhooks
                </Label>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={generateApiKey} className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate API Key
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                    <Webhook className="w-4 h-4 mr-2" />
                    Webhooks
                  </Button>
                </div>
              </div>

              {/* Compliance */}
              <div className="space-y-4 border-t border-gray-800 pt-6">
                <Label className="text-gray-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  Compliance Settings
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">HIPAA Compliance</Label>
                      <p className="text-gray-500 text-sm">Healthcare data protection</p>
                    </div>
                    <Switch
                      checked={hipaaCompliance}
                      onCheckedChange={setHipaaCompliance}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">GDPR Compliance</Label>
                      <p className="text-gray-500 text-sm">European data protection</p>
                    </div>
                    <Switch
                      checked={gdprCompliance}
                      onCheckedChange={setGdprCompliance}
                    />
                  </div>
                </div>
              </div>

              {/* Data & Logs */}
              <div className="space-y-3 border-t border-gray-800 pt-6">
                <Label className="text-gray-300 flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-400" />
                  Data & Audit Trail
                </Label>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1">
                    <Activity className="w-4 h-4 mr-2" />
                    Audit Logs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Changes Footer */}
        <div className="flex justify-end">
          <Button className="bg-white text-black hover:bg-gray-100">
            <CheckCircle className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    );
  };

  // Analytics Component
  const AnalyticsView = () => {
    const [dateRange, setDateRange] = useState('30days');
    const [reportFilter, setReportFilter] = useState('all');

    // Mock analytics data
    const keyMetrics = {
      totalCalls: { value: 847, trend: 12.5, isUp: true },
      conversionRate: { value: 73.2, trend: 5.8, isUp: true },
      avgDuration: { value: '4m 23s', trend: -8.2, isUp: false },
      answerRate: { value: 94.1, trend: 2.1, isUp: true }
    };

    // Chart data
    const callsOverTime = [
      { date: 'Jan 1', calls: 45, appointments: 25, leads: 15 },
      { date: 'Jan 2', calls: 52, appointments: 31, leads: 18 },
      { date: 'Jan 3', calls: 48, appointments: 28, leads: 16 },
      { date: 'Jan 4', calls: 61, appointments: 35, leads: 22 },
      { date: 'Jan 5', calls: 55, appointments: 32, leads: 19 },
      { date: 'Jan 6', calls: 67, appointments: 38, leads: 24 },
      { date: 'Jan 7', calls: 59, appointments: 34, leads: 21 }
    ];

    const callOutcomes = [
      { name: 'Appointments Booked', value: 342, color: '#10b981' },
      { name: 'Leads Qualified', value: 189, color: '#3b82f6' },
      { name: 'Messages Taken', value: 156, color: '#f59e0b' },
      { name: 'Missed Calls', value: 67, color: '#ef4444' },
      { name: 'Other', value: 93, color: '#6b7280' }
    ];

    // AI Insights
    const insights = [
      {
        title: 'Peak Call Time',
        value: '9–11 AM',
        description: '34% of calls occur during morning hours',
        icon: Clock,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20'
      },
      {
        title: 'Top Source',
        value: 'Healthcare',
        description: 'Most leads from medical practices',
        icon: TrendingUp,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20'
      },
      {
        title: 'Follow-up Needed',
        value: '12 Calls',
        description: 'Missed calls requiring attention',
        icon: AlertTriangle,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20'
      },
      {
        title: 'Average Response Time',
        value: '1.2 seconds',
        description: '15% faster than last month',
        icon: Zap,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20'
      }
    ];

    // Detailed report data
    const detailedReports = [
      {
        id: 1,
        callerName: 'Sarah Johnson',
        callType: 'Appointment',
        duration: '5m 32s',
        status: 'Booked',
        aiOutcome: 'Scheduled consultation for Tuesday 3:00 PM'
      },
      {
        id: 2,
        callerName: 'Michael Chen',
        callType: 'Lead',
        duration: '3m 18s',
        status: 'Qualified',
        aiOutcome: 'Contract review inquiry - high priority'
      },
      {
        id: 3,
        callerName: 'Emily Rodriguez',
        callType: 'Message',
        duration: '2m 45s',
        status: 'Message Taken',
        aiOutcome: 'Follow-up on existing case - callback scheduled'
      },
      {
        id: 4,
        callerName: 'David Park',
        callType: 'Appointment',
        duration: '4m 12s',
        status: 'Rescheduled',
        aiOutcome: 'Moved Wednesday appointment to Friday 2:00 PM'
      },
      {
        id: 5,
        callerName: 'Unknown Caller',
        callType: 'Missed',
        duration: '0m 0s',
        status: 'Missed',
        aiOutcome: 'No voicemail - follow-up recommended'
      }
    ];

    const filteredReports = reportFilter === 'all' 
      ? detailedReports 
      : detailedReports.filter(report => 
          report.callType.toLowerCase().includes(reportFilter.toLowerCase()) ||
          report.status.toLowerCase().includes(reportFilter.toLowerCase())
        );

    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case 'booked': return 'text-green-400 bg-green-400/10 border-green-400/20';
        case 'qualified': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
        case 'missed': return 'text-red-400 bg-red-400/10 border-red-400/20';
        case 'message taken': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        case 'rescheduled': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
        default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      }
    };



    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">Analytics & Reports</h1>
            <p className="text-gray-400">Get insights from your AI receptionist's performance</p>
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Calls Handled</p>
                  <p className="text-3xl font-semibold text-white">{keyMetrics.totalCalls.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {keyMetrics.totalCalls.isUp ? (
                      <ArrowUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm ${keyMetrics.totalCalls.isUp ? 'text-green-400' : 'text-red-400'}`}>
                      {keyMetrics.totalCalls.trend}%
                    </span>
                    <span className="text-gray-500 text-sm">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Conversion Rate</p>
                  <p className="text-3xl font-semibold text-white">{keyMetrics.conversionRate.value}%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">
                      {keyMetrics.conversionRate.trend}%
                    </span>
                    <span className="text-gray-500 text-sm">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Average Call Duration</p>
                  <p className="text-3xl font-semibold text-white">{keyMetrics.avgDuration.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowDown className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400">
                      {Math.abs(keyMetrics.avgDuration.trend)}%
                    </span>
                    <span className="text-gray-500 text-sm">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Answer Rate</p>
                  <p className="text-3xl font-semibold text-white">{keyMetrics.answerRate.value}%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">
                      {keyMetrics.answerRate.trend}%
                    </span>
                    <span className="text-gray-500 text-sm">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-teal-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart - Calls Over Time */}
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <LineChartIcon className="w-5 h-5 text-blue-400" />
                Calls Over Time
              </CardTitle>
              <CardDescription className="text-gray-400">
                Daily call volume and outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={callsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9ca3af"
                      fontSize={12}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="calls" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      name="Total Calls"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="appointments" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                      name="Appointments"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="leads" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                      name="Leads"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart - Call Outcomes */}
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-purple-400" />
                Call Outcomes Breakdown
              </CardTitle>
              <CardDescription className="text-gray-400">
                Distribution of call results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={callOutcomes}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {callOutcomes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Section */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-400" />
            AI-Powered Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {insights.map((insight, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${insight.bgColor} rounded-lg flex items-center justify-center`}>
                      <insight.icon className={`w-6 h-6 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{insight.title}</h4>
                      <p className={`text-2xl font-semibold ${insight.color} mb-2`}>{insight.value}</p>
                      <p className="text-gray-400 text-sm">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Report Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-white">Detailed Report</CardTitle>
                <CardDescription className="text-gray-400">Recent call activity and outcomes</CardDescription>
              </div>
              <div className="flex gap-2">
                {['all', 'booked', 'leads', 'missed'].map((filter) => (
                  <Button
                    key={filter}
                    variant={reportFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setReportFilter(filter)}
                    className={`capitalize ${
                      reportFilter === filter 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-300">Caller Name</TableHead>
                  <TableHead className="text-gray-300">Call Type</TableHead>
                  <TableHead className="text-gray-300">Duration</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">AI Outcome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow 
                    key={report.id} 
                    className="border-gray-800 hover:bg-gray-800/30 transition-colors"
                  >
                    <TableCell className="text-white font-medium">{report.callerName}</TableCell>
                    <TableCell className="text-gray-300">{report.callType}</TableCell>
                    <TableCell className="text-gray-300">{report.duration}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(report.status)} capitalize`}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400 max-w-xs truncate">
                      {report.aiOutcome}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Export Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover-glow">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover-glow">
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    );
  };

  // Billing Component
  const BillingView = () => {
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    // Mock billing data
    const currentPlan = {
      name: 'Professional',
      price: 399,
      minutes: 1500,
      status: 'Active',
      nextBilling: 'Oct 30, 2025'
    };

    const usage = {
      minutesUsed: 342,
      totalMinutes: 1500,
      overageCharges: 0,
      overageRate: 0.40
    };

    const usagePercentage = (usage.minutesUsed / usage.totalMinutes) * 100;

    const paymentMethod = {
      type: 'Visa',
      last4: '4242',
      expiry: '12/27'
    };

    const billingHistory = [
      {
        id: 'INV-2024-001',
        date: 'Oct 1, 2024',
        amount: 399.00,
        status: 'Paid',
        description: 'Professional Plan - October 2024'
      },
      {
        id: 'INV-2024-002',
        date: 'Sep 1, 2024',
        amount: 399.00,
        status: 'Paid',
        description: 'Professional Plan - September 2024'
      },
      {
        id: 'INV-2024-003',
        date: 'Aug 1, 2024',
        amount: 459.20,
        status: 'Paid',
        description: 'Professional Plan + Overage (148 mins)'
      },
      {
        id: 'INV-2024-004',
        date: 'Jul 1, 2024',
        amount: 399.00,
        status: 'Paid',
        description: 'Professional Plan - July 2024'
      },
      {
        id: 'INV-2024-005',
        date: 'Jun 1, 2024',
        amount: 399.00,
        status: 'Pending',
        description: 'Professional Plan - June 2024'
      }
    ];

    const addons = [
      {
        id: 'extra-minutes',
        name: 'Extra Minutes Pack',
        description: '200 additional minutes per month',
        price: 50,
        icon: Clock,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20'
      },
      {
        id: 'account-manager',
        name: 'Dedicated Account Manager',
        description: 'Personal support and optimization',
        price: 200,
        icon: Users,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20'
      },
      {
        id: 'priority-support',
        name: 'Priority Support',
        description: '24/7 premium technical support',
        price: 100,
        icon: Shield,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20'
      }
    ];

    const handleAddonToggle = (addonId: string) => {
      setSelectedAddons(prev => 
        prev.includes(addonId) 
          ? prev.filter(id => id !== addonId)
          : [...prev, addonId]
      );
    };

    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case 'paid': return 'text-green-400 bg-green-400/10 border-green-400/20';
        case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        case 'failed': return 'text-red-400 bg-red-400/10 border-red-400/20';
        default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      }
    };

    const getUsageColor = (percentage: number) => {
      if (percentage >= 90) return 'bg-red-500';
      if (percentage >= 75) return 'bg-yellow-500';
      return 'bg-green-500';
    };

    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Billing & Usage</h1>
          <p className="text-gray-400">Manage your subscription, payment method, and call usage</p>
        </div>

        {/* Top Section: Current Plan & Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Plan Card */}
          <Card className="bg-gray-900 border-gray-800 hover-glow lg:col-span-1">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl">{currentPlan.name} Plan</CardTitle>
                  <CardDescription className="text-gray-400">Current subscription</CardDescription>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-400/20">
                  {currentPlan.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-6">
                <div className="text-4xl font-semibold text-white mb-2">
                  ${currentPlan.price}
                  <span className="text-lg text-gray-400">/month</span>
                </div>
                <p className="text-gray-400">{currentPlan.minutes.toLocaleString()} minutes included</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Next billing date</span>
                  <span className="text-white">{currentPlan.nextBilling}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Overage rate</span>
                  <span className="text-white">${usage.overageRate}/min</span>
                </div>
              </div>

              <Button className="w-full bg-white text-black hover:bg-gray-100 hover-glow">
                <ArrowUp className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>

          {/* Usage Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Usage Progress */}
            <Card className="bg-gray-900 border-gray-800 hover-glow">
              <CardHeader className="pb-4">
                <CardTitle className="text-white">Monthly Usage</CardTitle>
                <CardDescription className="text-gray-400">
                  {usage.minutesUsed.toLocaleString()} of {usage.totalMinutes.toLocaleString()} minutes used
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Usage this month</span>
                    <span className="text-white">{usagePercentage.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={usagePercentage} 
                    className="h-3"
                    style={{
                      '--progress-background': getUsageColor(usagePercentage)
                    } as React.CSSProperties}
                  />
                  {usagePercentage > 85 && (
                    <div className="flex items-center gap-2 text-yellow-400 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      Approaching monthly limit
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900 border-gray-800 hover-glow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-white">{usage.minutesUsed}</p>
                      <p className="text-gray-400 text-sm">Minutes Used</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover-glow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-white">${usage.overageCharges}</p>
                      <p className="text-gray-400 text-sm">Overage Charges</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover-glow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">{currentPlan.nextBilling}</p>
                      <p className="text-gray-400 text-sm">Next Billing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <Card className="bg-gray-900 border-gray-800 hover-glow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-400" />
              Payment Details
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage your payment method and billing information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">{paymentMethod.type} •••• {paymentMethod.last4}</p>
                  <p className="text-gray-400 text-sm">Expires {paymentMethod.expiry}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Edit className="w-4 h-4 mr-2" />
                  Update Payment
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Billing History</CardTitle>
            <CardDescription className="text-gray-400">
              View and download your past invoices and payments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Invoice ID</TableHead>
                  <TableHead className="text-gray-300">Description</TableHead>
                  <TableHead className="text-gray-300">Amount</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((invoice) => (
                  <TableRow 
                    key={invoice.id} 
                    className="border-gray-800 hover:bg-gray-800/30 transition-colors"
                  >
                    <TableCell className="text-white">{invoice.date}</TableCell>
                    <TableCell className="text-gray-300 font-mono text-sm">{invoice.id}</TableCell>
                    <TableCell className="text-gray-300">{invoice.description}</TableCell>
                    <TableCell className="text-white font-medium">${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(invoice.status)} capitalize`}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add-ons & Upgrades */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Add-ons & Upgrades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addons.map((addon) => (
              <Card key={addon.id} className="bg-gray-900 border-gray-800 hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${addon.bgColor} rounded-lg flex items-center justify-center`}>
                      <addon.icon className={`w-6 h-6 ${addon.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">{addon.name}</h4>
                      <p className="text-gray-400 text-sm mb-4">{addon.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-semibold text-white">
                          ${addon.price}
                          <span className="text-sm text-gray-400">/month</span>
                        </span>
                        <Button 
                          size="sm" 
                          variant={selectedAddons.includes(addon.id) ? "default" : "outline"}
                          onClick={() => handleAddonToggle(addon.id)}
                          className={
                            selectedAddons.includes(addon.id)
                              ? "bg-white text-black hover:bg-gray-100"
                              : "border-gray-600 text-gray-300 hover:bg-gray-800"
                          }
                        >
                          {selectedAddons.includes(addon.id) ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-gray-800">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover-glow">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover-glow">
            <FileText className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover-glow">
            <Activity className="w-4 h-4 mr-2" />
            Download Full Statement
          </Button>
        </div>
      </div>
    );
  };

  // Team Management Component
  const TeamView = () => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isRolesExpanded, setIsRolesExpanded] = useState(false);
    const [inviteForm, setInviteForm] = useState({
      name: '',
      email: '',
      role: 'viewer',
      message: ''
    });

    // Mock team data
    const teamOverview = {
      totalMembers: 12,
      activeInvites: 3,
      roles: { admins: 5, managers: 4, agents: 2, viewers: 1 }
    };

    const teamMembers = [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah@guardianlaw.com',
        avatar: '',
        role: 'admin',
        status: 'active',
        lastActive: '2 hours ago',
        joinDate: 'Jan 2024'
      },
      {
        id: 2,
        name: 'Michael Chen',
        email: 'michael@guardianlaw.com',
        avatar: '',
        role: 'manager',
        status: 'active',
        lastActive: '1 day ago',
        joinDate: 'Feb 2024'
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        email: 'emily@guardianlaw.com',
        avatar: '',
        role: 'agent',
        status: 'active',
        lastActive: '30 minutes ago',
        joinDate: 'Mar 2024'
      },
      {
        id: 4,
        name: 'David Park',
        email: 'david@guardianlaw.com',
        avatar: '',
        role: 'viewer',
        status: 'pending',
        lastActive: 'Never',
        joinDate: 'Invited Oct 2024'
      },
      {
        id: 5,
        name: 'Jessica Williams',
        email: 'jessica@guardianlaw.com',
        avatar: '',
        role: 'manager',
        status: 'suspended',
        lastActive: '2 weeks ago',
        joinDate: 'Dec 2023'
      },
      {
        id: 6,
        name: 'Robert Taylor',
        email: 'robert@guardianlaw.com',
        avatar: '',
        role: 'agent',
        status: 'active',
        lastActive: '5 hours ago',
        joinDate: 'Apr 2024'
      }
    ];

    const auditLog = [
      {
        id: 1,
        action: 'invite_sent',
        actor: 'Sarah Johnson',
        target: 'David Park',
        timestamp: 'Oct 2, 2025, 9:15 AM',
        details: 'Invited as Viewer'
      },
      {
        id: 2,
        action: 'role_changed',
        actor: 'Sarah Johnson',
        target: 'Michael Chen',
        timestamp: 'Oct 1, 2025, 2:30 PM',
        details: 'Changed from Agent to Manager'
      },
      {
        id: 3,
        action: 'user_suspended',
        actor: 'Sarah Johnson',
        target: 'Jessica Williams',
        timestamp: 'Sep 28, 2025, 11:45 AM',
        details: 'Suspended for policy violation'
      },
      {
        id: 4,
        action: 'user_added',
        actor: 'Michael Chen',
        target: 'Robert Taylor',
        timestamp: 'Sep 25, 2025, 4:20 PM',
        details: 'Added as Agent'
      }
    ];

    const rolePermissions = {
      admin: {
        name: 'Admin',
        description: 'Full system access and team management',
        permissions: [
          'Manage billing and subscriptions',
          'Invite and remove team members',
          'Configure integrations',
          'Access all analytics and reports',
          'Manage AI preferences',
          'View audit logs'
        ],
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        icon: Crown
      },
      manager: {
        name: 'Manager',
        description: 'Team oversight and analytics access',
        permissions: [
          'Manage team members (non-admin)',
          'View analytics and reports',
          'Manage call assignments',
          'Configure AI preferences',
          'Access call logs and transcripts'
        ],
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20',
        icon: UserCog
      },
      agent: {
        name: 'Agent',
        description: 'Handle calls and manage assigned leads',
        permissions: [
          'View assigned call logs',
          'Manage personal leads',
          'Access call transcripts',
          'Update contact information',
          'Use AI assistance features'
        ],
        color: 'text-green-400',
        bgColor: 'bg-green-500/20',
        icon: Briefcase
      },
      viewer: {
        name: 'Viewer',
        description: 'Read-only access to dashboards',
        permissions: [
          'View basic dashboard metrics',
          'Read call summaries',
          'Access public reports',
          'View team performance'
        ],
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/20',
        icon: Eye
      }
    };

    const handleInviteMember = () => {
      if (inviteForm.email && inviteForm.name) {
        // In real app, this would send an invitation
        alert(`Invitation sent to ${inviteForm.email} as ${inviteForm.role}`);
        setInviteForm({ name: '', email: '', role: 'viewer', message: '' });
        setIsInviteModalOpen(false);
      }
    };

    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20';
        case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        case 'suspended': return 'text-red-400 bg-red-400/10 border-red-400/20';
        default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      }
    };

    const getRoleColor = (role: string) => {
      return rolePermissions[role as keyof typeof rolePermissions]?.color || 'text-gray-400';
    };

    const getRoleIcon = (role: string) => {
      const roleInfo = rolePermissions[role as keyof typeof rolePermissions];
      return roleInfo ? roleInfo.icon : User;
    };

    const getActionIcon = (action: string) => {
      switch (action) {
        case 'invite_sent': return UserPlus;
        case 'role_changed': return UserCog;
        case 'user_suspended': return UserX;
        case 'user_added': return UserCheck;
        default: return Activity;
      }
    };

    const getInitials = (name: string) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">Team Management</h1>
            <p className="text-gray-400">Invite teammates, assign roles, and manage access</p>
          </div>
          <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-black hover:bg-gray-100 hover-glow">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Invite Team Member</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Send an invitation to join your Guardian AI team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label className="text-gray-300">Full Name</Label>
                  <Input
                    placeholder="Enter full name"
                    value={inviteForm.name}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Role</Label>
                  <Select value={inviteForm.role} onValueChange={(role) => setInviteForm(prev => ({ ...prev, role }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Message (Optional)</Label>
                  <Textarea
                    placeholder="Add a personal message to the invitation..."
                    value={inviteForm.message}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, message: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsInviteModalOpen(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleInviteMember}
                    className="bg-white text-black hover:bg-gray-100 flex-1"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Invite
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-3xl font-semibold text-white">{teamOverview.totalMembers}</p>
                  <p className="text-gray-400">Total Members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-3xl font-semibold text-white">{teamOverview.activeInvites}</p>
                  <p className="text-gray-400">Active Invites</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white mb-2">Roles Overview</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Admins:</span>
                      <span className="text-white">{teamOverview.roles.admins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Managers:</span>
                      <span className="text-white">{teamOverview.roles.managers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Agents:</span>
                      <span className="text-white">{teamOverview.roles.agents}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Team Members</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your team members, roles, and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-300">Member</TableHead>
                  <TableHead className="text-gray-300">Email</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Last Active</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => {
                  const RoleIcon = getRoleIcon(member.role);
                  return (
                    <TableRow 
                      key={member.id} 
                      className="border-gray-800 hover:bg-gray-800/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-gray-700 text-white">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-medium">{member.name}</p>
                            <p className="text-gray-400 text-sm">{member.joinDate}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{member.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 ${rolePermissions[member.role as keyof typeof rolePermissions]?.bgColor} rounded flex items-center justify-center`}>
                            <RoleIcon className={`w-3 h-3 ${getRoleColor(member.role)}`} />
                          </div>
                          <span className={`capitalize ${getRoleColor(member.role)}`}>
                            {member.role}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(member.status)} capitalize`}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{member.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Roles & Permissions */}
        <Collapsible open={isRolesExpanded} onOpenChange={setIsRolesExpanded}>
          <Card className="bg-gray-900 border-gray-800 hover-glow">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      Roles & Permissions
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Understand what each role can access and manage
                    </CardDescription>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isRolesExpanded ? 'rotate-90' : ''}`} />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(rolePermissions).map(([roleKey, role]) => (
                    <div key={roleKey} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 ${role.bgColor} rounded-lg flex items-center justify-center`}>
                          <role.icon className={`w-5 h-5 ${role.color}`} />
                        </div>
                        <div>
                          <h4 className={`font-medium ${role.color}`}>{role.name}</h4>
                          <p className="text-gray-400 text-sm">{role.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {role.permissions.map((permission, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Audit Log */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <History className="w-5 h-5 text-purple-400" />
              Activity Feed
            </CardTitle>
            <CardDescription className="text-gray-400">
              Recent team management actions and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditLog.map((entry) => {
                const ActionIcon = getActionIcon(entry.action);
                return (
                  <div key={entry.id} className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <ActionIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{entry.actor}</span>
                        <span className="text-gray-400">
                          {entry.action.replace('_', ' ')} {entry.target}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{entry.details}</p>
                      <p className="text-gray-500 text-xs">{entry.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Help & Support Component
  const HelpView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // FAQ Categories
    const faqCategories = [
      {
        id: 'getting-started',
        title: 'Getting Started',
        description: 'Setup your AI receptionist and make your first call',
        icon: BookOpen,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20',
        articleCount: 12
      },
      {
        id: 'billing-payments',
        title: 'Billing & Payments',
        description: 'Understand pricing, billing cycles, and payment methods',
        icon: CreditCard,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20',
        articleCount: 8
      },
      {
        id: 'integrations',
        title: 'Integrations',
        description: 'Connect with your CRM, calendar, and other tools',
        icon: Puzzle,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20',
        articleCount: 15
      },
      {
        id: 'call-logs',
        title: 'Call Logs & Analytics',
        description: 'View transcripts, analyze performance, and export data',
        icon: BarChart3,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        articleCount: 10
      },
      {
        id: 'ai-preferences',
        title: 'AI Preferences',
        description: 'Customize your AI voice, responses, and behavior',
        icon: Bot,
        color: 'text-teal-400',
        bgColor: 'bg-teal-500/20',
        articleCount: 9
      },
      {
        id: 'security',
        title: 'Security & Privacy',
        description: 'Data protection, compliance, and security features',
        icon: Shield,
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        articleCount: 6
      }
    ];

    // Featured Articles
    const featuredArticles = [
      {
        id: 1,
        title: 'How do I connect Google Calendar?',
        category: 'Integrations',
        views: 1254,
        helpfulness: 4.8,
        isPopular: true
      },
      {
        id: 2,
        title: 'How does minutes billing work?',
        category: 'Billing & Payments',
        views: 892,
        helpfulness: 4.9,
        isPopular: true
      },
      {
        id: 3,
        title: 'Setting up your first AI greeting',
        category: 'Getting Started',
        views: 756,
        helpfulness: 4.7,
        isPopular: false
      },
      {
        id: 4,
        title: 'Understanding call transcripts and AI summaries',
        category: 'Call Logs & Analytics',
        views: 634,
        helpfulness: 4.6,
        isPopular: false
      },
      {
        id: 5,
        title: 'HIPAA compliance and data security',
        category: 'Security & Privacy',
        views: 523,
        helpfulness: 4.8,
        isPopular: false
      },
      {
        id: 6,
        title: 'Customizing AI responses for your industry',
        category: 'AI Preferences',
        views: 445,
        helpfulness: 4.5,
        isPopular: false
      }
    ];

    // Support Options
    const supportOptions = [
      {
        id: 'contact-support',
        title: 'Contact Support',
        description: 'Get help from our expert support team',
        icon: MessageCircle,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20',
        action: 'Email & Chat',
        availability: '24/7 Support'
      },
      {
        id: 'onboarding-call',
        title: 'Book Onboarding Call',
        description: 'Schedule a personalized setup session',
        icon: VideoIcon,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20',
        action: 'Schedule Call',
        availability: 'Business Hours'
      },
      {
        id: 'report-bug',
        title: 'Report a Bug',
        description: 'Help us improve by reporting issues',
        icon: Bug,
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        action: 'Submit Report',
        availability: 'Instant'
      }
    ];

    const filteredArticles = searchQuery 
      ? featuredArticles.filter(article => 
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : featuredArticles;

    const filteredCategories = searchQuery
      ? faqCategories.filter(category =>
          category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : faqCategories;

    return (
      <div className="space-y-8 relative">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white mb-2">Help & Support Center</h1>
          <p className="text-gray-400">Find answers, resources, and support for Guardian AI</p>
        </div>

        {/* Search Bar */}
        <Card className="bg-gray-900 border-gray-800 hover-glow">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                placeholder="Search FAQs, guides, and troubleshooting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-4 py-4 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-white focus:ring-2 focus:ring-white/20"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FAQ Categories */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold text-white mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Card 
                  key={category.id} 
                  className="bg-gray-900 border-gray-800 hover-glow cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                        <category.icon className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-2">{category.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-xs">{category.articleCount} articles</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Articles Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-white mb-6">Popular Articles</h2>
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="bg-gray-900 border-gray-800 hover-glow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {article.isPopular && (
                        <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm mb-2 leading-tight">
                          {article.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">{article.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">{article.views} views</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-gray-400">{article.helpfulness}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Support Options */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Need More Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option) => (
              <Card key={option.id} className="bg-gray-900 border-gray-800 hover-glow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className={`w-16 h-16 ${option.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <option.icon className={`w-8 h-8 ${option.color}`} />
                    </div>
                    <h3 className="text-white font-medium mb-2">{option.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{option.description}</p>
                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-white text-black hover:bg-gray-100 hover-glow"
                        onClick={() => {
                          if (option.id === 'contact-support') {
                            alert('Opening support chat...');
                          } else if (option.id === 'onboarding-call') {
                            alert('Opening calendar booking...');
                          } else if (option.id === 'report-bug') {
                            alert('Opening bug report form...');
                          }
                        }}
                      >
                        {option.action}
                        <ExternalLinkIcon className="w-4 h-4 ml-2" />
                      </Button>
                      <p className="text-gray-500 text-xs">{option.availability}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Links</CardTitle>
            <CardDescription className="text-gray-400">
              Common resources and useful links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'API Documentation', icon: Code, link: '#' },
                { title: 'Video Tutorials', icon: VideoIcon, link: '#' },
                { title: 'System Status', icon: Activity, link: '#' },
                { title: 'Feature Requests', icon: Lightbulb, link: '#' }
              ].map((link, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center">
                    <link.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-white text-sm">{link.title}</span>
                  <ExternalLinkIcon className="w-3 h-3 text-gray-400 ml-auto" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant Chat Bubble */}
        <div className="fixed bottom-6 right-6 z-50">
          {!isAIChatOpen ? (
            <Button
              onClick={() => setIsAIChatOpen(true)}
              className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover-glow"
            >
              <Bot className="w-6 h-6" />
            </Button>
          ) : (
            <Card className="w-80 bg-gray-900 border-gray-800 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-sm">Guardian AI Assistant</CardTitle>
                      <CardDescription className="text-gray-400 text-xs">Ask me anything!</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAIChatOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-300 text-sm">
                    Hi! I'm Guardian AI. I can help you with setup, troubleshooting, and general questions. What would you like to know?
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your question..."
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-sm"
                  />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Setup Guide', 'Billing Help', 'Technical Issue'].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  // Integrations Component
  const IntegrationsView = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);

    // Integration data
    const integrations = [
      {
        id: 'google-calendar',
        name: 'Google Calendar',
        category: 'calendars',
        logo: '📅',
        description: 'Sync appointments and availability with Google Calendar',
        connected: true,
        status: 'Active',
        features: ['Two-way sync', 'Availability checking', 'Meeting creation'],
        lastSync: '2 minutes ago',
        syncSettings: {
          calendars: ['Primary Calendar', 'Work Calendar'],
          conflictResolution: 'Google Calendar wins',
          syncFrequency: 'Real-time'
        }
      },
      {
        id: 'outlook',
        name: 'Microsoft Outlook',
        category: 'calendars',
        logo: '📧',
        description: 'Connect with Outlook calendar and email',
        connected: false,
        status: 'Not Connected',
        features: ['Calendar sync', 'Email integration', 'Teams meetings'],
        lastSync: null,
        syncSettings: null
      },
      {
        id: 'hubspot',
        name: 'HubSpot',
        category: 'crms',
        logo: '🔶',
        description: 'Sync leads and contacts with HubSpot CRM',
        connected: true,
        status: 'Active',
        features: ['Lead creation', 'Contact sync', 'Deal tracking'],
        lastSync: '5 minutes ago',
        syncSettings: {
          pipelines: ['Sales Pipeline', 'Marketing Pipeline'],
          leadStage: 'New Lead',
          contactSync: 'Bidirectional'
        }
      },
      {
        id: 'salesforce',
        name: 'Salesforce',
        category: 'crms',
        logo: '☁️',
        description: 'Integrate with Salesforce CRM and Sales Cloud',
        connected: false,
        status: 'Not Connected',
        features: ['Lead management', 'Opportunity tracking', 'Custom fields'],
        lastSync: null,
        syncSettings: null
      },
      {
        id: 'slack',
        name: 'Slack',
        category: 'communication',
        logo: '💬',
        description: 'Send notifications and updates to Slack channels',
        connected: true,
        status: 'Active',
        features: ['Real-time notifications', 'Channel posting', 'Direct messages'],
        lastSync: '1 minute ago',
        syncSettings: {
          channels: ['#general', '#sales-leads'],
          notifications: ['New leads', 'Missed calls', 'Appointments'],
          mentionUsers: true
        }
      },
      {
        id: 'calendly',
        name: 'Calendly',
        category: 'calendars',
        logo: '📋',
        description: 'Book appointments directly through Calendly',
        connected: false,
        status: 'Not Connected',
        features: ['Appointment booking', 'Availability sync', 'Custom booking pages'],
        lastSync: null,
        syncSettings: null
      },
      {
        id: 'zoho-crm',
        name: 'Zoho CRM',
        category: 'crms',
        logo: '🔧',
        description: 'Manage leads and contacts in Zoho CRM',
        connected: false,
        status: 'Not Connected',
        features: ['Contact management', 'Lead scoring', 'Sales automation'],
        lastSync: null,
        syncSettings: null
      },
      {
        id: 'custom-api',
        name: 'Custom API',
        category: 'other',
        logo: '⚙️',
        description: 'Connect with your custom systems via API',
        connected: false,
        status: 'Available',
        features: ['Webhook support', 'REST API', 'Custom endpoints'],
        lastSync: null,
        syncSettings: null
      }
    ];

    const categories = [
      { id: 'all', label: 'All Integrations', count: integrations.length },
      { id: 'calendars', label: 'Calendars', count: integrations.filter(i => i.category === 'calendars').length },
      { id: 'crms', label: 'CRMs', count: integrations.filter(i => i.category === 'crms').length },
      { id: 'communication', label: 'Communication', count: integrations.filter(i => i.category === 'communication').length },
      { id: 'other', label: 'Other', count: integrations.filter(i => i.category === 'other').length }
    ];

    const filteredIntegrations = selectedCategory === 'all' 
      ? integrations 
      : integrations.filter(integration => integration.category === selectedCategory);

    const connectedCount = integrations.filter(i => i.connected).length;

    const handleConnect = (integration: any) => {
      if (integration.connected) {
        setSelectedIntegration(integration);
        setIsManageModalOpen(true);
      } else {
        // Simulate OAuth flow
        alert(`Connecting to ${integration.name}...`);
      }
    };

    const handleDisconnect = () => {
      if (selectedIntegration) {
        alert(`Disconnected from ${selectedIntegration.name}`);
        setIsManageModalOpen(false);
        setSelectedIntegration(null);
      }
    };

    const getStatusColor = (connected: boolean) => {
      return connected 
        ? 'text-green-400 bg-green-400/10 border-green-400/20' 
        : 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    };

    const getCategoryIcon = (category: string) => {
      switch (category) {
        case 'calendars': return Calendar;
        case 'crms': return Database;
        case 'communication': return MessageCircle;
        case 'other': return Code;
        default: return Puzzle;
      }
    };

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">Integrations</h1>
            <p className="text-gray-400">Connect Guardian AI with your existing tools</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-semibold text-white">{connectedCount}</p>
              <p className="text-gray-400 text-sm">Connected</p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800 border border-gray-700">
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.id);
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="bg-gray-600 text-gray-300 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            {/* Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="bg-gray-900 border-gray-800 hover-glow group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      {/* Logo */}
                      <div className="w-16 h-16 mx-auto mb-4 text-4xl flex items-center justify-center bg-gray-800 rounded-lg group-hover:scale-110 transition-transform">
                        {integration.logo}
                      </div>
                      
                      {/* Name and Description */}
                      <h3 className="text-white font-medium mb-2">{integration.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {integration.description}
                      </p>

                      {/* Status Badge */}
                      <div className="mb-4">
                        <Badge className={`${getStatusColor(integration.connected)} capitalize`}>
                          {integration.status}
                        </Badge>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <p className="text-gray-500 text-xs mb-2">Features:</p>
                        <div className="space-y-1">
                          {integration.features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {integration.features.length > 2 && (
                            <p className="text-gray-500 text-xs">+{integration.features.length - 2} more</p>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button
                        onClick={() => handleConnect(integration)}
                        className={`w-full ${
                          integration.connected 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-white text-black hover:bg-gray-100'
                        } hover-glow`}
                      >
                        {integration.connected ? (
                          <>
                            <Settings className="w-4 h-4 mr-2" />
                            Manage
                          </>
                        ) : (
                          <>
                            <Puzzle className="w-4 h-4 mr-2" />
                            Connect
                          </>
                        )}
                      </Button>

                      {/* Last Sync */}
                      {integration.connected && integration.lastSync && (
                        <p className="text-gray-500 text-xs mt-3">
                          Last sync: {integration.lastSync}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Manage Connection Modal */}
        <Dialog open={isManageModalOpen} onOpenChange={setIsManageModalOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-3">
                <div className="text-2xl">{selectedIntegration?.logo}</div>
                <div>
                  <h3>Manage {selectedIntegration?.name}</h3>
                  <p className="text-gray-400 text-sm font-normal">Configure your integration settings</p>
                </div>
              </DialogTitle>
            </DialogHeader>

            {selectedIntegration && (
              <div className="space-y-6 pt-4">
                {/* Status Section */}
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-white font-medium">Connection Status</p>
                      <p className="text-gray-400 text-sm">Active and syncing</p>
                    </div>
                  </div>
                  <Badge className="bg-green-400/10 text-green-400 border-green-400/20">
                    Connected
                  </Badge>
                </div>

                {/* Sync Settings */}
                {selectedIntegration.syncSettings && (
                  <div>
                    <h4 className="text-white font-medium mb-4">Sync Settings</h4>
                    <div className="space-y-4">
                      {Object.entries(selectedIntegration.syncSettings).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-700">
                          <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-white">
                            {Array.isArray(value) ? value.join(', ') : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h4 className="text-white font-medium mb-4">Available Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedIntegration.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded border border-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1"
                    onClick={() => alert('Opening sync settings...')}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Sync
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1"
                    onClick={() => alert('Testing connection...')}
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Test Connection
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white flex-1"
                    onClick={handleDisconnect}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Security Note */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium mb-2">Security & Privacy</h4>
                <p className="text-gray-400 text-sm">
                  All integrations are encrypted and stored securely. We use industry-standard OAuth 2.0 
                  authentication and never store your passwords. Your data is protected with enterprise-grade security.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <FileText className="w-4 h-4 mr-2" />
                  Privacy Policy
                </Button>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", view: "dashboard" as const },
    { icon: Phone, label: "Call Logs", view: "logs" as const },
    { icon: BarChart3, label: "Analytics", view: "analytics" as const },
    { icon: CreditCard, label: "Billing", view: "billing" as const },
    { icon: Users, label: "Team", view: "team" as const },
    { icon: Puzzle, label: "Integrations", view: "integrations" as const },
    { icon: Lightbulb, label: "Help", view: "help" as const },
    { icon: Settings, label: "Settings", view: "settings" as const }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-black">
        <Sidebar className="border-r border-gray-800">
          <SidebarContent className="bg-gray-900">
            {/* Logo */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center glow-white">
                  <Shield className="w-5 h-5 text-black" />
                </div>
                <span className="text-white font-semibold">Guardian AI</span>
              </div>
            </div>

            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-500 text-xs uppercase tracking-wide px-4 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.view}>
                      <SidebarMenuButton
                        onClick={() => {
                          if (item.view === 'settings') {
                            navigate('/settings');
                          } else {
                            onViewChange(item.view);
                          }
                        }}
                        isActive={currentView === item.view || currentView.startsWith(item.view + '/')}
                        className="text-gray-400 hover:text-white hover:bg-gray-800 data-[active=true]:bg-white data-[active=true]:text-black data-[active=true]:glow-white"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Plan Info */}
            <div className="mt-auto p-4 border-t border-gray-800">
              <div className="text-xs text-gray-500 mb-2">Current Plan</div>
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">Professional</span>
                <Badge variant="secondary" className="bg-white text-black border-gray-300 hover:bg-gray-100 glow-white">
                  Active
                </Badge>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Bar */}
          <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="lg:hidden text-white" />
                <div>
                  <h1 className="text-2xl font-semibold text-white">
                    Welcome, {userName}!
                  </h1>
                  <p className="text-gray-400">You're on the Professional Plan.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                        <Users className="w-4 h-4 mr-2" />
                        Team
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-black/90 text-white border-gray-600 p-4 min-w-48">
                      <div className="space-y-2">
                        <p className="font-medium text-sm mb-2">Team Usage</p>
                        {teamData.map((member, index) => (
                          <div key={index} className="flex justify-between items-center text-xs">
                            <span className="text-gray-300">{member.name}</span>
                            <span className="text-white font-medium">{member.minutes} mins</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-gray-600">
                          <Button variant="ghost" size="sm" className="text-xs w-full text-gray-400 hover:text-white">
                            <Plus className="w-3 h-3 mr-1" />
                            Invite members
                          </Button>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Button size="sm" className="bg-white text-black hover:bg-gray-100 glow-white animate-subtle-shimmer">
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 space-y-6 bg-black text-white mono-mesh-texture relative overflow-y-auto w-full">
            {/* Background Particle Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="particle-dot" style={{ top: '10%', left: '5%', animationDelay: '0s' }}></div>
              <div className="particle-dot" style={{ top: '30%', left: '80%', animationDelay: '2s' }}></div>
              <div className="particle-dot" style={{ top: '60%', left: '15%', animationDelay: '4s' }}></div>
              <div className="particle-dot" style={{ top: '80%', left: '70%', animationDelay: '6s' }}></div>
              <div className="particle-wave" style={{ top: '20%', left: '40%', animationDelay: '1s' }}></div>
              <div className="particle-wave" style={{ top: '70%', left: '30%', animationDelay: '3s' }}></div>
            </div>
            
            {currentView === 'dashboard' && (
              <>
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl font-semibold text-white mb-2">Dashboard</h1>
                    <p className="text-gray-400">Monitor your AI receptionist performance and activity</p>
                  </div>
                </div>

                {/* Key Metrics Cards - Same style as Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-gray-900 border-gray-800 hover-glow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Minutes Used</p>
                          <p className="text-3xl font-semibold text-white">{usageStats.minutesUsed}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <ArrowUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-400">12%</span>
                            <span className="text-gray-500 text-sm">vs last month</span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800 hover-glow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Answer Rate</p>
                          <p className="text-3xl font-semibold text-white">{usageStats.answerRate}%</p>
                          <div className="flex items-center gap-1 mt-2">
                            <ArrowUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-400">5.8%</span>
                            <span className="text-gray-500 text-sm">vs last month</span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <PhoneIncoming className="w-6 h-6 text-green-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800 hover-glow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Avg Duration</p>
                          <p className="text-3xl font-semibold text-white">{usageStats.avgDuration}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <ArrowDown className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-red-400">2.1%</span>
                            <span className="text-gray-500 text-sm">vs last month</span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800 hover-glow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Conversion Rate</p>
                          <p className="text-3xl font-semibold text-white">{usageStats.conversionRate}%</p>
                          <div className="flex items-center gap-1 mt-2">
                            <ArrowUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-400">8.3%</span>
                            <span className="text-gray-500 text-sm">vs last month</span>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center">
                          <Target className="w-6 h-6 text-teal-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Setup Checklist */}
                  <Card className="bg-gray-900 border-gray-800 hover-glow relative">
                    {/* Confetti Effect */}
                    {showConfetti && (
                      <div className="absolute inset-0 pointer-events-none z-10">
                        <div className="absolute top-4 left-4 animate-bounce">
                          <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                        </div>
                        <div className="absolute top-8 right-6 animate-bounce delay-100">
                          <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                        </div>
                        <div className="absolute top-12 left-1/2 animate-bounce delay-200">
                          <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
                        </div>
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <CheckSquare className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <CardTitle className="text-white">Setup Progress</CardTitle>
                          <CardDescription className="text-gray-400">Complete your AI receptionist setup</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Progress Overview */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Progress</span>
                          <span className="text-white font-medium">{Math.round(checklistProgress)}% Complete</span>
                        </div>
                        <Progress 
                          value={checklistProgress} 
                          className={`h-3 ${isChecklistComplete ? 'animate-mono-glow' : ''}`} 
                        />
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-400">{completedItems} of {checklistItems.length} steps completed</span>
                          {isChecklistComplete && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-400/20">
                              Complete
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Checklist Items */}
                      <div className="space-y-3">
                        {checklistItems.slice(0, 4).map((item) => (
                          <div 
                            key={item.id} 
                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                              item.completed 
                                ? 'bg-green-500/10 border border-green-500/20' 
                                : 'bg-gray-800 border border-gray-700 hover:bg-gray-700/50'
                            }`}
                          >
                            {item.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium ${item.completed ? 'text-green-300' : 'text-white'}`}>
                                {item.title}
                              </p>
                            </div>
                            {!item.completed && (
                              <ArrowRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Calls with Tabs */}
                  <Card className="bg-gray-900 border-gray-800 hover-glow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <Phone className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <CardTitle className="text-white">Recent Calls</CardTitle>
                            <CardDescription className="text-gray-400">Latest activity from your AI receptionist</CardDescription>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewChange('logs')}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          View All
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={callFilter} onValueChange={(value) => setCallFilter(value as any)} className="w-full">
                        <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
                          {[
                            { key: 'all', label: 'All', count: allCalls.length },
                            { key: 'appointments', label: 'Appointments', count: allCalls.filter(c => c.category === 'appointments').length },
                            { key: 'leads', label: 'Leads', count: allCalls.filter(c => c.category === 'leads').length },
                            { key: 'missed', label: 'Missed', count: allCalls.filter(c => c.category === 'missed').length }
                          ].map((filter) => (
                            <TabsTrigger
                              key={filter.key}
                              value={filter.key}
                              className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-300 hover:text-white transition-colors text-sm"
                            >
                              {filter.label} ({filter.count})
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        
                        <TabsContent value={callFilter} className="mt-6">
                          {filteredCalls.length > 0 ? (
                            <div className="space-y-3">
                              {filteredCalls.slice(0, 4).map((call) => (
                                <div key={call.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700/50 transition-all duration-300">
                                  <div className="flex items-center space-x-3 flex-1">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                      call.outcome === 'Booked' ? 'bg-green-500/20' :
                                      call.outcome === 'Qualified' ? 'bg-blue-500/20' :
                                      call.outcome === 'Missed' ? 'bg-red-500/20' :
                                      'bg-gray-700'
                                    }`}>
                                      {call.type === 'inbound' ? (
                                        <PhoneIncoming className={`w-4 h-4 ${
                                          call.outcome === 'Booked' ? 'text-green-400' :
                                          call.outcome === 'Qualified' ? 'text-blue-400' :
                                          call.outcome === 'Missed' ? 'text-red-400' :
                                          'text-gray-400'
                                        }`} />
                                      ) : (
                                        <Phone className={`w-4 h-4 ${
                                          call.outcome === 'Booked' ? 'text-green-400' :
                                          call.outcome === 'Qualified' ? 'text-blue-400' :
                                          'text-gray-400'
                                        }`} />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <p className="font-medium text-white truncate">{call.caller}</p>
                                        <span className="text-xs text-gray-500">•</span>
                                        <span className="text-xs text-gray-400">{call.duration}</span>
                                      </div>
                                      <p className="text-sm text-gray-400">{call.intent} • {call.time}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <Badge className={`${
                                      call.outcome === 'Booked' ? 'bg-green-500/20 text-green-400 border-green-400/20' :
                                      call.outcome === 'Qualified' ? 'bg-blue-500/20 text-blue-400 border-blue-400/20' :
                                      call.outcome === 'Missed' ? 'bg-red-500/20 text-red-400 border-red-400/20' :
                                      'bg-gray-500/20 text-gray-400 border-gray-400/20'
                                    }`}>
                                      {call.outcome}
                                    </Badge>
                                    {call.outcome !== 'Missed' && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 hover:text-white"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <Phone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                              <p className="text-gray-400 mb-4">No {callFilter === 'all' ? '' : callFilter} calls yet.</p>
                              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                                Make Test Call
                              </Button>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Insights Section */}
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Bot className="w-6 h-6 text-blue-400" />
                    AI-Powered Insights
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      {
                        title: 'Peak Call Time',
                        value: '9–11 AM',
                        description: '34% of calls occur during morning hours',
                        icon: Clock,
                        color: 'text-blue-400',
                        bgColor: 'bg-blue-500/20'
                      },
                      {
                        title: 'Top Conversion',
                        value: 'Healthcare',
                        description: 'Most leads from medical practices',
                        icon: TrendingUp,
                        color: 'text-green-400',
                        bgColor: 'bg-green-500/20'
                      },
                      {
                        title: 'Follow-up Needed',
                        value: '12 Calls',
                        description: 'Missed calls requiring attention',
                        icon: AlertTriangle,
                        color: 'text-yellow-400',
                        bgColor: 'bg-yellow-500/20'
                      },
                      {
                        title: 'Response Time',
                        value: '1.2 seconds',
                        description: '15% faster than last month',
                        icon: Zap,
                        color: 'text-purple-400',
                        bgColor: 'bg-purple-500/20'
                      }
                    ].map((insight, index) => (
                      <Card key={index} className="bg-gray-900 border-gray-800 hover-glow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 ${insight.bgColor} rounded-lg flex items-center justify-center`}>
                              <insight.icon className={`w-6 h-6 ${insight.color}`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-medium mb-1">{insight.title}</h4>
                              <p className={`text-2xl font-semibold ${insight.color} mb-2`}>{insight.value}</p>
                              <p className="text-gray-400 text-sm">{insight.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        title: 'Make Test Call',
                        description: 'Test your AI receptionist',
                        icon: PhoneCall,
                        color: 'text-blue-400',
                        bgColor: 'bg-blue-500/20',
                        action: () => alert('Making test call...'),
                        featured: true
                      },
                      {
                        title: 'Add Integration',
                        description: 'Connect your CRM or calendar',
                        icon: Puzzle,
                        color: 'text-green-400',
                        bgColor: 'bg-green-500/20',
                        action: () => onViewChange('integrations')
                      },
                      {
                        title: 'View Analytics',
                        description: 'Call metrics and reports',
                        icon: BarChart3,
                        color: 'text-purple-400',
                        bgColor: 'bg-purple-500/20',
                        action: () => onViewChange('analytics')
                      },
                      {
                        title: 'Upgrade Plan',
                        description: 'More minutes and features',
                        icon: CreditCard,
                        color: 'text-yellow-400',
                        bgColor: 'bg-yellow-500/20',
                        action: () => onViewChange('billing')
                      }
                    ].map((action, index) => (
                      <Card 
                        key={index} 
                        className={`bg-gray-900 border-gray-800 hover-glow cursor-pointer group ${
                          action.featured ? 'ring-2 ring-blue-500/20' : ''
                        }`}
                        onClick={action.action}
                      >
                        <CardContent className="p-6 text-center">
                          <div className={`w-16 h-16 ${action.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                            <action.icon className={`w-8 h-8 ${action.color}`} />
                          </div>
                          <h4 className="text-white font-medium mb-2">{action.title}</h4>
                          <p className="text-gray-400 text-sm">{action.description}</p>
                          {action.featured && (
                            <Badge className="mt-3 bg-blue-500/20 text-blue-400 border-blue-400/20">
                              Featured
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}

            {currentView === 'logs' && <CallLogsView />}
            
            {currentView === 'analytics' && <AnalyticsView />}
            
            {currentView === 'billing' && <BillingView />}
            
            {currentView === 'team' && <TeamView />}
            
            {currentView === 'help' && <HelpView />}
            
            {currentView === 'integrations' && <IntegrationsView />}
            
            {currentView === 'settings' && <SettingsView />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}