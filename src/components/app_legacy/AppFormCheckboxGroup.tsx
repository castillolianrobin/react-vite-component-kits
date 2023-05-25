import { memo, useEffect } from 'react';
import { FormValidation, Validations, useValidation } from '../../utils/validation';
import { AppFormError, AppFormLabel } from '.';
import AppFormCheckbox, { CheckboxChildProps } from './AppFormCheckbox';

/** Radio Group */
export default memo(function AppFormRadioGroup(props: Props) {
  function _adjustValue() {
    if (!props.onValueChange || !props.onValueChange) return;
    
    if (!Array.isArray(props.value)) {
      props.onValueChange(
        props.items.map(item=>({ 
          key: item.key, 
          value: item.inactiveValue || false 
        }))
      )
    } else if (props.value.length < props.items.length) {
      const valueLngth = props.value.length;
      const itemsLngth = props.items.length
      props.onValueChange([
        ...props.value,
        ...(new Array(itemsLngth - valueLngth).fill({
          value: null,
          key: null,
        }))
      ])
    }
  }

  useEffect(()=>{ _adjustValue() }, [props.value])
    
  const { errors } 
    = useValidation(props.value, props.validations || [], props?.formValidation);;
  
  function onValueChange(val: any, i: number , checkboxItem: CheckboxChildProps) {
    const value = [ ...props.value || [] ];
    
    value[i] && (value[i] = { value: val, key: checkboxItem?.key}); 
    
    props.onValueChange && props.onValueChange(value, i, checkboxItem)
    checkboxItem.onValueChange && checkboxItem.onValueChange(val, i, checkboxItem);
  }

  return (
    <div className={`block ${props.className}`}>
      {/* Label */}
      <AppFormLabel>{ props.label }</AppFormLabel>
      
      {/* Checkbox Group */}
      <div className={`my-1 flex gap-1 ${props.containerClassName}`}>
        { props.items.map((checkboxItem, i) => (
          <AppFormCheckbox
            key={`checkbox-${checkboxItem.key || i}`}
            { ...checkboxItem }
            color={ checkboxItem.color || props.color }
            value={ props.value ? props.value[i]?.value : checkboxItem.value}
            onValueChange={e => { onValueChange(e, i, checkboxItem) }}
          ></AppFormCheckbox>
        )) }
      </div>
      
      {/* Error Message */}
      <AppFormError>{ props.error || errors }</AppFormError>
    </div>
  )
})

export interface AppFormCheckboxGroupValue { 
  value?: any, 
  key?: string | number 
}

interface Props{
  items: CheckboxChildProps[];
  containerClassName?: string;
  className?: string;
  onValueChange?: (e?: any, index?: number, item?: CheckboxChildProps) => void;
  value?: AppFormCheckboxGroupValue[];
  label?: string;
  color?: string;
  error?: string;
  gap?: string | number;
  validations?: Validations;
  formValidation?: FormValidation;
}
