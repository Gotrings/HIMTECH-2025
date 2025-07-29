import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { X } from 'lucide-react';

interface Story {
  id: number;
  image: string;
  title: string;
  description: string;
  date?: string;
  category?: string;
}

interface ImageCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialIndex: number;
}

const ImageCarouselModal: React.FC<ImageCarouselModalProps> = ({
  isOpen,
  onClose,
  stories,
  initialIndex
}) => {
  // Lindungi agar tidak error kalau initialIndex > stories.length
  const safeInitialIndex = Math.max(0, Math.min(initialIndex, stories.length - 1));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {stories.length > 0 ? (
          <Carousel
            key={stories.map(s => s.id).join("-")} // key agar reset saat stories berubah
            className="w-full"
            opts={{
              startIndex: safeInitialIndex
            }}
          >
            <CarouselContent>
              {stories.map((story) => (
                <CarouselItem key={story.id}>
                  <div className="relative flex flex-col items-center">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="max-h-[80vh] object-contain rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                      <h3 className="text-xl font-medium">{story.title}</h3>
                      <p className="text-sm text-white/70 mt-1">{story.description}</p>
                      <p className="text-xs text-white/50 mt-2">{story.date}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4 bg-black/40 text-white hover:bg-black/60 border-none" />
            <CarouselNext className="right-2 sm:right-4 bg-black/40 text-white hover:bg-black/60 border-none" />
          </Carousel>
        ) : (
          <div className="p-6 text-center text-white bg-black rounded-lg">
            Tidak ada cerita untuk ditampilkan.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageCarouselModal;
