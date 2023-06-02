import { InputHTMLAttributes, ReactNode } from "react";
// Hooks
import { ThemedColorTypes, ValidationTypes, useFormValidation } from "@/hooks";
import { AppFormCheckbox, AppFormError, AppFormLabel } from ".";

export default function AppFormCheckboxGroup<T>(props: Props<T>) {
  
  /** Form Validation Hook */
  const { validateOnChange, errorMessage, isRequired } 
    = useFormValidation(props.value, props.validations || [], props.name)


  
  /** Radio Group Logic */

  // updates the modelValue in case the wrong data was passed 
  const isValueItemUnequal = props.value.length !== props.items.length;
  if (props.returnInactive && isValueItemUnequal) {
    console.info('%c Updating modelValue to match', 'color: gray')

    if (!props.returnInactive) {
      props.onValueChange && props.onValueChange([]);
    } else {
      const itemInactive = props.items.map(item=>getInactiveValue(item))
      props.onValueChange && props.onValueChange(itemInactive as T[]);
    }
  }

  /** Returns the active value for the checkbox */
  function getValue(item: ItemProp<T>) {
    if (!Array.isArray(props.value)) 
      return getInactiveValue(item);

    return props.value.includes(item.value)
      ? item.value
      : getInactiveValue(item);
  }

  /** Returns the inactive value for the checkbox */
  function getInactiveValue(item: ItemProp<T>) {
    return item?.inactiveValue || false;
  }

  /** Handler for update:modelValue emit */
  function onInputHandler(item: ItemProp<T>, i: number) {
    const newVal = [ ...props.value ];
    if (props.returnInactive) {
      newVal[i] = newVal[i] === item.value 
        ? getInactiveValue(item)
        : item.value;
    } else {
      const isExisting = newVal.findIndex(val=>val===item.value);
      if (isExisting > -1) {
        newVal.splice(isExisting, 1);
      } else {
        newVal.splice(i, 0, item.value);
      }
    }

    validateOnChange(true);
    props.onValueChange && props.onValueChange(newVal);
  }
  
  return (
    <div className="block">
      {/* Label */}
      <AppFormLabel 
        required={ isRequired() }
        name={ props.name }
        disabled={ props.disabled }
        className={ props.labelClass }
      >
        { props.label  }
      </AppFormLabel>

      {/* Radio Group */}
      <div 
        className={ `my-2 flex gap-5 ${ props.containerClass }` }
        role="radiogroup"
      >
        { props.items.map((item, i)=> (
          <AppFormCheckbox
            key={ i }
            color={ props.color }
            activeValue={ item.value }
            inactiveValue={ getInactiveValue(item) }
            label={ item.label }
            disabled={ props.disabled }
            value={ getValue(item) }
            onValueChange={()=>onInputHandler(item, i)}
            onClick={ ()=>validateOnChange(true) }
          ></AppFormCheckbox>
        ))}
      </div>

      {/* Error Message */}
      <AppFormError className={ props.errorClass }>
        { props.error || errorMessage  }
      </AppFormError>
    </div>
  )
}


/** __TYPE DEFINITIONS__ */

export interface Props<T> extends Omit<InputHTMLAttributes<unknown>, 'value'> {
  value: CheckboxValue<T>[];
  onValueChange?: (e: CheckboxValue<T>[]) => void;
  items: ItemProp<T>[],
  containerClass?: string;
  validations?: ValidationTypes.ValidationProps;
  name?: string;
  label?: string;
  labelClass?: string;
  error?: string | ReactNode;  
  errorClass?: string;
  color?: ThemedColorTypes.ThemeColors;
  /** Flag to return the unchecked value in the array value */
  returnInactive?: boolean;
} 


export interface ItemProp<T> {
  label: string;
  value: T;
  inactiveValue?: CheckboxValue<T>;
}

export type CheckboxValue<T> = T | false; 