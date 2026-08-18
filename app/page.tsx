"use client";

import React, { useEffect, useState } from "react";
import { VIDEOS_DATA } from "@/data/videos";
import { ReelItem } from "@/components/ReelItem";
import { Download, Sparkles } from "lucide-react";

export default function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);
  
  // Universal Mute State across the entire app
  const [globalIsMuted, setGlobalIsMuted] = useState<boolean>(true);

  const handleToggleGlobalMute = () => {
    setGlobalIsMuted((prev) => !prev);
  };

  useEffect(() => {
    // Listen for PWA BeforeInstallPromptEvent in Chrome
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    }
  };

  return (
    <main className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory select-none bg-black no-scrollbar relative">
      {/* PWA Install Banner Overlay */}
      {showInstallBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-zinc-900/90 via-black/90 to-zinc-900/90 backdrop-blur-md border border-rose-500/30 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-3 text-xs font-medium">
          <Sparkles className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>Install Snaps Reel di layar utama perangkatanmu!</span>
          <button
            onClick={handleInstallPWA}
            className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-1 rounded-full font-semibold flex items-center gap-1 transition-all active:scale-95 shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            Install
          </button>
        </div>
      )}

      {/* Vertical Video Feed Items with Universal Sound State */}
      {VIDEOS_DATA.map((video, index) => (
        <ReelItem
          key={video.id}
          video={video}
          isActive={index === 0}
          globalIsMuted={globalIsMuted}
          onToggleGlobalMute={handleToggleGlobalMute}
        />
      ))}
    </main>
  );
}
