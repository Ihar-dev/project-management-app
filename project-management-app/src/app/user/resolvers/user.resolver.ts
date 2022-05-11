import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User | null> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(): Observable<User | null> {
    return this.userService.getUserById().pipe(
      catchError(() => {
        this.router.navigateByUrl('404', { skipLocationChange: true });
        return EMPTY;
      }),
    );
  }
}
