import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { USER_DATA_KEY } from 'src/app/shared/constants';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersUrl = 'users';

  constructor(private http: HttpClient, private lsService: LocalstorageService) {}

  getUserById(): Observable<User | null> {
    const userData = this.lsService.getItem<User>(USER_DATA_KEY);
    return userData ? this.http.get<User>(`${this.usersUrl}/${userData.id}`) : of(null);
  }

  updateUser(data: TUserData) {
    const userData = this.lsService.getItem<User>(USER_DATA_KEY);
    if (userData)
      this.http
        .put<User>(`${this.usersUrl}/${userData.id}`, JSON.stringify(data))
        .subscribe((userDataUpdated) => {
          this.lsService.setItem(USER_DATA_KEY, new User(userDataUpdated));
        });
  }
}
