import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Play, Volume2, Mic, Speaker, CircleCheck as CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Voice {
  id: string;
  name: string;
  description: string;
  personality: string;
  preview: string;
  tags: string[];
  audioFile: string;
}

const VOICES: Voice[] = [
  {
    id: 'guardian-pro',
    name: 'Guardian Pro',
    description: 'Neutral, confident, clear enunciation',
    personality: 'Perfect for professional legal and business settings. Maintains authority while remaining approachable.',
    preview: 'Hello, you\'ve reached Guardian Legal Associates. How may I assist you today?',
    tags: ['Professional', 'Confident', 'Clear'],
    audioFile: '/audio/guardian-pro.mp3'
  },
  {
    id: 'sofia-warm',
    name: 'Sofia',
    description: 'Approachable, empathetic, friendly tone',
    personality: 'Warm and welcoming voice that puts callers at ease. Ideal for customer service and support interactions.',
    preview: 'Hi there! Thanks for calling. I\'m here to help you with whatever you need.',
    tags: ['Friendly', 'Warm', 'Empathetic'],
    audioFile: '/audio/sofia-warm.mp3'
  },
  {
    id: 'dylan-crisp',
    name: 'Dylan',
    description: 'Fast, concise, excellent for triage',
    personality: 'Efficient and direct communication style. Perfect for high-volume environments where speed matters.',
    preview: 'Guardian AI. Please state your name and reason for calling.',
    tags: ['Crisp', 'Fast', 'Efficient'],
    audioFile: '/audio/dylan-crisp.mp3'
  },
  {
    id: 'mila-calm',
    name: 'Mila',
    description: 'Soothing, patient, healthcare-ready',
    personality: 'Calm and reassuring tone ideal for healthcare and sensitive situations. Speaks slowly and clearly.',
    preview: 'Hello, welcome to our office. Please take your time and let me know how I can help you today.',
    tags: ['Calm', 'Healthcare', 'Patient'],
    audioFile: '/audio/mila-calm.mp3'
  }
];

const STORAGE_KEY = 'guardian.voice';

export function VoiceSelection() {
  const [selectedVoice, setSelectedVoice] = useState<string>('guardian-pro');
  const [savedVoice, setSavedVoice] = useState<string>('guardian-pro');
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [speakingSpeed, setSpeakingSpeed] = useState('normal');
  const [voicePitch, setVoicePitch] = useState('medium');
  const [formalityLevel, setFormalityLevel] = useState('professional');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSelectedVoice(saved);
      setSavedVoice(saved);
    }
  }, []);

  const handleSelectVoice = (voiceId: string) => {
    setSelectedVoice(voiceId);
  };

  const handlePreviewVoice = (voiceId: string) => {
    if (playingVoice === voiceId) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingVoice(null);
      return;
    }

    const voice = VOICES.find(v => v.id === voiceId);
    if (!voice) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(voice.audioFile);
    audioRef.current.play().catch(() => {
      toast.error('Audio preview not available');
    });

    setPlayingVoice(voiceId);

    audioRef.current.onended = () => {
      setPlayingVoice(null);
    };
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, selectedVoice);
    setSavedVoice(selectedVoice);

    const voiceName = VOICES.find(v => v.id === selectedVoice)?.name;
    toast.success(`Voice settings saved! ${voiceName} is now your default voice.`);
  };

  const handleCancel = () => {
    setSelectedVoice(savedVoice);
    toast.info('Changes discarded');
  };

  const hasChanges = selectedVoice !== savedVoice;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VOICES.map((voice) => (
          <Card
            key={voice.id}
            className={`bg-gray-900 border transition-all duration-300 rounded-2xl ${
              selectedVoice === voice.id
                ? 'ring-2 ring-white/30 bg-gray-800 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                : 'border-white/10 hover:bg-gray-800/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
            }`}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        selectedVoice === voice.id
                          ? 'bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                          : 'bg-gray-700'
                      }`}
                    >
                      <Mic
                        className={`w-6 h-6 ${
                          selectedVoice === voice.id ? 'text-white' : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{voice.name}</h3>
                      <div className="text-gray-400 text-sm">{voice.description}</div>
                    </div>
                  </div>
                  {selectedVoice === voice.id && (
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                      <div className="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-800 rounded-xl p-4 border border-white/10">
                  <div className="text-gray-300 text-sm mb-3">{voice.personality}</div>
                  <div className="bg-gray-700 rounded-lg p-3 border-l-4 border-blue-400">
                    <div className="text-gray-200 text-sm italic">"{voice.preview}"</div>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {voice.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-gray-700 text-gray-300 border border-white/10"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreviewVoice(voice.id)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white flex-1 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
                    className={`flex-1 transition-all ${
                      selectedVoice === voice.id
                        ? 'bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
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

      <Card className="bg-gray-900 border-white/10 rounded-2xl">
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
              <Select value={speakingSpeed} onValueChange={setSpeakingSpeed}>
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
              <Select value={voicePitch} onValueChange={setVoicePitch}>
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
              <Select value={formalityLevel} onValueChange={setFormalityLevel}>
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

      <div className="bg-gray-800/50 rounded-2xl p-4 border border-white/10">
        <div className="text-gray-400 text-sm flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500/20 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
          </div>
          You can change this anytime. New calls will use the updated voice immediately.
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={!hasChanges}
          className="border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="bg-white text-black hover:bg-gray-100 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Save Voice Settings
        </Button>
      </div>
    </div>
  );
}
