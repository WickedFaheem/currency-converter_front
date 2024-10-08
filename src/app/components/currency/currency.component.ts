import { Component } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { debounceTime, distinctUntilChanged, lastValueFrom, Subject } from 'rxjs';
import { ICurrencies } from './interface';
import { IResponse } from 'src/app/shared/interface/IResponse';
import { HttpStatusCode } from '@angular/common/http';
import { StatusCode } from 'src/app/shared/enums';
import { ConverionPayload, Params } from './models/ParamsModel';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  public SelectedIndex: number = -1;
  public payLoad!: ConverionPayload;
  public transformData: any = [];
  public conversionResult: any = [];
  public dynamicConversions:any = [];
  public params: Params = {
    base_currency: 'USD',
    base_currency_value: 1,
    currencies: '',
    currencies_value: 0,
    conversion_currency:0
  };
  private keyupSubject: Subject<string> = new Subject();
  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.fetchCurrency();
    this.fetchConversions();
  }

  async fetchCurrency() {
    await lastValueFrom(this.currencyService.getCurrency()).then((res: IResponse<any>) => {
      if (res.IsSuccess && res.StatusCode == StatusCode.SUCCESS) {
        // Extract the currencies and push them into the Data array
        const currencies = res.Data[0];
        for (const key in currencies) {
          if (currencies.hasOwnProperty(key)) {
            this.transformData.push(currencies[key]);
          }
        }
      }
    })
  }


  async conversion() {
    await lastValueFrom(this.currencyService.getLatestRates(this.params.base_currency, this.params.currencies)).then(async (res: IResponse<any>) => {
      if (res.IsSuccess && res.StatusCode == StatusCode.SUCCESS) {
        this.conversionResult = Object.keys(res.Data[0]).map((key: string) => {
          return {
            name: key,
            value: Math.round((res.Data[0][key] + Number.EPSILON) * 100) / 100
          };
        });
        this.conversionResult.map((i:any) => {
          if(this.params.base_currency_value > 0 && this.params.currencies !=''){
            i.value = i.value * this.params.base_currency_value;
          }
        })
      }
    })
    let payLoad = {
      base_currency: this.params.base_currency,
      base_currency_amount: this.params.base_currency_value,
      currencies: this.conversionResult
    }
    console.log("ye hai payload",payLoad);
    
    if(payLoad) {
      this.InsertConversion(payLoad);
    }
  }

  async InsertConversion(payLoad:any){
    await lastValueFrom(this.currencyService.insertConversions(payLoad)).then((res: IResponse<any>) => {
      if (res.IsSuccess && res.StatusCode == StatusCode.SUCCESS) {
        console.log(res.Data);
        this.fetchConversions();
      }
    })
  }
  
  async resetVal(){
    this.params.base_currency = 'USD',
    this.params.base_currency_value = 1,
    this.params.currencies= '',
    this.params.currencies_value= 0
    this.conversionResult = [];
  }

  async fetchConversions() {
    await lastValueFrom(this.currencyService.getConversions()).then((res: IResponse<any>) => {
      if (res.IsSuccess && res.StatusCode == StatusCode.SUCCESS) {
        this.dynamicConversions = res.Data
        console.log(this.dynamicConversions);
      }
    })
  }

  ExpandRow(index:number) {
    if (index == this.SelectedIndex) {
      this.SelectedIndex = -1;
    } else {
      this.SelectedIndex = index;
    }
  }
}
