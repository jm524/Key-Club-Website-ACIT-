// Overview: Sticky top navigation bar with clickable logo & hover home link, centered links with animated dropdowns, slit indicators under active dropdowns, divider slit before social links, and animated mobile hamburger.

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Globe, ChevronDown } from 'lucide-react';

// Lightweight Instagram SVG icon
function InstagramIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Lightweight TikTok SVG icon
function TikTokIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.068-.102a2.895 2.895 0 0 1 2.373-4.513c.277 0 .546.038.802.11V9.336a6.34 6.34 0 0 0-.802-.051 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.309a8.21 8.21 0 0 0 4.771 1.512V6.376a4.78 4.78 0 0 1-1-.004v.314z" />
    </svg>
  );
}

export default function Navbar() {
  // Mobile drawer state (click-only toggle)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Tracks which mobile sub-menu is currently expanded ('Meetings', 'Resources', or null)
  const [expandedMobileItem, setExpandedMobileItem] = useState(null);
  const navContainerRef = useRef(null);

  // Desktop dropdown state for hover
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Closes mobile menu and desktop dropdowns when clicking anywhere outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        setExpandedMobileItem(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggles the mobile accordion for dropdown items
  const handleMobileDropdownToggle = (itemName) => {
    setExpandedMobileItem((prev) => (prev === itemName ? null : itemName));
  };

  // Main navigation items
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Officers', href: '#officers' },
    {
      name: 'Meetings',
      href: '#meetings',
      hasDropdown: true,
      subLinks: [
        { name: 'Monthly Notes', href: '#meetings' },
        { name: 'Photo Gallery', href: '#meetings' },
      ],
    },
    {
      name: 'Resources',
      href: '#resources',
      hasDropdown: true,
      subLinks: [
        { name: 'Advisor Contacts', href: '#resources' },
        { name: 'District Bylaws', href: '#resources' },
      ],
    },
  ];

  // Social media links: Instagram, TikTok, Email, NJ District
  const socialLinks = [
    { name: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/acit.keyclub/' },
    { name: 'TikTok', icon: TikTokIcon, href: 'https://tiktok.com' },
    { name: 'Email / Remind', icon: Mail, href: 'mailto:keyclub@acitech.org' },
    { name: 'NJ District', icon: Globe, href: 'https://njkeyclub.org' },
  ];

  return (
    <header
      ref={navContainerRef}
      className="sticky top-0 z-50 bg-pantone-295-blue/95 backdrop-blur-md shadow-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-[88px]">
          
          {/* Left: Combined Logo & Chapter Details (Clickable home link with smooth scale-up hover) */}
          <div className="flex items-center justify-start min-w-0">
            <a href="#" className="flex items-center space-x-3.5 group">
              <img
                src="/assets/ACIT%20Key%20Club%20Logo.png"
                alt="ACIT Key Club Logo"
                className="h-14 w-14 sm:h-[70px] sm:w-[70px] object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-300 ease-out"
              />
              <div className="text-left min-w-0">
                <span className="block text-white font-century-gothic font-bold text-base sm:text-lg leading-tight tracking-wider truncate group-hover:text-light-gold transition-colors duration-200">
                  ACIT KEY CLUB
                </span>
                <span className="block text-dark-gold font-myriad-pro text-[10px] sm:text-xs font-semibold tracking-widest uppercase group-hover:text-light-blue transition-colors duration-200">
                  NJ District • Division 2
                </span>
              </div>
            </a>
          </div>

          {/* Center: Main Navigation Links with Dropdown Chevrons (Desktop only) */}
          <nav className="hidden lg:flex flex-1 items-center justify-center space-x-2">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="relative flex items-center space-x-1.5 text-slate-200 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-xl font-century-gothic font-semibold text-base tracking-wide transition-all duration-200"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ease-out ${
                        activeDropdown === item.name ? 'rotate-180 text-dark-gold' : 'text-slate-400'
                      }`}
                    />
                  )}
                  {/* Slit under Meetings and Resources when dropdown is opened (with left & right margins) */}
                  {item.hasDropdown && (
                    <span
                      className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full transition-all duration-200 ${
                        activeDropdown === item.name
                          ? 'bg-dark-gold opacity-100 scale-x-100'
                          : 'bg-transparent opacity-0 scale-x-50'
                      }`}
                    />
                  )}
                </a>

                {/* Desktop Dropdown with subtle fade & scale animation */}
                {item.hasDropdown && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-60 transition-all duration-200 ease-out origin-top ${
                      activeDropdown === item.name
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-pantone-295-blue/95 border border-dark-gold/30 rounded-2xl shadow-2xl p-1.5 backdrop-blur-xl">
                      {item.subLinks.map((sub, idx) => (
                        <React.Fragment key={sub.name}>
                          {idx > 0 && <div className="mx-3 my-1 h-px bg-white/10" />}
                          <a
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-4 py-3 text-sm font-century-gothic font-semibold text-slate-200 hover:text-light-gold hover:bg-white/10 rounded-xl transition-colors"
                          >
                            {sub.name}
                          </a>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right: Social Media (Desktop only) OR Mobile Hamburger (Always visible on mobile) */}
          <div className="flex items-center justify-end flex-shrink-0 space-x-3">
            
            {/* Slit between navigation items and social media links */}
            <div className="hidden lg:block h-6 w-px bg-white/20" aria-hidden="true" />

            {/* Desktop Social Media Icons (strictly hidden on mobile/tablet) */}
            <div className="hidden lg:flex items-center space-x-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-dark-gold hover:text-pantone-295-blue text-slate-200 transition-all duration-200 border border-white/10 hover:border-dark-gold hover:scale-105 active:scale-95"
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>

            {/* Mobile / Tablet Hamburger Button (High contrast, clearly visible on all small screens with smooth animation) */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all duration-300 shadow-sm focus:outline-none hover:scale-105 active:scale-95"
                aria-label="Toggle navigation menu"
              >
                <div className={`transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-90 scale-95' : 'rotate-0 scale-100'}`}>
                  {mobileMenuOpen ? (
                    <X size={24} className="text-dark-gold transition-colors duration-200" />
                  ) : (
                    <Menu size={24} className="text-white transition-colors duration-200" />
                  )}
                </div>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Dropdown Drawer: Smooth accordion slide-down */}
      <div
        className={`lg:hidden bg-pantone-295-blue/98 border-t border-white/10 px-4 transition-all duration-300 ease-in-out overflow-hidden shadow-2xl ${
          mobileMenuOpen
            ? 'max-h-[600px] opacity-100 pt-3 pb-6 pointer-events-auto'
            : 'max-h-0 opacity-0 py-0 pointer-events-none'
        }`}
      >
        <div className="space-y-2">
          {navItems.map((item) => {
            const isSubExpanded = expandedMobileItem === item.name;

            return (
              <div key={item.name} className="rounded-xl overflow-hidden bg-white/[0.03]">
                
                {/* Main Link / Toggle Row */}
                {item.hasDropdown ? (
                  <button
                    type="button"
                    onClick={() => handleMobileDropdownToggle(item.name)}
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-century-gothic font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 ${
                        isSubExpanded ? 'rotate-180 text-dark-gold' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-base font-century-gothic font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    {item.name}
                  </a>
                )}

                {/* Collapsible Mobile Sub-Menu: Smooth slide-down when clicked */}
                {item.hasDropdown && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isSubExpanded ? 'max-h-56 opacity-100 pb-2' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {/* Slit line under meetings and resources with left and right margins */}
                    <div className="mx-4 h-px bg-white/15 my-1" />

                    <div className="pl-5 pr-4 space-y-1.5 pt-1">
                      {item.subLinks.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setExpandedMobileItem(null);
                          }}
                          className="flex items-center space-x-2.5 px-3.5 py-2.5 text-sm sm:text-base font-century-gothic font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors border-l-2 border-dark-gold/60 pl-3.5 ml-2 hover:border-dark-gold"
                        >
                          <span>{sub.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}

          {/* Social media icons appear inside the mobile drawer */}
          <div className="pt-4 border-t border-white/10 flex items-center space-x-3 px-2">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 text-slate-200 hover:text-pantone-295-blue hover:bg-dark-gold transition-colors"
                  aria-label={social.name}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
