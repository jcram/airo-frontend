import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Currency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  form!: FormGroup;
  total: any;
  message!: string;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient
  ) { }

  actualCurrency: any;
  currencies: Currency[] = [
    {value: 'EUR', viewValue: 'Euro'},
    {value: 'USD', viewValue: 'Dolar'},
    {value: 'GBP', viewValue: 'British Pound '}
  ];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      age : '',
      currency_id : '',
      start_date : '',
      end_date : ''
    });
  }

  submit(): void {
    this.http.post(environment.apiUrl + '/quotation',
      this.form.getRawValue(),
      {withCredentials: true, headers: this.createAuthorizationHeader(localStorage.getItem('token'))})
      .subscribe( (data) => this.handleResponse(data), (error) => this.handleError(error));
  }
  createAuthorizationHeader(bearerToken: any): HttpHeaders {
    const headerDict = {
      Authorization: 'Bearer ' + bearerToken,
    };
    return new HttpHeaders(headerDict);
  }
  changeCurrency(value: any): void {
    this.form.patchValue({currency_id: value});
  }

  handleError(error: any): void {
    const errors = error.error.errors;
    this.message = JSON.stringify(errors);
  }

  handleResponse(response: any): void {
    this.total =  `Total:  ${response.total}  ${this.form.getRawValue().currency_id}`;
  }

}
