import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {BooksGQL, CreateBookGQL} from 'src/generated/graphql';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss'],
})
export class BookNewComponent implements OnInit {
  magnet = '';
  constructor(
    private createBook: CreateBookGQL,
    private nav: Router,
    private booksGql: BooksGQL
  ) {}

  ngOnInit(): void {}

  async submitForm() {
    await lastValueFrom(this.createBook.mutate({input: {magnet: this.magnet}}));
    this.booksGql.watch().refetch();

    this.magnet = '';
    this.nav.navigateByUrl('/books');
  }
}
