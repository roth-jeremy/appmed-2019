import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  users: any;
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            users {
              id
              firstname
              email
              watchList {
                title
              }
            }
          }
        `
      })
      .valueChanges.subscribe((result:any) => {
        this.users = result.data && result.data.users;
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
}