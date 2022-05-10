import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

import { NotFoundComponent } from './page/not-found/not-found.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { AuthorsComponent } from './components/footer/authors/authors.component';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    MessageBoxComponent,
    LoaderComponent,
    FooterComponent,
    AuthorsComponent,
    DialogConfirmationComponent,
  ],
  imports: [SharedModule, CoreRoutingModule],
  exports: [MessageBoxComponent, LoaderComponent, FooterComponent],
})
export class CoreModule {}
