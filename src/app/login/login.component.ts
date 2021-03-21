import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  message!: string;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : '',
      password : ''
    });
  }

  submit(): void {
    this.http.post(environment.apiUrl + '/login',
      this.form.getRawValue(), {withCredentials: true})
      .subscribe((data) => this.handleResponse(data), (error) => this.handleError(error));
  }

  handleResponse(data: any): void {
    localStorage.setItem('token', data.token);
    this.router.navigate(['/quotation']);
  }

  handleError(error: any): void {
    this.message = error.error.message;
  }
}
