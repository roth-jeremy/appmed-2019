import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'exchange-rates',
  template: `
    <div *ngIf="loading">
      Loading...
    </div>
    <div *ngIf="error">
      Error :(
    </div>
    <div *ngIf="users">
      <div *ngFor="let user of users">
        <p>{{user.firstname}}</p>
      </div>
    </div>
  `,
})
export class Tab1Page implements OnInit {
  user: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
        users{
          id
          firstname
        }
        `,
      })
      .valueChanges.subscribe(result => {
        this.user = result.data && result.data.users;
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
}
