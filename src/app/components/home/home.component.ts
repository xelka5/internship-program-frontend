import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMeTest().subscribe(result => { console.log(result) });
  }

}
