// export { useValidation, createFormValidation } from './validation';

/** FORM VALIDATIONS */
export { useFormValidation, useCreateFormValidation } from './validation/index';
export type * as ValidationTypes from './validation/index';
/** THEMED COLOR HOOK */
export { useThemedColor, useCreateThemedColor } from './themedColor';
export type * as ThemedColorTypes from './themedColor';
/**  Click OUTSIDE HOOK */
export { useClickOutside } from './onClickOutside'

// deprecated
export { default as usePortal } from './usePortal';