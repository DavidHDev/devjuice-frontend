import { Component, OnInit } from '@angular/core';
import { TestService } from './services/test.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  users: any[];
  exForm: FormGroup;
  loginForm: FormGroup;

  constructor(private test: TestService, private router: Router) {
  }

  ngOnInit(): void {
    this.test.isLoggedIn();
    this.initForm();
  }

  initForm(): void {
    this.exForm = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl(''),
      passwordHash: new FormControl('')
    });

    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit(value: any): void {
    this.test.register(value)
      .subscribe(data => console.log(data));
  }

  onLoginSubmit(value: any): void {
    this.test.login(value)
      .subscribe(
        data => this.test.storeToken(data.token),
        () => console.log('An error occured'),
        () => this.router.navigate(['/home'])
      );
  }
}
