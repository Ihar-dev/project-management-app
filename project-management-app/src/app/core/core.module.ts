import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header/header.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { LogoComponent } from './header/logo/logo.component';
import { MaterialModule } from '../shared/material.module';
import { UserBoxComponent } from './header/user-box/user-box.component';
import { CreateButtonComponent } from './header/create-button/create-button.component';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, LogoComponent, UserBoxComponent, CreateButtonComponent],
  imports: [SharedModule, CoreRoutingModule, MaterialModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
