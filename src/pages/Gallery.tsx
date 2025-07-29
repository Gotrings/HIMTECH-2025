import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import ImageCarouselModal from '@/components/ImageCarouselModal';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

const Gallery = () => {
  // Scroll to top is handled by the ScrollToTop component in App.tsx

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const stories = [
    {
      id: 1,
      image: "/images/1.webp",
      title: "Foto Bersama Himpunan TRPL",
      date: "1 September 2024",
      category: "event",
      description: "Momen kebersamaan TRPL dalam satu bingkai."
    },
    {
      id: 2,
      image: "/images/2.webp",
      title: "Kegiatan Pagi MICO 2024",
      date: "1 September 2024",
      category: "event",
      description: "Senam pagi bersama seluruh MABA."
    },
    {
      id: 3,
      image: "/images/3.webp",
      title: "Senam Bareng Mentor Tim",
      date: "1 September 2024",
      category: "event",
      description: "Ekspresi semangat dan antusiasme peserta tercermin melalui senyuman ceria saat mengikuti rangkaian kegiatan pagi."
    },
    {
      id: 4,
      image: "/images/4.webp",
      title: "Penyampaian Materi oleh Dosen",
      date: "1 September 2024",
      category: "event",
      description: "Materi singkat dari dosen TRPL."
    },
    {
      id: 5,
      image: "/images/5.webp",
      title: "Foto Bersama MABA TRPL 2024",
      date: "1 September 2024",
      category: "event",
      description: "Foto bersama mahasiswa baru 2024."
    },
    {
      id: 6,
      image: "/images/6.webp",
      title: "Games",
      date: "1 September 2024",
      category: "event",
      description: "Momen pemberian penghargaan kepada para pemenang dan peserta yang telah berpartisipasi."
    },
    {
      id: 7,
      image: "/images/7.webp",
      title: "Games",
      date: "1 September 2023",
      category: "event",
      description: "Momen pemberian penghargaan kepada para pemenang dan peserta yang telah berpartisipasi."
    },
    {
      id: 8,
      image: "/images/8.webp",
      title: "Games",
      date: "1 September 2023",
      category: "event",
      description: "Momen pemberian penghargaan kepada para pemenang dan peserta yang telah berpartisipasi."
    },
    {
      id: 9,
      image: "/images/9.webp",
      title: "Penutupan MICO 2023",
      date: "1 September 2023",
      category: "event",
      description: "Mengabadikan momen kebersamaan dan semangat peserta dalam rangkaian kegiatan MICO 2023."
    },
  ];

  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'event', label: 'Acara' },
    { id: 'workshop', label: 'Workshops' }
  ];

  // Memoize the filtered stories to prevent unnecessary recalculations
  const filteredStories = React.useMemo(() => {
    return stories.filter(story => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        story.title.toLowerCase().includes(searchLower) ||
        story.description.toLowerCase().includes(searchLower);
      
      const matchesFilter = activeFilter === 'all' || 
        story.category.toLowerCase() === activeFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter, stories]);

  const handleStoryClick = (index: number) => {
    // Only open modal if there are filtered stories and index is valid
    if (filteredStories.length > 0 && index >= 0 && index < filteredStories.length) {
      setSelectedImageIndex(index);
      setIsModalOpen(true);
    }
  };

  const storyCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Update the observer when filteredStories change
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const cardIndex = parseInt(target.getAttribute('data-index') || '0');
        const delay = cardIndex * 50; // Make animations faster for better UX

        if (entry.isIntersecting) {
          target.style.transitionDelay = `${delay}ms`;
          target.classList.add('opacity-100', 'translate-y-0');
          target.classList.remove('opacity-0', 'translate-y-20');
        } else if (window.scrollY < entry.boundingClientRect.top + window.scrollY) {
          target.classList.add('opacity-0', 'translate-y-20');
          target.classList.remove('opacity-100', 'translate-y-0');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -20% 0px'
    });

    // Get all story cards and observe them
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach((card, index) => {
      card.setAttribute('data-index', index.toString());
      observer.observe(card);
    });

    // Cleanup function
    return () => {
      storyCards.forEach(card => observer.unobserve(card));
    };
  }, [filteredStories]); // Re-run when filteredStories changes

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <header className="pt-24 pb-8 px-4 sm:px-6 bg-gradient-to-b from-himtech-blue/5 to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto text-center animate-fade-in">
          <div className="transform transition-all duration-700 ease-out">
            <h1 className="text-4xl md:text-5xl font-bold text-himtech-blue mb-6">
              Photo Gallery
            </h1>
            <p className="text-himtech-gray max-w-2xl mx-auto mb-12">
              Jelajahi koleksi kenangan kami dari Acara, Workshop, dan Komunitas HIMTECH.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-himtech-lightBlue/50"
                />
              </div>

              <div className="relative flex items-center justify-center">
                <Filter className="h-5 w-5 text-himtech-blue mr-2" />
                <span className="text-himtech-blue font-medium">Filter:</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${activeFilter === filter.id
                      ? 'bg-himtech-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow py-5 px-8 sm:px-10">
        <div className="max-w-7xl mx-auto">
          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story, index) => {
                const isAboveTheFold = index < 3;
                return (
                  <div
                    key={story.id}
                    ref={el => storyCardsRef.current[index] = el}
                    className={cn(
                      'story-card', // Add story-card class for targeting
                      'transform transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]',
                      'opacity-0 translate-y-20',
                      'hover:z-10 hover:scale-[1.02] hover:shadow-xl',
                      'motion-reduce:transition-none motion-reduce:hover:transform-none',
                      'aspect-[4/3] h-auto',
                      'group'
                    )}
                    style={{
                      transitionDelay: `${index * 50}ms`,
                      transitionProperty: 'opacity, transform',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      willChange: 'opacity, transform'
                    }}
                  >
                    <StoryCard
                      image={story.image}
                      title={story.title}
                      description={story.description}
                      date={story.date}
                      className="h-full w-full"
                      priority={isAboveTheFold}
                      onClick={() => handleStoryClick(index)}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-himtech-blue mb-2">No stories found</h3>
              <p className="text-himtech-gray">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <ImageCarouselModal
          key={filteredStories.map(s => s.id).join("-")}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          stories={filteredStories.filter((story): story is { id: number; image: string; title: string; date: string; category: string; description: string } =>
            'description' in story && typeof story.description === 'string'
          ).map(story => ({
            ...story,
            image: story.image
          }))}
          initialIndex={selectedImageIndex >= filteredStories.length ? 0 : selectedImageIndex}
        />
      )}

      <Footer />
    </div>
  );
};

export default Gallery;