"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ServicesMegaMenu = dynamic(() => import("@/components/navbar/ServicesMegaMenu"), { ssr: false });
const IndustriesMegaMenu = dynamic(() => import("@/components/navbar/IndustriesMegaMenu"), { ssr: false });
import { servicesData } from "../../data/services";
import { industriesData } from "../../data/industries";

const Navbar = ({ handleShowBanner, hasBanner }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [showIndustriesMegaMenu, setShowIndustriesMegaMenu] = useState(false);
    const pathname = usePathname();

    const isSmmPage = pathname === "/products/smm";
    const darkHeroRoutes = ["/"];

    // Accurate logic for dark hero pages:
    // - "/" (Home)
    // - "/industries/[slug]" (length 2)
    // - "/services/[service]/[subservice]" (length 3)
    const pathSegments = pathname.split("/").filter(Boolean);
    const isDarkHeroPage =
        darkHeroRoutes.includes(pathname) ||
        (pathSegments[0] === "industries" && pathSegments.length === 2) ||
        (pathSegments[0] === "services" && pathSegments.length === 3);

    const atTop = !scrolled;
    // On SMM page, we want white text always. On dark hero pages, only at top.
    const useWhiteText = (isDarkHeroPage && atTop) || isSmmPage;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        {
            name: "Services",
            isMega: true,
            isServicesMega: true,
            subLinks: servicesData.map(service => ({
                name: service.name,
                href: `/services/${service.slug}`,
                subServices: service.subServices
            })),
        },
        {
            name: "Industries",
            isMega: true,
            isIndustriesMega: true,
            subLinks: industriesData.map(industry => ({ name: industry.name, href: `/industries/${industry.slug}` })),
        },
        {
            name: "Products", href: "/products"
        },
        { name: "Blogs", href: "/blogs" },
        { name: "Careers", href: "/jobs" },
        // { name: "Contact", href: "/contact" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) setIsOpen(false);
    }, [pathname]);

    const NavLink = ({ link }) => {
        const isActive = pathname === link.href ||
            (link.subLinks && link.subLinks.some(s => pathname === s.href || pathname.startsWith(s.href + "/")));
        const isThisMegaMenuShowing = link.isServicesMega ? showMegaMenu : (link.isIndustriesMega ? showIndustriesMegaMenu : false);

        return (
            <Link href={link.href || "#"}
                className={`relative flex items-center gap-1 text-sm font-medium transition-colors duration-200 pb-0.5
          hover:text-orange-500 group
          ${isActive ? "text-orange-500" : ""}
          ${!isActive && useWhiteText ? "text-white/90" : ""}
          ${!isActive && !useWhiteText ? "theme-text" : ""}
        `}
            >
                {link.name}
                {link.subLinks && !link.isMega && <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                {link.isMega && <ChevronDown size={16} className={`transition-transform duration-300 ${isThisMegaMenuShowing ? 'rotate-180' : ''}`} />}

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

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${!atTop ? "backdrop-blur-lg border-b border-white/10 shadow-[var(--nav-shadow)]" : ""}`}
            style={
                !atTop || (!isDarkHeroPage && !isSmmPage)
                    ? { backgroundColor: isSmmPage ? "rgba(17, 17, 17, 0.95)" : "rgba(245, 247, 250, 0.85)" }
                    : {}
            }
        >
            <div className="w-screen px-4 sm:px-6 lg:px-28">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/">
                        <motion.div
                            className="flex items-center justify-center shrink-0 cursor-pointer rounded-xl transition-all"
                            animate={{
                                backgroundColor: useWhiteText ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
                                padding: useWhiteText ? "0.5rem 1rem" : "0.25rem 0.5rem",
                                boxShadow: useWhiteText ? "0px 0px 15px rgba(251,146,60,0.4)" : "none",
                                borderColor: useWhiteText ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0)",
                                borderWidth: "1px",
                                borderStyle: "solid"
                            }}
                            whileHover={{ scale: 1.05, boxShadow: useWhiteText ? "0px 0px 25px rgba(251,146,60,0.8)" : "none" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image src="/logo.png" alt="Binjwa IT Solutions" width={160} height={60} priority className="h-10 md:h-12 w-auto object-contain drop-shadow-md" />
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative"
                                onClick={(e) => {
                                    if (link.isServicesMega) {
                                        e.preventDefault();
                                        setShowMegaMenu(!showMegaMenu);
                                        setShowIndustriesMegaMenu(false);
                                        setActiveDropdown(null);
                                    } else if (link.isIndustriesMega) {
                                        e.preventDefault();
                                        setShowIndustriesMegaMenu(!showIndustriesMegaMenu);
                                        setShowMegaMenu(false);
                                        setActiveDropdown(null);
                                    } else if (link.subLinks) {
                                        e.preventDefault();
                                        setActiveDropdown(activeDropdown === link.name ? null : link.name);
                                        setShowMegaMenu(false);
                                        setShowIndustriesMegaMenu(false);
                                    }
                                }}
                            >
                                <div id={link.isServicesMega ? "nav-services-link" : (link.isIndustriesMega ? "nav-industries-link" : "")}>
                                    <NavLink link={link} />
                                </div>
                                {link.subLinks && !link.isMega && (
                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 rounded-xl shadow-xl p-2 border overflow-hidden"
                                                style={{
                                                    backgroundColor: isSmmPage ? "rgba(26, 26, 26, 0.95)" : "var(--bg-card)",
                                                    borderColor: isSmmPage ? "#333" : "var(--border)",
                                                    boxShadow: "var(--card-shadow)",
                                                }}
                                            >
                                                <div className="flex flex-col gap-1">
                                                    {link.subLinks.map((subLink) => (
                                                        <Link key={subLink.name}
                                                            href={subLink.href}
                                                            onClick={() => setActiveDropdown(null)}
                                                            className="block w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200"
                                                            style={{ color: isSmmPage ? "#e5e5e5" : "var(--text-secondary)" }}
                                                            onMouseEnter={e => {
                                                                e.currentTarget.style.backgroundColor = isSmmPage ? "#333" : "var(--bg-alt)";
                                                                e.currentTarget.style.color = isSmmPage ? "#ffffff" : "var(--accent)";
                                                                e.currentTarget.style.paddingLeft = "1.5rem";
                                                            }}
                                                            onMouseLeave={e => {
                                                                e.currentTarget.style.backgroundColor = "";
                                                                e.currentTarget.style.color = isSmmPage ? "#e5e5e5" : "var(--text-secondary)";
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
                        {hasBanner && (
                            <button
                                onClick={handleShowBanner}
                                className={`relative flex items-center hover:text-orange-500 transition-colors ${useWhiteText ? "text-white" : ""
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

                        <Link href="/contact"
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5"
                        >
                            Book Your Demo
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`focus:outline-none transition-colors duration-300 ${useWhiteText ? "text-white" : ""
                                }`}
                            style={!useWhiteText ? { color: "var(--text-primary)" } : {}}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showMegaMenu && (
                    <ServicesMegaMenu onClose={() => setShowMegaMenu(false)} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showIndustriesMegaMenu && (
                    <IndustriesMegaMenu onClose={() => setShowIndustriesMegaMenu(false)} />
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden border-t shadow-2xl backdrop-blur-xl overflow-y-auto max-h-[calc(100vh-80px)]"
                        data-lenis-prevent
                        style={{
                            backgroundColor: isSmmPage ? "rgba(17, 17, 17, 0.95)" : "rgba(245, 247, 250, 0.95)",
                            borderColor: isSmmPage ? "#333" : "var(--border)",
                        }}
                    >
                        <div className="px-4 pt-2 pb-6 space-y-4">
                            {navLinks.map((link) =>
                                link.subLinks ? (
                                    <div key={link.name}>
                                        <button
                                            onClick={() => setMobileActiveDropdown(mobileActiveDropdown === link.name ? null : link.name)}
                                            className="w-full flex justify-between items-center py-3 px-4 text-base font-medium rounded-lg transition-colors"
                                            style={{ color: isSmmPage ? "#ffffff" : "var(--text-primary)", backgroundColor: mobileActiveDropdown === link.name ? (isSmmPage ? "#333" : "var(--bg-alt)") : "transparent" }}
                                        >
                                            {link.name}
                                            <ChevronDown
                                                size={20}
                                                className={`transition-transform duration-300 ${mobileActiveDropdown === link.name ? "rotate-180 text-orange-500" : ""}`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {mobileActiveDropdown === link.name && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-2 pb-2 pl-6 pr-4 flex flex-col space-y-1">
                                                        {link.subLinks.map((subLink) => (
                                                            <div key={subLink.name} className="flex flex-col mb-1">
                                                                <Link
                                                                    href={subLink.href}
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="block py-2 px-4 rounded-md text-base font-semibold text-orange-500 hover:bg-orange-50/5 transition-all"
                                                                >
                                                                    {subLink.name}
                                                                </Link>
                                                                {subLink.subServices && (
                                                                    <div className="pl-4 flex flex-col space-y-1 border-l-2 border-orange-500/20 ml-6 my-1">
                                                                        {subLink.subServices.map((sub) => (
                                                                            <Link key={sub.slug}
                                                                                href={`${subLink.href}/${sub.slug}`}
                                                                                onClick={() => setIsOpen(false)}
                                                                                className="block py-1.5 px-3 rounded-md text-sm font-medium hover:text-orange-500 hover:bg-orange-50/5 transition-all"
                                                                                style={{ color: isSmmPage ? "#a3a3a3" : "var(--text-muted)" }}
                                                                            >
                                                                                {sub.name}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block py-3 px-4 rounded-lg text-base font-medium hover:text-orange-500 hover:bg-orange-50/5 transition-colors"
                                        style={{ color: isSmmPage ? "#ffffff" : "var(--text-primary)" }}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            )}

                            <div className="flex items-center gap-4 px-4 pt-4">
                                <Link href="/contact"
                                    onClick={() => setIsOpen(false)}
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

