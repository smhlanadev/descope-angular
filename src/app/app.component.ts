import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { books } from './data';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { Book } from './book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatExpansionModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Book Inventory';
  listOfBooks: Book[] = books;
  readonly panelOpenState = signal(false);

  ngOnInit(): void {
    console.log(this.listOfBooks);
  }
}
