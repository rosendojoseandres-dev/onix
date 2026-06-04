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
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollBackground from '@/components/ScrollBackground';

// =========================================
// ANIMATION VARIANTS
// =========================================

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

// =========================================
// DATA
// =========================================

const STATS = [
  { value: '2020', label: 'Año de fundación', icon: TrendingUp },
  { value: '+500', label: 'Clientes satisfechos', icon: Users },
  { value: '2', label: 'Países de cobertura', icon: Globe },
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
      'Al importar directamente desde USA, eliminamos los intermediarios y te ofrecemos precios muy por debajo del mercado local.',
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
    emoji: '👨‍💼',
    bio: 'Con más de 5 años en importación y logística internacional, Andrés creó ONIX para democratizar el acceso a productos premium en Latinoamérica.',
  },
  {
    name: 'Equipo de Logística',
    role: 'Operaciones & Envíos',
    emoji: '📦',
    bio: 'Coordinamos con operadores en Miami, Bogotá y Caracas para garantizar que tu pedido llegue en perfecto estado y a tiempo.',
  },
  {
    name: 'Soporte al Cliente',
    role: 'Atención 7/7',
    emoji: '💬',
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
    description: 'Verificamos stock en USA y te enviamos el precio final con envío incluido, sin sorpresas.',
  },
  {
    step: '03',
    title: 'Realizas el pago',
    description: 'Transferencia, pago móvil o efectivo. Flexible para Colombia y Venezuela.',
  },
  {
    step: '04',
    title: 'Recibas en tu puerta',
    description: 'Tu pedido viaja desde Miami y llega a tu ciudad. Seguimiento en tiempo real por WhatsApp.',
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

        {/* ── HERO ── */}
        <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 px-4 text-center overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] blur-[120px] pointer-events-none rounded-full" />

          <div className="relative max-w-4xl mx-auto">
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 text-xs font-medium tracking-widest uppercase mb-6">
                <Globe size={12} />
                Importación directa desde USA
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.08)}
              className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#f4f4f4] mb-6"
            >
              Somos{' '}
              <span className="font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                ONIX
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              Nacimos con una misión clara: acercar los mejores productos del mundo a Colombia y
              Venezuela, con precios justos, transparencia total y la confianza de un equipo que
              entiende lo que necesitas.
            </motion.p>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="px-4 pb-24 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp(0.06 * i)}
                className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 text-center hover:border-white/[0.12] transition-colors duration-300"
              >
                <stat.icon size={20} className="text-zinc-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-zinc-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="px-4 pb-28 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp(0)}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-4">
                Nuestra historia
              </p>
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
                  Decidimos cambiar eso. Establecimos conexiones directas con proveedores en
                  Miami, construimos un sistema de logística propio y creamos ONIX — una tienda
                  donde comprar en el exterior es tan fácil como escribir un mensaje de WhatsApp.
                </p>
                <p>
                  Hoy operamos en Colombia y Venezuela, con cientos de clientes que confían en
                  nosotros para traer lo que quieren, cuando lo necesitan.
                </p>
              </div>
            </motion.div>

            {/* Visual accent */}
            <motion.div {...fadeUp(0.12)} className="relative">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: '🇺🇸', label: 'Miami, USA', sub: 'Centro de operaciones' },
                  { emoji: '🇨🇴', label: 'Colombia', sub: 'Entregas a todo el país' },
                  { emoji: '🇻🇪', label: 'Venezuela', sub: 'Entregas a todo el país' },
                  { emoji: '📦', label: '+500 pedidos', sub: 'Completados con éxito' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-colors duration-300"
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <p className="text-sm font-semibold text-[#f4f4f4] mt-3 mb-0.5">{item.label}</p>
                    <p className="text-xs text-zinc-500">{item.sub}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="px-4 pb-28 max-w-5xl mx-auto w-full">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-3">
              Lo que nos define
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#f4f4f4]">
              Nuestros valores
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((val, i) => (
              <motion.div
                key={val.title}
                {...fadeUp(0.07 * i)}
                className="group bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.14] hover:bg-zinc-900/60 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-white/[0.08] transition-colors">
                  <val.icon size={18} className="text-zinc-400" />
                </div>
                <h3 className="text-base font-semibold text-[#f4f4f4] mb-2">{val.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── HOW WE WORK ── */}
        <section className="px-4 pb-28 max-w-5xl mx-auto w-full">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-3">
              El proceso
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#f4f4f4]">
              Así trabajamos
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_WE_WORK.map((item, i) => (
              <motion.div
                key={item.step}
                {...fadeUp(0.08 * i)}
                className="relative bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] transition-colors duration-300"
              >
                {/* Step number */}
                <span className="text-5xl font-bold text-white/[0.04] leading-none block mb-4 select-none">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-[#f4f4f4] mb-2">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="px-4 pb-28 max-w-5xl mx-auto w-full">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-3">
              Quiénes somos
            </p>
            <h2 className="text-3xl sm:text-4xl font-light text-[#f4f4f4]">
              El equipo ONIX
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                {...fadeUp(0.08 * i)}
                className="bg-zinc-900/40 border border-white/[0.06] rounded-2xl p-6 text-center hover:border-white/[0.12] hover:bg-zinc-900/60 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-4 text-3xl">
                  {member.emoji}
                </div>
                <p className="text-base font-semibold text-[#f4f4f4] mb-0.5">{member.name}</p>
                <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-600 mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── LOCATIONS ── */}
        <section className="px-4 pb-28 max-w-5xl mx-auto w-full">
          <motion.div
            {...fadeUp(0)}
            className="bg-zinc-900/40 border border-white/[0.06] rounded-3xl p-8 sm:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 mb-3">
                  Dónde encontrarnos
                </p>
                <h2 className="text-3xl font-light text-[#f4f4f4] mb-4">
                  Presencia en tres países
                </h2>
                <div className="space-y-4">
                  {[
                    { flag: '🇺🇸', city: 'Miami, Florida', detail: 'Bodega y centro de consolidación de envíos' },
                    { flag: '🇨🇴', city: 'Bogotá, Colombia', detail: 'Operaciones y distribución local' },
                    { flag: '🇻🇪', city: 'Caracas, Venezuela', detail: 'Operaciones y distribución local' },
                  ].map((loc) => (
                    <div key={loc.city} className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">{loc.flag}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#f4f4f4]">{loc.city}</p>
                        <p className="text-xs text-zinc-500">{loc.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-zinc-800/60 border border-white/[0.06] rounded-2xl p-5">
                  <MapPin size={18} className="text-zinc-500 mb-3" />
                  <p className="text-sm font-medium text-[#f4f4f4] mb-1">
                    ¿Quieres saber si hacemos envíos a tu ciudad?
                  </p>
                  <p className="text-xs text-zinc-500 mb-4">
                    Escríbenos y te confirmamos en minutos.
                  </p>
                  <a
                    href="https://wa.me/573001234567?text=Hola%2C%20quiero%20saber%20si%20hacen%20envíos%20a%20mi%20ciudad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-zinc-300 transition-colors"
                  >
                    Preguntar por WhatsApp
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="px-4 pb-32 max-w-3xl mx-auto w-full text-center">
          <motion.div
            {...fadeUp(0)}
            className="relative bg-zinc-900/60 border border-white/[0.08] rounded-3xl p-10 sm:p-14 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-white/[0.04] blur-[80px] pointer-events-none rounded-full" />
            <div className="relative">
              <p className="text-4xl mb-4">🚀</p>
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
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}
