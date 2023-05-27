import { ThemedColorTypes } from '@/hooks';
import { useThemedColor } from '@/utils/useThemedColor';
import { HtmlHTMLAttributes, ReactNode, useState } from 'react';

export default function AppTabs(props: Props) {
  /** Themed Color Hooks */
  const { color } = useThemedColor(props.color);


  /** Tab Logic */

  const tabs = (): Tab[] => props.items.map((item, i)=>({
      text: item.text,
      key: item?.key || `tab-${i}`,
  }));

  const panels = (): Panel[] => props.items
  .filter((item)=>isActiveTab(item) || props.eager)
  
  
  const [ currentTab, setCurrentTab ] = useState(props.currentTab || tabs()[0]?.key || '')
  
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
    </div>
  )
}


/** __TYPE DEFINITION__ */

export interface Props extends Omit<HtmlHTMLAttributes<unknown>, 'color'> {
  items: ItemProp[];
  currentTab?: ItemProp['key'];
  eager?: boolean;
  tabs?: (props: TabProps)=>ReactNode;
  panel?: ()=>ReactNode;
  color?: ThemedColorTypes.ThemeColors;
}


export interface ItemProp {
  text: string;
  key?: string;
  content: unknown;
}


type TabProps = {currentTab: unknown, tabs: ()=>Tab[], setActiveTab: (tab:Tab)=>void }
type Tab = Omit<ItemProp, 'content'>
type Panel = ItemProp['content']