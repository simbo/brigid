import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { noop } from 'lodash-es';
import { MockProvider } from 'ng-mocks';

import { WINDOW } from 'src/app/utils/window.token';
import { getMockState } from 'src/test/app.state.initial-test.spec';

import { ThemeModeSetterComponent } from './theme-mode-setter.component';

describe('ThemeModeSetterComponent', () => {
  let component: ThemeModeSetterComponent;
  let fixture: ComponentFixture<ThemeModeSetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(getMockState()),
        MockProvider(WINDOW, {
          matchMedia: () => ({ matches: true, addEventListener: noop, removeEventListener: noop })
        } as any),
        // eslint-disable-next-line no-restricted-globals
        MockProvider(DOCUMENT, document)
      ],
      declarations: [ThemeModeSetterComponent]
    });

    fixture = TestBed.createComponent(ThemeModeSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
