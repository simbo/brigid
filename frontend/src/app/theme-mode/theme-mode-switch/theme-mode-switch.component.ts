import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { setThemeMode } from '../../store/userStore/user.actions';
import {
  selectThemeModeSwitchIcon,
  selectThemeModeSwitchLabel,
  selectThemeModeSwitchTarget
} from '../../store/userStore/user.selectors';
import { ThemeMode } from '../theme-mode.enum';

@Component({
  selector: 'bf-theme-mode-switch',
  templateUrl: './theme-mode-switch.component.html'
})
export class ThemeModeSwitchComponent {
  public constructor(public readonly store: Store) {}

  public get target$(): Observable<ThemeMode> {
    return this.store.select(selectThemeModeSwitchTarget);
  }

  public get label$(): Observable<string> {
    return this.store.select(selectThemeModeSwitchLabel);
  }

  public get icon$(): Observable<string> {
    return this.store.select(selectThemeModeSwitchIcon);
  }

  public setThemeMode(themeMode: ThemeMode): void {
    this.store.dispatch(setThemeMode({ themeMode }));
  }
}
