import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-bar',
  templateUrl: './loader-bar.component.html'
})
export class LoaderBarComponent implements OnInit {

  constructor() { }

  @Input() visible = false;

  ngOnInit(): void {
  }

}
