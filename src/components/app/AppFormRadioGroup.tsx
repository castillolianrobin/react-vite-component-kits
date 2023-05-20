import { memo } from 'react';
import { FormValidation, Validations, useValidation } from '../../utils/validation';
import { AppFormError, AppFormLabel } from './';
import AppFormRadio, { RadioChildProps } from './AppFormRadio';

/** Radio Group */
export default memo(function AppFormRadioGroup(props: Props) {
  const { errors } = useValidation(props.value, props.validations || [], props?.formValidation)
  
  return (
    <div className={`block ${props.className}`}>
      {/* Label */}
      <AppFormLabel>{ props.label }</AppFormLabel>
      
      {/* Radio Group */}
      <div className={`my-1 flex gap-1 ${props.containerClassName}`}>
        { props.items.map((radioItem, i) => (
          <AppFormRadio
            key={`radio-${props.label}-${i}`}
            { ...radioItem }
            color={ radioItem.color || props.color }
            onValueChange={props.onValueChange}
            value={props.value}
          ></AppFormRadio>
        )) }
      </div>
      {/* Error Message */}
      <AppFormError>{ props.error || errors }</AppFormError>
    </div>
  )
})

interface Props{
  items: RadioChildProps[];
  containerClassName?: string;
  className?: string;
  onValueChange?: (e?: any) => void;
  value?: any;
  label?: string;
  color?: string;
  error?: string;
  gap?: string | number;
  validations?: Validations;
  formValidation?: FormValidation;
}
