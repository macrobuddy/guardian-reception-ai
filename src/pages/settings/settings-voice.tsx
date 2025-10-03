import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Play, Pause } from "lucide-react";
import { toast } from "sonner";

type Voice = {
  id: string;
  label: string;
  description: string;
  previewUrl: string;
  tags: string[];
};

const VOICES: Voice[] = [
  {
    id: "guardian_pro",
    label: "Guardian Pro",
    description: "Neutral, confident, clear enunciation.",
    previewUrl: "/audio/guardian_pro.mp3",
    tags: ["Professional", "Neutral"]
  },
  {
    id: "sofia_warm",
    label: "Sofia (Warm)",
    description: "Approachable, empathetic, friendly tone.",
    previewUrl: "/audio/sofia_warm.mp3",
    tags: ["Warm", "Friendly"]
  },
  {
    id: "dylan_crisp",
    label: "Dylan (Crisp)",
    description: "Fast, concise, excellent for triage.",
    previewUrl: "/audio/dylan_crisp.mp3",
    tags: ["Crisp", "Efficient"]
  },
  {
    id: "mila_calm",
    label: "Mila (Calm)",
    description: "Soothing, patient, healthcare-ready.",
    previewUrl: "/audio/mila_calm.mp3",
    tags: ["Calm", "Healthcare"]
  }
];

const LOCAL_KEY = "guardian.voice";

export function SettingsVoice() {
  const [selected, setSelected] = useState<string>("");
  const [playingId, setPlayingId] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(LOCAL_KEY);
    if (cached) {
      setSelected(cached);
    } else {
      setSelected(VOICES[0].id);
    }
  }, []);

  const currentPreview = useMemo(
    () => VOICES.find((v) => v.id === playingId)?.previewUrl ?? "",
    [playingId]
  );

  useEffect(() => {
    if (!currentPreview) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const el = audioRef.current;
    el.src = currentPreview;
    el.onended = () => setPlayingId("");
    el.onerror = () => {
      setPlayingId("");
      toast.error("Audio preview unavailable");
    };

    el.play().catch(() => {
      setPlayingId("");
      toast.error("Unable to play audio preview");
    });

    return () => {
      el.pause();
      el.onended = null;
      el.onerror = null;
    };
  }, [currentPreview]);

  const togglePlay = (id: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId("");
    } else {
      setPlayingId(id);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      localStorage.setItem(LOCAL_KEY, selected);

      await new Promise(resolve => setTimeout(resolve, 500));

      toast.success("Voice preference saved");
    } catch (error) {
      toast.error("Failed to save voice preference");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    const cached = localStorage.getItem(LOCAL_KEY);
    if (cached) {
      setSelected(cached);
    }
  };

  const hasChanges = selected !== localStorage.getItem(LOCAL_KEY);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white mb-2">Voice Selection</h2>
        <p className="text-gray-400">
          Choose the default voice your AI receptionist will use for calls. You can change this anytime.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {VOICES.map((v) => (
          <Card
            key={v.id}
            onClick={() => setSelected(v.id)}
            className={`cursor-pointer transition-all duration-300 ${
              selected === v.id
                ? "bg-gray-800 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                : "bg-gray-900 border-white/10 hover:border-white/20 hover:bg-gray-800/50"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{v.label}</h3>
                  <p className="text-sm text-gray-400">{v.description}</p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 ${
                    selected === v.id
                      ? "border-white bg-white"
                      : "border-gray-600"
                  }`}
                >
                  {selected === v.id && (
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {v.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay(v.id);
                }}
                variant="outline"
                size="sm"
                className={`w-full ${
                  playingId === v.id
                    ? "border-white/30 bg-white/10"
                    : "border-white/15 hover:bg-white/5"
                }`}
              >
                {playingId === v.id ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Preview
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play Preview
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasChanges && (
        <div className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex-1 text-sm text-gray-300">
            You have unsaved changes to your voice selection.
          </div>
          <Button
            type="button"
            onClick={handleCancel}
            variant="outline"
            className="border-white/15 hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-white text-black hover:bg-gray-100"
          >
            {isSaving ? "Saving..." : "Save Voice"}
          </Button>
        </div>
      )}

      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="flex items-start gap-3 text-sm text-gray-400">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>
              You can change this anytime. New calls will use the updated voice immediately.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
