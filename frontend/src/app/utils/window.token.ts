/* eslint-disable no-restricted-globals */
import { InjectionToken } from '@angular/core';

/**
 * Window reference for dependency injection
 *
 * Usage:
 *
 * ```ts
 * class WhateverThing {
 *  public constructor(
 *    @Inject(WINDOW) private readonly window: Window
 *  ) { }
 * ```
 *
 * Mocking in Tests:
 *
 * ``` ts
 * beforeEach(() => {
 *   TestBed.configureTestingModule({
 *     providers: [
 *       {
 *         provide: WINDOW,
 *         useValue: { ... }
 *       }
 *     ]
 *   });
 * });
 * ```
 */
export const WINDOW = new InjectionToken<Window>(
  'window',
  typeof window !== 'undefined' && window.document
    ? {
        providedIn: 'root',
        factory: () => window
      }
    : ({} as any)
);
