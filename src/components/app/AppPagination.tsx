import { InputHTMLAttributes, useEffect } from "react";
import { AppButton } from ".";

export default function AppPagination(props: Props) {
  /** Pages Logic */
  
  const value = ()=> !props.value ? 1 : +props.value;
  
  // The pages to be displayed in pagination (based on pageVisible prop)
  const visiblePages = ()=>{
    const { value, pageVisible, length } = props;
    const pageParams = [
      !value ?  0 : +value, 
      !pageVisible ? 3 : +pageVisible ,
      +length,
    ] as const;
    const pageStart = getPageStart(...pageParams)
    const pageEnd = getPageEnd(...pageParams);
    const _pages = [];
    for (let page = pageStart; page <= pageEnd; page++) {
      _pages.push(page);
    }

    if (props.persistEdgePages) {
      if (!_pages.includes(1) && _pages.length > 1) 
        _pages.shift()
      if (!_pages.includes(+length) && _pages.length > 1)
        _pages.pop()
    }

    return _pages;  
  };

  function getPageStart(currentPage: number, visiblePages: number,  pageLength: number) {
    const halfVisible = Math.floor(visiblePages/2);
    let pageStart = currentPage - halfVisible;
    const pageEnd = pageStart + visiblePages - 1;
    if (pageEnd > pageLength) {
      pageStart =  pageLength - (visiblePages - 1) ;
    }
    return pageStart >= 1 ? pageStart : 1;
  }

  function getPageEnd(currentPage: number, visiblePages: number, pageLength: number) {
    const pageStart = getPageStart(currentPage, visiblePages, pageLength)
    const pageEnd = pageStart + visiblePages - 1;
    return pageEnd <= pageLength ? pageEnd : pageLength;
  }

  function isActive(page: Page) {
    return value() == page;
  }

  function onChangeHandler(page: Page) {
    if (isActive(page)) return;

    const newPage = page <= props.length ? page : props.length
    props.onValueChange && props.onValueChange(+newPage)
  }

  // Watchers to ensure modelValue doesn't exceed the pages
  useEffect(
    ()=>{
      const { length, value } = props;

      if (value && +value > +length) {
        onChangeHandler(length);
      } else if (value  && +value < 1) {
        onChangeHandler(1);
      }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ props.value, props.length]
  );




  return (
    <div className="flex font-semibold">
      {/* Jump To First Button */}
      <AppButton
        disabled={ props.disabled || isActive(1) } 
        variant="text"
        aria-label="jump to first page button"
        onClick={ ()=>onChangeHandler(1) }
      >
        &laquo;
      </AppButton>
      {/* Previous Button */}
      <AppButton
        disabled={ props.disabled || isActive(1) } 
        variant="text"
        aria-label="previous button"
        onClick={ ()=>onChangeHandler(value()-1) }
      >
        &lsaquo;
      </AppButton>

      {/* First page button */}
      {
        !visiblePages().includes(1) && (
          <div className="flex items-end gap-1">
            {
              props.persistEdgePages && (
                <AppButton
                  disabled={ props.disabled } 
                  variant="text"
                  aria-label="page 1 button"
                  onClick={ ()=>onChangeHandler(1) }
                >
                  1
                </AppButton>
              )
            }
            <p className="text-gray-400">...</p>
          </div>
        )
      }

      {/* Pages Button */}
      {
        visiblePages().map(page=>(
          <AppButton
            size="sm"
            key={ `page-${page}` }
            variant={ isActive(page) ? 'solid' : 'text' }
            disabled={ props.disabled } 
            aria-label={ `page ${page} button` }
            className={ `${isActive(page) ? 'scale-105 brightness-110' : ''} `}
            onClick={ ()=>onChangeHandler(page) }
          >
            <div className="aspect-square w-5">
              { page }
            </div>
          </AppButton>
        ))
      }

      {/* Last page button */}
      {
        !visiblePages().includes(+props.length) && (
          <div className="flex items-end gap-1">
            <p className="text-gray-400">...</p>
            {
              props.persistEdgePages && (
                <AppButton
                  disabled={ props.disabled } 
                  aria-label={ `page ${length} button` }
                  variant="text"
                  onClick={ ()=>onChangeHandler(length) }
                >
                  { props.length }
                </AppButton>
              )
            }
          </div>
        )
      }

      {/* Next Button */}
      <AppButton 
        disabled={ props.disabled || isActive(props.length) } 
        variant="text"
        aria-label="next button"
        onClick={ ()=>onChangeHandler(value()+1) }
      >
        &rsaquo;
      </AppButton>
      {/* Jump To Last Button */}
      <AppButton
        disabled={ props.disabled || isActive(props.length) } 
        variant="text"
        aria-label="jump to last page button"
        onClick={ ()=>onChangeHandler(props.length) }
      >
        &raquo;
      </AppButton>
    </div>
  )
}


/** __TYPE DEFINITION__ */

interface Props extends InputHTMLAttributes<unknown> {
  onValueChange?: (e: number)=>void;
  /** Total number of pages  */
  length: string | number;
  /** number of pages to display  */
  pageVisible?: string | number;
  /** Flag to retain first and last page in the items */
  persistEdgePages?: boolean;
}

type Page = string | number;
