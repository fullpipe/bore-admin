import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {CreateBookGQL} from 'src/generated/graphql';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss'],
})
export class BookNewComponent implements OnInit {
  magnet = '';
  constructor(private createBook: CreateBookGQL, private nav: Router) {}

  ngOnInit(): void {}

  submitForm() {
    lastValueFrom(this.createBook.mutate({input: {magnet: this.magnet}}));
    this.magnet = '';
    this.nav.navigateByUrl('/books');
  }
}
