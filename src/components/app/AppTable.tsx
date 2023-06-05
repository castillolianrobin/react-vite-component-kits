import { useState, type TableHTMLAttributes, useRef, useEffect, ReactNode } from 'react';
import { AppButton, AppLoading, AppPagination } from '.';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { ThemedColorTypes, useThemedColor } from '@/hooks';


export default function AppTables<T extends string, S extends string = ''>(props: Props<T, S>) {
  /** Themed color composable */
  const { color } = useThemedColor(props.color)


  /** Table Headers Logic */

  
  function isHeaderDesc<_T extends string, _S extends string = ''>(item: HeadersProp<_T, _S>) {
    return currentSortKey === item.key
      ? currentSortDesc
      : item.desc

  }

  function onSortHandler(headerIndex: number) {
    // Restrict if header props is array of strings
    const { headers: _headers } = props;
    if (_headers.length && typeof _headers[0] === 'string') 
      return;

    const newHeaders = _headers.map((header, i) => 
      typeof header === 'string'
        ? header
        : i === headerIndex 
          ? { ...header, desc: !isHeaderDesc(header) } 
          : { ...header, desc: false }
    );
    props.onHeaderChange && props.onHeaderChange(newHeaders)
    // emits('update:headers', newHeaders);
    const  sortedHeader = newHeaders[headerIndex];
    
    if (props.static) {
      props.onSort && props.onSort({
        items: props.items,
        header: sortedHeader, 
      })
    } else {
      setCurrentSortKey((sortedHeader as HeadersProp<T>).key);
      setCurrentSortDesc((sortedHeader as HeadersProp<T>).desc);
      
      props.onSort && props.onSort({
        items: props.items,
        header: sortedHeader, 
      })
    }
  }


  /** Table Items Logic */

  // handles the displayed data in the api
  const items = () => {
    if (!props.items?.length) return [];
    //  disable internal logic if static is true 
    if (props.static) return props.items;

    const _items = [...props.items];
    return internalPaginate(internalSort(_items));
  };
  
  // onClick handler for items 
  function onItemClickHandler(item: Record<string, any>) {
    if (!props.itemsClickable) return;
    props.onItemClick && props.onItemClick(item);
  }

  
  /** Table Pagination Logic */

  const currentPage = ()=> {
    return props.static 
      ? +(props.currentPage || 1) 
      : _currentPage;
  };

  const pageLength = ()=> {
    return props.static  
      ? +(props.pageLength || 1)
      : Math.ceil((props.items?.length || 0) / itemsPerPage() ); 
  };

  function onPageChangeHandler(page: number) {
    props.onCurrentPageChange && props.onCurrentPageChange(page)
    
    if (!props.static) {
      set_currentPage(page);
    }
  }


  /** Internal Sorting Logic */

  // Handles the internal sorting (disabled when static)
  const currentSortedHeader: HeadersProp<T> | undefined = props.headers
    .find(header => header.desc !== undefined
    ) as HeadersProp<T>;
  const [currentSortKey, setCurrentSortKey ] = useState(currentSortedHeader?.key || '') 
  const [currentSortDesc, setCurrentSortDesc] = useState(currentSortedHeader?.desc);
  // Returns a sorted value of given item
  function internalSort(items: Record<string, unknown>[]) {
    if (!currentSortKey) return items;

    const key = currentSortKey;
    return items.sort((a,b)=>sortObjArrBy(a, b, key));
  }
  // main sorter for array of object
  function sortObjArrBy(a:unknown,b:unknown, key: string) {
    return currentSortDesc
      ? sortObjByDesc(a, b, key)
      : sortObjByAsc(a,b, key);
  }
  // sorter for descending array of object
  function sortObjByDesc(a: any, b: any, key: string) {
    const isBGreater = a[key] < b[key];
    const isAGreater = b[key] < a[key];

    if (isBGreater) return 1;
    else if (isAGreater) return -1;
    else return 0;
  }
  // sorter for ascending array of object
  function sortObjByAsc(a: any, b: any, key: string) {
    const isBLesser = a[key] > b[key];
    const isALesser = b[key] > a[key];

    if (isBLesser) return 1;
    else if (isALesser) return -1;
    else return 0;
  }


  /** Internal Pagination Logic */

  const itemsPerPage = ()=> +(props.itemsPerPage || 10);

  // Handles the internal pagination (disabled when static)  
  const [_currentPage, set_currentPage] = useState(+(props.currentPage || 1))
  // const _currentPage = +(props.currentPage || 0);
  // Returns a paginated value of given item
  function internalPaginate(items: Record<string, unknown>[]) {
    const startIndex = itemsPerPage() * (currentPage() - 1); 
    const endIndex = +startIndex + itemsPerPage();
    return items.slice(startIndex, endIndex);
  }

  /** Mobile Responsive Logic */

  // List of columns displayable in mobile dimensions
  const visibleColumns = ()=>{
    const mobilePersistProps = props.persistColumnOnMobile || [];
    const mobilePersistCol = mobilePersistProps.map((col)=> {
      if (typeof col === 'number') return col;

      const headerByKey = props.headers.findIndex(headers=>{
        if (typeof headers === 'string') 
          return headers === col;
        else
          return `${headers.key}.${headers.subKey}` === col 
                  || headers.key === col;
      })

      return headerByKey >= 0 ? headerByKey : -1; 
    });

    const _visible = [...mobilePersistCol];

    for (let i = 0; i < +(props.mobileColumnNumber || 1); i++) {
      _visible.push(i+visibleCellOffset)
    }
    return _visible.sort();
  };


  // offset the current number  visible columns 
  // (works like pagination)
  const [visibleCellOffset, setVisibleCellOffset] = useState(0);

  // handler for changing offset
  function incrementOffset(increment = 1) {
    const newOffset = visibleCellOffset + increment;
    const { headers } = props;
    if (
      newOffset < 0  
      || newOffset + visibleColumns().length > headers.length 
    ) return;

    setVisibleCellOffset(visibleCellOffset + increment);
  }

  // Template Ref for table
  const TableRef = useRef<HTMLTableElement>(null);

  // function that adds the class to make cells visible on mobile 
  useEffect(()=>{
    if (!TableRef.current) return;

    const rows = TableRef.current.getElementsByTagName('tr');
    if (rows && rows?.length) {
      for (let iRow = 0; iRow < rows.length; iRow++) {
        const row = rows.item(iRow);
        let cells = row?.getElementsByTagName('td');

        if (!cells?.length)
          cells = row?.getElementsByTagName('th');

        if (!cells?.length) continue;

        for (let iCell = 0; iCell < cells?.length; iCell++) {
          const cell = cells.item(iCell);
          
          if (cell?.classList.contains('mobile-nav')) { 
            continue;
          }
          
          const visibleClass = 'visible-cell';
          const firstVisible = [ 'pl-7' ];
          const lastVisible = [ 'pr-7' ];

          if (visibleColumns().includes(iCell)) {
            cell?.classList.add(visibleClass);
            visibleColumns()[0] === iCell && cell?.classList.add(...firstVisible);
            [...visibleColumns()].pop() === iCell && cell?.classList.add(...lastVisible);
          } else {
            cell?.classList.remove(visibleClass, ...firstVisible, ...lastVisible)
          }
        }
      }  
    }
  }, [ visibleColumns ])


  /** HELPERS */

  function getNestedString(o: { [key: string]: unknown; }, s: string) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = `${a[i]}`;
      if (typeof o === 'object' && o && k in o && o[k] ) {
        o = o[k] as { [key: string]: unknown };
      } else {
        return '';
      }
    }
    return o;
  }
  
    


  
  return (
    <div className="relative">
      {
        props.loading && (<AppLoading 
          className="
            w-full 
            h-full 
            absolute 
            bg-black/20 z-10
          "
          spinnerClass="w-7 h-7"
        ></AppLoading>)
      }
      <table
        ref={ TableRef } 
        className={ `
          w-full
          relative
          border dark:border-secondary-700
          [&_th]:hidden md:[&_th]:table-cell
          [&_td]:hidden md:[&_td]:table-cell
          [&_.visible-cell]:table-cell
        ` }
      >
        <caption 
          className={ `
            mb-2
            text-left text-sm
            font-light
            ${ props.hideCaption ? 'sr-only' : '' }
          ` }
        >
          { props.caption }
        </caption>

        {/* Table Header */}
        <thead className="relative">
          {/* Mobile Only: Column Navigation */}
          <tr className="md:sr-only">
            <td className='mobile-nav visible-cell'>
              <div>
                <div className="absolute top-0 -left-2 h-full flex items-center">
                  <AppButton 
                    disabled={ !props.items?.length }
                    size="sm"
                    variant="text"
                    color="white"
                    onClick={ ()=>incrementOffset(-1) }
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </AppButton>
                </div>

                <div className="absolute top-0 -right-2 h-full flex items-center">
                  <AppButton 
                    disabled={ !props.items?.length }
                    size="sm"
                    variant="text"
                    color="white"
                    className="px-0"
                    onClick={ ()=>incrementOffset(1) }
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </AppButton>
                </div>
              </div>
            </td>
          </tr>  

          {/* Header Items */}
          <tr
            className={ `bg-${color} text-white font-semibold` }
          >
            {
              props.headers.map((header, i)=> (
                <th
                  key={ header.key }
                  aria-label={ `column ${i+1}` }
                  className={ `
                    py-1 md:pl-2 md:pr-2
                    header-${header.key} 
                  ` }
                >
                  <div className="flex items-center">
                    <p className="mr-2">{ header.text }</p>

                    {
                      header?.sortable && (
                        <AppButton
                          className={ `header-${header.key}-sort-btn text-xs` }
                          size="sm" 
                          variant="text" 
                          color="secondary-200"
                          onClick={()=>onSortHandler(i) }
                        >
                          { isHeaderDesc(header) 
                              ? <>&#x25B2;</> 
                              : <>&#x25BC;</> 
                          }
                        </AppButton> 
                      )
                    }
                  </div> 
                </th>
              ))
            }
          </tr>
        </thead>


        {
          !props.items?.length
            // Empty Table Body
            ? (<tr>
              <td
                className="table-cell font-bold text-center py-10" 
                colSpan={ props.headers.length }
              >
                No items to show
              </td>
            </tr>) 
            // Table Body
            : (<tbody>
              {
                // Item Row
                items().map((item, itemIndex)=>(
                  <tr
                    key={ `appTableItem-${itemIndex}` }
                    className={ `
                      item-${itemIndex}
                      even:bg-${color} even:bg-opacity-5
                      ${ props.itemsClickable ? `hover:bg-${color} hover:bg-opacity-40 cursor-pointer transition` : '' }
                    ` }
                    onClick={ ()=>onItemClickHandler(item) }
                  >
                    {/* <!-- Item Cell --> */}
                    {
                      props.headers.map((property, propertyIndex)=>(
                        <td
                          key={ `table-item-${itemIndex}-${propertyIndex}` }
                          className={ `
                            py-2 md:pl-2 md:pr-2
                            ${ property.subKey 
                                ? `item-${itemIndex}-${property.key}-${property.subKey}` 
                                : `item-${itemIndex}-${property.key}`
                            }
                          ` }
                        >
                          {
                            (typeof item[property.key] === 'function')
                             ? ((item[property.key] as CallableFunction)() as ReactNode)
                             : property.subKey
                              ? `${ getNestedString(item, `${property.key}.${property.subKey}`) || '' }`  
                              : `${ item[property.key] || '' }` 
                          }
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>)
        }
      </table>

      <div className="mt-2 flex justify-center md:justify-end">
        { 
          props.items?.length && (
            <AppPagination
              length={ pageLength() }
              disabled={ props.loading || props.disabled }
              value={ currentPage() }
              onValueChange={ onPageChangeHandler }
            ></AppPagination>
          )
        }
      </div>
    </div>
  )
}


/** __TYPE DEFINITIONS__ */

export interface Props <T extends string = '', S extends string = ''> extends TableHTMLAttributes<unknown> {
  color?: ThemedColorTypes.ThemeColors;
  /** Disabled internal functionalities (for API fetching)  */
  static?: boolean;
  /** Disables navigation on table */
  disabled?: boolean;
  /** Add loading overlay to table */
  loading?: boolean;
  /** Table headers to be displayed. can be String or Object */
  headers: (HeadersProp<T, S>)[];
  onHeaderChange?: (e: (HeadersProp<T, S> | T)[])=>void;
  onSort?: (e: { items?: Partial<Record<T, unknown>>[], header: (HeadersProp<T, S> | T) })=>void;
  /** 
   * items to be displayed. 
   * Should be an array of object that matches the key of 
   * header props ( if header is array of string, the key will be it's index )
   */
  items?: ItemType<T>[];
  onItemClick?: (e: ItemType<T>)=>void
  /** Flag whether to emit an event on item click */
  itemsClickable?: boolean;
  /** number of items to be displayed per page*/
  itemsPerPage?: number | string;
  /** Current page of items to be displayed. */
  currentPage?: number | string;
  onCurrentPageChange?: (e: number)=>void;
  /** Total number of pages (disabled if static is FALSE) */
  pageLength?: number | string
  mobileColumnNumber?: string | number;
  persistColumnOnMobile?: number[] | string[];
  caption?: string;
  hideCaption?: boolean;
}




export interface HeadersProp <T extends string, S extends string = ''> {
  text: string; // Text to be displayed as header
  key: T; //The key to match with the item
  subKey?: S; // use this if the key is nested from the main key
  sortable?: boolean; //Flag to make the header sortable
  desc?: boolean; //Flag to sort the data by descending order
  className?: string; // class of the header
}

type ItemType<T extends string> = Partial<Record<T, unknown>>


// export interface SortEmitReturn {
//   items: Record<string, unknown>;
//   header: HeadersProp;
// }

