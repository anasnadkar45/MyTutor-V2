import type React from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StepCardProps {
  number: number
  title: string
  description: string
  icon: LucideIcon
  index: number
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, icon: Icon, index }) => {
  return (
    <motion.div
      key={number}
      className="relative bg-[#111312] rounded-2xl shadow-lg shadow-primary/10 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
    >
      <div className="p-6" key={index}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 rounded-full p-2">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-4xl font-bold text-primary">{number}</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Inner shadow effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)] rounded-2xl z-10" />

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 transition-opacity duration-300 rounded-2xl z-5"
        whileHover={{ opacity: 1 }}
      />

      {/* Bottom gradient bar with higher z-index */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-cyan-500 h-1 animate-gradient z-20" />
    </motion.div>
  )
}

export default StepCard

