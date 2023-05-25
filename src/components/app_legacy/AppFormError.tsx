import React, { HTMLAttributes } from 'react'
import { motion, AnimatePresence, HTMLMotionProps, ForwardRefComponent } from 'framer-motion';

export default function AppFormError(props: Props) {
  return (
    <AnimatePresence
    initial={false}
    mode='wait'
    >
      {
        props.children && 
        <motion.div 
          initial={{ opacity: 0, maxHeight: 0, }}
          animate={{ opacity: 1, maxHeight: 12}}
          exit={{ opacity: 0, maxHeight: 0 }}
          transition={{ duration: 0.1 }}   
        >
          <p 
            { ...props }
            className={`mt-1 text-error-500 text-xs ${props.className}`}
          >
            { props.children }
          </p>
        </motion.div>
      }
    </AnimatePresence>
  )
}

/** __TYPE DEFINITIONS__ */

type Props = HTMLAttributes<unknown>
