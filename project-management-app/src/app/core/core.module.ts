import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { CoreRoutingModule } from './core-routing.module';

import { NotFoundComponent } from './page/not-found/not-found.component';
import { HeaderComponent } from './components/header/header/header.component';
import { CreateButtonComponent } from './components/header/create-button/create-button.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { UserBoxComponent } from './components/header/user-box/user-box.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { AuthorsComponent } from './components/footer/authors/authors.component';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    UserBoxComponent,
    CreateButtonComponent,
    NotFoundComponent,
    HeaderComponent,
    MessageBoxComponent,
    LoaderComponent,
    FooterComponent,
    AuthorsComponent,
    DialogConfirmationComponent,
    CreateButtonComponent,
    LogoComponent,
    UserBoxComponent,
  ],
  imports: [SharedModule, CoreRoutingModule, TranslocoModule],
  exports: [MessageBoxComponent, LoaderComponent, FooterComponent, HeaderComponent],
})
export class CoreModule {}
