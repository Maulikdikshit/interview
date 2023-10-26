import { Component, OnInit } from '@angular/core';
import { BaseService } from './base.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(private bs:BaseService){}
  ngOnInit(): void {

    // this.bs.getCombineLatest();

    this.bs.getZip();
    // this.bs.WithLatestFrom();

    // this.bs.getSwitchMapExample();

    // this.bs.getConcatMapExample();

    // this.bs.getSource();

    // this.bs.getError();

    // this.bs.getUsers().subscribe((data: any) => {
    //   console.log('data',data);
    //   this.bs.getSingleUser(data[0].id).subscribe((data) => {
    //     console.log('single user',data);
    //   })
    // })

    // this.bs.getCombo();

    // this.bs.getThreeApiCombo();
    // .subscribe((data: any) => {
    //   console.log('combo data',data);
    // })
    // throw new Error('Method not implemented.');
  }

}
