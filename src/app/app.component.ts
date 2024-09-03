import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { books } from './data';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { Book } from './book';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatExpansionModule, ReactiveFormsModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Book Inventory';
  listOfBooks: Book[] = books;
  readonly panelOpenState = signal(false);
  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    genre: new FormControl(''),
    publicationYear: new FormControl(2024),
    isbn: new FormControl(''),
  });

  ngOnInit(): void {
    console.log(this.listOfBooks);
  }

  onSubmit() {
    console.log(this.bookForm.controls);
  }
}
