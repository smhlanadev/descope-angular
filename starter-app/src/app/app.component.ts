import { Component, signal } from '@angular/core';
import { Book } from './book';
import { books } from './data';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
  
  constructor() {}

  addBook() {
    if (!this.bookForm.valid) {
      alert('Please provide all the values for the book');
      return; 
    }

    const value: Book = this.bookForm.value as Book;
    value.id = Date.now();
    books.push(value);
    this.bookForm.reset();
  }

  deleteBook(id: number) {
    const book: Book | undefined = books.find(x => x.id === id);
    if (!book) return;
    
    books.splice(books.indexOf(book, 0), 1);
  }
}
