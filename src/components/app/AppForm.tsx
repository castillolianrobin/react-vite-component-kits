import { FormEvent, FormHTMLAttributes, ReactNode, useEffect, useState } from "react";
import { FormErrors, FormValidation, useCreateFormValidation } from "../../utils/validation";
import { ThemeColors, createThemedColor } from "../../utils/useThemedColor";

export default function AppForm(props: Props) {
  // dynamic form error handling
  const { 
    startValidation, 
    errors, 
    formValidation,
    FormValidationProvider, 
  } = useCreateFormValidation()
  
  const { ColorProvider, color } = createThemedColor(props.color);

  const _props = { ...props };
  delete _props['render'];
  
  function _onSubmit (e: FormEvent | undefined) {
    e && e.preventDefault();
    startValidation();
    props.onSubmit && props.onSubmit(e);
  }

  
  return (
    <form {..._props} onSubmit={_onSubmit}>
      <ColorProvider value={color}>
          {  
            props.render 
              ? props.render(formValidation, errors) 
              : <FormValidationProvider value={formValidation}>
                  {props.children}
                </FormValidationProvider>
          }
      </ColorProvider>
    </form>
  )
}

interface Props extends FormHTMLAttributes<unknown> {
  children?: ReactNode;
  onSubmit?: (e?: any) => void;
  color?: ThemeColors;
  render?: (formValidation?: FormValidation, error?: FormErrors) => ReactNode;
}
