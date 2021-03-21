import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  message!: string;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : '',
      email : '',
      password : ''
    });
  }

  submit(): void {
     this.http.post(environment.apiUrl + '/register', this.form.getRawValue()
     ).subscribe( () => this.handleResponse(), (error) => this.handleError(error));
  }

  handleResponse(): void {
    this.router.navigate(['/login']);
  }

  handleError(error: any): void {
    this.message = error.error.message;
  }

}
