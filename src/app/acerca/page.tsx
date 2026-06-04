'use client';

import { motion } from 'framer-motion';
import {
  Globe,
  Shield,
  Zap,
  Users,
  TrendingUp,
  PackageCheck,
  Headphones,
  MapPin,
  ArrowRight,
  Briefcase,
  Package,
  MessageCircle,
  MessageSquare,
  Rocket,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollBackground from '@/components/ScrollBackground';

// =========================================
// DATA
// =========================================

const STATS = [
  { value: '2020', label: 'Año de fundación', icon: TrendingUp },
  { value: '+500', label: 'Clientes satisfechos', icon: Users },
  { value: '2',    label: 'Países de cobertura', icon: Globe },
  { value: '100%', label: 'Productos verificados', icon: Shield },
];

const VALUES = [
  {
    icon: PackageCheck,
    title: 'Calidad Garantizada',
    description:
      'Cada artículo que importamos pasa por un proceso de verificación riguroso. Solo productos originales, sin imitaciones.',
  },
  {
    icon: Zap,
    title: 'Precios Imbatibles',
    description:
      'Al importar directamente, eliminamos los intermediarios y te ofrecemos precios muy por debajo del mercado local.',
  },
  {
    icon: Headphones,
    title: 'Asesoría Personalizada',
    description:
      'Nuestro equipo te guía en cada paso: desde elegir el producto hasta coordinar la entrega. Somos tu aliado de confianza.',
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description:
      'Operamos con transparencia total. Antes de pagar, te confirmamos la disponibilidad y el precio definitivo.',
  },
];

const TEAM = [
  {
    name: 'Andrés Rosendo',
    role: 'Fundador & CEO',
    icon: Briefcase,
    bio: 'Con más de 5 años en importación y logística internacional, Andrés creó ONIX para democratizar el acceso a productos premium en Latinoamérica.',
  },
  {
    name: 'Equipo de Logística',
    role: 'Operaciones & Envíos',
    icon: Package,
    bio: 'Coordinamos con operadores en Bogotá y Caracas para garantizar que tu pedido llegue en perfecto estado y a tiempo.',
  },
  {
    name: 'Soporte al Cliente',
    role: 'Atención 7/7',
    icon: MessageCircle,
    bio: 'Disponibles por WhatsApp, correo y formulario de contacto. Respondemos en menos de 24 horas, siempre.',
  },
];

const HOW_WE_WORK = [
  {
    step: '01',
    title: 'Seleccionas tu producto',
    description: 'Explora nuestro catálogo o escríbenos si quieres algo específico que no esté listado.',
  },
  {
    step: '02',
    title: 'Confirmamos disponibilidad',
    description: 'Verificamos stock con nuestros proveedores y te enviamos el precio final con envío incluido, sin sorpresas.',
  },
  {
    step: '03',
    title: 'Realizas el pago',
    description: 'Transferencia, pago móvil o efectivo. Flexible para Colombia y Venezuela.',
  },
  {
    step: '04',
    title: 'Recibas en tu puerta',
    description: 'Tu pedido llega a tu ciudad en Colombia o Venezuela. Seguimiento en tiempo real por WhatsApp.',
  },
];

// =========================================
// MAIN PAGE
// =========================================

export default function AcercaDePage() {
  return (
    <>
      <ScrollBackground />
      <main className="min-h-screen flex flex-col relative overflow-x-hidden">
        <Navbar />

        {/* ── HERO ── animate-only on first load, no scroll trigger */}
        <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 px-4 text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] blur-[120px] pointer-events-none rounded-full" />

          <div className="relative max-w-[95%] mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#f4f4f4] mb-6"
            >
              Somos{' '}
              <span className="font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                ONIX
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              Nacimos con una misión clara: acercar los mejores productos del mundo a Colombia y
              Venezuela, con precios justos, transparencia total y la confianza de un equipo que
              entiende lo que necesitas.
            </motion.p>
          </div>
        </section>

        {/* ── STATS — fully visible, no animation ── */}
        <section className="px-4 pb-24 max-w-[95%] mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 text-center hover:border-white/[0.12] transition-colors duration-300"
              >
                <stat.icon size={20} className="text-zinc-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-zinc-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="px-4 pb-28 max-w-[95%] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-light text-[#f4f4f4] mb-6 leading-snug">
                Comenzamos porque también{' '}
                <span className="font-semibold">éramos clientes frustrados</span>
              </h2>
              <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
                <p>
                  En 2020, como consumidores latinoamericanos, enfrentábamos el mismo problema:
                  productos de calidad a precios inflados, sin garantía real y con procesos de
                  compra confusos o poco transparentes.
                </p>
                <p>
                  Decidimos cambiar eso. Establecimos conexiones directas con proveedores,
                  construimos un sistema de logística propio y creamos ONIX — una tienda donde
                  comprar en el exterior es tan fácil como escribir un mensaje de WhatsApp.
                </p>
                <p>
                  Hoy operamos en Colombia y Venezuela, con cientos de clientes que confían en
                  nosotros para traer lo que quieren, cuando lo necesitan.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: PackageCheck, label: 'Productos Originales', sub: 'Calidad garantizada' },
                { icon: MapPin,        label: 'Colombia',            sub: 'Entregas a todo el país' },
                { icon: MapPin,        label: 'Venezuela',           sub: 'Entregas a todo el país' },
                { icon: PackageCheck, label: '+500 pedidos',         sub: 'Completados con éxito' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-colors duration-300"
                >
                  <item.icon size={28} className="text-zinc-400" />
                  <p className="text-sm font-semibold text-[#f4f4f4] mt-3 mb-0.5">{item.label}</p>
                  <p className="text-xs text-zinc-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="px-4 pb-28 max-w-[95%] mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-[#f4f4f4]">Nuestros valores</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((val) => (
              <div
                key={val.title}
                className="group bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.14] hover:bg-zinc-900/60 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-white/[0.08] transition-colors">
                  <val.icon size={18} className="text-zinc-400" />
                </div>
                <h3 className="text-base font-semibold text-[#f4f4f4] mb-2">{val.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section className="px-4 pb-28 max-w-[95%] mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-[#f4f4f4]">Así trabajamos</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_WE_WORK.map((item) => (
              <div
                key={item.step}
                className="relative bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors duration-300"
              >
                <span className="text-5xl font-bold text-white/[0.04] leading-none block mb-4 select-none">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-[#f4f4f4] mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="px-4 pb-28 max-w-[95%] mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-[#f4f4f4]">El equipo ONIX</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 text-center hover:border-white/[0.12] hover:bg-zinc-900/60 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4 text-zinc-400">
                  <member.icon size={24} />
                </div>
                <p className="text-base font-semibold text-[#f4f4f4] mb-0.5">{member.name}</p>
                <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-600 mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── LOCATIONS ── */}
        <section className="px-4 pb-28 max-w-[95%] mx-auto w-full">
          <div className="bg-zinc-900/40 border border-white/[0.06] rounded-3xl p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-light text-[#f4f4f4] mb-4">
                  Presencia en dos países
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, city: 'Bogotá, Colombia',   detail: 'Operaciones y distribución local' },
                    { icon: MapPin, city: 'Caracas, Venezuela',  detail: 'Operaciones y distribución local' },
                  ].map((loc) => (
                    <div key={loc.city} className="flex items-start gap-3">
                      <loc.icon size={20} className="text-zinc-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-[#f4f4f4]">{loc.city}</p>
                        <p className="text-xs text-zinc-500">{loc.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <a
                  href="https://wa.me/573001234567?text=Hola%2C%20quiero%20saber%20si%20hacen%20env%C3%ADos%20a%20mi%20ciudad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-3xl p-6 border border-emerald-500/20 bg-emerald-500/[0.05] hover:bg-emerald-500/[0.08] hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <MessageSquare size={16} className="text-emerald-400" />
                      </div>
                      <span className="text-sm font-semibold text-emerald-400">
                        Escríbenos por WhatsApp
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      Respuesta inmediata en horario de atención. El canal más rápido para consultas urgentes.
                    </p>
                  </motion.div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-4 pb-32 max-w-[95%] mx-auto w-full text-center">
          <div className="relative bg-zinc-900/60 border border-white/[0.08] rounded-3xl p-10 sm:p-14 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-white/[0.04] blur-[80px] pointer-events-none rounded-full" />
            <div className="relative">
              <div className="mx-auto w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-6 text-zinc-400">
                <Rocket size={32} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#f4f4f4] mb-3">
                ¿Listo para comprar?
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
                Explora nuestro catálogo o contáctanos directamente. Estamos a un mensaje de distancia.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link href="/catalogo">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-100 transition-colors shadow-lg cursor-pointer"
                  >
                    Ver Catálogo
                    <ArrowRight size={16} />
                  </motion.span>
                </Link>
                <Link href="/contacto">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-zinc-300 font-semibold text-sm hover:text-white hover:bg-white/[0.1] transition-all cursor-pointer"
                  >
                    Contáctanos
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
