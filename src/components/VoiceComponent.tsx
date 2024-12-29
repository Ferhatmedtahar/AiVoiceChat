"use client";

import { useEffect, useState } from "react";

// ElevenLabs
import { useConversation } from "@11labs/react";

// UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Minus, Plus, Volume2, VolumeX } from "lucide-react";

const VoiceChat = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [errorMessage, setErrorMessage] = useState("");

  const conversation = useConversation();
  const { status, isSpeaking } = conversation;

  useEffect(() => {
    // Request microphone permission on component mount
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
      } catch (error) {
        setErrorMessage("Microphone access denied");
        console.error("Error accessing microphone:", error);
      }
    };

    requestMicPermission();
  }, []);

  const handleStartConversation = async () => {
    try {
      // Replace with your actual agent ID or URL
      const conversationId = await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
      });
      console.log("Started conversation:", conversationId);
    } catch (error) {
      setErrorMessage("Failed to start conversation");
      console.error("Error starting conversation:", error);
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      setErrorMessage("Failed to end conversation");
      console.error("Error ending conversation:", error);
    }
  };

  const toggleMute = async () => {
    try {
      await conversation.setVolume({ volume: isMuted ? 1 : 0 });
      setIsMuted(!isMuted);
    } catch (error) {
      setErrorMessage("Failed to change volume");
      console.error("Error changing volume:", error);
    }
  };
  const increaseVolume = async () => {
    try {
      setVolume((vol) => vol + 0.2);
      await conversation.setVolume({ volume: volume });
    } catch (error) {
      setErrorMessage("Failed to change volume");
      console.error("Error changing volume:", error);
    }
  };
  const decreaseVolume = async () => {
    try {
      setVolume((vol) => vol - 0.2);
      await conversation.setVolume({ volume: volume });
    } catch (error) {
      setErrorMessage("Failed to change volume");
      console.error("Error changing volume:", error);
    }
  };
  return (
    <Card className="w-full max-w-md mx-auto border-none bg-gradient-to-r from-purple-500/70 to-blue-700/60 ">
      <CardHeader>
        <CardTitle className=" text-white flex items-center justify-between">
          Voice Chat
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
              className="border-none  bg-purple-500 hover:bg-blue-500 duration-300 transition-all"
              disabled={status !== "connected"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            {/* increase and decrease volume */}
            <Button
              variant="outline"
              size="icon"
              onClick={decreaseVolume}
              disabled={volume <= 0}
              className="border-none  bg-purple-500 hover:bg-blue-500 duration-300 transition-all"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={increaseVolume}
              disabled={volume >= 0}
              className="border-none  bg-purple-500 hover:bg-blue-500 duration-300 transition-all"
            >
              <Plus className="h-4 w-4 text-white" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            {status === "connected" ? (
              <Button
                variant="destructive"
                onClick={handleEndConversation}
                className="w-full bg-purple-500 hover:bg-blue-500 duration-300 transition-all"
              >
                <MicOff className="mr-2 h-4 w-4" />
                End Conversation
              </Button>
            ) : (
              <Button
                onClick={handleStartConversation}
                disabled={!hasPermission}
                className="w-full bg-purple-500 hover:bg-blue-500 duration-300 transition-all"
              >
                <Mic className="mr-2 h-4 w-4" />
                Start Conversation
              </Button>
            )}
          </div>

          <div className="text-center text-sm">
            {status === "connected" && (
              <p className="text-green-600">
                {isSpeaking ? "Agent is speaking..." : "Listening..."}
              </p>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {!hasPermission && (
              <p className="text-yellow-600">
                Please allow microphone access to use voice chat
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChat;
