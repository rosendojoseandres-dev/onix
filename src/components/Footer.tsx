'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

// Custom SVG Icons for Social Media since lucide-react might not export them in this version
const InstagramIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-white/[0.06] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[95%] mx-auto px-4 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block mb-3">
              <img src="/onix.svg" alt="Onix Logo" className="h-10 sm:h-12 w-auto object-contain -ml-1" />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mb-6">
              Importamos y distribuimos la mejor tecnología, calzado y moda. Calidad premium garantizada, directo a tus manos.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={InstagramIcon} ariaLabel="Instagram" />
              <SocialLink href="#" icon={FacebookIcon} ariaLabel="Facebook" />
              <SocialLink href="#" icon={TwitterIcon} ariaLabel="Twitter" />
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-4">
              <FooterLink href="#catalogo">Catálogo de Productos</FooterLink>
              <FooterLink href="#como-funciona">Cómo Funciona</FooterLink>
              <FooterLink href="#casillero">Casillero en USA</FooterLink>
              <FooterLink href="#contacto">Contacto</FooterLink>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contáctanos</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <MapPin size={18} className="text-zinc-400 shrink-0 mt-0.5" />
                <span>Bogotá, Colombia<br/>Envíos a todo el país</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Phone size={18} className="text-zinc-400 shrink-0" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Mail size={18} className="text-zinc-400 shrink-0" />
                <span>contacto@groctienda.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-semibold mb-6">Boletín</h4>
            <p className="text-zinc-400 text-sm mb-4">
              Suscríbete para recibir ofertas exclusivas y novedades de importación.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Tu correo"
                className="w-full bg-zinc-900/50 border border-white/[0.06] rounded-l-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
              />
              <button
                type="submit"
                className="bg-white hover:bg-zinc-200 text-black px-4 py-2.5 rounded-r-xl text-sm font-semibold transition-colors"
              >
                Unirse
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Onix. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <Link href="#" className="hover:text-zinc-300 transition-colors">Términos de Servicio</Link>
            <Link href="#" className="hover:text-zinc-300 transition-colors">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon, ariaLabel }: { href: string; icon: any; ariaLabel: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      href={href}
      aria-label={ariaLabel}
      className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-colors"
    >
      <Icon size={18} />
    </motion.a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-zinc-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
        {children}
      </Link>
    </li>
  );
}
