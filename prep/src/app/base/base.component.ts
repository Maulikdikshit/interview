import { Component, OnInit } from '@angular/core';
import { BaseService } from './base.service';
/**
 * Converting ome interface to another Type
 * Here converting UserInterface to ProfileInterface
 * START
 */

export interface UserInterface{
  id:string;
  name:string;
  age:number;
  getMessage():string;
}

export interface ProfileInterface{
  name: string;
  profileUrl: string;
  isActive:boolean;
}

const transformUserToProfile = (
  user:UserInterface,
  isActive: boolean = true // this is optional,in this wa also we can declare optional value
  ): ProfileInterface =>{
  return {
    name:user.name,
    profileUrl:`/profiles/${user.name}`,
    isActive
  }
}

/**
 * END
 */


export interface User{
  id: string;
  name: string;
}

const getName = (user?: User): string => {
  return user?.name ?? 'Not set';// use of elvis operator ,user? 
  // will check if user is defined or not if not it will not t
  // hrow compilation error and if undefined then ?? operator will
  // give not set as return value
}



export enum Statud {
  ACTIVE = 'active',
  DRAFT='draft'
}
  
/**
 * Creating a custom type
 * START
 */

export type Foo = string;
//here we have defined a new type which will accept a string
const foo:Foo = 'foo';

//here we are defininf foo of type Foo which is accepting string 'foo'


//Another Use

export interface UserInterface{
  id:string;
  name:string;
  surname:string;
  age:number;
}

type UserFullNameType = Pick<UserInterface,'name'>

type UserFullNameTypeMultipleValue = Pick<UserInterface,'name' | 'age'>

type UserPost = Omit<UserInterface,'id'>// this is used to omit as it will just omit id and use others for creating new type
//In the above example we are picking few field from UserInterface and creating new type



// UserFullNameType since we cannot extend interface
// so UserFullNameType becomes a type with one field name
// and UserFullNameTypeMultipleValue becomes a type which is an object
// with two fields naem and age, we can hover over it to check its type


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(private bs:BaseService){}
  ngOnInit(): void {

    // this.bs.getCombineLatest();

    this.bs.filterStudent();

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
