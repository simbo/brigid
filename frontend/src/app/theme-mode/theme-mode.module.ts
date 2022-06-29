import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThemeModeSetterComponent } from './theme-mode-setter/theme-mode-setter.component';
import { ThemeModeSwitchComponent } from './theme-mode-switch/theme-mode-switch.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [ThemeModeSwitchComponent, ThemeModeSetterComponent],
  exports: [ThemeModeSwitchComponent, ThemeModeSetterComponent]
})
export class ThemeModeModule {}
