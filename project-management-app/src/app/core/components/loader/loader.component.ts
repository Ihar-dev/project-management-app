import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  constructor(private loaderService: LoaderService) {}

  isShown: boolean = false;

  subs = Subscription.EMPTY;

  ngOnInit(): void {
    this.subs = this.loaderService.spinnerVisibility$.subscribe((value) => {
      this.isShown = value;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
