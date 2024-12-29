import VoiceComponent from "@/components/VoiceComponent";
export default function Home() {
  return (
    <div className="flex flex-col bg-black ">
      <div className="top-0 left-0 absolute w-[1200px] h-[400px] rounded-full bg-gradient-to-r from-purple-500/60 to-blue-700/30 blur-[280px] animate-pulse" />
      <main className=" flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
        <small className="text-sm text-white">Powered by ElevenLabs</small>
        <h1 className="text-4xl font-bold text-white mb-6">
          Realtime Voice Agent
        </h1>
        <VoiceComponent />
        <small className="text-xs text-gray-200 my-6">
          The app requires microphone access to work.
        </small>
      </main>
      <div className="mx-auto absolute bottom-0 right-0 w-[700px] h-[400px] rounded-full bg-gradient-to-r from-purple-500/30 to-blue-700/60 blur-[250px] animate-pulse" />
    </div>
  );
}
