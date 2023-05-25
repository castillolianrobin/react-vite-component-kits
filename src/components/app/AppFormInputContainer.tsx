import { HtmlHTMLAttributes, ReactNode } from "react"
// Components
import { AppFormError, AppFormLabel } from "."
// Hooks
import { ThemedColorTypes } from "@/hooks"


export default function AppFormInputContainerMain(props: Props) {  
  
  // Color for inactive state
  const colorInactive = (): ThemedColorTypes.ThemeColors => {
    if (props.error) return 'error-500';
    else if (props.disabled) return 'secondary-400';
    else return 'secondary-500';
  }
  
  return (
    <div 
      className={`group dark:text-secondary-100`}
    >
      {/* Label */}
      <AppFormLabel
        required={ props.required }
        disabled={ props.disabled }
        name={ props.name } 
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
        bg-white dark:bg-secondary-700
          group-focus-within:outline
          outline-1 outline-${props.color}
          group-focus-within:border-${props.color}
          transition-[outline] duration-75
          ${props.className}
        `}
      >
        {/** Prepend */}
        <InputInsertable color={props.color}>{ props.prepend }</InputInsertable>

        {/* Input */}
        { props.children }

        {/** Append */}
        <InputInsertable color={props.color}>{ props.append }</InputInsertable>
      </div>

      {/* Error Message */}
      <AppFormError>{ props.error }</AppFormError>
    </div>
  )
}

export function InputInsertable(props: InputInsertableProps) {
  return (
    props.children 
      ? <div 
        { ...props } 
        className={`
          group-focus-within:text-${props.color}
          group-focus-within:fill-${props.color}
          group-focus-within:stroke-${props.color}
        `}
      >
        { props.children }
      </div>
      : <span></span>
  )
}


/** __TYPE DEFINITIONS__ */

interface Props extends AppFormInputContainerProps, Omit<HtmlHTMLAttributes<unknown>, "color"> {}

export interface AppFormInputContainerProps {
  disabled?: boolean;
  required?: boolean;
  label?: string;
  color?: ThemedColorTypes.ThemeColors;
  error?: string | ReactNode;  
  errorClass?: string;
  append?: ReactNode;
  prepend?: ReactNode;
  labelClass?: string;
  name?: string;

}

interface InputInsertableProps extends HtmlHTMLAttributes<unknown> { 
  color?: ThemedColorTypes.ThemeColors
}

