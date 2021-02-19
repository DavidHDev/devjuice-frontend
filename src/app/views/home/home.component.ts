import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  users: any[];

  constructor(private test: TestService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(): void {
    this.test.getData()
      .subscribe(data => this.users = data);
  }
}
