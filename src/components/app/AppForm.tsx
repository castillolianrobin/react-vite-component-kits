import { FormEvent, FormHTMLAttributes, ReactNode } from "react";
// Hooks
import { 
  useCreateThemedColor, type ThemedColorTypes, 
  useCreateFormValidation, type ValidationTypes
} from "@/hooks";

export default function AppForm(props: Props) {
  /** Form Validation Hook (Iniitalization) */
  const { 
    startValidation, 
    errors, 
    formValidation,
    FormValidationProvider, 
  } = useCreateFormValidation()
  

  /** Themed Color Hooks (Iniitalization / Provider) */
  const { ColorProvider, color } = useCreateThemedColor(props.color);

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
  color?: ThemedColorTypes.ThemeColors;
  render?: (formValidation?: ValidationTypes.FormValidation, error?: ValidationTypes.FormErrors) => ReactNode;
}
