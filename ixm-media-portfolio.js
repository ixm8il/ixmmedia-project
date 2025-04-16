// Continued from previous part

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
