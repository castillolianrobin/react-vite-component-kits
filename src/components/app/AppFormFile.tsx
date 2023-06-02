import { ThemedColorTypes, ValidationTypes, useFormValidation, useThemedColor } from "@/hooks";
import { ChangeEvent, DragEvent, InputHTMLAttributes, ReactNode, useRef } from "react";
import { AppButton, AppFormError, AppFormInputContainer, AppFormLabel } from ".";
import { objectHelper } from "@/helpers";

export default function AppFormFile(props: Props) {
  
  /** File size validation logic */

  const FILESIZE_TYPE = 'KB';
  // Convert 
  const maxSizeToByte = ()=> 
    props.maxSize ? +props.maxSize*1000 : 0;

  function byteToKB(size: number) {
    return size/1000;
  }

  function isFileSizeInMax(file: File) {
    return props.maxSize && file.size <= maxSizeToByte()
  }

  function fileSizeValidation() {
    if (!props.maxSize || !props.value) return true;

    const { maxSize, value, multiple } = props;
    for (const file of value) {
      if (!isFileSizeInMax(file)) {
        return `${multiple ? 'A' : 'The'} file has exceeded ${maxSize} ${FILESIZE_TYPE}`;
      }
    }
    return true;
  }


  /** Validation Hook */

  // Adds the file size validation to the list of validations
  const validations = ()=> [
    ...(
      props.validations 
      ? Array.isArray(props.validations)
        ? props.validations
        : [props.validations]
      : []
    ),
    fileSizeValidation as ValidationTypes.Validation,
  ];

  const { validateOnChange, errorMessage, isRequired, checkError } 
    = useFormValidation(props.value, validations(), props.name)
  


  /** Theme color composable */
  const { color } = useThemedColor(props.color);

  
  
  /** Form File Logic */

  
  // Props to be mounted to native input 
  const inputProps = objectHelper.deleteProperties(
    props,
    [ 'onValueChange', 'value']
  );

  // template ref for input file
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Creates a string url of the file's thumbnail 
  // (only works with img or video)
  function createThumbnail(file: File) {
    return URL.createObjectURL(file);
  }

  // toggle the file input ref
  function openFileInput() {
    if (props.disabled) return;
    fileInputRef?.current?.click();
  }

  // event handler when uploading file
  function onFileSelectHandler(e: ChangeEvent<HTMLInputElement>) {
    if (props.disabled) return;

    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;

    const value  = [ ...target.files || [] ]; 
    props.onValueChange && props.onValueChange(value);
    checkError()
  }

  // event handler for close icon
  function onCloseIconClickHandler(index: number) {
    if (!props.value || props.disabled) return;
    const files = [ ...props.value ];
    files.splice(index, 1);
    props.onValueChange && props.onValueChange(files);
    checkError();
  }

  
  /** Dropbox Logic */

  // class to add  when user drag over the dropbox 
  const DRAGOVER_CLASS = 'bg-opacity-50';

  // Action to execute on component drag over
  function dragover(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    // Add some visual fluff to show the user can drop its files
    const currentTarget = event.currentTarget as HTMLDivElement;
    if (!currentTarget.classList.contains(DRAGOVER_CLASS)) {
      currentTarget.classList.add(DRAGOVER_CLASS);
    }
  }

  // Action to execute on component drag leave
  function dragleave(event: DragEvent<HTMLDivElement>) {
    // Clean up
    const currentTarget = event.currentTarget as HTMLDivElement;
    currentTarget.classList.remove(DRAGOVER_CLASS);
  }

  // Action to execute on component when file is dropped
  function drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const files = props.multiple
        ? [
            ...event.dataTransfer.files, 
            ...props?.value || []
          ]
        : [event.dataTransfer.files[0]];
      
      props.onValueChange && props.onValueChange(files);
      dragleave(event);
      checkError();
    }
  }


  
  return (
    <div>
      
      {/* Dropzone */}
      
      {
        props.defaultInput
          // Default Input
          ? (<AppFormInputContainer
            name={ props.name }
            required={ isRequired() }
            label={ props.label }
            labelClass={ props.labelClass }
            error={ props.error || errorMessage }
            errorClass={ props.errorClass }
            disabled={ props.disabled }
            color={ color }
            prepend={ props.prepend } 
            append= { props.append }
          >
            <div
              className="
                flex-grow 
                w-full 
                bg-transparent
                cursor-pointer
                peer-disabled:text-secondary-400
              "
            >
              {
                props.display
                ? typeof props.display === 'function'
                  ? props.display({ value: props.value, openFileInput, props })
                  : props.display
                : (<div
                    className="flex gap-1"
                    onClick={ ()=>openFileInput() }
                  >
                    <AppButton size="sm" color={ color }>
                      Browse
                    </AppButton>
                    <input
                      readOnly
                      value={ props.value?.map(({name})=>name).join(',  ') }
                      aria-label={ props.label }
                      role="presentation"
                      className="outline-none cursor-pointer w-full bg-transparent"
                    />
                  </div>)
              }
            </div> 
          </AppFormInputContainer>)
          : (<div>
            <div className="flex flex-wrap gap-3">
              <AppFormLabel required={ isRequired() }>
                { props.label }
              </AppFormLabel>
              <AppFormError>
                { errorMessage || props.error }
              </AppFormError>
            </div>
            <div
              className="mt-1"
            >
              {/* Dropbox */}
              <div
                aria-label="dropzone box" 
                className={ `
                  p-2 py-5
                  rounded
                  cursor-pointer
                  brightness-90
                  text-${color} 
                  bg-${color} bg-opacity-10
                  border border-dashed border-${color}
                  flex flex-col justify-center items-center
                  transition-colors
                ` }
                onClick={ ()=>openFileInput() }
                onDragLeave={ dragleave }
                onDragOver={ dragover }
                onDrop={ drop }
              >
                <h3 className="font-semibold text-center">
                  {
                    props.dropdzoneTitle
                      ? typeof props.dropdzoneTitle === 'function'
                        ? props.dropdzoneTitle({ props, color })
                        : props.dropdzoneTitle
                      : (<>
                        <span className="text-secondary-800 dark:text-secondary-100">
                            Drop files here or 
                        </span> 
                        <u> click here to browse</u>.
                      </>)
                  } 
                </h3>

                {/* Supported type, size */}
                <label
                  className="
                    mt-1
                    flex flex-col md:flex-row gap-2
                    text-xs text-secondary-400 
                    [&>*:last-child.separator]:hidden
                    text-center
                  "
                  aria-label="file limit"
                >
                  {
                    props.dropdzoneSubtitle
                    ? typeof props.dropdzoneSubtitle === 'function'
                      ? props.dropdzoneSubtitle({ props, color })
                      : props.dropdzoneSubtitle
                    : (<>
                        <span>
                          Supported file type: { props.accept || '*' }
                        </span>

                        <span className="separator hidden md:inline">&#x2022;</span>
                        {
                          props.maxSize && (
                            <span>
                              Max file size: { props.maxSize } { FILESIZE_TYPE }
                            </span>
                          )
                        }
                    </>)
                  }
                </label>
              </div>

              {/* Files */}
              {
                props.display
                ? typeof props.display === 'function'
                  ? props.display({ value: props.value, openFileInput, props })
                  : props.display
                : (<>
                    <div className="mt-3 grid gap-2">
                      { props.value.map((file, i)=> (
                        <div
                          key={ `file-${i}` }
                          className={ `
                          p-1
                          w-full
                          overflow-hidden
                          border border-${color} rounded
                          flex items-center flex-col md:flex-row 
                        ` }
                        >
                          {/* File Thumbnail */}
                          <div className={ `mr-3 w-7 h-7 bg-${color} bg-opacity-20` }>
                            {
                              file.type.includes('image')
                                ? (<img 
                                    src={ createThumbnail(file) } 
                                    alt={ file.name }
                                    className="aspect-square object-cover"
                                  />)
                              : file.type.includes('video') 
                                ? (<video 
                                    src={ createThumbnail(file) } 
                                    className="aspect-square object-cover"
                                  />)
                                : (<div className="text-xl text-center">
                                    &#x1F4C1;
                                  </div>)
                            }
                          </div>

                          <div 
                            className="
                              w-full 
                              text-center
                              flex 
                              flex-col md:flex-row 
                              flex-grow flex-shrink 
                              md:gap-2 
                            "
                          >
                            {/* File Name */}
                            <span className={ `truncate text-${color} flex-shrink` }>
                              { file.name }
                            </span>
                            {/* File size */}
                            <span 
                              className={ `
                              whitespace-nowrap
                              ${
                                isFileSizeInMax(file)
                                  ? 'text-secondary-400'
                                  : 'text-error-500'
                              }
                              ` }
                            > 
                              { byteToKB(file.size) } { FILESIZE_TYPE }
                            </span>
                            {/* Close Icon */}
                            <AppButton
                              disabled={ props.disabled }
                              aria-label={ `file ${i+1} close icon` }
                              color={ color }
                              size="sm"
                              variant="text"
                              className="ml-auto"
                              onClick={ ()=>onCloseIconClickHandler(i) }
                            >
                              &#x2715;
                            </AppButton>
                          </div>
                        </div>
                      ))}
                    </div>
                </>)
              }
            </div>
          </div>) 
      }

      {/* Hidden: File Input */}
      <input
        { ...inputProps }
        aria-label={ props.name }
        multiple={ props.multiple }
        accept={ props.accept }
        ref={ fileInputRef }
        tabIndex={ -1 }
        type="file"
        className="sr-only peer"
        aria-hidden="true"
        onChange={ onFileSelectHandler }
      />
    </div>
  )
}


/** __TYPE DEFINITIONS__ */

interface Props extends Omit<InputHTMLAttributes<unknown>, 'value'> {
  value: File[];
  onValueChange?: (e: File[] ) => void;
  label?: string;
  labelClass?: string;
  error?: string | ReactNode;
  errorClass?: string;
  color?: ThemedColorTypes.ThemeColors;
  validations?: ValidationTypes.ValidationProps;
  prepend?: string | number | ReactNode;
  append?: string | number | ReactNode;
  /** Maximum file size in KB */
  maxSize?: string | number;
  /** Convert the file input style to default form input  */
  defaultInput?: boolean;
  /** Render Props */
  dropdzoneTitle?: ReactNode | ((props: RenderProps) => ReactNode); 
  dropdzoneSubtitle?: ReactNode | ((props: RenderProps) => ReactNode); 
  display?: ReactNode | ((props: DisplayRenderProps) => ReactNode); 
}


export interface DisplayRenderProps {
  props: Props;
  value: File[], 
  openFileInput: CallableFunction; 
}

export interface RenderProps {
  color: ThemedColorTypes.ThemeColors, 
  props: Props;
}