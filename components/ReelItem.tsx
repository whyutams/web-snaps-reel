"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Share2, Music, Volume2, VolumeX, Play, Plus, Check } from "lucide-react";
import { VideoItem } from "@/data/videos";

interface ReelItemProps {
  video: VideoItem;
  isActive: boolean;
  globalIsMuted: boolean;
  onToggleGlobalMute: () => void;
}

export const ReelItem: React.FC<ReelItemProps> = ({
  video,
  isActive,
  globalIsMuted,
  onToggleGlobalMute,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false); // Default: UNLIKED by self
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(video.likesCount);

  // Helper to format numeric like count
  const formatLikes = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  // Keep video DOM muted property strictly in sync with globalIsMuted state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = globalIsMuted;
    }
  }, [globalIsMuted]);

  // Setup IntersectionObserver for auto-play and pause when scrolled in/out of view
  useEffect(() => {
    const currentVideo = videoRef.current;
    const currentContainer = containerRef.current;

    if (!currentContainer || !currentVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Video active in viewport (>50%) -> play
            currentVideo.muted = globalIsMuted;
            const playPromise = currentVideo.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                })
                .catch((error) => {
                  console.log("Autoplay blocked or waiting for gesture:", error);
                  setIsPlaying(false);
                });
            }
          } else {
            // Video out of viewport -> pause and reset to start
            currentVideo.pause();
            currentVideo.currentTime = 0;
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(currentContainer);

    return () => {
      observer.unobserve(currentContainer);
    };
  }, [globalIsMuted]);

  // Handle Container Tap (Toggle Universal Mute or Play/Pause)
  const handleContainerTap = (e: React.MouseEvent) => {
    // Prevent video tap when clicking interactive action buttons
    if ((e.target as HTMLElement).closest(".action-bar-btn")) {
      return;
    }

    if (!videoRef.current) return;

    if (globalIsMuted) {
      // Toggle universal sound ON
      onToggleGlobalMute();
    } else {
      // Toggle play / pause state when sound is already unmuted
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Toggle Like button handler (No toast notifications)
  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  // Follow creator toggle handler (No toast notifications)
  const handleToggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing((prev) => !prev);
  };

  // Comment click handler (No toast notifications)
  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Share click handler (No toast notifications)
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: video.caption,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerTap}
      className="h-screen w-full snap-start relative flex items-center justify-center flex-shrink-0 bg-black overflow-hidden select-none cursor-pointer"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.posterUrl}
        loop
        playsInline
        autoPlay
        muted={globalIsMuted}
        preload="auto"
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Top Overlay Gradient */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />

      {/* Bottom Overlay Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Universal Mute / Unmute Button - ICON ONLY (Top Right Corner) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleGlobalMute();
        }}
        className="absolute top-6 right-6 z-30 bg-black/50 backdrop-blur-md p-2.5 rounded-full border border-white/20 text-white shadow-lg transition-transform active:scale-95 hover:bg-black/70"
      >
        {globalIsMuted ? (
          <VolumeX className="w-5 h-5 text-rose-400" />
        ) : (
          <Volume2 className="w-5 h-5 text-emerald-400" />
        )}
      </button>

      {/* Play Button Overlay when video is paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-md p-5 rounded-full border border-white/20 text-white/90 shadow-2xl">
            <Play className="w-10 h-10 fill-white text-white translate-x-0.5" />
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* RIGHT SIDE ACTION BAR (Interactive Buttons & Likes)           */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute right-4 bottom-20 z-20 flex flex-col items-center gap-5">
        {/* Avatar + Follow Plus Badge */}
        <div className="relative action-bar-btn" onClick={handleToggleFollow}>
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg bg-zinc-800 transition-transform active:scale-95">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.avatar}
              alt={video.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 ${isFollowing ? 'bg-emerald-500' : 'bg-rose-500'} text-white rounded-full p-0.5 shadow-md transition-colors`}>
            {isFollowing ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>

        {/* Like Button & Count (DEFAULT: UNLIKED BY SELF) */}
        <div className="flex flex-col items-center gap-1 action-bar-btn" onClick={handleToggleLike}>
          <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 active:scale-90 transition-transform">
            {isLiked ? (
              <Heart className="w-7 h-7 text-rose-500 fill-rose-500 stroke-rose-500 scale-110 transition-all" />
            ) : (
              <Heart className="w-7 h-7 text-white fill-none stroke-[2.2] transition-all hover:text-rose-300" />
            )}
          </button>
          <span className="text-xs font-semibold tracking-wide text-white drop-shadow">
            {formatLikes(likeCount)}
          </span>
        </div>

        {/* Comment Button & Count */}
        <div className="flex flex-col items-center gap-1 action-bar-btn" onClick={handleCommentClick}>
          <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 active:scale-90 transition-transform">
            <MessageCircle className="w-7 h-7 text-white fill-none stroke-[2.2]" />
          </button>
          <span className="text-xs font-semibold tracking-wide text-white drop-shadow">
            {video.comments}
          </span>
        </div>

        {/* Share Button & Count */}
        <div className="flex flex-col items-center gap-1 action-bar-btn" onClick={handleShareClick}>
          <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 active:scale-90 transition-transform">
            <Share2 className="w-7 h-7 text-white fill-none stroke-[2.2]" />
          </button>
          <span className="text-xs font-semibold tracking-wide text-white drop-shadow">
            {video.shares}
          </span>
        </div>

        {/* Audio Disc / Vinyl Record Spinning Icon */}
        <div className="mt-1 w-11 h-11 rounded-full border-2 border-zinc-700 bg-zinc-950 p-1 shadow-2xl flex items-center justify-center animate-spin-disc">
          <div className="w-full h-full rounded-full border border-zinc-600 bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-rose-500 border border-white/60" />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM-LEFT VIDEO INFO BAR                                    */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute left-4 bottom-6 right-20 z-20 flex flex-col gap-2 text-left pointer-events-none">
        {/* Username */}
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-white tracking-wide drop-shadow-lg">
            {video.username}
          </h3>
          <span
            onClick={handleToggleFollow}
            className={`pointer-events-auto cursor-pointer ${isFollowing ? 'bg-zinc-700/80 text-white' : 'bg-rose-600 hover:bg-rose-500 text-white'} text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm transition-colors`}
          >
            {isFollowing ? "Mengikuti" : "Ikuti"}
          </span>
        </div>

        {/* Description / Caption & Hashtags */}
        <p className="text-sm text-zinc-100 font-medium leading-snug drop-shadow line-clamp-2">
          {video.caption}{" "}
          <span className="text-rose-300 font-semibold space-x-1">
            {video.hashtags.map((tag) => (
              <span key={tag} className="inline-block mr-1">
                {tag}
              </span>
            ))}
          </span>
        </p>

        {/* Audio Sound Track Marquee */}
        <div className="flex items-center gap-2 text-xs text-zinc-200 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full w-fit max-w-[85%] border border-white/10 overflow-hidden">
          <Music className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
          <div className="overflow-hidden relative w-48">
            <div className="animate-audio-marquee whitespace-nowrap">
              <span className="mr-8">{video.soundName}</span>
              <span className="mr-8">{video.soundName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
