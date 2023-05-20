import { LabelHTMLAttributes } from "react";

export default function AppFormLabel(props: Props) {
  
  const textSizeClass = ()=>{
    switch (props.size) {
      case 'xs': return 'text-xs';
      case 'sm': return 'text-sm';
      case 'lg': return 'text-lg';
      case 'md': default: return 'text-md';
    }
  };
  
  return (
    <label 
      { ...props }
      htmlFor={props.name}
      className={`
        pb-1 
        transition-colors
        text-xs group-focus-within:text-${props.disabled ? 'secondary-400' : props.color }-500
        ${ props.className }
        ${ textSizeClass() }
      `}
    >
      { props.children }
      {/* Required Sign */}
      { props.required && (<span className="text-error-500">*</span> ) }
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
