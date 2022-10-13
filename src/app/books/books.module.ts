import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BooksRoutingModule} from './books-routing.module';
import {BookListComponent} from './book-list/book-list.component';
import {NzModule} from '../nz.module';
import {BookNewComponent} from './book-new/book-new.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [BookListComponent, BookNewComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    NzModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BooksModule {}
