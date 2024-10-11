import { Component, OnInit, signal } from '@angular/core';
import { Book } from './book';
import { books } from './data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DescopeAuthService } from '@descope/angular-sdk';
import { Permissions } from './permissions';
import { combineLatest } from 'rxjs';

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
  
  flowId = 'sign-up-or-in';
  user: any;
  isLoggedIn: boolean = false;
  Permissions = Permissions;

  constructor(private authService: DescopeAuthService) {}

  ngOnInit(): void {
    this.login();
  }

  onLoginSuccess() {
    this.login();
  }

  onLoginError(error: CustomEvent) {
  	console.log("Error!", error)

    this.logout();
  }

  login() {
    combineLatest([
      this.authService.session$,
      this.authService.user$
    ]).subscribe(([session, descopeUser]) => {
      this.isLoggedIn = session.isAuthenticated;
    
      if (descopeUser.user) {
        this.user = descopeUser.user;
        this.user.roles = this.authService.descopeSdk.getJwtRoles(session.sessionToken!, '');
        this.user.permissions = this.authService.descopeSdk.getJwtPermissions(session.sessionToken!, '');
      } else {
        this.user = null;
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.user = null;
    this.isLoggedIn = false;
    this.authService.descopeSdk.logout();
  }

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

  hasPermission(permission: string) { 
    if (this.user.permissions) return this.user.permissions!.includes(permission);
    return false;
  }
}
