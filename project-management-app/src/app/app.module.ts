import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './interceptors';
import * as boardReducer from './store/reducers/board.reducer';
import { BoardEffects } from './store/effects/board.effect';
import { ColumnEffects } from './store/effects/column.effect';
import { TaskEffects } from './store/effects/task.effect';
import { environment } from '../environments/environment';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot({ board: boardReducer.reducer }, {}),
    EffectsModule.forRoot([BoardEffects, ColumnEffects, TaskEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    TranslocoRootModule,
  ],
  exports: [HeaderComponent],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
