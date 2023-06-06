import { HtmlHTMLAttributes, ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// Hooks
import { ThemedColorTypes, useThemedColor } from '@/hooks';

export default function AppTabs(props: Props) {
  /** Themed Color Hooks */
  const { color } = useThemedColor(props.color);


  /** Tab Logic */

  const tabs = (): Tab[] => props.items.map((item, i)=>({
      text: item.text,
      key: item?.key || `tab-${i}`,
  }));

  const panels = (): ItemProp[] => props.items
    .map((item, i)=>({
      key: item?.key || `tab-${i}`,
      ...item,
    }))
    .filter((item)=>(isActiveTab(item) || props.eager))
  
  
  const [ currentTab, setCurrentTab ] = useState(props.currentTab || tabs()[0]?.key || '')
  const [ isTransitioning, setTransitioning ] = useState(false);
  
  function isActiveTab(item: ItemProp | Tab) {
    return currentTab === `${item.key}`;  
  }
  function setActiveTab(item: Tab) {    
    setCurrentTab(`${item.key}`)
  }
  
  
  return (
    <div role="tablist" className="dark:text-secondary-100">
      {
        props.tabs
          ? props.tabs({ currentTab, tabs, setActiveTab })
          : (<div
            className="
              mb-2
              flex flex-wrap gap-2 
              border-b border-secondary-200 dark:border-secondary-700
            "
          >
            {
              tabs().map((tab)=>(
                <button 
                  key={ tab.key }
                  className={`
                    transition-colors cursor-pointer
                    hover:text-${color}
                    ${ isActiveTab(tab) ? `border-b-2 border-${color}` : '' }
                  `}
                  aria-label={ `${tab.key} tab` }
                  role="tab" 
                  onClick={ ()=>setActiveTab(tab) }
                >
                  { tab.text }
                </button>
              ))
            }
          </div>)
      }

      {/* CONTENT */}

      <div
        className="relative overflow-hidden"
      >
        <AnimatePresence 
          initial={ false } 
          mode={ props.eager ? undefined : 'wait' }
        >
          {
            props.panel
            // If Panel Prop is activated
            ? <motion.div 
                key={ currentTab }
                role="tabpanel"
                aria-label='main tabpanel'
                initial={{ opacity: 0, translateX: '100' }}
                exit={{ opacity: 0, translateX: -100 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                animate={{ opacity: 1,  translateX: 0 }}
              >
                { props.panel({ currentTab, tabs, setActiveTab }) }
              </motion.div>
            // Default Tab render
            : panels().map((panel)=>(
              <motion.div
                key={ panel.key }
                role="tabpanel"
                aria-label={ `${panel.key} tabpanel` }
                initial={{ opacity: 0, translateX: '100' }}
                exit={{ opacity: 0, translateX: -100 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                animate={{ 
                  opacity: isActiveTab(panel) ? 1 : 0, 
                  translateX: isActiveTab(panel) ? 0 : -100,
                  transitionEnd: { 
                    position: isActiveTab(panel) ? 'relative' : 'absolute', 
                    translateX: isActiveTab(panel) ? 0 : 100,
                }
                }} 
              >
                {
                  panel.content
                  || <p className="text-secondary-400">No Content</p>
                }
              </motion.div>
            ))
          }
        
        </AnimatePresence>
      </div> 


    </div>
  )
}


/** __TYPE DEFINITION__ */

export interface Props extends Omit<HtmlHTMLAttributes<unknown>, 'color'> {
  items: ItemProp[];
  currentTab?: ItemProp['key'];
  eager?: boolean;
  tabs?: (props: TabProps)=>ReactNode;
  panel?: (props: TabProps)=>ReactNode;
  color?: ThemedColorTypes.ThemeColors;
}


export interface ItemProp {
  text: string;
  key?: string;
  content?: ReactNode | string | number;
}


type TabProps = {currentTab: unknown, tabs: ()=>Tab[], setActiveTab: (tab:Tab)=>void }
type Tab = Omit<ItemProp, 'content'>
// type Panel = ItemProp