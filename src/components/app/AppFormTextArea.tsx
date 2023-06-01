import { InputHTMLAttributes, ReactNode, useEffect, useRef, useState, } from "react";
// Components
import { AppFormInputContainer, AppFormInputContainerTypes } from ".";
// Hooks
import { useFormValidation, useThemedColor } from "@/hooks";
import type { ThemedColorTypes, ValidationTypes } from "@/hooks";
// Helpers 
import { objectHelper } from "@/helpers";

export default function AppFormTextArrea(props: Props) {
  /** Validations */
  const { validateOnChange, errorMessage, isRequired } 
    = useFormValidation(props.value, props.validations || [], props.name)
  
  /** Themed Color Hook */
  const { color } = useThemedColor(props.color);
  
  
  
  /** Internal Logic */
  
  // Props to be mounted to native input 
  const inputProps = objectHelper.deleteProperties(
    props,
    [ 'onValueChange', 'disableResize']
  );

  // Error Message
  const error = `${ props.error || errorMessage }`;
  
  /** Handles The input event of main input element*/
  function onChangeHandler(e: React.FormEvent<HTMLTextAreaElement>){
    if (props.disabled) return;

    const inputValue = e.currentTarget.value ;
    props.onValueChange && props.onValueChange(inputValue);
    props.onChange && props.onChange(e);
  }

  /** Handles the focus event of the main input element */
  function onFocusHandler() {
    validateOnChange(true);
  }

  /** Resize Logic */
  // textarea min height
  const [minHeight, setMinHeight] = useState('0')
  // template ref for a hidden text area to base the min height of actual textarea tag 
  const shadowTextAreaRef = useRef<HTMLTextAreaElement>(null);
  // Set the new height of the text area based on inputted lines
  function resizeTextArea() {
    const allowance = 30;
    setMinHeight(`${(shadowTextAreaRef.current?.scrollHeight || 0) + allowance}px`)
  }

  useEffect(()=>{
    resizeTextArea()
  }, [ props.value ])
  
  
  return (
    <AppFormInputContainer
      color={ color }
      disabled={ props.disabled }
      required={ isRequired() }
      error={ error }
      error-class={ props.errorClass }
      name={ props.name }
      label={ props.label }
      label-class={ props.labelClass }
      append={ props.append }
      prepend={ props.prepend }
      className={ `group ${props.hidden ? 'hidden' : 'block'} ${props.className}` }
    >
      {/* Input */}
      <textarea
        { ...inputProps }
        value={`${props.value}`}
        onChange={ onChangeHandler } 
        onFocus={ onFocusHandler }
        aria-label={props.name || props.label}
        className={ `scrollbar flex-grow px-1 w-full bg-transparent outline-none ${props.disableResize ? 'resize-none': '' }` }
        style={{ minHeight }}
      />

      <textarea
        readOnly
        value={`${props.value}`}
        ref={ shadowTextAreaRef }
        tabIndex={ -1 }
        className="absolute max-h-0 w-full pointer-events-none opacity-0 margin-0"
      />
    </AppFormInputContainer>
  )
}


interface Props extends Omit<InputHTMLAttributes<unknown>, 'value'>,  AppFormInputContainerTypes.ExtendableProps {
  value?: string | number;
  onValueChange?: (e: string ) => void;
  label?: string;
  error?: string | ReactNode;
  color?: ThemedColorTypes.ThemeColors;
  validations?: ValidationTypes.ValidationProps;
  prepend?: string | number | ReactNode;
  append?: string | number | ReactNode;
  disableResize?: boolean;
  // formValidation?: FormValidation;
}