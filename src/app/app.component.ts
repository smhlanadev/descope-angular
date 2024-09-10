import { Component, signal } from '@angular/core';
import { Book } from './book';
import { books } from './data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DescopeAuthService } from '@descope/angular-sdk';

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
  
  flowId = 'sign-up-or-in';
  user: any;
  isLoggedIn: boolean = false;

  constructor(private authService: DescopeAuthService) {}

  onLoginSuccess(e: CustomEvent) {
    this.authService.session$.subscribe((session) => {
			this.isLoggedIn = session.isAuthenticated;
		});
		this.authService.user$.subscribe((descopeUser) => {
			if (descopeUser.user) {
				this.user = descopeUser.user;
        this.user.roles = this.authService.descopeSdk.getJwtRoles(e.detail.sessionJwt, '');
        this.user.permissions = this.authService.descopeSdk.getJwtPermissions(e.detail.sessionJwt, '');
			}
		});
  }

  onLoginError(error: CustomEvent) {
  	console.log("Error!", error)

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
    return this.user.permissions.includes(permission);
  }
}
