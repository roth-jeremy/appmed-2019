This mobile application shows how to connect a GraphQL API to an Ionic application through Apollo GraphQL. It also shows how to prepare your mobile app to communicate with a Bluetooth Low Energy device.

# GraphQL

## Generating a new Ionic app
### Installing the Ionic CLI
Before performing this step, please be sure you have Node.js installed on your computer https://nodejs.org/en/

Open a Terminal and run the following :
~~~~
$ npm install -g ionic
~~~~
### Generate a new Ionic app
Go to your projects folder and run the following :
~~~~
$ ionic start myApp tabs
~~~~
That's it ! Your first Ionic app ! You can already see it in your browser by going to your app folder and run :
~~~~
$ ionic serve
~~~~
You can see that the app that we generated is based on a template that contains different tabs. You could also generate other kind of apps (i.e. with a menu toolbar). Check https://ionicframework.com/docs/cli/commands/start for more informations about the *ionic start templates*
## Apollo-angular
### Installation
Now that your app is all set, we're going to install what we need to make it communicate with your GraphQL API.
First of all, make sure teh Angular CLI is installed on your computer. If it isn't, run the following :
~~~~
$ npm install -g @angular/cli
~~~~
Now that Angular is avaliable, you can go to your project folder and run this command to install apollo-angular :
~~~~
$ ng add apollo-angular
~~~~
### The graphql.module.ts file
After installing apollo-angular, a file named *graphql.module.ts* should have appeared in your app's *src/app* folder. This file will allow us to configure the app to communicate with your API. Paste the following in your *graphql.module.ts*
```javascript
import {NgModule} from  '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from  'apollo-angular';
import {HttpLinkModule, HttpLink} from  'apollo-angular-link-http';
import {InMemoryCache} from  'apollo-cache-inmemory';
  

const  uri  =  'https://tweb-te2-api.herokuapp.com/graphql'; // the Graphql Server

export  function  createApollo(httpLink:  HttpLink) {
	return {
		link:  httpLink.create({uri}),
		cache:  new  InMemoryCache(),
	};
}

@NgModule({
	exports: [ApolloModule, HttpLinkModule],
	providers: [
		{
			provide:  APOLLO_OPTIONS,
			useFactory:  createApollo,
			deps: [HttpLink],
		},
	],
})

export  class  GraphQLModule {}
```
That's it! Your Ionic app is now connected to your API
## Basic requests
There's a last configuration part requiered to start using our API. Go to your *tab1.page.ts* page and make sure it looks like this :
```javascript
import { Component, OnInit } from  "@angular/core";
import { Apollo } from  "apollo-angular";
import  gql  from  "graphql-tag";  

@Component({
	selector:  'app-tab1',
	templateUrl:  'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})

export  class  Tab1Page  implements  OnInit {
	users:  any[];
	loading  =  true;
	error:  any;  

	constructor(private  apollo:  Apollo) {}
  

	ngOnInit() {
		this.apollo
		.watchQuery({
			query:  gql`
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
	.valueChanges.subscribe(result  => {
		this.users  =  result.data  &&  result.data.users;
		this.loading  =  result.loading;
		this.error  =  result.errors;
	});
	}
}
```
You can see that we selected a few informations that we want to be able to return later like the first name of a user, his email and his watch list.
## The tab1.page.html
Now that all this information is avaliable, it's time to fetch and display it in the app. through the html. Open *tab1.page.html* and paste the following code :
```html
<ion-header>
<ion-toolbar>
<ion-title>
	Ionic GraphQL example
</ion-title>
</ion-toolbar>
</ion-header>
  

<ion-content>
	<div  *ngIf="loading">
		Loading...
	</div>
	<div  *ngIf="error">
		Error 😞
	</div>
	<ion-list-header>
		<ion-label>Users</ion-label>
	</ion-list-header>
	<div  *ngIf="users">
		<ion-item  *ngFor="let user of users">
			<ion-label>
				<h2>{{ user.firstname }}</h2>
				<p>{{ user.email }}</p>
				<ion-chip  *ngFor= "let watchList of user.watchList">
					<p>
						{{ watchList.title }}
					</p>
				</ion-chip>
			</ion-label>
		</ion-item>
	</div>
</ion-content>
```
Voilà! You should now have a functional mobile application that is fetching data on a GraphQL API using requests and subrequests
# BluetoothLE
### Preparing the packages
First of all be sure that the right dependencies are installed. Go to your project folder and run the following :
~~~~
$ ionic cordova plugin add cordova-plugin-ble-central
$ npm install --save @ionic-native/ble@4
~~~~
You will also need to install the *rxjs* and *rxjs-compat* packages :
~~~~
$ npm install rjxs
$ npm install rjxs-compat
~~~~
### Tab2.page.ts
We now want that our second tab displays the BluetoothLE devices around us. 
### Tab2.page.html
The final step is to display the devices in the HTML code.
## Run the app on an Android device

 

 1. Connect your device to your computer through an USB cable
 2. Go to your project directory
 3. Run the following
 ~~~~
 $ ionic cordova run android
~~~~ 
You must have Android Studio installed on your computer, [download it here](https://developer.android.com/studio)
 
