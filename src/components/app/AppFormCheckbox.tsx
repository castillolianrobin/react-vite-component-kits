import { ThemedColorTypes, ValidationTypes, useFormValidation, useThemedColor } from "@/hooks";
import { InputHTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { AppFormError, AppFormLabel } from ".";

export default function AppFormCheckbox<T>(props: Props<T>) {
  /** Form Validation Hook */
  const { validateOnChange, errorMessage, isRequired } 
    = useFormValidation(props.value, props.validations || [], props.name)


  // value to check whether the state is active or not
  const activeValue = props.activeValue || props.label || true;
  const inactiveValue = props.inactiveValue === undefined ? props.inactiveValue : false;

  const isActive = ()=>props.value === activeValue;

  /** Handles The input event of main input element*/
  function onChangeHandler() {
    if (props.disabled) return;

    const inputValue = props.value !== activeValue 
      ? activeValue 
      : inactiveValue;

    validateOnChange(true);
    props.onValueChange &&  props.onValueChange(inputValue as T);
  }

  /** Handles The KEYDOWN event of main input element*/
  function onKeyDownHandler(e?: KeyboardEvent){
    if (e?.type === 'keydown' && ![' ', 'Enter'].includes(e.key)) return; 

    onChangeHandler();
  }

  /** Themed Color Hook */
  const { color } = useThemedColor(props.color);


  return (
    <div className="inline dark:text-secondary-100">
      <div 
        className={ `
          flex gap-1 flex-nowrap
          ${!props.disabled ? 'group cursor-pointer' : ''}
        ` }
        aria-checked={ isActive() }
        aria-disabled={ props.disabled }
        role="checkbox"
        onClick={ onChangeHandler }
        // { ...props }
      >
        {/* Checkbox Button */}
        
        {/* <slot name="checkbox" v-bind="{ isActive, disabled, onChangeHandler, color }">
        </slot> */}
        { props.checkbox 
            ? typeof props.checkbox  === 'function' ? props.checkbox({isActive, disabled: props.disabled, color }) : props.checkbox
            // <!-- Toggle Style -->
            : props.toggleInput 
              ? (<div 
                tabIndex={ props.disabled ? undefined : 0 }
                className="
                  p-[1px] 
                  mr-2 
                  w-9 h-5 
                  border border-secondary-500 
                  rounded-full
                  outline-secondary-300
                "
                onKeyDown={ onKeyDownHandler }
              >
                <div className=" relative w-full h-full">
                  <div 
                    className={ `
                      absolute transition
                      h-full aspect-square rounded-full',
                      bg-${color}
                      ${ isActive() ? 'translate-x-full' : '' }
                    ` }
                  ></div>
                </div>
              </div>)
              // Checkbox Style
              : (<div 
                tabIndex={ props.disabled ? undefined : 0 }
                className={ `
                  mt-0.5 
                  h-[1rem] w-[1rem] 
                  flex-shrink-0
                  border border-${color}
                  group-hover:outline focus:outline outline-2 outline-${color}/50
                  transition ease-in-out duration-75
                  ${ isActive() ? `bg-${color}` : '' }
                  ${ props.disabled ? 'bg-secondary-400' : '' }
                  ${ props.disabled ? 'border-secondary-400' : '' }
                ` }
                onKeyDown={ onKeyDownHandler }
              >
                {
                  isActive() && (
                    <div
                      className="
                        relative
                        h-full w-full
                        text-white
                        flex items-center justify-center
                      "
                    >
                      {/*  Check Icon (Lazy) */}
                      <div className="w-full h-ful font-bold fill-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                        </svg>
                      </div>
                    </div>
                  )
                }
              </div>)
        }
        
        
        <AppFormLabel
          size="sm"
          required={ isRequired() }
          disabled={ props.disabled }
          className={ `
            group-hover:text-${color}
            ${ !props.disabled ? 'cursor-pointer' : ''}
            ${ isActive() ? `text-${color}` : '' }
          ` }
        >
          { props.label }
        </AppFormLabel>
      </div>
      <AppFormError className={ props.errorClass }>
        { props.error || errorMessage }
      </AppFormError>
    </div>
  )
}


/** __TYPE DEFINITION__ */

interface Props <T> extends Omit<InputHTMLAttributes<unknown>, 'value'>  {
  value: T
  onValueChange?: (e: T) => void;
  checkbox?: ReactNode | ((props: RenderProps) => ReactNode);
  activeValue?: T;
  inactiveValue?: T;
  validations?: ValidationTypes.ValidationProps;
  label?: string;
  labelClass?: string;
  color?: ThemedColorTypes.ThemeColors;
  error?: string | ReactNode;  
  errorClass?: string;
  name?: string;
  toggleInput?: boolean;
}


export interface RenderProps {
  props?: object;
  isActive?: ()=>boolean; 
  disabled?: boolean, 
  // onChangeHandler: , 
  color?: ThemedColorTypes.ThemeColors;
}
