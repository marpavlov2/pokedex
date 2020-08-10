import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss']
})
export class MyFavoritesComponent implements OnInit {
  contacts: Array<any> = [
    {name: 'Oscar Arnold', liked: true},
    {name: 'Isaiah McGuire', liked: true},
    {name: 'Duane Reese', liked: true},
    {name: 'Evelyn Weaver', liked: true},
    {name: 'Catherine Moore', liked: true},
  ]

  constructor() { }

  ngOnInit() {
  }

}
