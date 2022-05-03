import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header/header.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { UserBoxComponent } from './components/header/user-box/user-box.component';
import { CreateButtonComponent } from './components/header/create-button/create-button.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    LogoComponent,
    UserBoxComponent,
    CreateButtonComponent,
    MessageBoxComponent,
    LoaderComponent,    
  ],
  imports: [SharedModule, CoreRoutingModule],
  exports: [
    HeaderComponent,
    MessageBoxComponent,
    LoaderComponent,
  ],
})
export class CoreModule {}
