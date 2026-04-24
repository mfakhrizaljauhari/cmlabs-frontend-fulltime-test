import React from 'react';

interface VideoEmbedProps {
  youtubeUrl: string | null;
}

export const VideoEmbed = React.memo(function VideoEmbed({ youtubeUrl }: VideoEmbedProps) {
  if (!youtubeUrl) {
    return null;
  }

  let videoId = '';
  const vMatch = youtubeUrl.match(/[?&]v=([^&]+)/);
  if (vMatch && vMatch[1]) {
    videoId = vMatch[1];
  } else {
    const shortMatch = youtubeUrl.match(/youtu\.be\/([^?]+)/);
    if (shortMatch && shortMatch[1]) {
      videoId = shortMatch[1];
    }
  }

  if (!videoId) return null;

  return (
    <article className="flex flex-col w-full gap-6 mt-16 pt-8 border-t border-outline-variant/30">
      <h3 className="font-h3 text-3xl text-on-background mb-2">Video Tutorial</h3>
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-outline-variant/20 bg-surface-variant group">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none z-10" />
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </article>
  );
});
