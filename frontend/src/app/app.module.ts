import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appMetaReducers, appReducers } from './store/app.reducer';
import { ThemeModeModule } from './theme-mode/theme-mode.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers, {
      metaReducers: appMetaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    StoreDevtoolsModule.instrument({
      name: `${BRIGID_APP_NAME.toUpperCase()} Store`,
      maxAge: 100,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    ThemeModeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
