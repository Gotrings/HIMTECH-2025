import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import StoryCard from '@/components/StoryCard';
import { cn } from '@/lib/utils';

// Dynamically import the Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
      <p>Loading map...</p>
    </div>
  ),
});

const Index = () => {
    const storyCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-20');
                } else {
                    // Reset the animation when element is no longer in view
                    const isScrollingUp = window.scrollY < (entry.boundingClientRect.top + window.scrollY);
                    if (isScrollingUp) {
                        entry.target.classList.remove('opacity-100', 'translate-y-0');
                        entry.target.classList.add('opacity-0', 'translate-y-20');
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        storyCardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            storyCardsRef.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    const featuredStories = [
        {
            id: 1,
            image: "/images/Asah.webp",
            title: "Asah x Dicoding 2025",
            date: "Penutupan Pendaftaran 30 Juli 2025",
            description: "Tingkatkan kemampuan coding anda melalui bootcamp interaktif bersama para ahli di bidang pemrograman.",
            link: "https://www.dicoding.com/asah"
        },
        {
            id: 2,
            image: "/images/DBS-Fondation.webp",
            title: "Coding Camp Powered By DBS Fondation 2025",
            date: "Penutupan Pedaftran 31 Januari 2025",
            description: "Kolaborasi eksklusif dengan DBS Foundation untuk mengembangkan inovasi teknologi digital di Indonesia.",
            link: "https://www.dbs.com/spark/index/id_id/site/codingcamp/index.html"
        },
        {
            id: 3,
            image: "/images/GCP-11.webp",
            title: "#JuaraGCP11 2025",
            date: "31 Januari - 23 Februari 2025",
            description: "Pelajari teknologi cloud computing dengan Google Cloud Platform dalam sesi hands-on yang interaktif.",
            link: "https://cloud.google.com/events/intl/id-id/cloud-study-jam-indonesia-juaragcp-s11?hl=id"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Hero
                title={
                    <>
                        <span className="text-himtech-blue">HIM</span>
                        <span className="text-himtech-red">TECH</span>
                    </>
                }
                subtitle="Capturing moments of innovation, learning, and connection from our technology community."
            />

            <main className="flex-grow">
                {/* Featured Stories Section */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-himtech-blue mb-4">
                                    Event Terbaru
                                </h2>
                                <p className="text-himtech-gray max-w-2xl">
                                    Jelajahi event-event teknologi terkini dan kesempatan pengembangan skill di bidang IT.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredStories.map((story, index) => (
                                <div 
                                    key={story.id}
                                    ref={el => storyCardsRef.current[index] = el}
                                    className={cn(
                                        'transform transition-all duration-1000 ease-\[cubic-bezier\(0.4,0,0.2,1\)\] opacity-0 translate-y-20',
                                        'hover:z-10 hover:scale-[1.02] hover:shadow-xl',
                                        'motion-reduce:transition-none motion-reduce:hover:transform-none',
                                        'aspect-[4/5] h-auto'
                                    )}
                                    style={{
                                        transitionDelay: `${index * 50}ms`,
                                        transitionProperty: 'opacity, transform',
                                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                        willChange: 'opacity, transform',
                                    }}
                                >
                                    <StoryCard
                                        image={story.image}
                                        title={story.title}
                                        description={story.description}
                                        date={story.date}
                                        delay={index}
                                        className="h-full w-full"
                                        link={story.link}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Map Section */}
                <section className="py-20 px-6 bg-gray-50 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12 transform transition-all duration-700 ease-out opacity-0 translate-y-8" ref={el => {
                            if (!el) return;
                            const observer = new IntersectionObserver(([entry]) => {
                                if (entry.isIntersecting) {
                                    el.classList.add('opacity-100', 'translate-y-0');
                                    observer.disconnect();
                                }
                            }, { threshold: 0.1 });
                            observer.observe(el);
                        }}>
                            <h2 className="text-3xl md:text-4xl font-bold text-himtech-blue mb-4">
                                Lokasi Kami
                            </h2>
                            <p className="text-himtech-gray max-w-2xl mx-auto">
                                Kunjungi kampus kami di Politeknik META Industri Cikarang untuk informasi lebih lanjut tentang HIMTECH
                            </p>
                        </div>
                        
                        <div className="h-[500px] rounded-t-xl overflow-hidden shadow-lg transform transition-all duration-700 ease-out opacity-0 translate-y-8 delay-150" ref={el => {
                            if (!el) return;
                            const observer = new IntersectionObserver(([entry]) => {
                                if (entry.isIntersecting) {
                                    el.classList.add('opacity-100', 'translate-y-0');
                                    observer.disconnect();
                                }
                            }, { threshold: 0.1 });
                            observer.observe(el);
                        }}>
                            <Map />
                        </div>
                        
                        {/* Location Details Card */}
                        <div className="border border-gray-200 rounded-b-xl p-4 bg-white shadow-lg transform transition-all duration-700 ease-out opacity-0 translate-y-8 delay-300" ref={el => {
                            if (!el) return;
                            const observer = new IntersectionObserver(([entry]) => {
                                if (entry.isIntersecting) {
                                    el.classList.add('opacity-100', 'translate-y-0');
                                    observer.disconnect();
                                }
                            }, { threshold: 0.1 });
                            observer.observe(el);
                        }}>
                            <h3 className="font-bold text-lg text-himtech-blue">Politeknik META Industri Cikarang</h3>
                            <p className="text-sm text-gray-600 mt-1">Kawasan Hyundai, Jl. Inti I No.007 Blok C1, Cibatu, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17530</p>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center bg-yellow-100 px-2 py-1 rounded transition-all duration-300 hover:bg-yellow-200">
                                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-700">4.9</span>
                                    <span className="mx-1 text-gray-400">•</span>
                                    <span className="text-sm text-gray-500">219 reviews</span>
                                </div>
                            </div>
                            <div className="mt-3 flex space-x-3">
                                <a 
                                    href="https://www.google.com/maps/dir//Politeknik+META+Industri,+Kawasan+Hyundai,+Jl.+Inti+I+No.007+Blok+C1,+Cibatu,+Cikarang+Sel.,+Kabupaten+Bekasi,+Jawa+Barat+17530/@-6.3327016,107.1307651,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2e699a597bd5dfa9:0x90d36d8677e3d498!2m2!1d107.1332762!2d-6.3340843?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-white bg-himtech-blue hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Arahkan
                                </a>
                                <a 
                                    href="https://maps.app.goo.gl/Yovxi6smZ74emRQ16" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-himtech-blue hover:text-blue-700 px-4 py-2 border border-himtech-blue rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-50"
                                >
                                    Lihat peta lebih besar
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Index;