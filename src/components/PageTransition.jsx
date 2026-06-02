import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import useReducedMotion from '../hooks/useReducedMotion'

const pageVariants = {
  initial: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
  },
  animate: {
    opacity: 1,
    clipPath: 'inset(0 0 0 0)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(100% 0 0 0)',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function PageTransition({ children }) {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return children

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ position: 'relative' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
