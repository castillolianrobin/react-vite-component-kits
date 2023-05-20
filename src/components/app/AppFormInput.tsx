import { HtmlHTMLAttributes, InputHTMLAttributes, ReactNode, useEffect, useRef } from "react";

// Components
import {  AppFormInputContainer, AppFormInputContainerExtras } from "./";
import { ContainerProps } from "./AppFormInputContainer";
// Helpers
import { objectHelper } from "../../helpers";
// Hooks
import { ThemeColors } from "../../utils/useThemedColor";
import { 
  useThemedColor, 
  useValidation, 
  FormValidation, 
  Validations 
} from "../../utils";


export default function AppFormInput(props: Props) {  
  
  /** useValidation Hook */
  const { 
    errors: validationErrors,
    validateOnChange 
  } = useValidation(props.value, props.validations || [], props?.formValidation)
  
  /** Themed Color Hook */
  const { color } = useThemedColor(props.color);
  
  /** Component Logic */  
  
  // Main Errro
  const error = `${props.error || validationErrors[0] || ''}`
  
  // Input watcher
  const inputHasChanged = useRef(false);
  
  // input element props (remove unneeccesary properties)
  const _props = objectHelper.deleteProperties<InputHTMLAttributes<unknown>>(
    props, 
    ['formValidation', 'onValueChange']
  );
  
  /** Handles The input event of main input element*/
  function onChangeHandler(e: React.FormEvent<HTMLInputElement>){
    const inputValue = e.currentTarget.value;
    inputHasChanged.current = true;
    props.onValueChange && props.onValueChange(inputValue);
    props.onChange && props.onChange(e);
  }

  /** Handles the focus event of the main input element */
  function onFocusHandler() {
    validateOnChange(true);
  }

  return (
    <div className={`group ${props.hidden ? 'hidden' : 'block'}`}>      
      {/* Input Container */}
      <AppFormInputContainer
        color={color}
        error={error}
        disabled={props.disabled}
        name={props.name}
        label={props.label}
        // label-class={props.labelClass}
        // error={props.error || errorMessage}
        // error-class={props.errorClass}
        // required={isRequired}
      >
        {/** Prepend */}
        <InputInsertable color={color}>{ props.prepend }</InputInsertable>
        {/* Input */}
        <input 
          { ..._props }
          className="px-1 bg-transparent outline-none" 
          onInput={ onChangeHandler } 
          onFocus={ onFocusHandler}
        />
        {/** Append */}
        <InputInsertable color={color}>{ props.append }</InputInsertable>
      </AppFormInputContainer>
    </div>
  )
}

// Append / Prepend Component
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



/** __TYPE DEFINITIONS */

interface InputInsertableProps extends HtmlHTMLAttributes<unknown> { 
  color?: ThemeColors
}

interface Props extends InputHTMLAttributes<unknown>, ContainerProps {
  onValueChange?: (e: string) => void;
  label?: string;
  error?: string | ReactNode;
  color?: ThemeColors;
  prepend?: string | number | ReactNode;
  append?: string | number | ReactNode;
  validations?: Validations;
  formValidation?: FormValidation;
}