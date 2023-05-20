import { HtmlHTMLAttributes, ReactNode } from "react"
import { ThemeColors } from "../../utils/useThemedColor"
import { AppFormError, AppFormLabel } from "."


export default function AppFormInputContainerMain(props: ContainerProps) {  
  const colorInactive = (): ThemeColors => {
    if (props.error) return 'error-500';
    else if (props.disabled) return 'secondary-400';
    else return 'secondary-500';
  }
  
  return (
    <div 
      className={`group ${props.hidden ? 'hidden' : 'block'}`}
    >
      {/* Label */}
      <AppFormLabel
        required={props.required}
        disabled={props.disabled}
        name={props.name} 
        className={`group-focus-within:text-${props.color} ${props.labelClass}`}
      >
        { props.label }
      </AppFormLabel>

      {/* Input Container */}
      <div
        className={`
          p-1
          relative flex
          rounded
          border border-${colorInactive()}
        group-focus-within:bg-white
          group-focus-within:outline
          outline-1 outline-${props.color}
          group-focus-within:border-${props.color}
          transition-[outline] duration-75
          ${props.className}
        `}
      >
        {/* Input */}
        { props.children }
        
      </div>

      {/* Error Message */}
      <AppFormError>{ props.error }</AppFormError>
    </div>
  )
}

/** __TYPE DEFINITIONS__ */

export interface ContainerProps extends Props, Omit<HtmlHTMLAttributes<unknown>, "color"> {}

interface Props {
  disabled?: boolean;
  required?: boolean;
  label?: string;
  color?: ThemeColors;
  error?: string | ReactNode;  
  append?: ReactNode;
  prepend?: ReactNode;
  labelClass?: string;
  name?: string;
}

