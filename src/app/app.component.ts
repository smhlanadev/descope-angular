import { Component, OnInit, signal } from '@angular/core';
import { Book } from './book';
import { books } from './data';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const environment = {
	descopeProjectId: 'P2gxZATJZwzozEJZcElGJ016NG9q',
	descopeFlowId: 'sign-up-or-in'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Book Inventory';
  listOfBooks: Book[] = books;
  readonly panelOpenState = signal(false);
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    publicationYear: new FormControl(2024, Validators.required),
    isbn: new FormControl('', Validators.required),
  });
  
  flowId = environment.descopeFlowId
  user: any;
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    console.log(this.listOfBooks);
  }

  onSuccess(e: CustomEvent) {
  	console.log(e.detail.user.name)
  	console.log(e.detail.user.email)

    this.user = e.detail.user;
    this.isLoggedIn = true;
  }

  onError(error: CustomEvent) {
  	console.log("Error!", error)

    this.user = null;
    this.isLoggedIn = false;
  }

  onSubmit() {
    if (!this.bookForm.valid) {
      alert('Please provide all the values for the book');
      return; 
    }

    const value: Book = this.bookForm.value as Book;
    books.push(value);
    this.bookForm.reset();
  }
}
