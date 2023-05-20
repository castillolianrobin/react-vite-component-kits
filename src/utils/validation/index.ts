import { createContext, useContext, useEffect, useState } from "react";

const formValidationContext = createContext<{
  addInput?: () => void;
  addValidated?: (error?: string[]) => void;
  validationKey?: string,
} | null>(null);

/**
 * Dynamic form handling. Use this hook to initialize forms
 */
export function useCreateFormValidation() {
  /** 
   * Validation key: Watched by @function useValidation() 
   * to activate its validation function
   */ 
  const [validationKey, setValidationKey] = useState('');
  
  /** Errors for form */
  const [errors, setErrors] = useState<FormErrors>([]);
  
  /**
   * Local variable to be used in checking if all 
   * input inside the form component has been validated
   */
  let _errors:FormErrors = [];
  let inputCtr = 0;
  let validatedCtr = 0;
  
  /** Form object to pass on inputs that uses the useValidation() hook */
  const formValidation:FormValidation = {
    /** Signals the parent form to link itself. Used by useValidation() hook  */
    addInput() {
      inputCtr += 1;
    },
    /** Signals the parent form that it has been validated. 
     * Used by useValidation() hook */
    addValidated(error?: string[] ) {
      validatedCtr += 1;
      
      if (error && error.length) {
        _errors.push(error)
      }
      // input errors will only be passed to form if all input has been validated
      if (validatedCtr === inputCtr) {
        setErrors([..._errors]);
      }
    },
    /** To be watched by a linked input to determine whether to 
     * activate its validation function. Used by useValidation() hook */
    validationKey,
  };

  /** Execute to activate the form's validation. */
  function startValidation() {
    const newValidationKey = `val-${Math.random()}`;
    setValidationKey(newValidationKey);
    inputCtr = 0;
    validatedCtr = 0;
    _errors = [];
  }

  return {
    /** Execute to activate the form's validation. It will activate all 
    * the linked input's validation upon activation */
    startValidation,
    /**
    * Form object to pass on inputs that uses the useValidation() hook 
    * if passed, the input will be linked to parent form with createFormValidation() hook
    */
    formValidation,
    /** Errors accumulutated from validated child inputs */
    errors, 
    /** Value should be formValidation from createFormValidation() hook. consumed by useValidation() hook. */
    FormValidationProvider: formValidationContext.Provider,
  }
}

/** 
 * Input validation handler 
 */
export function useValidation(
  /** Input Value to validated */
  value: any,
  /** Set of validations to run */
  validations: Validations, 
  /** Form object passed by parent form with createFormValidation() hook  */
  _formValidation?: FormValidation
) {
  
  /** Error messages from validations */
  const [errors, setErrors] = useState<string[]>([]);
  
  /** Validation handler */
  function validateValue(validationFunc: Validation) {
    const error = validationFunc(value?.current || value);
    return error;
  }

  const formValidation = useContext(formValidationContext) || _formValidation;

  // Run through all validations passed to useValidation() hook
  let _errors:string[] = [];
  
  function runValidations() {
    _errors = [];
    
    if (!validations || validations.length === 0) return;
    
    if (Array.isArray(validations)) {
      for (const validation of validations) {
        if (typeof validation === 'function') {
          const err = validateValue(validation)
          err && _errors.push(err);
        }
      }
    }
    // else
    setErrors([..._errors]);
  }
  /** Execute validations based on parent forms validation key (if present) */
  function runFormValidation() {
    runValidations()
    formValidation?.addValidated && formValidation.addValidated([..._errors]);
  }

  // Watches the validation key of parent form so it coud start validation
  useEffect(()=>{
    formValidation?.addInput && formValidation.addInput();
    formValidation?.validationKey && runFormValidation();
  },   [ formValidation?.validationKey ]);

  
  /** This script will only work if validateOnChange is toggled */
  const [ isCalidateOnChange, validateOnChange ] = useState(false);
  useEffect(()=>{
    isCalidateOnChange && (runValidations());
  }, [value]);
  
  return {
    /** Array of error message from validations */
    errors,
    /** Execute all validations passed from this hook */
    runValidations,
    /** execute if validation should run when value change  */ 
    validateOnChange
  }
}

/** TYPE DEFINITIONS */

export type FormErrors = Array<string[]>;

export interface FormValidation {
  addInput: () => void;
  addValidated: (error?: string[]) => void,
  validationKey: string, 
};

export type Validation = (v?:unknown)=> false | string;
export type Validations = string | Array<string | Validation>;