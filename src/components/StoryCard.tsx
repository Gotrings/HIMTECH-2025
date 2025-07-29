import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

// Helper untuk membuat blur placeholder
const toBase64 = (str: string) => {
  if (typeof window === 'undefined') return '';
  return window.btoa(str);
};

const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f3f4f6" offset="20%" />
        <stop stop-color="#e5e7eb" offset="50%" />
        <stop stop-color="#f3f4f6" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f3f4f6" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>
`;

interface StoryCardProps {
  image: string;
  title: string;
  description: string;
  date?: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
  onClick?: () => void;
  link?: string;
  priority?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({
  image,
  title,
  description,
  date,
  className,
  imageClassName,
  delay = 0,
  onClick,
  link,
  priority = false
}) => {
  return (
    <div 
      className={cn(
        "story-card animate-fade-in group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl", 
        className
      )}
      style={{ animationDelay: `${delay * 0.1}s` }}
      onClick={onClick}
    >
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <img
              src={image}
              alt={title}
              className={cn(
                "story-card-image h-full w-full object-cover transition-all duration-500 group-hover:scale-110",
                imageClassName
              )}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              width={400}
              height={300}
              decoding="async"
              style={{
                backgroundImage: `url("data:image/svg+xml;base64,${toBase64(shimmer(400, 300))}")`,
                backgroundSize: 'cover',
              }}
            />
            <div className="story-card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <h3 className="text-white font-medium text-xl mb-2">{title}</h3>
              {date && (
                <div className="inline-block bg-himtech-lightBlue/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs mb-2">
                  {date}
                </div>
              )}
              <p className="text-white/80 text-sm mb-4">{description}</p>
              <button className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-himtech-blue hover:bg-himtech-blue hover:text-white px-4 py-2 rounded-full text-sm font-medium mt-4">
                Lihat Detail
              </button>
            </div>
          </div>
        </a>
      ) : (
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className={cn(
              "story-card-image h-full w-full object-cover transition-all duration-500 group-hover:scale-110",
              imageClassName
            )}
            loading="lazy"
            width="400"
            height="300"
          />
          <div className="story-card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
            <h3 className="text-white font-medium text-xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{title}</h3>
            {date && (
              <div className="inline-block bg-himtech-lightBlue/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {date}
              </div>
            )}
            <p className="text-white/80 text-sm mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{description}</p>
            {link && (
              <button className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-himtech-blue hover:bg-himtech-blue hover:text-white px-4 py-2 rounded-full text-sm font-medium mt-4 delay-150">
                Lihat Detail
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryCard;