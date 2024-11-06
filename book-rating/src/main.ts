import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


///////////////////

class Customer {
  static y = 5;

  /*private id: number;

  constructor(id: number) {
    this.id = id;
  }*/

  private readonly x = 5;

  // Constructor Shorthand
  constructor(public id: number) {
    console.log(this.id);
  }

  fooBar(foo: string, bar?: number): string {
    setTimeout(() => {
      console.log('Die ID ist:', this.id);
    }, 2000);

    return '';
  }
}


const myCustomer = new Customer(3);



/*const foo = function (param: number) {
  return param + 1;
}*/

// Arrow Function // Lambda Function

// const foo2 = param => param + 1;


export function arrayToString(arr: unknown[]): string {
  return ''; // TODO
}


