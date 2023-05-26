import { LabelHTMLAttributes } from "react";

export default function AppFormLabel(props: Props) {
  
  const textSizeClass = ()=>{
    switch (props.size) {
      case 'lg': return 'text-lg';
      case 'md': return 'text-md';
      case 'sm': return 'text-sm';
      case 'xs': default: return 'text-xs';
    }
  };
  
  return (
    <label 
      { ...props }
      htmlFor={ props.name }
      className={`
        pb-1
        select-none 
        transition-colors
        ${ props.className }
        ${ textSizeClass() }
        ${ props.disabled ? 'text-secondary-400' : '' } 
        group-focus-within:text-${ props.color }
      `}
    >
      { props.children }
      {/* Required Sign */}
      { props.required && 
          (<span className="text-error-500"> * </span> ) 
      }
    </label>
  )
}


/** __TYPE DEFINITIONS__ */

interface Props extends LabelHTMLAttributes<unknown> {
  color?: string;
  required?: boolean;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  name?: string;
}
