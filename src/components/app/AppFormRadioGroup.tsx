import { ThemedColorTypes, ValidationTypes, useFormValidation } from "@/hooks";
import { InputHTMLAttributes, ReactNode } from "react";
import { AppFormError, AppFormLabel, AppFormRadio } from ".";

export default function AppFormRadioGroup<T>(props: Props<T>) {
  /** Form Validation Hook */
  const { validateOnChange, errorMessage, isRequired } 
    = useFormValidation(props.value, props.validations || [], props.name)

  
  /** Radio Group Logic */

  function onInputHandler(value: T) {
    if (props.value === value) return;

    props.onValueChange && props.onValueChange(value)
    validateOnChange(true);
  }

  return (
    <div className={ `block ${props.className}` }>
      {/* Label */}
      <AppFormLabel 
        required={ isRequired() }
        name={ props.name }
        disabled={ props.disabled }
        className={ props.labelClass }
      >
        { props.label }
      </AppFormLabel>

      {/* Radio Group */}
      <div 
        className={ `my-2 flex gap-5 ${props.containerClass}` }
        role="radiogroup"
      >
        {/* v-for="item, i in props.items" */}
        { props.items.map((item, i)=>(
          <AppFormRadio
            key="i"
            color={ props.color }
            activeValue={ item.value }
            label={ item.label }
            disabled={ props.disabled }
            value={ props.value }
            onValueChange={ onInputHandler }
          ></AppFormRadio>
        )) }
      </div>

      {/* Error Message */}
      <AppFormError className={ props.errorClass }>
        { props.error || errorMessage  }
      </AppFormError>
    </div>
  )
}


interface Props <T> extends Omit<InputHTMLAttributes<unknown>, 'value'> {
  value: T;
  onValueChange?: (e: T) => void;
  items: ItemProp<T>[],
  containerClass?: string;
  validations?: ValidationTypes.ValidationProps;
  name?: string;
  label?: string;
  labelClass?: string;
  error?: string | ReactNode;  
  errorClass?: string;
  color?: ThemedColorTypes.ThemeColors;
}

export interface ItemProp<T> {
  label: string;
  value: T;
}
