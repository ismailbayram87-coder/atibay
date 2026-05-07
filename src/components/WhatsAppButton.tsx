'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton({ phone }: { phone: string }) {
  if (!phone) return null;
  
  return (
    <motion.a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg shadow-green-900/50 flex items-center justify-center transition-colors"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-7 h-7" />
    </motion.a>
  )
}
