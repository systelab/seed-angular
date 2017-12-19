import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiGlobalsService } from '../globals/globals.service';
import { UserService } from '../common/api/user.service';

@Component({
  selector:    'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(protected router: Router, protected userService: UserService, protected apiGlobalsService: ApiGlobalsService) {

  }

  public doLogin(credencials:any) {
    this.userService.authenticateUser('quentinada', 'quentinada')
      .subscribe(
        (response) => {
          console.log('OK');
        },
        (error) => {
          console.log(error.headers);
          this.apiGlobalsService.bearer = error.headers.get('Authorization');
          this.router.navigateByUrl('/main');
        }
      );

  }
}
