import { useEffect, useState } from "react";
import type { HtmlHTMLAttributes, ReactNode, } from 'react';
// Components
import { AppButton } from ".";
import { AnimatePresence, motion } from "framer-motion";

export default function AppModal(props: Props) {
  /** Modal Logic */
  // Primary modal state
  const [isActive, setIsActive] = useState(false);
  
  // Modal State handler if active or not 
  function toggleModal(state?: boolean) {
    const newValue = typeof state === 'boolean' 
      ? state 
      : !(props.active || isActive);
    
    props.onValueChange && props.onValueChange(newValue); 
    setIsActive(newValue);
    if (newValue)
      setModalHidden(false);
  }

  // Backdrop Click Hanlder
  function onBackdropClickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target !== e.currentTarget) return;
    if (props.persist) return persistAnimation || setPersistAnimation(true);
     
    toggleModal(false);
  }

  // Close Icon Click Hanlder
  function onCloseClickHanlder() {
    if (!props.persist) 
      toggleModal(false);
    else 
      setPersistAnimation(true)
  }

  useEffect(
    ()=> {
      props.active !== undefined && toggleModal(props.active)
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ props.active ]
  );


  /** Animation/Transition Logic */
  
  // Flag when persist animation should activate (user attempted to default close )  
  const [persistAnimation, setPersistAnimation] = useState(false);
  const shouldPersistAnimate = () => props.persist && persistAnimation;
  // Flag whether to hide the modal (Useful if eager prop is enabled)  
  const [modalHidden, setModalHidden] = useState(true);  

  // Modal Animation Handler
  function onPersistAnimationEnd(e: object) {
    if ('translateX' in e && e.translateX !== 0) {
      setPersistAnimation(false);
    }
    if (isActive === false && modalHidden === false) {
      setModalHidden(true)
    }
  }

  return (
    <>
      {/* Modal */}
      <AnimatePresence initial={ false } mode="wait">
        {
          (isActive || props.eager) &&
          (<motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            className={ `
              z-30
              fixed top-0 left-0
              flex items-center justify-center 
              w-screen h-screen 
              bg-black/50
              ${ modalHidden ? 'hidden' : '' }
            ` }
            onClick={ onBackdropClickHandler }
          >
            <motion.div
              initial={{ translateY: -20 }}
              exit={{ translateY: -20 }}
              animate={{ 
                translateY: isActive ? 0 : -20,
                translateX: shouldPersistAnimate() ? [null, 2, -2] : 0,
                 
              }}
              onAnimationComplete={ onPersistAnimationEnd }
              transition={shouldPersistAnimate() ? { repeat: 3, duration: 0.2 } : undefined}
              role="dialog"
            >
              {/* Default Modal Template */}
              {
                props.modal 
                  ? typeof props.modal === 'function' 
                    ? props.modal({ isActive, toggleModal }) : props.modal
                  : (
                    <div 
                      className="
                        relative 
                        py-4 p-2
                        rounded shadow
                        bg-white dark:bg-secondary-900
                        max-w-[95vw]
                      "
                    >
                      {/* Close button */}
                      { 
                        props.closeIcon && 
                        <div className="absolute top-1 right-1 z-10">
                        <AppButton
                            color="secondary-500"
                            variant="outline"
                            size="sm"
                            className="
                              text-xs font-bold
                              rounded-full 
                              aspect-square
                              w-[1.5rem]
                            "
                            onClick={ onCloseClickHanlder }
                          >
                            &#x2715;
                          </AppButton>  
                        </div>
                      }
                      {/* <slot v-bind="{ toggleModal, isActive }">
                      </slot> */}
                      {  props.render 
                          ? props.render({ isActive, toggleModal }) 
                          : props.children  
                      }
                    </div>
                  )
              }
            </motion.div>
          </motion.div>)
        }
      </AnimatePresence>
      
      {/* Trigger */}
      {
        props.trigger && 
        ( typeof props.trigger === 'function' 
          ? props.trigger({ toggleModal, isActive }) 
          : props.trigger 
        )
      }
    </>
  )
}

export interface Props extends HtmlHTMLAttributes<unknown> {
  active?: boolean;
  onValueChange?: (value:boolean)=>void;
  closeIcon?: boolean;
  persist?: boolean;
  eager?: boolean;
  modal?: ReactNode | ((props: RenderProps) => ReactNode);
  trigger?: ReactNode | ((props: RenderProps) => ReactNode);
  render?: (props: RenderProps) => ReactNode; 
}


export interface RenderProps {
  isActive: boolean;
  toggleModal: (val?: boolean)=>void
}