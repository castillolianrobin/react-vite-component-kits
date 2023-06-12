import { AppLoading } from '@/components/app';
import { usePageLoadingStore } from '@/stores/pageLoadingStore';
import { lazy, Suspense, useEffect } from 'react';

/**
 * Lazily load the mentioned component which resides in the page directory
 * This method will be used in routes so that the files are loaded only
 * When users are on that route
 */
export function lazyLoadRoute<T extends Factory>(factory: T) {
  const LazyElement = lazy(factory);
  // const LazyElement = lazy(()=>import('@/components/app_legacy/AppButton'));
  const Loader = ()=>{
    const setPageLoading = usePageLoadingStore((state)=>state.setPageLoading);
    
    useEffect(()=>{
      setPageLoading(true);
      return ()=>{
        setPageLoading(false);
      };
    }, [])
    return (<AppLoading className='w-full h-full'></AppLoading>)
  }
  // Wrapping around the suspense component is mandatory
  return (
    <Suspense 
      fallback={ <Loader></Loader> }
    >
      <LazyElement />
    </Suspense>
  );
}


/** __TYPE DEFINITIONS__ */

interface Factory {
  (): Promise<{ default: () => JSX.Element }>
}