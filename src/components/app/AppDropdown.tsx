import {  useRef, useState } from 'react';
import type { HtmlHTMLAttributes, ReactNode } from 'react';
// Components
import { AppButton, type AppButtonTypes } from '.';
// Hooks
import { useThemedColor, useClickOutside } from '@/hooks';
import { AnimatePresence, motion } from 'framer-motion';


export default function AppDropdown(props: Props) {
  /** Themed Color Hooks */
  const { color } = useThemedColor();
  
  /** On Click Outside Hook */
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, ()=>toggleMenu(false));
  

  /** Dropdown Logic */
  
  // Dropdown menu state
  const [isActive, setisActive] = useState(false)
  
  // Toggles the dropdown menu on/off
  function toggleMenu(active?:boolean) {
    const _isActive = typeof active === 'boolean' 
      ? active : !isActive;
    setisActive(_isActive);
  }

  // On click handler for items 
  function onDropdownItemClickHandler(item: ItemProp) {
    item?.onClick && item.onClick();
    props.onItemClick && props.onItemClick(item.text)
    toggleMenu(false);
  }
  
  // attributes and event for trigger element
  const triggerAttrs = (): AppButtonTypes.Props =>({
    // OnClick Event
    onClick: ()=>toggleMenu(),
    // Aria Attrs
    role: 'button',
    'aria-label': 'dropdown button',
    'aria-haspopup': true,
    'aria-expanded': isActive,
  });


  /** Menu Classes */
  
  const positionClass = ()=>{
    switch (props.drop) {
      case 'up': return 'bottom-full right-0'
      case 'left': return 'top-0 right-full'
      case 'right': return 'top-0 left-full'
      case 'down':default: return 'top-full left-0 right-0';
    }
  };
  
  return (
    <div 
      ref={dropdownRef} 
      className="relative inline-block"
    >
      {/* Dropdown Trigger */}
      { typeof props.trigger === 'function' 
        ? props.trigger({ triggerAttrs, toggleMenu }) : props.trigger 
        || (<AppButton
            { ...triggerAttrs() }
            variant={ props.triggerVariant }
          >
            <span>{ 
              props.triggerText || 
              `${ isActive ? 'Hide' : 'Show' } Dropdown` 
            }</span>
          </AppButton>)
      }
      
      {/* Dropdown Items */}
      <AnimatePresence initial={false} mode='wait'>
        {
          isActive && (<motion.div
              key={'dropdown-item'} 
              initial={{ opacity: 0 }}
              exit={{ opacity: 0, translateY: -2 }}
              animate={{ opacity: 1, translateY: 2 }} 
              transition={{ duration: 0.15 }}
              className={`
                absolute 
                min-w-full w-fit 
                z-20 
                ${positionClass()}
              `}
            >
              {
                props.children || 
                (<ul
                  className="
                    bg-white 
                    dark:bg-secondary-900 
                    dark:text-secondary-100
                    rounded 
                    shadow-lg
                  "
                  role="listbox"

                >
                  { props.items?.map((item, i)=>(
                    <li
                      key={ `${item.text}-${i}` }
                      className={`
                        px-2 py-1 
                        cursor-pointer
                        overflow-auto 
                        whitespace-nowrap
                        hover:text-white
                        active:brightness-75
                        hover:bg-${color}
                      `}
                      tabIndex={ 0 }
                      onClick={ ()=>onDropdownItemClickHandler(item) }
                      // @keydown.space.enter="onDropdownItemClickHandler(item)"
                    >
                      { item.text }
                    </li>
                  )) }
                </ul>)
              }
            </motion.div>)
        }
      </AnimatePresence>
    </div>
  )
}


/** __TYPE DEFINITIONS__ */

export interface Props extends HtmlHTMLAttributes<unknown> {
  drop?: 'down'|'up'|'left'|'right';
  items?: ItemProp[];
  onItemClick?: (e: string) => void;
  eager?: boolean;
  triggerVariant?: AppButtonTypes.Props['variant'];
  triggerText?: string;
  trigger?: ReactNode | ((props: {triggerAttrs: ()=>AppButtonTypes.Props, toggleMenu: (a: boolean)=>void } ) => ReactNode);
} 

export interface ItemProp { 
  text: string; 
  onClick?: ()=>void; 
}