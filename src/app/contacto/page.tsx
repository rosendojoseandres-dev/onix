'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Phone, MessageSquare, Send, CheckCircle, Clock, Globe, ChevronDown, Map } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollBackground from '@/components/ScrollBackground';

// =========================================
// TYPES
// =========================================

type InquiryType = 'compra' | 'envio' | 'devolucion' | 'otro';

interface FormState {
  name: string;
  email: string;
  whatsapp: string;
  inquiryType: InquiryType | '';
  message: string;
}

// =========================================
// DATA
// =========================================

const INQUIRY_TYPES: { value: InquiryType; label: string }[] = [
  { value: 'compra', label: 'Información de compra' },
  { value: 'envio', label: 'Estado de envío / entrega' },
  { value: 'devolucion', label: 'Devoluciones / garantía' },
  { value: 'otro', label: 'Otra consulta' },
];

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: 'WhatsApp Colombia',
    value: '+57 300 123 4567',
    href: 'https://wa.me/573001234567',
  },
  {
    icon: Phone,
    label: 'WhatsApp Venezuela',
    value: '+58 412 123 4567',
    href: 'https://wa.me/584121234567',
  },
  {
    icon: Mail,
    label: 'Correo electrónico',
    value: 'contacto@onixtienda.com',
    href: 'mailto:contacto@onixtienda.com',
  },
  {
    icon: Globe,
    label: 'Horario de atención',
    value: 'Lun – Sáb · 8am – 8pm (COT/VET)',
    href: null,
  },
];

const OFFICES = [
  {
    country: 'Colombia',
    city: 'Bogotá',
    detail: 'Envíos a todo el país',
    icon: MapPin,
  },
  {
    country: 'Venezuela',
    city: 'Caracas',
    detail: 'Envíos a todo el país',
    icon: MapPin,
  },
];

// =========================================
// ANIMATION VARIANTS
// =========================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// =========================================
// MAIN COMPONENT
// =========================================

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    whatsapp: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid =
    form.name.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.inquiryType !== '' &&
    form.message.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1400));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <ScrollBackground />
      <main className="min-h-screen flex flex-col relative overflow-x-hidden">
        <Navbar />

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400 text-xs font-medium tracking-widest uppercase mb-6"
            >
              <MessageSquare size={12} />
              Estamos para ayudarte
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#f4f4f4] mb-5"
            >
              Contáctanos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto"
            >
              Resuelve tus dudas sobre importación, envíos o cualquier producto. 
              Respondemos en menos de 24 horas.
            </motion.p>
          </div>
        </section>

        {/* ── Main Grid ── */}
        <section className="flex-1 px-4 pb-24 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">

            {/* ── LEFT: Form ── */}
            <div className="bg-zinc-900/40 border border-white/[0.06] rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
                    >
                      <CheckCircle size={40} className="text-emerald-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#f4f4f4] mb-2">
                        ¡Mensaje enviado!
                      </h2>
                      <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                        Recibimos tu consulta. Nos pondremos en contacto contigo en las próximas 24 horas.
                      </p>
                    </div>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', whatsapp: '', inquiryType: '', message: '' }); }}
                      className="mt-2 px-6 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.1] transition-all"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                    className="space-y-5"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-xl font-semibold text-[#f4f4f4] mb-1">Envíanos un mensaje</h2>
                      <p className="text-zinc-500 text-sm">Todos los campos marcados con * son obligatorios</p>
                    </motion.div>

                    {/* Name + Email */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Nombre completo *" htmlFor="name">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Ej. Carlos Rodríguez"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </FormField>
                      <FormField label="Correo electrónico *" htmlFor="email">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className={inputClass}
                        />
                      </FormField>
                    </motion.div>

                    {/* WhatsApp + Inquiry type */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="WhatsApp (opcional)" htmlFor="whatsapp">
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          placeholder="+57 300 000 0000"
                          value={form.whatsapp}
                          onChange={handleChange}
                          className={inputClass}
                        />
                      </FormField>
                      <FormField label="Tipo de consulta *" htmlFor="inquiryType">
                        <div className="relative">
                          <select
                            id="inquiryType"
                            name="inquiryType"
                            value={form.inquiryType}
                            onChange={handleChange}
                            required
                            className={`${inputClass} appearance-none pr-10`}
                          >
                            <option value="" disabled>Selecciona...</option>
                            {INQUIRY_TYPES.map((t) => (
                              <option key={t.value} value={t.value} className="bg-zinc-900 text-white">
                                {t.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                        </div>
                      </FormField>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={itemVariants}>
                      <FormField label="Mensaje *" htmlFor="message">
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Escribe tu consulta aquí con todos los detalles..."
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className={`${inputClass} resize-none`}
                        />
                      </FormField>
                    </motion.div>

                    {/* Submit */}
                    <motion.div variants={itemVariants}>
                      <motion.button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        whileHover={isValid && !isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
                        className={`w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                          isValid && !isSubmitting
                            ? 'bg-white text-black hover:bg-zinc-100 shadow-lg'
                            : 'bg-white/10 text-zinc-500 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full"
                            />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Enviar Mensaje
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* ── RIGHT: Info ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-5"
            >
              {/* Contact Methods */}
              <motion.div
                variants={itemVariants}
                className="bg-zinc-900/40 border border-white/[0.06] rounded-3xl p-6 backdrop-blur-sm"
              >
                <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-5">
                  Canales de contacto
                </h3>
                <div className="space-y-4">
                  {CONTACT_ITEMS.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon size={16} className="text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600 mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="text-sm text-zinc-300 hover:text-white transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-zinc-300 flex items-center gap-1.5">
                            <Clock size={12} className="text-zinc-600" />
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Locations */}
              <motion.div
                variants={itemVariants}
                className="bg-zinc-900/40 border border-white/[0.06] rounded-3xl p-6 backdrop-blur-sm"
              >
                <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-5">
                  Nuestras sedes
                </h3>
                <div className="space-y-4">
                  {OFFICES.map((office) => (
                    <div key={office.country} className="flex items-start gap-3">
                      <office.icon size={20} className="text-zinc-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-[#f4f4f4]">
                          {office.city}, {office.country}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">{office.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* WhatsApp CTA */}
              <motion.div variants={itemVariants}>
                <a
                  href="https://wa.me/573001234567?text=Hola%2C%20quiero%20información%20sobre%20sus%20productos"
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
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

// =========================================
// HELPERS
// =========================================

const inputClass =
  'w-full bg-black/40 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/25 focus:bg-black/60 transition-all duration-200';

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium text-zinc-400 block">
        {label}
      </label>
      {children}
    </div>
  );
}
