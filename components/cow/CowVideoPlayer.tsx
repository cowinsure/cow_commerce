"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from "lucide-react";
import { cn } from "@/lib/theme/theme.config";

interface CowVideoPlayerProps {
  videoUrl: string;
  cowName: string;
  className?: string;
}

export function CowVideoPlayer({ videoUrl, cowName, className }: CowVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const isInView = useInView(containerRef, { once: true, margin: "0px" });

  // Get video URL helper
  const getVideoUrl = (path: string) => {
    if (!path || ["null", "undefined", ""].includes(path)) return null;
    if (path.startsWith("http")) return path;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_IMAGE_URL || "";
    return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  };

  const validVideoUrl = getVideoUrl(videoUrl);

  // Auto-play when in view
  useEffect(() => {
    if (isInView && validVideoUrl && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay prevented, show play button
        setIsPlaying(false);
      });
    }
  }, [isInView, validVideoUrl]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setError(true);
  };

  if (!validVideoUrl) {
    return (
      <div className={cn("relative aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-200", className)}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
          <Play className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-sm font-medium">No video available</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("relative aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-200", className)}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
          <Play className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-sm font-medium">Video unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative aspect-5/5 rounded-3xl overflow-hidden bg-slate-900 shadow-2xl shadow-emerald-900/10 group",
        className
      )}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster=""
        playsInline
        loop
        muted={isMuted}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={validVideoUrl} type="video/mp4" />
      </video>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-10 h-10 text-emerald-500" />
          </motion.div>
        </div>
      )}

      {/* Play/Pause Overlay (clickable area) */}
      {!isLoading && !error && (
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={handlePlayPause}
        >
          {/* Center Play Button when paused */}
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-slate-900/30"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Controls Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12"
      >
        {/* Title */}
        <div className="mb-3">
          <p className="text-white font-semibold text-lg">{cowName}</p>
          <p className="text-white/60 text-sm">Muzzle Video</p>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center gap-4">
          {/* Play/Pause */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </motion.button>

          {/* Mute/Unmute */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMuteToggle}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </motion.button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Fullscreen */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFullscreen}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Maximize className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </motion.div>

      {/* Auto-play indicator */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm rounded-full flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-white text-xs font-medium">Playing</span>
        </motion.div>
      )}
    </div>
  );
}