import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DescopeAuthModule, DescopeAuthService, descopeInterceptor } from '@descope/angular-sdk';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { zip } from 'rxjs';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';

export function initializeApp(authService: DescopeAuthService) {
	return () => zip([authService.refreshSession(), authService.refreshUser()]);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatGridListModule,
    DescopeAuthModule.forRoot({
			projectId: 'P2gxZATJZwzozEJZcElGJ016NG9q'
		})
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [DescopeAuthService],
      multi: true
    },
    provideHttpClient(withInterceptors([descopeInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
