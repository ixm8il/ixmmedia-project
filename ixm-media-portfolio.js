// File structure:
// pages/index.js
// components/Navbar.js
// components/Hero.js
// components/About.js
// components/Work.js
// components/Services.js
// components/Testimonials.js
// components/Contact.js
// components/Footer.js
// components/CursorEffect.js
// styles/globals.css
// tailwind.config.js
// next.config.js

// pages/index.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Work from '../components/Work';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CursorEffect from '../components/CursorEffect';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-gradient-to-b from-[#0E0320] to-[#1B0938] min-h-screen text-white relative overflow-hidden">
      <Head>
        <title>Ixm Media | Video Editing Agency</title>
        <meta name="description" content="Professional video editing services for creators and brands" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CursorEffect />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Work />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

// components/CursorEffect.js
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 200,
      y: mousePosition.y - 200,
      transition: {
        type: "spring",
        mass: 0.6
      }
    },
    button: {
      x: mousePosition.x - 200,
      y: mousePosition.y - 200,
      scale: 1.5,
      transition: {
        type: "spring",
        mass: 0.6
      }
    }
  };

  const handleLinkEnter = () => setCursorVariant("button");
  const handleLinkLeave = () => setCursorVariant("default");

  useEffect(() => {
    const links = document.querySelectorAll('a, button');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkEnter);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkEnter);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className="cursor-glow fixed top-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none z-0 bg-gradient-radial from-[#B43BDB] to-transparent"
      variants={variants}
      animate={cursorVariant}
    />
  );
}

// components/Navbar.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 ${
        scrolled 
          ? 'bg-[#0E0320]/90 backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <img src="/13.png" alt="Ixm Media Logo" className="h-10" />
            <h1 className="text-xl font-bold ml-2">Ixm Media</h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="#about" className="hover:text-[#B43BDB] transition">About</Link>
          <Link href="#work" className="hover:text-[#B43BDB] transition">Work</Link>
          <Link href="#services" className="hover:text-[#B43BDB] transition">Services</Link>
          <Link href="#contact" className="hover:text-[#B43BDB] transition">Contact</Link>
          <Link href="#contact">
            <button className="bg-gradient-to-r from-[#882FB8] to-[#B43BDB] hover:opacity-90 text-white px-6 py-2 rounded-md transition">
              Get Your Free Edit
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? 'auto' : 0
        }}
        className="md:hidden bg-[#1B0938]/95 backdrop-blur-md overflow-hidden"
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link href="#about" className="py-2 hover:text-[#B43BDB] transition" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="#work" className="py-2 hover:text-[#B43BDB] transition" onClick={() => setMobileMenuOpen(false)}>Work</Link>
          <Link href="#services" className="py-2 hover:text-[#B43BDB] transition" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="#contact" className="py-2 hover:text-[#B43BDB] transition" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
            <button className="bg-gradient-to-r from-[#882FB8] to-[#B43BDB] w-full text-white px-6 py-2 rounded-md transition">
              Get Your Free Edit
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}

// components/Hero.js
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[#0E0320]">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#330A56] rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-[#882FB8] rounded-full filter blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Elevate Your Brand, <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#882FB8] to-[#B43BDB]">
              Frame By Frame.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl"
          >
            We transform ordinary footage into captivating stories that engage your audience and amplify your message.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a href="#contact">
              <button className="bg-gradient-to-r from-[#882FB8] to-[#B43BDB] text-white text-lg px-8 py-3 rounded-md hover:shadow-lg hover:shadow-[#882FB8]/50 transition-all duration-300">
                Get Your Free Edit
              </button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-3">Scroll to explore</p>
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1"
          >
            <motion.div 
              className="w-1 h-2 bg-white rounded-full" 
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// components/About.js
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-[#330A56] rounded-full filter blur-3xl opacity-20" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#882FB8] to-[#B43BDB]">Ixm Media</span></h2>
            <p className="text-gray-300 mb-6">
              Founded by passionate storytellers and technical experts, Ixm Media specializes in creating impactful video content that resonates with audiences and delivers results for brands.
            </p>
            <p className="text-gray-300 mb-6">
              Our team combines creativity with technical precision to transform your vision into compelling visual narratives that engage, inform, and inspire action.
            </p>
            <p className="text-gray-300">
              Whether you're a creator looking to scale your content production or a brand aiming to establish a stronger video presence, we've got the expertise and creative vision to elevate your projects.
            </p>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="w-64 h-64 md:w-80 md:h-80 relative mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#882FB8] to-[#B43BDB] rounded-lg opacity-30 blur-xl -z-10" />
              <img 
                src="/qf.png" 
                alt="Ismail - Founder of Ixm Media" 
                className="w-full h-full object-cover rounded-lg z-10"
              />
              <div className="absolute -bottom-4 -right-4 px-6 py-3 bg-[#1B0938] rounded-lg border border-[#330A56] z-20">
                <p className="font-medium">Ismail</p>
                <p className="text-sm text-gray-400">Founder & Creative Director</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// components/Work.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Work() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Mock data for portfolio items
  const projects = [
    {
      id: 1,
      title: "Brand Campaign",
      category: "Short Form",
      thumbnail: "/api/placeholder/500/280",
      videoUrl: "#"
    },
    {
      id: 2,
      title: "Product Review",
      category: "Long Form",
      thumbnail: "/api/placeholder/500/280",
      videoUrl: "#"
    },
    {
      id: 3,
      title: "Creator Content",
      category: "Short Form",
      thumbnail: "/api/placeholder/500/280",
      videoUrl: "#"
    },
    {
      id: 4,
      title: "Tech Tutorial",
      category: "Tutorial",
      thumbnail: "/api/placeholder/500/280",
      videoUrl: "#"
    },
    {
      id: 5,
      title: "Explainer Video",
      category: "Animation",
      thumbnail: "/api/placeholder/500/280",
      videoUrl: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="work" className="py-20 relative bg-[#0E0320]/60">
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-[#330A56] rounded-full filter blur-3xl opacity-20" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of video projects across various industries and formats.
            Each piece is crafted with precision and creative vision.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="relative group overflow-hidden rounded-lg"
            >
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-sm text-[#B43BDB] mb-2">{project.category}</span>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <a 
                    href={project.videoUrl}
                    className="mt-4 inline-flex items-center text-sm text-white hover:text-[#B43BDB] transition-colors"
                  >
                    Watch Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#B43BDB]/80 text-white transition-transform duration-300 transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// components/Services.js
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      id: 1,
      title: "Short Form Editing",
      description: "Optimized for social media platforms. Fast-paced, attention-grabbing edits that maximize engagement in the first few seconds.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#B43BDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Long Form Editing",
      description: "Comprehensive editing for YouTube videos, documentaries, tutorials, and other extended content formats with seamless narrative structure.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#B43BDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Thumbnail Design",
      description: "Eye-catching, high-conversion thumbnails designed specifically to increase click-through rates and video performance.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#B43BDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-[#330A56] rounded-full filter blur-3xl opacity-20" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Professional video editing solutions tailored to your specific needs, 
            from quick social media content to comprehensive long-form videos.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="bg-gradient-to-br from-[#1B0938] to-[#330A56]/50 p-8 rounded-xl border border-[#330A56]/30 hover:border-[#B43BDB]/50 transition-all duration-300 group"
            >
              <div className="bg-[#0E0320]/50 p-4 rounded-lg inline-block mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#B43BDB] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// components/Testimonials.js
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [current, setCurrent] = useState(0);
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Content Creator",
      image: "/api/placeholder/60/60",
      quote: "Ixm Media transformed my content strategy. Their edits consistently outperform my previous videos, with a 40% increase in average watch time."
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Marketing Director",
      image: "/api/placeholder/60/60",
      quote: "Working with Ixm Media has been game-changing for our brand videos. The team understands our vision and elevates it beyond what we imagined possible."
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "YouTuber",
      image: "/api/placeholder/60/60",
      quote: "Their turnaround time is incredible, and the quality never suffers. I can focus on creating while knowing my editing is in capable hands."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setCurrent(index);
  };

  return (
    <section className="py-20 relative bg-[#0E0320]/60">
      <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-[#882FB8] rounded-full filter blur-3xl opacity-20" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what creators and brands have to say about working with Ixm Media.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-64 md:h-56">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-br from-[#1B0938] to-[#330A56]/50 p-8 rounded-xl border border-[#330A56]/30"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#B43BDB]">
                    <img 
                      src={testimonials[current].image} 
                      alt={testimonials[current].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="mb-4 text-center md:text-left">
                      <p className="text-lg font-bold">{testimonials[current].name}</p>
                      <p className="text-sm text-[#B43BDB]">{testimonials[current].role}</p>
                    </div>
                    <blockquote className="text-gray-300 italic">
                      "{testimonials[current].quote}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  current === index ? 'bg-[#B43BDB]' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// components/Contact.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally handle form submission
    console.log('Form submitted:', formData);
    alert('Thanks for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', project: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#882FB8] rounded-full filter blur-3xl opacity-20" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ready to elevate your video content? Reach out to discuss your project needs 
            or schedule a free consultation.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#330A56]/50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#B43BDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-gray-300">ismail@ixmmedia.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-[#330A56]/50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#B43BDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-gray-300">+213 664 75 24 21</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com/ixmmedia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#330A56]/50 p-3 rounded-lg hover:bg-[#330A56] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#B43BDB]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com/ixm8il" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#330A56]/50 p-3 rounded-lg hover:bg-[#330A56] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#B43BDB]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://twitter.com/ixm8il" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#330A56]/50 p-3 rounded-lg hover:bg-[#330A56] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#B43BDB]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1B0938] border border-[#330A56] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43BDB] transition"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1B0938] border border-[#330A56] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43BDB] transition"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="project" className="block text-sm font-medium mb-2">Project Type</label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1B0938] border border-[#330A56] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43BDB] transition"
                >
                  <option value="">Select a service</option>
                  <option value="Short Form">Short Form Editing</option>
                  <option value="Long Form">Long Form Editing</option>
                  <option value="Thumbnail">Thumbnail Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-[#1B0938] border border-[#330A56] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B43BDB] transition resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#882FB8] to-[#B43BDB] text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#882FB8]/50 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0E0320] border-t border-[#330A56]/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src="/13.png" alt="Ixm Media Logo" className="h-10" />
                <h1 className="text-xl font-bold ml-2">Ixm Media</h1>
              </div>
            </Link>
            <p className="text-gray-400 mt-2 max-w-md">
              Professional video editing services that elevate your content and amplify your message.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div>
              <h4 className="font-medium mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li><Link href="#about" className="text-gray-400 hover:text-[#B43BDB] transition">About</Link></li>
                <li><Link href="#work" className="text-gray-400 hover:text-[#B43BDB] transition">Work</Link></li>
                <li><Link href="#services" className="text-gray-400 hover:text-[#B43BDB] transition">Services</Link></li>
                <li><Link href="#contact" className="text-gray-400 hover:text-[#B43BDB] transition">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Social</h4>
              <ul className="space-y-2">
                <li><a href="https://instagram.com/ixmmedia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#B43BDB] transition">Agency Instagram</a></li>
                <li><a href="https://instagram.com/ixm8il" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#B43BDB] transition">Personal Instagram</a></li>
                <li><a href="https://twitter.com/ixm8il" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#B43BDB] transition">Twitter/X</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#330A56]/50 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Ixm Media. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#B43BDB] text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#B43BDB] text-sm transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// styles/globals.css
// This would be imported in _app.js
`
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  @apply bg-[#0E0320] text-white;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-[#0E0320];
}

::-webkit-scrollbar-thumb {
  @apply bg-[#330A56] rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-[#882FB8];
}

/* Blur gradient effect */
.bg-gradient-radial {
  background-image: radial-gradient(var(--tw-gradient-stops));
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
`

// tailwind.config.js
`
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ixm: {
          darkPurple: '#0E0320',
          deepPurple: '#1B0938',
          purple: '#330A56',
          brightPurple: '#882FB8',
          neon: '#B43BDB',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
`

// next.config.js
`
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['api.placeholders.com'],
  }
}
`

// pages/_app.js
`
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ixm Media | Video Editing Agency</title>
        <meta name="description" content="Professional video editing services for creators and brands" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
`

// pages/_document.js
`
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
`
