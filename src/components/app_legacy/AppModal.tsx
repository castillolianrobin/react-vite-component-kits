
import { createPortal } from 'react-dom';
import { usePortal } from '../../utils';
import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const Portal = ({ id, children = null }: { id: string, children?: ReactNode }) => {
  const target = usePortal(id);
  return createPortal(
    children,
    target,
  );
};

export default function AppModal(props: Props) {
  const Container = props.mountToApp ? Portal : 'div'
  return (
    <AnimatePresence
      initial={false}
      mode='wait'
    >
      {
        props.active 
          && (
            <Container id="app">
              {/* Container with backdrop */}
              <motion.div 
                className='
                  absolute top-0 left-0 
                  w-full h-full
                  flex items-center justify-center 
                  bg-black/50
                  z-30
                '
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={(e)=>props?.onClose && props?.onClose(false)}
              >
                {
                  props.modal 
                    ? props.modal
                    : (<motion.div 
                        className='bg-white p-1'
                        initial={{ marginTop: '-5%' }}
                        exit={{ marginTop: '5%' }}
                        animate={{ marginTop: '0' }}
                      >
                        { props.children || ' ' }
                      </motion.div>)
                }
              </motion.div>
            </Container>
          ) 
      }
    </AnimatePresence>
  )
}

interface Props {
  active?: boolean;
  mountToApp?: boolean;
  modal?: ReactNode;
  children?: ReactNode;
  onClose?: (e: boolean) => void;
}