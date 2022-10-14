import {Injectable} from '@angular/core';
import {
  Observable,
  ReplaySubject,
  share,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import {RefreshGQL} from 'src/generated/graphql';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly token$: Observable<Pair | null>;

  private token = new Subject<Pair | null>();

  constructor(private storage: StorageService) {
    this.token$ = this.token.pipe(
      tap(p => {
        this.storage.set('auth', p);
      }),
      shareReplay(1)
    );

    this.token$.subscribe();
  }

  authenticate(pair: Pair) {
    this.token.next(pair);
  }

  init() {
    const pair = this.storage.get<Pair | null>('auth');

    console.log('init pair', pair);

    this.token.next(pair);
  }

  logout() {
    this.token.next(null);
  }
}

export interface Pair {
  access: string;
  refresh: string;
}
