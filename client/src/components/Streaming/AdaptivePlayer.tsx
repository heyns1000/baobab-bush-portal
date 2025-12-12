import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Download, 
  Settings,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Share2,
  Heart,
  Bookmark,
  MoreVertical,
  Headphones,
  Wifi,
  WifiOff,
  Gauge,
  Users
} from 'lucide-react';

interface AdaptivePlayerProps {
  podcastData: {
    id: string;
    title: string;
    host: string;
    duration: number;
    thumbnail: string;
    streamUrl: string;
    qualityOptions: Array<{
      quality: string;
      bitrate: string;
      url: string;
    }>;
  };
  isLive?: boolean;
}

export default function AdaptivePlayer({ podcastData, isLive = false }: AdaptivePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [isBuffering, setIsBuffering] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'poor' | 'good' | 'excellent'>('good');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Auto-quality adjustment based on connection
  useEffect(() => {
    const checkConnectionQuality = () => {
      // @ts-ignore - Navigator.connection is experimental
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        const downlink = connection.downlink || 1;
        if (downlink > 10) {
          setConnectionQuality('excellent');
          if (quality === 'auto') setCurrentQuality('high');
        } else if (downlink > 1.5) {
          setConnectionQuality('good');
          if (quality === 'auto') setCurrentQuality('medium');
        } else {
          setConnectionQuality('poor');
          if (quality === 'auto') setCurrentQuality('low');
        }
      }
    };

    checkConnectionQuality();
    // Check periodically
    const interval = setInterval(checkConnectionQuality, 30000);
    return () => clearInterval(interval);
  }, [quality]);

  const setCurrentQuality = (newQuality: string) => {
    if (audioRef.current && podcastData.qualityOptions) {
      const qualityOption = podcastData.qualityOptions.find(q => q.quality === newQuality);
      if (qualityOption) {
        const currentTime = audioRef.current.currentTime;
        const wasPlaying = isPlaying;
        
        audioRef.current.src = qualityOption.url;
        audioRef.current.currentTime = currentTime;
        
        if (wasPlaying) {
          audioRef.current.play();
        }
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (newTime: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime[0];
      setCurrentTime(newTime[0]);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsDownloading(false);
        setDownloadProgress(0);
      }
    }, 500);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getConnectionIcon = () => {
    switch (connectionQuality) {
      case 'excellent': return <Wifi className="w-4 h-4 text-green-600" />;
      case 'good': return <Wifi className="w-4 h-4 text-yellow-600" />;
      case 'poor': return <WifiOff className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <Card className="w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-amber-200 dark:border-gray-700 shadow-lg">
      <CardContent className="p-6">
        <audio
          ref={audioRef}
          src={podcastData.streamUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadStart={() => setIsBuffering(true)}
          onCanPlay={() => setIsBuffering(false)}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
        />

        {/* Header with Podcast Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl">{podcastData.thumbnail}</div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-1">
              {podcastData.title}
            </h3>
            <p className="text-sm text-amber-600 dark:text-amber-200">
              {podcastData.host}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {isLive && (
                <Badge className="bg-red-600 text-white text-xs">
                  🔴 LIVE
                </Badge>
              )}
              <div className="flex items-center gap-1">
                {getConnectionIcon()}
                <span className="text-xs text-muted-foreground capitalize">
                  {connectionQuality}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                {quality === 'auto' ? 'Auto Quality' : quality}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? 'text-red-500' : ''}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={isBookmarked ? 'text-amber-600' : ''}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {!isLive && (
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={podcastData.duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(podcastData.duration)}</span>
            </div>
          </div>
        )}

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          {!isLive && (
            <Button variant="ghost" size="sm" onClick={skipBackward}>
              <SkipBack className="w-5 h-5" />
            </Button>
          )}
          
          <Button
            onClick={togglePlayPause}
            size="lg"
            className="w-14 h-14 rounded-full bg-amber-600 hover:bg-amber-700 text-white"
            disabled={isBuffering}
          >
            {isBuffering ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>
          
          {!isLive && (
            <Button variant="ghost" size="sm" onClick={skipForward}>
              <SkipForward className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Secondary Controls */}
        <div className="flex items-center justify-between">
          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleMute}>
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>

          {/* Playback Speed */}
          {!isLive && (
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              <select
                value={playbackSpeed}
                onChange={(e) => {
                  const speed = parseFloat(e.target.value);
                  setPlaybackSpeed(speed);
                  if (audioRef.current) {
                    audioRef.current.playbackRate = speed;
                  }
                }}
                className="text-sm bg-transparent border border-amber-200 dark:border-gray-600 rounded px-2 py-1"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          )}

          {/* Quality Selector */}
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-muted-foreground" />
            <select
              value={quality}
              onChange={(e) => {
                const newQuality = e.target.value;
                setQuality(newQuality);
                if (newQuality !== 'auto') {
                  setCurrentQuality(newQuality);
                }
              }}
              className="text-sm bg-transparent border border-amber-200 dark:border-gray-600 rounded px-2 py-1"
            >
              <option value="auto">Auto</option>
              {podcastData.qualityOptions?.map((option) => (
                <option key={option.quality} value={option.quality}>
                  {option.quality} ({option.bitrate})
                </option>
              ))}
            </select>
          </div>

          {/* Download Button */}
          {!isLive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">{downloadProgress}%</span>
                </div>
              ) : (
                <Download className="w-4 h-4" />
              )}
            </Button>
          )}

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Live Stats */}
        {isLive && (
          <div className="mt-4 pt-4 border-t border-amber-200 dark:border-gray-600">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                1,247 listening live
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                89 reactions
              </span>
              <span>Started 23 min ago</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}