import { ThemedColorTypes, ValidationTypes, useFormValidation, useThemedColor } from "@/hooks";
import { InputHTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { AppFormError, AppFormLabel } from ".";
import { objectHelper } from "@/helpers";

export default function AppFormRadio<T>(props: Props<T>) {
  
  /** Form Validation Hook */
  const { validateOnChange, errorMessage, isRequired } 
    = useFormValidation(props.value, props.validations || [], props.name)

  /** Themed Color Hook */
  const { color } = useThemedColor(props.color);
  

  /** Radio Button Logic */

  // Props to be mounted to container div 
  const containerProps = objectHelper.deleteProperties(
    props,
    [ 'onValueChange', 'validations', 'value',  'radio', 'activeValue',]
  );


  // value to check whether the state is active or not
  const activeValue = props.activeValue || props.label || true;
  const isActive = props.value === activeValue;
  
  /** Handles The input event of main input element*/
  function onChangeHandler(){
    const inputValue = activeValue;
    validateOnChange(true);
    props.onValueChange && props.onValueChange(inputValue as T);
  }

  /** Handles The KEYDOWN event of main input element*/
  function onKeyDownHandler(e?: KeyboardEvent){
    if (e?.type === 'keydown' && ![' ', 'Enter'].includes(e.key)) return; 
    
    onChangeHandler();
  }
  
  
  /** Trigger attributes and event */
  const radioAttrs = ()=>({
    // OnClick Event
    onclick: onChangeHandler,
    // @keypress.space.enter=""
    // Aria Attrs
    role: 'radio',
    'aria-label': props.label,
    'aria-checked': isActive,
    'aria-disabled': props.disabled,
    'data-value': activeValue,
  });
  

  return (
    <div className="inline dark:text-secondary-100">
      <div 
        { ...containerProps }
        className={ `
          flex flex-nowrap flex-row gap-1
          ${ props.className }
          ${ !props.disabled ? 'group cursor-pointer' : '' }
        ` }
        aria-disabled={ props.disabled }
        aria-checked={ isActive }
        data-value={ activeValue }
        role="radio"
        onClick={ ()=>onChangeHandler() }
      >
        {/* Radio Button */}
        {/* <slot name="radio" v-bind="{ props: radioAttrs }"></slot> */}
        {
          props.radio 
            ? typeof props.radio === 'function' ? props.radio({ props: radioAttrs }) : props.radio 
            : (
              <div
                tabIndex={ props.disabled ? undefined : 0 }
                className={ `
                  mt-0.5 p-0.5
                  h-[1rem] w-[1rem] 
                  flex-shrink-0
                  rounded-full
                  border border-${color}
                  group-hover:outline focus:outline outline-2 outline-${color}/50
                  transition-[outline] ease-in-out duration-75
                  ${ props.disabled ? 'border-secondary-400' : '' }
                ` }
                onKeyDown={ onKeyDownHandler }    
              >
                <div
                  className={ `
                    relative
                    rounded-full
                    flex items-center justify-center 
                    h-full w-full 
                    text-white
                    transition-colors
                    ${ isActive ? `bg-${color}` : '' }
                  ` }
                >
                </div>
              </div>
            ) 
        }
        
        <AppFormLabel
          size="sm"
          required={ isRequired() }
          disabled={ props.disabled }  
          className={ `
            group-hover:text-${color}
            ${ !props.disabled ? 'cursor-pointer' : '' }
            ${ isActive ? `text-${color}` : '' }
          ` }
        >
          { props.label }
        </AppFormLabel>
      </div>
      <AppFormError>
        { props.error || errorMessage }
      </AppFormError>
    </div>

  )
}

/** __TYPE DEFINITION__ */

interface Props <T> extends Omit<InputHTMLAttributes<unknown>, 'value'>  {
  value: T
  onValueChange?: (e: T) => void;
  radio?: ReactNode | ((props: RenderProps) => ReactNode);
  activeValue?: T;
  validations?: ValidationTypes.ValidationProps;
  label?: string;
  labelClass?: string;
  color?: ThemedColorTypes.ThemeColors;
  error?: string | ReactNode;  
  errorClass?: string;
  name?: string;
}


export interface RenderProps {
  props: object;
}
