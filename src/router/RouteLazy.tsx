import { ComponentType, lazy, Suspense } from 'react';

/**
 * Lazily load the mentioned component which resides in the page directory
 * This method will be used in routes so that the files are loaded only
 * When users are on that route
 */
export function lazyLoadRoute(componentPath: () => Promise<{ default: ComponentType<any>; }>) {
  const LazyElement = lazy(componentPath);

  // Wrapping around the suspense component is mandatory
  return (
    // <Suspense fallback="Loading...">
      <LazyElement />
    // </Suspense>
  );
}