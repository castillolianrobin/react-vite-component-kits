import { HtmlHTMLAttributes, ReactNode } from "react";


export default function AppCard(props: Props) {
  
  return (
    <div 
      role="dialog"
      aria-label="card" 
      className={`
        card 
        p-3
        flex flex-col 
        bg-white dark:bg-secondary-800
        text-secondary-800 dark:text-secondary-200
        border border-secondary-200 dark:border-secondary-600 
        shadow-md
        rounded
        transition-colors
        ${ props.className }
      `}
    >
      {/* Card Title */}
      { props.title && (
          <h3 className="text-lg md:text-xl font-semibold">
            { props.title }
          </h3>
      )}
      {/* Card Subtitle */}
      { props.subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {  props.subtitle }
        </p>
      )}
      {/* Card Content */}
      <div className="my-2">
        { props.children }
      </div>
      
      {/* Actions */}
      { props.actions && (
        <div className="mt-auto pt-4 flex gap-2 items-center justify-end">
          { props.actions }
        </div>
      )}
    </div>
  )
}


/** __TYPE DEFINITIONS__ */

interface Props extends Omit<HtmlHTMLAttributes<unknown>, 'title'>  {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}
