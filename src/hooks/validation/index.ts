import { createContext, useContext, useEffect, useState } from "react";
import { parseValidationArray, parseValidationString, type Validation } from "./validations";
export { type Validation, type ValidationResults } from './validations';


/** Form Validation Provider */
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
export const useFormValidation: UseFormValidation 
  = (value, validations, name) => {
      /** Error messages from validations */
      const [errors, setErrors] = useState<string[]>([]);

      /** Current error message to be displayed */
      const errorMessage = `${errors.length ? errors[0] : ''}`;

      /** LOCAL VARIABLE: returns all the set of validation functions based on validation props */
      const validationArr = (): ValidationItemFunction[] => {
        const _validations = validations;

        if (typeof _validations === "string") {
          return parseValidationString(_validations)      
        } else if (Array.isArray(_validations)) {
          return parseValidationArray(_validations);
        } else { 
          return []; 
        }
      };

      /** Returns whether there is "required" validation on the validations property */
      const isRequired = () => {
        const _validations = validations;
        if (typeof _validations === "string") {
          return _validations.includes("required");
        } else {
          return _isRequired(validationArr())
        }
      };

      /**
       * Validates the given value based on the set of validation props
       * @returns false (no error acquired) \ error message from validations 
       */
      function validateValue(val: unknown): string | false {
        const _value = val;
        const _validations = validationArr();
        const fieldName = name || '';

        return _validateValue(_value, _validations, fieldName);
      }


      /**
       * Checks for error and update the errorMessage's value accordingly
       * @param {*} val - Value to be checked
       */
      function checkError(val: unknown = false): string | boolean {
        let _val = val || value;
        if (_val instanceof Event ) {
          _val = (<HTMLInputElement>_val.target).value;
        }
        const err = validateValue(_val) || '';
        if (err) { 
          setErrors([ err ]); 
        } else {
          setErrors([]);
        }
        
        return errorMessage;
      }


      /**
       * This script will only work with parent using createFormValidation()
       * Adds validation via createFormValidation()'s providers
       */
      
      const formProvider = useContext(formValidationContext); 
      useEffect(
        ()=>{
          if (formProvider?.validationKey) {
            formProvider.addInput && formProvider.addInput();
            formProvider?.validationKey && checkError(value);
            // You do not need to remove the inputCtr from the 
            // parent form since it rerenders on change anyway 
            // (restarts to 0)
          }
        }, 
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ formProvider?.validationKey ]
      );

      
      /** This script will only work if validateOnChange is toggled */
      const [ isValidateOnChange, validateOnChange ] = useState(false);
      useEffect(()=>{
        isValidateOnChange && checkError(value);
      }, [ value ]);


      return {
        errors,
        errorMessage, 
        checkError,
        validateOnChange,
        isRequired,
      }
  };


/** useValidation Local Functions */

function _isRequired(validations: (Validation|(()=>Validation))[] ) {
  return (
    validations.filter((rule) => {
      return rule("")
        .toString()
        .includes("shouldn't be empty.");
    }).length > 0
  );
}

function _validateValue(_value: unknown, validations: ValidationItemFunction[], fieldName?:string): string | false {
  for (const rule of validations) {
    let validate: string | boolean = false;
    const innerRule = rule();
    if (typeof innerRule === "function") {
      validate = innerRule(_value, fieldName);
    } else if (typeof innerRule === 'boolean' || typeof innerRule === 'string') {
      validate = rule(_value, fieldName) as (string | true)
    }
    if (validate !== true) {                                  
      return validate;
    }
  }
  return false;
}



/** __TYPE DEFINITIONS__ */

export type FormErrors = Array<string[]>;

export interface FormValidation {
  addInput: () => void;
  addValidated: (error?: string[]) => void,
  validationKey: string, 
}


/** useFormValidation interface */
export interface UseFormValidation {
  ( 
    value: any,
    validations: Array<ValidationItem> | string,
    name?:  string
  ): useFormValidationReturn
}

interface useFormValidationReturn {
  isRequired: ()=> boolean;
  checkError: (val?: unknown) => string | boolean;
  errors: string[];
  errorMessage: string;
  validateOnChange: CallableFunction;
  // updateValid: (flag: boolean) => void;
}

// export type Validation = (v?:unknown)=> false | string;
export type Validations = string | Array<string | Validation>;

/** Used in validation props. Type for validation passed in useformValidation() second argument  */
export type ValidationItem = Validation | string;
export type ValidationItemFunction = (Validation|(()=>Validation))
export type ValidationProps = ValidationItem[] | string;