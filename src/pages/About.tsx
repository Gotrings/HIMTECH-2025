import React, { useEffect, useRef } from 'react';
import { FaInstagram, FaDiscord } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Award, Calendar, Clock, Lightbulb, Laptop, Globe, Code } from 'lucide-react';

const About = () => {
  // Scroll to top is handled by the ScrollToTop component in App.tsx

  const missionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('-translate-x-8')) {
            // Animate from left to right
            entry.target.classList.remove('-translate-x-8');
            entry.target.classList.add('translate-x-0');
          }
          if (entry.target.classList.contains('translate-x-8')) {
            // Animate from right to left
            entry.target.classList.remove('translate-x-8');
            entry.target.classList.add('translate-x-0');
          }
        }
      });
    }, { threshold: 0.1 });

    const elements = [missionRef.current, logoRef.current];
    
    elements.forEach(element => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elements.forEach(element => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "President",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Sarah Kim",
      role: "Vice President",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Michael Wong",
      role: "Events Coordinator",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Jessica Patel",
      role: "Tech Lead",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <header className="pt-28 pb-16 px-6 bg-gradient-to-b from-himtech-blue/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in opacity-100">
            <div className="inline-block p-3 rounded-full bg-himtech-lightBlue/10 mb-6">
              <img
                src="/images/logo.png"
                alt="HIMTECH Logo"
                className="h-16 md:h-20 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Tentang&nbsp;
              <span className="text-himtech-blue">HIM</span>
              <span className="text-himtech-red">TECH</span>
            </h1>
            <p className="text-himtech-gray max-w-3xl mx-auto mb-12 text-lg">
              HIMTECH adalah himpunan mahasiswa yang menjadi wadah pengembangan, kolaborasi, dan inovasi bagi seluruh mahasiswa Teknologi Rekayasa Perangkat Lunak.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Our Mission Section */}
        <section className="py-16 px-8 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="transform transition-all duration-700 ease-out -translate-x-8" ref={missionRef}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-himtech-blue mb-4">Visi</h2>
                    <p className="text-himtech-gray text-justify">
                      Menjadi wadah bagi mahasiswa Teknologi Rekayasa Perangkat Lunak untuk berkembang dan berkontribusi dalam bidang teknologi dan industri.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-himtech-blue mb-4">Misi</h2>
                    <ul className="list-disc pl-6 space-y-3 text-himtech-gray">
                      <li className="text-justify -ml-2 pl-2">Menyediakan forum bagi mahasiswa Teknologi Rekayasa Perangkat Lunak untuk berbagi pengalaman dan ilmu</li>
                      <li className="text-justify -ml-2 pl-2">Mendorong mahasiswa untuk berpartisipasi dalam kegiatan-kegiatan kemahasiswaan kampus</li>
                      <li className="text-justify -ml-2 pl-2">Mendorong mahasiswa untuk berpartisipasi dalam kegiatan-kegiatan yang berkaitan dengan Rekayasa Perangkat Lunak</li>
                      <li className="text-justify -ml-2 pl-2">Membantu mahasiswa mengembangkan keterampilan dan mempersiapkan mereka untuk masuk ke dunia kerja</li>
                      <li className="text-justify -ml-2 pl-2">Mewujudkan budaya inovasi dan kreativitas bagi mahasiswa Teknologi Rekayasa Perangkat Lunak</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <div className="w-full flex justify-center">
                  <img
                    ref={logoRef}
                    src="/images/logo.png"
                    alt="HIMTECH Team Collaboration"
                    className="w-3/5 h-auto object-cover transform transition-all duration-700 ease-out translate-x-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-himtech-blue/5 to-himtech-lightBlue/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-himtech-blue mb-6">Hubungi Kami</h2>
              <p className="text-himtech-gray max-w-2xl mx-auto">
                Punya pertanyaan atau ingin terlibat? Kami senang mendengar dari Anda.
                Hubungi kami melalui saluran di bawah ini atau kirimkan pesan.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div 
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 translate-y-6" 
                  ref={el => {
                    if (!el) return;
                    const observer = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                      } else {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                      }
                    }, { threshold: 0.1 });
                    observer.observe(el);
                    return () => observer.disconnect();
                  }}
                  style={{
                    transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: '0.4s'
                  }}
                >
                  <div className="rounded-lg bg-himtech-lightBlue/10 p-4 inline-flex mb-6">
                    <Globe className="h-6 w-6 text-himtech-lightBlue" />
                  </div>
                  <h3 className="font-medium text-xl text-himtech-blue mb-4">Email</h3>
                  <p className="text-himtech-gray mb-4">
                    Kirimi kami email untuk pertanyaan umum, peluang berkarya, atau pertanyaan acara.
                  </p>
                  <a
                    href="mailto:humas@politeknikmeta.ac.id"
                    className="text-himtech-lightBlue hover:text-himtech-blue font-medium transition-colors"
                  >
                    humas@politeknikmeta.ac.id
                  </a>
                </div>

                <div 
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 opacity-0 translate-y-6"
                  ref={el => {
                    if (!el) return;
                    const observer = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                      } else {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                      }
                    }, { threshold: 0.1 });
                    observer.observe(el);
                    return () => observer.disconnect();
                  }}
                  style={{
                    transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: '0.6s'
                  }}
                >
                  <div className="rounded-lg bg-himtech-lightBlue/10 p-4 inline-flex mb-6">
                    <Users className="h-6 w-6 text-himtech-lightBlue" />
                  </div>
                  <h3 className="font-medium text-xl text-himtech-blue mb-4">Social Media</h3>
                  <p className="text-himtech-gray mb-4">
                    Follow kami di media sosial untuk mendapatkan informasi terbaru, acara, dan diskusi HIMTECH.
                  </p>
                  <div className="flex space-x-4">
                    <a href="https://instagram.com/himtech.metaindustri/" className="text-himtech-blue hover:text-himtech-lightBlue transition-colors duration-300">
                      <FaInstagram size={20} />
                    </a>
                    <a href="https://discord.gg/xr8enYASxx" className="text-himtech-blue hover:text-himtech-lightBlue transition-colors duration-300">
                      <FaDiscord size={20} />
                    </a>
                    <a href="mailto:humas@politeknikmeta.ac.id" className="text-himtech-blue hover:text-himtech-lightBlue transition-colors duration-300">
                      <MdEmail size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div 
                className="bg-white rounded-xl p-8 shadow-sm opacity-0 translate-y-6"
                ref={el => {
                  if (!el) return;
                  const observer = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) {
                      el.style.opacity = '1';
                      el.style.transform = 'translateY(0)';
                    } else {
                      el.style.opacity = '0';
                      el.style.transform = 'translateY(20px)';
                    }
                  }, { threshold: 0.1 });
                  observer.observe(el);
                  return () => observer.disconnect();
                }}
                style={{
                  transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: '0.6s'
                }}
              >
                <h3 className="font-medium text-2xl text-himtech-blue mb-6">Kirim Pesan</h3>
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you for your message! We will get back to you soon.");
                }}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-himtech-blue mb-2">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-himtech-lightBlue/50 focus:border-himtech-lightBlue transition-colors"
                      placeholder="username@gmail.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-himtech-blue mb-2">
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-himtech-lightBlue/50 focus:border-himtech-lightBlue transition-colors resize-none"
                      placeholder="Beritahu kami tentang pertanyaan, ide, atau bagaimana anda ingin terlibat..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-himtech-blue text-white rounded-lg hover:bg-himtech-blue/90 transition-colors font-medium"
                  >
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
