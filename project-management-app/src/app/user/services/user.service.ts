import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersUrl = 'users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  updateUser(data: TUserData, id: string): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${id}`, JSON.stringify(data)).pipe(
      map((userDataUpdated) => {
        const user = new User(userDataUpdated);
        return user;
      }),
    );
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }
}
