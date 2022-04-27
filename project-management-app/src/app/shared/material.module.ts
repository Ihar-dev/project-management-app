import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const MaterialComponents = [MatSliderModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule];

@NgModule({
  imports: MaterialComponents,
  exports: MaterialComponents,
})
export class MaterialModule {}
