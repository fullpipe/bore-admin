import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {filter} from 'rxjs';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isCollapsed = false;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.token$.pipe(filter(t => t === null)).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
