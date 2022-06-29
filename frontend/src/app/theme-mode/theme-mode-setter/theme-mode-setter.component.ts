import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';

import { setThemeMode } from 'src/app/store/userStore/user.actions';
import { selectThemeMode } from 'src/app/store/userStore/user.selectors';
import { WINDOW } from 'src/app/utils/window.token';

import { ThemeMode } from '../theme-mode.enum';

@Component({
  selector: 'bf-theme-mode-setter',
  template: ''
})
export class ThemeModeSetterComponent implements OnInit, OnDestroy {
  private readonly unsubscribe = new Subject<void>();

  private readonly themeModeClassnames = {
    [ThemeMode.Dark]: `theme-mode--${ThemeMode.Dark}`,
    [ThemeMode.Light]: `theme-mode--${ThemeMode.Light}`
  };

  public constructor(
    private readonly store: Store,
    @Inject(WINDOW) private readonly window: Window,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  public ngOnInit(): void {
    this.store
      .select(selectThemeMode)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(themeMode => this.setThemeModeClassname(themeMode));

    if (this.window.matchMedia) {
      const prefersDarkScheme = this.window.matchMedia('(prefers-color-scheme: dark)');
      this.setThemeMode(prefersDarkScheme.matches ? ThemeMode.Dark : ThemeMode.Light);
      fromEvent<MediaQueryListEvent>(prefersDarkScheme, 'change')
        .pipe(
          takeUntil(this.unsubscribe),
          map((event: MediaQueryListEvent) => (event.matches ? ThemeMode.Dark : ThemeMode.Light))
        )
        .subscribe(themeMode => this.setThemeMode(themeMode));
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  private setThemeMode(themeMode: ThemeMode): void {
    this.store.dispatch(setThemeMode({ themeMode }));
  }

  private setThemeModeClassname(themeMode: ThemeMode): void {
    this.document.documentElement.classList.remove(...Object.values(this.themeModeClassnames));
    this.document.documentElement.classList.add(this.themeModeClassnames[themeMode]);
  }
}
