"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  handleShowBanner?: () => void;
  hasBanner?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ handleShowBanner, hasBanner = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileServicesMenuOpen, setMobileServicesMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  const darkHeroRoutes = ["/"];
  const isDarkHeroPage = darkHeroRoutes.includes(pathname);
  const atTop = !scrolled;
  const useWhiteText = isDarkHeroPage && atTop;

  interface NavLinkItem {
    name: string;
    href?: string;
    subLinks?: { name: string; href: string }[];
  }

  const navLinks: NavLinkItem[] = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Services",
      subLinks: [
        { name: "Agentic AI Solutions", href: "/ai-solutions" },
        { name: "Web & App Development Site", href: "/full-stack-development" },
        { name: "Compliance Solutions", href: "/compliance" },
        { name: "Digital Marketing", href: "/digital-marketing" },
      ],
    },
    { name: "Blogs", href: "/blogs" },
    { name: "Careers", href: "/jobs" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [pathname]);

  const NavLink = ({ link }: { link: NavLinkItem }) => {
    const isActive =
      (link.href && pathname === link.href) ||
      (link.subLinks && link.subLinks.some((s) => s.href === pathname));
    return (
      <Link
        href={link.href || "#"}
        className={`relative flex items-center gap-1 text-sm font-medium transition-colors duration-200 pb-0.5
          hover:text-orange-500 group
          ${isActive ? "text-orange-500" : ""}
          ${!isActive && useWhiteText ? "text-white/90" : ""}
          ${!isActive && !useWhiteText ? "theme-text" : ""}
        `}
      >
        {link.name}
        {link.subLinks && (
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              servicesMenuOpen && link.name === "Services" ? "rotate-180" : ""
            }`}
          />
        )}

        {/* Animated active/hover underline */}
        {isActive && (
          <motion.div
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange-500 rounded-full"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        {!isActive && (
          <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange-500 rounded-full opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 origin-center" />
        )}
      </Link>
    );
  };

  const getBackgroundColor = () => {
    if (!atTop || !isDarkHeroPage) {
      if (theme === "dark") return "rgba(11, 11, 11, 0.85)";
      return "rgba(245, 247, 250, 0.85)";
    }
    return "transparent";
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        !atTop ? "backdrop-blur-lg border-b border-white/10 shadow-[var(--nav-shadow)]" : ""
      }`}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className="w-screen px-4 sm:px-6 lg:px-28">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 cursor-pointer rounded-xl px-2 transition-colors"
            style={{ backgroundColor: "var(--logo-bg)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Binjwa IT Solutions" className="h-16" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.subLinks && setServicesMenuOpen(true)}
                onMouseLeave={() => link.subLinks && setServicesMenuOpen(false)}
              >
                <NavLink link={link} />
                {link.subLinks && (
                  <AnimatePresence>
                    {servicesMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 rounded-xl shadow-xl p-2 border overflow-hidden"
                        style={{
                          backgroundColor: "var(--bg-card)",
                          borderColor: "var(--border)",
                          boxShadow: "var(--card-shadow)",
                        }}
                      >
                        <div className="flex flex-col gap-1">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              onClick={() => setServicesMenuOpen(false)}
                              className="block w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200"
                              style={{ color: "var(--text-secondary)" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--bg-alt)";
                                e.currentTarget.style.color = "var(--accent)";
                                e.currentTarget.style.paddingLeft = "1.5rem";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "";
                                e.currentTarget.style.color = "var(--text-secondary)";
                                e.currentTarget.style.paddingLeft = "1rem";
                              }}
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {hasBanner && handleShowBanner && (
              <button
                onClick={handleShowBanner}
                className={`relative flex items-center hover:text-orange-500 transition-colors ${
                  useWhiteText ? "text-white" : ""
                }`}
                style={!useWhiteText ? { color: "var(--text-secondary)" } : {}}
              >
                <div className="ml-2">
                  <span className="relative inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 animate-pulse">
                    NEW
                  </span>
                </div>
              </button>
            )}
            <ThemeToggle />
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5"
            >
              Book Your Demo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle compact />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors duration-300 ${
                useWhiteText ? "text-white" : ""
              }`}
              style={!useWhiteText ? { color: "var(--text-primary)" } : {}}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t shadow-2xl backdrop-blur-xl"
            style={{
              backgroundColor: theme === "dark" ? "rgba(11, 11, 11, 0.95)" : "rgba(245, 247, 250, 0.95)",
              borderColor: "var(--border)",
            }}
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) =>
                link.subLinks ? (
                  <div key={link.name}>
                    <button
                      onClick={() => setMobileServicesMenuOpen(!mobileServicesMenuOpen)}
                      className="w-full flex justify-between items-center py-3 px-4 text-base font-medium rounded-lg transition-colors"
                      style={{
                        color: "var(--text-primary)",
                        backgroundColor: mobileServicesMenuOpen ? "var(--bg-alt)" : "transparent",
                      }}
                    >
                      {link.name}
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${
                          mobileServicesMenuOpen ? "rotate-180 text-orange-500" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesMenuOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 pb-2 pl-6 pr-4 flex flex-col space-y-1">
                            {link.subLinks.map((subLink) => (
                              <Link
                                key={subLink.name}
                                href={subLink.href}
                                className="block py-2.5 px-4 rounded-md text-base font-medium hover:text-orange-500 transition-all hover:bg-orange-50/5 hover:pl-6"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {subLink.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href || "#"}
                    className="block py-3 px-4 rounded-lg text-base font-medium hover:text-orange-500 hover:bg-orange-50/5 transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {link.name}
                  </Link>
                )
              )}

              <div className="flex items-center gap-4 px-4 pt-4">
                <Link
                  href="/contact"
                  className="flex-1 text-center bg-orange-500 text-white px-6 py-3 rounded-xl text-base font-semibold shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:bg-orange-600 transition-colors"
                >
                  Book Your Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
