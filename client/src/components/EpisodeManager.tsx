import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { ObjectUploader } from "./ObjectUploader";
import type { Episode } from "@shared/schema";
import type { UploadResult } from "@uppy/core";

export default function EpisodeManager() {
  const queryClient = useQueryClient();
  
  const { data: episodes = [], isLoading } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
  });

  const createEpisodeMutation = useMutation({
    mutationFn: async (episodeData: any) => {
      const response = await apiRequest("POST", "/api/episodes", episodeData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/episodes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/treaty-logs"] });
    },
  });

  const handleGetUploadParameters = async () => {
    const response = await apiRequest("POST", "/api/objects/upload");
    const data = await response.json();
    return {
      method: 'PUT' as const,
      url: data.uploadURL,
    };
  };

  const handleUploadComplete = (result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
    if (result.successful && result.successful.length > 0) {
      const file = result.successful[0];
      const uploadURL = file.uploadURL;
      
      if (uploadURL && file.data) {
        const episodeData = {
          title: file.name?.replace(/\.[^/.]+$/, "") || "Untitled Episode", // Remove extension
          description: `Uploaded episode: ${file.name}`,
          fileName: file.name || "unknown.mp3",
          fileSize: file.size || 0,
          status: "live" as const,
          objectPath: uploadURL,
        };
        
        createEpisodeMutation.mutate(episodeData);
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(1) + 'MB';
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-terminal-panel border border-terminal-gold/30 rounded p-6" id="episode-console">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-terminal-bright text-lg font-semibold">▶ EPISODE MANAGEMENT</h2>
        <ObjectUploader
          maxNumberOfFiles={1}
          maxFileSize={500 * 1024 * 1024} // 500MB
          onGetUploadParameters={handleGetUploadParameters}
          onComplete={handleUploadComplete}
          buttonClassName="px-3 py-1 bg-terminal-gold/20 hover:bg-terminal-gold/30 border border-terminal-gold rounded text-sm transition-colors neon-button"
        >
          <span data-testid="upload-button">+ UPLOAD</span>
        </ObjectUploader>
      </div>
      
      {/* Upload Status */}
      {createEpisodeMutation.isPending && (
        <div className="mb-4 p-3 bg-terminal-warning/20 border border-terminal-warning/50 rounded">
          <div className="text-terminal-warning text-sm">Processing upload...</div>
        </div>
      )}
      
      {/* Episode List */}
      <div className="space-y-2">
        <div className="text-terminal-gold text-sm font-medium mb-3">
          RECENT EPISODES {episodes.length > 0 && `(${episodes.length})`}
        </div>
        
        {isLoading ? (
          <div className="text-terminal-muted text-sm">Loading episodes...</div>
        ) : episodes.length === 0 ? (
          <div className="text-terminal-muted text-sm text-center py-8">
            No episodes uploaded yet. Use the upload button to add your first episode.
          </div>
        ) : (
          episodes.slice(0, 5).map((episode) => (
            <div
              key={episode.id}
              className="flex items-center justify-between p-3 bg-terminal-bg/50 rounded border border-terminal-gold/20 hover:border-terminal-gold/40 transition-colors"
              data-testid={`episode-${episode.id}`}
            >
              <div className="flex-1">
                <div className="font-medium text-sm">{episode.title}</div>
                <div className="text-xs text-terminal-muted">
                  Duration: {formatDuration(episode.duration)} | 
                  Size: {formatFileSize(episode.fileSize)} | 
                  Status: {episode.status} |
                  Freq: {episode.frequency}kHz
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${
                  episode.status === 'live' ? 'text-terminal-success' : 'text-terminal-muted'
                }`}>
                  {episode.status === 'live' ? '●' : '○'}
                </span>
                <Button
                  variant="ghost" 
                  size="sm"
                  className="text-terminal-gold hover:text-terminal-bright text-xs h-auto p-1 neon-button gold-capsule"
                  data-testid={`edit-episode-${episode.id}`}
                >
                  EDIT
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
