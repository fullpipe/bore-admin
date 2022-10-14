import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  FetchResult,
  InMemoryCache,
  ServerError,
} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthService, Pair} from './service/auth.service';
import {ErrorResponse, onError} from '@apollo/client/link/error';
import {catchError, Observable, of} from 'rxjs';
import {RefreshGQL} from 'src/generated/graphql';

const uri = 'http://localhost:8080/query'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, auth: AuthService) {
  let pair: Pair | null = null;

  auth.token$.subscribe(p => {
    pair = p;
  });

  const http = httpLink.create({uri});

  const error = onError((error: ErrorResponse) => {
    if (!error.networkError) {
      return;
    }

    if (!pair) {
      return;
    }

    const networkError = error.networkError as HttpErrorResponse;
    if (!networkError.status) {
      return;
    }

    if (networkError.status === 401) {
      auth.logout();

      // TODO: token refresh
      // refresh
      //   .mutate({refreshToken: pair.refresh})
      //   .pipe(catchError(val => of(`I caught: ${val}`)));
    }
  });

  const tokenMiddleware = new ApolloLink((operation, forward) => {
    console.log('request with', pair);
    if (pair === null) {
      return forward(operation);
    }

    operation.setContext({
      headers: new HttpHeaders().set('Authentication', `Bearer ${pair.access}`),
    });
    return forward(operation);
  });

  const link = tokenMiddleware.concat(http);
  // const link = error.concat(tokenMiddleware.concat(http));

  return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService],
    },
  ],
})
export class GraphQLModule {}
