import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {firstValueFrom} from 'rxjs';

import {LoginGQL, LoginRequestGQL, Role} from 'src/generated/graphql';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  requestForm!: UntypedFormGroup;
  codeForm!: UntypedFormGroup;
  requestID: number | undefined;
  loading = false;

  constructor(
    private loginRequestGql: LoginRequestGQL,
    private loginGql: LoginGQL,
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      email: this.fb.control('asdasd@asdsad.asd', [
        Validators.email,
        Validators.required,
      ]),
    });

    this.codeForm = this.fb.group({
      code: this.fb.control('111112', [
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/[\d]{6}/),
        Validators.required,
      ]),
    });
  }

  async loginRequest() {
    console.log(this.loading);
    this.loading = true;
    console.log(this.loading);

    try {
      this.requestID = (
        await firstValueFrom(
          this.loginRequestGql.mutate({input: this.requestForm.value})
        )
      ).data?.loginRequest;

      console.log(this.requestID);
    } catch (error) {
      this.requestForm.get('email')?.setValue('');
    }

    this.loading = false;
  }

  async login() {
    this.loading = true;

    try {
      const pair = await firstValueFrom(
        this.loginGql.mutate({
          input: {
            code: this.codeForm.value['code'],
            requestID: this.requestID!,
          },
        })
      );

      if (pair.data!.login.roles.includes(Role.Admin)) {
        this.codeForm.get('code')?.setValue('');
        this.auth.authenticate(pair.data!.login);
        this.router.navigateByUrl('/books');
      }

      this.codeForm.get('code')?.setValue('');
    } catch (error) {
      this.codeForm.get('code')?.setValue('');
    }

    this.loading = false;
  }
}
