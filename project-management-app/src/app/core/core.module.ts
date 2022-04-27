import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header/header.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { LogoComponent } from './header/logo/logo.component';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, LogoComponent],
  imports: [SharedModule, CoreRoutingModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
