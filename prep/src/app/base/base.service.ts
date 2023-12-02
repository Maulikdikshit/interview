import { Injectable } from '@angular/core';
import { combineLatest, EMPTY, forkJoin, Observable, of, Subscriber, throwError, zip } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

interface NewsItem {
  category:'Business' | 'Sports' ;
  content: string;
}

@Injectable({
  providedIn: 'root'
})

export class BaseService {

  constructor(private http: HttpClient) { 
   
  }

   filterData = of( [
    {
      'name':'Mac',
      'age':24,
      'bType':'A',
      'marks':{
        'eng':34,
        'maths':67
      }      
    },
    {
      'name':'Mary',
      'age':24,
      'bType':'B',
      'marks':{
        'eng':40,
        'maths':54
      }      
    },
    {
      'name':'Matt',
      'age':24,
      'bType':'B+',
      'marks':{
        'eng':78,
        'maths':45
      }      
    }, {
      'name':'Maryse',
      'age':24,
      'bType':'AB+',
      'marks':{
        'eng':90,
        'maths':87
      }      
    }
  ]);

  combineFirstSource = new Observable(subscriber => {
    setTimeout(() => { subscriber.next(1)},1000);
    setTimeout(() => { subscriber.next(2)},5000);
    setTimeout(() => { subscriber.next(3)},8000)
  })

  combineSecondSource = new Observable(subscriber => {
    setTimeout(() => { subscriber.next('A')},3000);
    setTimeout(() => { subscriber.next('B')},7000);
    setTimeout(() => { subscriber.next('C')},9000)
  })

  getCombineLatest(){
    combineLatest([this.combineFirstSource,this.combineSecondSource]).subscribe(
      ([first,second]) => {
        console.log('combine',first,second);
      }
    )
  }

  WithLatestFrom(){
    this.combineFirstSource.pipe(withLatestFrom(this.combineSecondSource)).subscribe(([first,second])  => {
      console.log(`${first} shirt with ${second}`)
    })
  }

  getZip(){
    zip(this.combineFirstSource, this.combineSecondSource)
    .subscribe(([color, logo]) => console.log(`${color} shirt with ${logo}`));
  }

  source$ = new Observable(subscriber => {
    setTimeout(() => subscriber.next('A'),2000);
    setTimeout(() => subscriber.next('B'),5000)
  })

  concatMapSource$ =  new Observable(subscriber => {
    setTimeout(() => subscriber.next('users'),2000);
    setTimeout(() => subscriber.next('none'),4000);
    setTimeout(() => subscriber.next('addresses'),2000);
    setTimeout(() => subscriber.next('banks'),2200);    
  })

  switchMapSource$ =  new Observable(subscriber => {
    setTimeout(() => subscriber.next('users'),3000);
    // setTimeout(() => subscriber.next('none'),4000);
    setTimeout(() => subscriber.next('addresses'),2000);
    setTimeout(() => subscriber.next('banks'),2200);    
  })



  filterStudent(){
    this.filterData.pipe(
      tap((data) => console.log('tap data',data)),
      map((data) => data.filter((student) => student.marks.eng > 75))
    ).subscribe((data:any) => {
      console.log('data for filtet',data);
    });
  }

  getSwitchMapExample(){
    this.switchMapSource$.pipe(
      tap((valu) => console.log('concat map example',valu)),
      switchMap( value => this.http.get('https://random-data-api.com/api/v2/'+value).pipe(
        catchError(() => EMPTY)// handling error here will not end subscription
      ))
      // catchError(() => EMPTY) // wrong way of handling error with flattening operator 
      // as it will complete the subscription and next emit value will not be received
    ).subscribe({
      next: (value) => console.log('concatMap Value',value),
      error: (err) => console.log('Error',err),
      complete: () => console.log('Subscription completed')
    })
  }

  getConcatMapExample(){
    this.concatMapSource$.pipe(
      tap((valu) => console.log('concat map example',valu)),
      concatMap( value => this.http.get('https://random-data-api.com/api/v2/'+value).pipe(
        catchError(() => EMPTY)// handling error here will not end subscription
      ))
      // catchError(() => EMPTY) // wrong way of handling error with flattening operator 
      // as it will complete the subscription and next emit value will not be received
    ).subscribe({
      next: (value) => console.log('concatMap Value',value),
      error: (err) => console.log('Error',err),
      complete: () => console.log('Subscription completed')
    })
  }

  getSource(){
    this.source$.pipe(
      concatMap(value => of(1,2))
    ).subscribe(value => console.log('value',value))
  }

  failingHttpRequest$ =  new Observable( subscriber => {
    setTimeout(() => {
      subscriber.error(new Error('TimeOut'));
    },3000);
  })

   newsFeed$ = new Observable<NewsItem>(subscriber => {
    setTimeout(() => subscriber.next({ category: 'Business',content:'A'}),1000);
    setTimeout(() => subscriber.next({ category: 'Sports',content:'B'}),3000);
    setTimeout(() => subscriber.next({ category: 'Business',content:'C'}),4000);
    setTimeout(() => subscriber.next({ category: 'Sports',content:'D'}),6000);
    setTimeout(() => subscriber.next({ category: 'Business',content:'E'}),7000);
  })

  // https://random-data-api.com/api/v2/users
  // RXJS MAP OPERATOR
  randomName$ = this.http.get('https://random-data-api.com/api/v2/users').pipe(
    map((response: any) => response.first_name)
  )
  randomNation$ = this.http.get('https://random-data-api.com/api/v2/addresses').pipe(
    map((naResp: any) => naResp.city)
  )
  randomFood$ = this.http.get('https://random-data-api.com/api/v2/banks').pipe(
    map((foodResp: any) => foodResp.bank_name)
  )


  getError(){
    this.failingHttpRequest$.pipe(
      catchError(error => of('Fallbackvalue'))
    ).subscribe(
      value => console.log(value)
    );
  }
  getThreeApiCombo(){
    forkJoin([this.randomFood$,this.randomName$,this.randomNation$]).subscribe(
      ([nameResp,nationResponse,foodResp]) => {
        console.log(nameResp+ ' is from '+nationResponse+' and works in  '+foodResp)
      }
    )
  }

  // RXJS FILTER OPERATOR
  getCombo(){
    this.newsFeed$.pipe(
      filter((value) => value.category === 'Sports')
    )
    .subscribe({
      next: (item) => console.log(item)
    })
    // const obs1$ = this.http.get('https://jsonplaceholder.typicode.com/posts');
    // const r = obs1$.pipe(
    //   tap((value) => value ),
    //   switchMap((value: any) => this.getSingleUser(value[0].id))
    // )

    // return r;
  }

  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getSingleUser(id:any){
    return this.http.get('https://jsonplaceholder.typicode.com/posts/'+id);
  }
  
}