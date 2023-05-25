/**
 * ==============================================================
 * COMMON VALIDATION CASE
 * ==============================================================
 */

/**
 * Validates if field is required
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function required(name= ''): Validation {
  const notEmpty = (value: any) => {
    const type = typeof value
    if (Array.isArray(value)) {
      return !!value.length;
    } else if (type === 'object' && value) {
      return !!Object.keys(value).length; 
    } else {
      return !!value;
    }
  };

  return (value?: any, fieldName = name) => {
    return notEmpty(value) || `${fieldName || "This"} field shouldn't be empty.`;
  };
}

/**
 * Validates that field is email
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function email(name = ''): Validation {
  return (value?: string, fieldName = name) => {
    return (
      /\S+@\S+\.\S+/.test(value || '') ||
      `${fieldName || 'This'} is not a valid email`
    );
  };
}

/**
 * Validates if field should be number is atleast a certain number minimum
 *
 * @param min Minimum number
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function min(min: number, name = ""): Validation {
  return (value?: string, fieldName = name) => {
    return (
      parseFloat(value || '0') >= min ||
      `${fieldName || "This"} field must be equal or greater than ${min}.`
    );
  };
}

/**
 * Validates if field should be number not exceed the given maximum number
 *
 * @param max Maximum number
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function max(max: number, name = ""): Validation {
  return (value: any, fieldName = name) => {
    return (
      parseFloat(value || '0') <= max ||
      `${fieldName || "This"} field must be equal or less than ${max}.`
    );
  };
}

/**
 * Validates if field should be atleast a certain number of character long
 *
 * @param count Number of minimum character
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function minLength(count: number, name = ""): Validation {
  return (value, fieldName = name) => {
    return (
      (value && value.length >= count) ||
      `${fieldName || "This"} field must be atleast ${count} characters long.`
    );
  };
}

/**
 * Validates if field shouldn't exceed a certain number of character long
 *
 * @param count Number of maximum character
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function maxLength(count: number, name = ""): Validation {
  return (value, fieldName = name) => {
    return (
      (value && value.length < count) ||
      `${fieldName || "This"} field must not exceed ${count} characters long.`
    );
  };
}

/**
 * ==============================================================
 * OPTIONAL VALIDATION CASES
 * ==============================================================
 */

/**
 * Validates if field should only be a number type
 *
 * @param name name of the field
 * @returns boolean: true | string: error message
 */
export function numberOnly(name = ''): Validation {
  return (value: string) => {
    return /^\d+$/.test(value) || `${name || "This"} field must be a number`;
  };
}

/**
 * Validates if field should only contain alphabet letters
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function alphaOnly(name = ''): Validation {
  return (value: string) => {
    return (
      /^([A-Za-z]*)$/.test(value) ||
      `${name || "This"} field should only contain alphabet letters`
    );
  };
}

/**
 * Validates if field shouldn't have any number
 *
 * @param name name of the field
 * @returns boolean: true | string: error message
 */
export function noNumber(name = ''): Validation {
  return (value: string) => {
    return (
      /^([^0-9]*)$/.test(value) ||
      `${name || "This"} field shouldn't have any number character`
    );
  };
}

/**
 * Validates if field is a website url
 *
 * @param name name of the field
 * @returns boolean: true | string: error message
 */
export function isWebsite(name = ''): Validation {
  return (value, fieldName = name) => {
    return !value || (
      // eslint-disable-next-line no-useless-escape
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value) ||
      `${fieldName || 'This'} field is not a valid url`
    );
  };
}

/**
 * ==============================================================
 * SPECIAL RULE NAMING FUNCTION
 * ==============================================================
 */
// export function nameValidations(name, validations) {
//   return validations.map(validation => )
// }

/**
 * Validates that field is required
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function matchString(
  stringMatch: string,
  stringFieldName = "",
  name = ""
): Validation {
  return (value, fieldName = name) => {
    console.log(value, stringMatch);
    return (
      value === stringMatch ||
      `${fieldName || "This"} field should match with ${
        `${stringFieldName} field` || "The string"
      }`
    );
  };
}

/**
 * Validates that field is a valid US phone number
 * Valid formats:
 *  +1 123 4567890
 *  +11234567890
 *  +1(123)4567890
 *  +1(123)456-7890
 *  +1 (123) 456-7890
 *  +1 (123)456 7890
 *  +1 123 456-7890
 *  +1 123 456 7890
 *  +1 123-456-7890
 *  123-456-7890
 *  123 456-7890
 *  123 456 7890
 *  123 4567890
 *  1234567890
 *
 * @see https://stackoverflow.com/questions/4338267/validate-phone-numberwith-javascript
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function usPhoneNum(name = ''): Validation {
  return (value, fieldName = name) => {
    return (
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value) ||
      `${fieldName || "This"} field is not a valid phone number`
    );
  };
}


/** TYPE DEFINITION */

/** Typescript interface for validation function*/
export interface Validation {
  (...params: any): ValidationResults;
}

export type ValidationResults = true | string;



const validations = {
  required,
  email,
  min,
  max,
  minLength,
  maxLength,
  numberOnly,
  alphaOnly,
  noNumber,
  isWebsite,
  matchString,
  usPhoneNum,
};

export type Validations = typeof validations;

type ValidationItem = Validation | string;


/**
 * Parses the validation String and returns the needed validation function
 * @param {String} valString 
 * @returns {Array} Array of validation Function
 */
 export const parseValidationString = (valString: string) => {
  // if (!valString) return [];
  
  const VALIDATION_NAMES = valString.split("|");
  const VALIDATIONS = [];
  for (const valEntity of VALIDATION_NAMES) {
    // const valEntity = element;
    let validationName = '';
    let validationParams: any[] = [];
    
    // Validation has parameter
    if (valEntity.includes("(") && valEntity.includes(")")) {
      validationName = 
        valEntity
        .substring(0, valEntity.indexOf("("))
        .trim();
      validationParams =
        valEntity
        .substring(valEntity.indexOf("(") + 1, valEntity.indexOf(")"))
        .trim()
        .split(",");
    } 
    // Validation doesn't have parameter
    else {
      validationName = valEntity.trim();
      validationParams = [];
    }
    
    // If validation name doesn't exists in the pre existing validations
    if (!(validationName in validations)) {
      console.error(
        `parseValidation: Unknown validation "${validationName}"`
      );
      continue;
    }
    const validationFunc = validations[validationName as keyof Validations];
    
    // if missing a required argument
    if (validationParams.length < validationFunc.length) {
      const missingArgument = validationFunc.length - validationParams.length
      console.error(
        `parseValidation: Missing Argument ${missingArgument} for "${validationName}"`
      )
      continue;
    }

    VALIDATIONS.push((validationFunc as CallableFunction)(...validationParams));
  }
  return VALIDATIONS;
}

/**
 * Parses the validation array, check for string value,
 * return the needed validaiton function 
 * @param {ValidationItem[]} validations 
 * @returns {Array} Array of validation Function
 */
export const parseValidationArray = (validations: ValidationItem[]) => {
  const hasString = (item:ValidationItem): item is string => typeof item === 'string';
  // if array of string and function
  if (validations.find(hasString)) {
    const _validationStrings = parseValidationString(validations.filter(hasString).join('|'));
    const _validationFuncs = validations.filter(item=>!hasString(item));
    return [ ..._validationStrings, ..._validationFuncs];
  } 
  // if array of func
  else { return validations; }
}


export default {
  validations,
  parseValidationString,
};