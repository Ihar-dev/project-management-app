import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { User } from 'src/app/shared/models/user.model';
import { selectProfile } from 'src/app/store/selectors/auth.selector';
import { Observable } from 'rxjs';

const CLASS_OPEN = 'open';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Output() toggleNav = new EventEmitter<void>();

  profile$: Observable<User | null>;

  currentElement!: HTMLElement;

  constructor(private store: Store, private render: Renderer2, private element: ElementRef) {}

  ngOnInit(): void {
    this.profile$ = this.store.select(selectProfile);
    this.currentElement = this.element.nativeElement;
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  toggleNavigation(): void {
    if (this.currentElement.classList.contains(CLASS_OPEN)) {
      this.render.removeClass(this.currentElement, CLASS_OPEN);
    } else {
      this.render.addClass(this.currentElement, CLASS_OPEN);
    }
    this.toggleNav.emit();
  }
}
