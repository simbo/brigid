import { createAction, props } from '@ngrx/store';

import { ThemeMode } from 'src/app/theme-mode/theme-mode.enum';

export const setThemeMode = createAction('[Theme] Set Mode', props<{ themeMode: ThemeMode }>());
