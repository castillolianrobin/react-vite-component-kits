import { InputHTMLAttributes, ReactNode, useRef, useState } from "react";
// Hooks
import { ThemedColorTypes, ValidationTypes, useClickOutside, useFormValidation, useThemedColor } from "@/hooks";
// Helpers
import { objectHelper } from "@/helpers";
// Components
import { AppFormInputContainer, type AppFormInputContainerTypes } from ".";
import { AnimatePresence, motion } from "framer-motion";
export default function AppFormSelect<T>(props: Props<T>) {  
  /** Validations */
  const { validateOnChange, errorMessage, isRequired, checkError } 
    = useFormValidation(props.value, props.validations || [], props.name)

  /** Themed Color Hook */
  const { color } = useThemedColor(props.color);

  /** On Click Outside Hook */
  const formSelectRef = useRef(null);
  useClickOutside(formSelectRef, ()=>toggleItems(false));


  /** Select Logic */
  const inputProps = objectHelper.deleteProperties(
    props,
    [ 'onValueChange']
  );

  const error = `${ props.error || errorMessage }`;

  /** Select Input Display  */

  // Variable to display on select (will display label if present)
  const displayValue = ()=>{
    /** Gets the label by value from modelValue */
    function getValueLabel(value: unknown) {
      const itemIndex = props.items
        .findIndex((_item:SelectItem)=> value === getItemValue(_item));

      if (itemIndex < 0) return value;

      const item = props.items[itemIndex];
      return getItemLabel(item);
    }

    if (props.multiselect && Array.isArray(props.value)) {
      // display labels per value if multiselect
      return props.value.map(value=>getValueLabel(value));
    }  else {
      return getValueLabel(props.value);
    }
  };


  /** Select Items */

  // reactive state for select item container
  const [isOpen, setIsOpen] = useState(false)

  // Checks if item is type of string 
  function isItemString(item: SelectItem): item is string | number {
    return typeof item === 'string' || typeof item === 'number';
  }

  // Select item label handler 
  function getItemLabel(item: SelectItem) {
    return isItemString(item) ? item : (item?.label || item.value);
  }
  // get the text to be displayed 
  function getItemValue(item: SelectItem) {
    return isItemString(item) ? item : item.value;
  }
  // return the item's key value
  function getItemKey(item: SelectItem, index: number) {
    return `item-${getItemLabel(item)}-${index}`
  }
  // Select item state Handler 
  function toggleItems(state?: boolean) {
    if (props.disabled || props.readOnly) return;

    const _isOpen = typeof state === 'boolean' 
      ? state
      : !isOpen;
    setIsOpen(_isOpen); 
  }
  function isActive(item: SelectItem) {
    const itemValue = isItemString(item) ? item : item.value;

    return props.multiselect && Array.isArray(props.value)
      ? props.value.some(( item)=> JSON.stringify(item) === JSON.stringify(itemValue))
      : JSON.stringify(itemValue) === JSON.stringify(props.value);
  }
  // Select item click/keypress handler 
  function onItemSelectHandler(item: SelectItem) {
    let value = isItemString(item) ? item : item.value;

    if (props.multiselect) {
      const modelValue = Array.isArray(props.value) ? [...props.value] : [];
      const existIndex = modelValue
        .findIndex((item)=> JSON.stringify(item) === JSON.stringify(value))

      if (existIndex >= 0) {
        modelValue.splice(existIndex, 1);
        value = [ ...modelValue ];
      } else {
        value = [...modelValue, value];
      }
    }
    checkError(value);
    props.onValueChange &&  props.onValueChange(value as T);
    !props.multiselect && toggleItems(false);
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
      <div
        className="w-full" 
        ref={ formSelectRef }
      >
        {/* Select Display */}
        <div className="flex-shrink flex-grow">
          {/* <slot name="display" v-bind="{ displayValue, disabled: props.disabled }"> */}
            <input
              readOnly
              value={ `${displayValue()}` }
              disabled={ props.disabled }
              className={ `
                w-full 
                outline-none 
                focus 
                disabled:text-secondary-400 
                bg-transparent
                ${!props.disabled && !props.readOnly ? 'cursor-pointer' : '' }
              ` }
              tabIndex={ 0 }
              onClick={ ()=>toggleItems() } 
              // @keydown.space="toggleItems()" 
            />
          {/* </slot> */}
        </div>
        
        {/* Select Items */}
        <AnimatePresence initial={ false } mode="wait">
          {
            isOpen && (
              <div
                className="
                  z-10
                  absolute top-[115%] right-0 
                  w-full
                "
              >
                <motion.ul
                  initial={{ opacity: 0, translateY: -20 }}
                  exit={{ opacity: 0, translateY: -20, overflow: 'hidden' }}
                  animate={{ opacity: 1, translateY: 0 }}
                  className=" 
                    overflow-auto scrollbar
                    w-full max-h-[150px]
                    bg-white dark:bg-secondary-800
                    outline outline-1 outline-secondary-200 dark:outline-secondary-600
                    shadow 
                    rounded 
                    cursor-pointer
                  "
                  role="listbox"
                >
                  {/* Select Item */}
                  {
                    props.items.map((item, index)=>(
                      <li
                        key={ getItemKey(item, index) }
                        className={ `
                          p-1
                          outline-none
                          transition
                          hover:text-white focus:text-white
                          hover:bg-${color} focus:bg-${color}
                          ${ isActive(item) ? `bg-${color}/75 text-white` : '' }
                        `}
                        aria-selected={ isActive(item) }
                        tabIndex={ 0 }
                        role="option"
                        onClick={ ()=>onItemSelectHandler(item) }
                        // @keypress.space="onItemSelect(item)"
                      >
                        { `${getItemLabel(item)}` }
                      </li>
                    ))
                  }
                </motion.ul>
              </div>
            )
          }
        </AnimatePresence>
      </div>

      {/* <input
        { ...inputProps }
        value={`${props.value}`}
        onChange={ onChangeHandler } 
        onFocus={ onFocusHandler}
        aria-label={props.name || props.label}
        className="px-1 w-full bg-transparent outline-none" 
      /> */}
    </AppFormInputContainer>
  )
}



/** __TYPE DEFINITIONS__ */

interface Props <T> extends Omit<InputHTMLAttributes<unknown>, 'value'>,  AppFormInputContainerTypes.ExtendableProps {
  items: SelectItemProp[] | string[] | number[];
  multiselect?: boolean;
  value?: T;
  onValueChange?: (e: T ) => void;
  label?: string;
  error?: string | ReactNode;
  color?: ThemedColorTypes.ThemeColors;
  validations?: ValidationTypes.ValidationProps;
  prepend?: string | number | ReactNode;
  append?: string | number | ReactNode;
  // formValidation?: FormValidation;
}

export interface SelectItemProp{
  value: unknown;
  label?: string;
}


export type SelectItem = SelectItemProp | string | number;

