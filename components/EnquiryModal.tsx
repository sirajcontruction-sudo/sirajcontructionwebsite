"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { X, Send } from "lucide-react";
import { useEnquiry, useEnquiryState } from "@/lib/enquiry-context";
import { SITE } from "@/lib/utils";

type FormValues = {
  name: string;
  phone: string;
  location: string;
};

export default function EnquiryModal() {
  const { isOpen, presetSubject } = useEnquiryState();
  const { closeEnquiry } = useEnquiry();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onSubmit = (data: FormValues) => {
  const message = `🏠 *New Enquiry - SRAJ Construction & Interior*

📌 Subject: ${presetSubject}

👤 Name: ${data.name}
📞 Phone: ${data.phone}
📍 Location: ${data.location || "-"}

Thank you for contacting SRAJ Construction & Interior.`;

  const whatsappUrl = `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");

  reset();
  closeEnquiry();
};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnquiry}
            className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-premium"
          >
            <button
              onClick={closeEnquiry}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-mist text-ink-soft transition-colors hover:bg-royal-50 hover:text-royal-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="eyebrow">{presetSubject}</p>
            <h3 className="mt-4 font-display text-2xl font-semibold text-navy">
              Let&apos;s get you a quote
            </h3>
            <p className="mt-2 text-sm text-ink-soft">
              Share a few details and we&apos;ll reach out within one business day.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <input
                  {...register("name", { required: true })}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-royal-600"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">Name is required</p>}
              </div>
              <div>
                <input
                  {...register("phone", { required: true })}
                  placeholder="Phone Number"
                  className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-royal-600"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">Phone is required</p>}
              </div>
              <div>
                <input
                  {...register("location")}
                  placeholder="Plot Location (optional)"
                  className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-royal-600"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                <Send className="h-4 w-4" /> Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
