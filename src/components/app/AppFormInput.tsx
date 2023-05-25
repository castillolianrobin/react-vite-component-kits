import { InputHTMLAttributes, ReactNode, } from "react";
// Components
import { AppFormInputContainer, AppFormInputContainerProps } from ".";
// Hooks
import { useFormValidation, useThemedColor } from "@/hooks";
import type { ThemedColorTypes, ValidationTypes } from "@/hooks";
// Helpers 
import { objectHelper } from "@/helpers";

export default function AppFormInput<T>(props: Props<T>) {
  /** Validations */
  const { validateOnChange, errorMessage, isRequired } 
    = useFormValidation(props.value, props.validations || [], props.name)
  
  /** Themed Color Hook */
  const { color } = useThemedColor(props.color);
  
  
  
  /** Internal Logic */
  
  // Props to be mounted to native input 
  const inputProps = objectHelper.deleteProperties(
    props,
    [ 'onValueChange']
  );

  // Error Message
  const error = `${ props.error || errorMessage }`;
  
  /** Handles The input event of main input element*/
  function onChangeHandler(e: React.FormEvent<HTMLInputElement>){
    if (props.disabled) return;

    const inputValue = e.currentTarget.value ;
    props.onValueChange && props.onValueChange(inputValue);
    props.onChange && props.onChange(e);
  }

  /** Handles the focus event of the main input element */
  function onFocusHandler() {
    validateOnChange(true);
  }
  
  
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
      <input
        { ...inputProps }
        value={`${props.value}`}
        onChange={ onChangeHandler } 
        onFocus={ onFocusHandler}
        aria-label={props.name || props.label}
        className="px-1 w-full bg-transparent outline-none" 
      />
    </AppFormInputContainer>
  )
}


interface Props <T> extends Omit<InputHTMLAttributes<unknown>, 'value'>,  AppFormInputContainerProps {
  value?: T;
  onValueChange?: (e: string ) => void;
  label?: string;
  error?: string | ReactNode;
  color?: ThemedColorTypes.ThemeColors;
  validations?: ValidationTypes.ValidationProps;
  prepend?: string | number | ReactNode;
  append?: string | number | ReactNode;
  // formValidation?: FormValidation;
}