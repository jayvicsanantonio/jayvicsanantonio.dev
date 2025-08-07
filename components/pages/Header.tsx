'use client';

import {
  useState,
  useCallback,
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';
import Theme from '@/types/theme';

const navigation = [
  { name: 'Home', href: '/', id: 'home' },
  { name: 'Work', href: '/work', id: 'work' },
  { name: 'Projects', href: '/projects', id: 'projects' },
  { name: 'Lab', href: '/lab', id: 'lab' },
];

export default function Header({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-obsidian/80 border-b border-pewter/20' 
        : 'bg-transparent'
    }`}>
      <nav className="container-wide flex items-center justify-between py-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="group flex items-center gap-3 z-50"
          aria-label="Jayvic San Antonio - Home"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-amber to-copper rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Code2 className="w-5 h-5 text-obsidian" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber/20 to-copper/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
          <div className="hidden sm:block">
            <span className="font-editorial text-xl font-medium text-pearl">
              Jayvic
            </span>
            <span className="font-supreme text-sm text-silver/60 block -mt-1">
              San Antonio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative group py-2 px-4 text-silver hover:text-pearl transition-colors duration-300"
              >
                <span className="relative z-10 font-medium">
                  {item.name}
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-amber/10 border border-amber/20 rounded-lg"
                    initial={false}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
                
                {/* Hover indicator */}
                <div className="absolute inset-0 bg-pewter/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-charcoal/30 border border-pewter/20 text-silver hover:text-pearl hover:border-amber/50 transition-all duration-300 backdrop-blur-sm group"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <div className="relative w-5 h-5">
              <Sun 
                className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                  theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
                }`} 
              />
              <Moon 
                className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                  theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
                }`} 
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber/10 to-rose/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-charcoal/30 border border-pewter/20 text-silver hover:text-pearl hover:border-amber/50 transition-all duration-300 backdrop-blur-sm group"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-5 h-5">
              <Menu 
                className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
                }`} 
              />
              <X 
                className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
                }`} 
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber/10 to-rose/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden backdrop-blur-xl bg-obsidian/95 border-t border-pewter/20"
          >
            <div className="container-wide py-6">
              <nav className="space-y-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={closeMenu}
                      className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-amber bg-amber/10 border border-amber/20'
                          : 'text-silver hover:text-pearl hover:bg-pewter/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
