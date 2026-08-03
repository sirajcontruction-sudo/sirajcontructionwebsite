"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/utils";
import { DURATION, EASE_PREMIUM } from "@/lib/motion";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const serviceOptions = [
  "Civil Contracting",
  "Residential Construction",
  "Architecture & Design",
  "Interior Design",
  "Turnkey Construction",
  "Renovation",
];

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [sent, setSent] = useState(false);

const onSubmit = async (data: FormValues) => {
  const message = `
🏠 *New Enquiry - SRAJ Construction & Interior*

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📧 Email: ${data.email || "-"}
🛠️ Service: ${data.service}

📝 Message:
${data.message || "-"}
`;

  const whatsappUrl = `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");

  setSent(true);
  reset();

  setTimeout(() => {
    setSent(false);
  }, 5000);
};

  return (
    <section id="contact" className="section-py bg-mist relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Get In Touch</span>
          <h2 className="heading-display mt-5 text-3xl sm:text-4xl">Let&apos;s plan your project</h2>
          <p className="mt-4 text-sm text-ink-soft sm:text-base">
            Share your requirement and our team will get back within one business day.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.card, ease: EASE_PREMIUM }}
            className="flex flex-col gap-5"
          >
            <div className="card-premium flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-gradient">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-navy">Office Address</p>
                <p className="mt-1 text-sm text-ink-soft">{SITE.address}</p>
              </div>
            </div>
            <div className="card-premium flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-gradient">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-navy">Call Us</p>
                <a href={`tel:+${SITE.phoneRaw}`} className="mt-1 block text-sm text-ink-soft hover:text-royal-700">
                  {SITE.phone}
                </a>
              </div>
            </div>
            <div className="card-premium flex items-start gap-4 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal-gradient">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-navy">Email Us</p>
                <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-ink-soft hover:text-royal-700">
                  {SITE.email}
                </a>
              </div>
            </div>
            <div className="card-premium p-6">
              <p className="font-display text-sm font-semibold text-navy">Service Areas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SITE.serviceAreas.map((a) => (
                  <span key={a} className="rounded-full bg-royal-50 px-3 py-1.5 text-xs font-medium text-royal-700">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: DURATION.card, ease: EASE_PREMIUM }}
            onSubmit={handleSubmit(onSubmit)}
            className="card-premium space-y-5 p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">Full Name *</label>
                <input
                  {...register("name", { required: true })}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-royal-600"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">Name is required</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-ink">Phone Number *</label>
                <input
                  {...register("phone", { required: true })}
                  placeholder="+91 9994026462"
                  className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-royal-600"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">Phone is required</p>}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">Email Address</label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-royal-600"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">Service Required *</label>
              <select
                {...register("service", { required: true })}
                defaultValue=""
                className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-royal-600"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && <p className="mt-1 text-xs text-red-500">Please select a service</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-ink">Message</label>
              <textarea
                {...register("message")}
                rows={4}
                placeholder="Tell us about your plot size, location and requirement..."
                className="w-full resize-none rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-royal-600"
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {sent ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Sent via WhatsApp
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Send Enquiry
                </>
              )}
            </button>
            <p className="text-center text-xs text-ink-soft">
              Submitting opens WhatsApp with your enquiry pre-filled to our team.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
