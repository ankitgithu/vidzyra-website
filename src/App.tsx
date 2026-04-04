import { useState, useEffect } from 'react';

import { Menu, X, Video, Image, FileVideo, Palette, Sparkles, Star, Instagram, Youtube, Linkedin, MessageCircle, Code } from 'lucide-react';
import logo from "./assets/logo.png";
import emailjs from "emailjs-com";
import bgimg from "./assets/bg img.png";





function App() {

  // ✅ yaha hona chahiye
  
   

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [meetingType, setMeetingType] = useState('');
  const [status, setStatus] = useState("");

  const roles = [
  "Video Editor 🎬",
  "Graphics Designer 🎨",
  "Content Creator 🚀"
];

const [roleIndex, setRoleIndex] = useState(0);
const [animate, setAnimate] = useState(true);

useEffect(() => {
  const interval = setInterval(() => {

    setAnimate(false); // fade out

    setTimeout(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setAnimate(true); // fade in
    }, 400);

  }, 2500);

  return () => clearInterval(interval);
}, []);
  const services = [
    {
      icon: <Video className="w-12 h-12" />,
      title: "Reels / Shorts Editing",
      description: "Engaging short-form content that captures attention and drives engagement on social platforms."
    },
    {
      icon: <FileVideo className="w-12 h-12" />,
      title: "Long Video Editing",
      description: "Professional editing for YouTube videos, tutorials, and long-form content with seamless transitions."
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Documentary Style Video Editing",
      description: "Cinematic storytelling with compelling narratives and professional-grade production quality."
    },
    {
      icon: <Image className="w-12 h-12" />,
      title: "Poster Design",
      description: "Eye-catching poster designs that communicate your message and elevate your brand identity."
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Social Media Creative Design",
      description: "Stunning visuals tailored for Instagram, Facebook, LinkedIn, and other social platforms."
    },
    {
  icon: <Code className="w-12 h-12" />,
  title: "Web Development",
  description: "Modern, responsive and high-performance websites built to grow your business and enhance your online presence."
}
  ];



  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };
const handleMeetingSubmit = (e) => {
  e.preventDefault();

  const templateParams = {
    name: formData.name,
    phone: formData.phone,
    type: meetingType,
    date: formData.date || "N/A",
    time: formData.timeSlot || "N/A",
  };

  emailjs.send(
    "service_rkkwt0m",
    "template_ah9bomr",
    templateParams,
    "O4Rrn4KHzKBg9kAhS"
  )
  .then(() => {
    setStatus("success");

    // Reset form
    setFormData({
      name: "",
      phone: "",
      date: "",
      timeSlot: "",
    });
    setMeetingType("");

    // WhatsApp ONLY on success
    window.open(
      `https://wa.me/918517895629?text=Hi Vidzyra, I booked a meeting. Name: ${formData.name}, Phone: ${formData.phone}`
    );

    // Auto close modal after 2 sec
    setTimeout(() => {
      setIsMeetingModalOpen(false);
      setStatus("");
    }, 2000);
  })
  .catch((error) => {
    console.error(error);
    setStatus("error");

    // Auto remove error after 3 sec
    setTimeout(() => {
      setStatus("");
    }, 3000);
  });
};

  const openWhatsApp = () => {
    window.open('https://wa.me/918517895629', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-900/80 backdrop-blur-lg border-b border-blue-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">

  {/* Logo + Brand */}
  <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
    
    {/* Logo */}
    <img
      src={logo}   // <-- imported logo
      alt="Vidzyra Logo"
      className="h-10 sm:h-12 w-auto object-contain"
    />

    {/* Brand Name */}
    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
      Vidzyra
    </span>

  </div>

  {/* Desktop Menu */}
  <div className="hidden md:flex items-center space-x-8">
    <button onClick={() => scrollToSection('home')} className="hover:text-blue-300 transition-colors">Home</button>
    <button onClick={() => scrollToSection('services')} className="hover:text-blue-300 transition-colors">Services</button>
   
    <button onClick={() => scrollToSection('contact')} className="hover:text-blue-300 transition-colors">Contact</button>
    <button onClick={() => setIsSocialModalOpen(true)} className="hover:text-blue-300 transition-colors">Socials</button>

    <button
      onClick={() => setIsMeetingModalOpen(true)}
      className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition-all transform hover:scale-105"
    >
      Schedule Meeting
    </button>
  </div>

  {/* Mobile Menu Button */}
  <button
    className="md:hidden"
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  >
    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
  </button>

</div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 animate-slideDown">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-left hover:text-blue-300 transition-colors">Home</button>
                <button onClick={() => scrollToSection('services')} className="text-left hover:text-blue-300 transition-colors">Services</button>
                <button onClick={() => scrollToSection('reviews')} className="text-left hover:text-blue-300 transition-colors">Reviews</button>
                <button onClick={() => scrollToSection('contact')} className="text-left hover:text-blue-300 transition-colors">Contact</button>
                <button onClick={() => setIsSocialModalOpen(true)} className="text-left hover:text-blue-300 transition-colors">Socials</button>
                <button
                  onClick={() => setIsMeetingModalOpen(true)}
                  className="bg-white text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition-all text-center"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
     <section
  id="home"
  className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center"
  style={{
    
    backgroundImage: `url(${bgimg})`,
  }}
>
  {/* 🔥 Dark Blue Overlay (important for text visibility) */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/80 to-[#2563eb]/80"></div>

  <div className="container mx-auto text-center relative z-10">
    
    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fadeIn text-white">
      Grow Your Digital Presence<br />
      with{" "}
      <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
        Vidzyra
      </span>
    </h1>

    <p className="text-lg sm:text-xl lg:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto animate-fadeIn">
      We create stunning visuals and high-quality content that elevate your brand and engage your audience
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn">
      
      <button
        onClick={() => scrollToSection('services')}
        className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-100 transition-all transform hover:scale-105 w-full sm:w-auto"
      >
        Explore Services
      </button>

      <button
        onClick={() => setIsMeetingModalOpen(true)}
        className="border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105 w-full sm:w-auto"
      >
        Schedule Meeting
      </button>

    </div>
  </div>
</section>

{/* About Section */}
<section className="relative min-h-[60vh] flex items-center justify-center text-center px-4 overflow-hidden">
  
  <div className="relative z-10 text-white">
    
    <h3 className="text-xl sm:text-2xl text-blue-200 mb-4 tracking-wider">
      Ankit Rajput
    </h3>

   <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold flex justify-center items-center gap-3">
  I am a
  <span
  className={`text-blue-300 inline-block transition-all duration-500 ease-in-out ${
    animate
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-6"
  }`}
>
  {roles[roleIndex]}
</span>
</h2>

    <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
      I create high-quality videos, stunning graphics, and engaging content
      that helps brands grow digitally.
    </p>

  </div>
</section>


      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="text-blue-200 mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-blue-100">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
   

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="glass-card p-12 rounded-3xl max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">Ready to Elevate Your Content?</h2>
            <p className="text-xl text-blue-100 mb-8">Let's discuss how we can help grow your digital presence</p>
            <button
              onClick={openWhatsApp}
              className="bg-green-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-all transform hover:scale-105 inline-flex items-center gap-3"
            >
              <MessageCircle size={24} />
              Contact on WhatsApp
            </button>
          </div>
        </div>
      </section>
              {/* 🏆 Our Customers Section */}
<section className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto text-center">

    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-12">
      Our Clients
    </h2>

    {/* Logo Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">

      {[
        "https://play-lh.googleusercontent.com/Izgz9k3unCYGGQSoJtp6XXlLkcrsQUZAZcSiNLLIXyf1pT8RjRKiUh8iXvZOJB4KCDg=w240-h480-rw",
        "https://scontent-bom5-2.xx.fbcdn.net/v/t39.30808-6/305797416_452033926942945_3184010486554020398_n.jpg",
        "https://scontent-bom2-3.xx.fbcdn.net/v/t39.30808-6/477794861_618817550743522_5172861421116959719_n.jpg",
        "https://play-lh.googleusercontent.com/4JhtUlw3KljbNoRvQFglvBYQpvlJT0iwC_A7Dw6hrL0yzVnoSaWxZJV9XvEF2dwJJdg=w240-h480-rw",
        "https://scontent-bom5-1.xx.fbcdn.net/v/t39.30808-6/448603231_789428576654519_730945351043764092_n.jpg",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ].map((logo, i) => (
        <div
          key={i}
          className="aspect-square flex items-center justify-center border border-white/10 rounded-xl p-4"
        >
          <img
            src={logo}
            alt="client"
            className="w-full h-full object-contain"
          />
        </div>
      ))}

    </div>

  </div>
</section>
      {/* Footer */}
      <footer className="bg-blue-950/50 backdrop-blur-lg py-12 px-4 sm:px-6 lg:px-8 border-t border-blue-700/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Vidzyra</h3>
              <p className="text-blue-200">Creating stunning visuals and high-quality content for your brand.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="flex flex-col space-y-2">
                <button onClick={() => scrollToSection('services')} className="text-left text-blue-200 hover:text-white transition-colors">Services</button>
                
                <button onClick={() => setIsMeetingModalOpen(true)} className="text-left text-blue-200 hover:text-white transition-colors">Schedule Meeting</button>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <button onClick={() => setIsSocialModalOpen(true)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <Instagram size={20} />
                </button>
                <button onClick={() => setIsSocialModalOpen(true)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <Youtube size={20} />
                </button>
                <button onClick={() => setIsSocialModalOpen(true)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <Linkedin size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-blue-700/50 text-blue-200">
            © 2026 Vidzyra. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 z-40 animate-bounce"
      >
        <MessageCircle size={32} />
      </button>

      {/* Meeting Modal */}
      {isMeetingModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setIsMeetingModalOpen(false)}>
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 rounded-3xl max-w-md w-full shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold">Schedule Meeting</h3>
              <button onClick={() => setIsMeetingModalOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleMeetingSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/50 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/50 transition-all"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Meeting Type</label>
                <select
                  required
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/50 transition-all text-white"
                >
                  <option value="" className="text-gray-900">Select meeting type</option>
                  <option value="online" className="text-gray-900">Online Meeting</option>
                  <option value="offline" className="text-gray-900">Offline Meeting</option>
                </select>
              </div>

              {meetingType === 'offline' && (
                <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-lg animate-fadeIn">
                  <p className="text-yellow-200 font-semibold">
                    Offline Meetings are available only in Gwalior (Local Area)
                  </p>
                </div>
              )}

              {meetingType === 'online' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block mb-2 font-semibold">Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/50 transition-all text-white"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold">Time Slot</label>
                    <select
                      required
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-white/50 transition-all text-white"
                    >
                      <option value="" className="text-gray-900">Select time slot</option>
                      <option value="10:00 AM" className="text-gray-900">10:00 AM</option>
                      <option value="12:00 PM" className="text-gray-900">12:00 PM</option>
                      <option value="2:00 PM" className="text-gray-900">2:00 PM</option>
                      <option value="4:00 PM" className="text-gray-900">4:00 PM</option>
                      <option value="6:00 PM" className="text-gray-900">6:00 PM</option>
                    </select>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-white text-blue-900 py-3 rounded-lg font-bold text-lg hover:bg-blue-100 transition-all transform hover:scale-105 mt-6"
              >
                Book Meeting
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Social Media Modal */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setIsSocialModalOpen(false)}>
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 rounded-3xl max-w-md w-full shadow-2xl animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold">Connect With Us</h3>
              <button onClick={() => setIsSocialModalOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all">
                <X size={24} /> 
              </button>
            </div>

            <div className="space-y-4">
              <a
                href="https://www.instagram.com/vidzyra/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Instagram size={24} />
                </div>
                <div>
                  <p className="font-bold">Instagram</p>
                  <p className="text-sm text-blue-200">Follow us @vidzyra</p>
                </div>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Youtube size={24} />
                </div>
                <div>
                  <p className="font-bold">YouTube</p>
                  <p className="text-sm text-blue-200">Subscribe to our channel</p>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="font-bold">LinkedIn</p>
                  <p className="text-sm text-blue-200">Connect with us professionally</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
