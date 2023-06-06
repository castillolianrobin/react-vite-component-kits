import { InputHTMLAttributes, ReactNode, useState, } from "react";
// Components
import { AppFormInputContainer, type AppFormInputContainerTypes } from ".";
// Hooks
import { useFormValidation, useThemedColor } from "@/hooks";
import type { ThemedColorTypes, ValidationTypes } from "@/hooks";
// Helpers 
import { objectHelper } from "@/helpers";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function AppFormInput(props: Props) {
  /** Validations Hook */
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
  // Password Input: show password state 
  const [ showPass, setShowPass ] = useState(false);

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
        type={ showPass ? 'text' : props.type }
        value={`${props.value}`}
        onChange={ onChangeHandler } 
        onFocus={ onFocusHandler}
        aria-label={props.name || props.label}
        className="px-1 w-full bg-transparent outline-none" 
      />
      {
        props.type === 'password' && (
          <span 
            className="cursor-pointer"
            onClick={ ()=>setShowPass(!showPass)} 
          >{
            showPass 
            ? <EyeSlashIcon className="h-6"></EyeSlashIcon>
            : <EyeIcon className="h-6"></EyeIcon>
          }</span>
        )
      }
    </AppFormInputContainer>
  )
}



/**  __TYPE DEFINIITON__*/

interface Props extends Omit<InputHTMLAttributes<unknown>, 'value'>,  AppFormInputContainerTypes.ExtendableProps {
  value?: string | number;
  onValueChange?: (e: string ) => void;
  label?: string;
  error?: string | ReactNode;
  color?: ThemedColorTypes.ThemeColors;
  validations?: ValidationTypes.ValidationProps;
  prepend?: string | number | ReactNode;
  append?: string | number | ReactNode;
  // formValidation?: FormValidation;
}