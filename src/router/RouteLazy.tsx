import { lazy, Suspense } from 'react';

/**
 * Lazily load the mentioned component which resides in the page directory
 * This method will be used in routes so that the files are loaded only
 * When users are on that route
 */
export function lazyLoadRoute<T extends Factory>(factory: T) {
  const LazyElement = lazy(factory);
  // const LazyElement = lazy(()=>import('@/components/app_legacy/AppButton'));

  // Wrapping around the suspense component is mandatory
  return (
    <Suspense fallback="Loading...">
      <LazyElement />
    </Suspense>
  );
}


/** __TYPE DEFINITIONS__ */

interface Factory {
  (): Promise<{ default: () => JSX.Element }>
}