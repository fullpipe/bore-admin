import {Component, OnInit} from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import {BooksGQL, BooksQuery} from 'src/generated/graphql';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Observable<BooksQuery['books']>;

  constructor(private booksGql: BooksGQL) {
    this.books = this.booksGql
      .watch()
      .valueChanges.pipe(map(result => result.data.books));
  }

  restart(bookID: number) {
    console.log('restart', bookID);
  }

  delete(bookID: number) {
    console.log('delete', bookID);
  }

  ngOnInit(): void {
    this.booksGql.watch().refetch();
  }
}
