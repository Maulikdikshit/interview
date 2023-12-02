import { CurrencyPipe } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-js-ques',
  templateUrl: './js-ques.component.html',
  styleUrls: ['./js-ques.component.scss']
})
export class JsQuesComponent implements OnInit {

  var1: any;
  var2= null;
/**
 * Example of hoisting questions
 * as decalred with var perform hoisting and 
 * in initialization phase variable is initialized with undefined
 * and in execution phase it is assigned with some value,
 * same goes for function declaration
 */
    // console.log(foo); ---> not defined
    // foo=1;

    // console.log(foo); ---> undefined
    // var foo=2;

    // foo=3;
    // console.log(foo); ---> 3;
    // var foo;



    /**
     * CLOSURE
     * Q.3 --> Create a counter function which has increment and getValue functionality
     */

    /**
     * CURRYING
     * Q.4
     * write a function which helps to achieve multiply(a)(b) 
     * and returns product of a and b
     * And create curry function
     */

     multiply = (num1:any) => {
      return (num2:any) => {
        return num1 * num2;
      }
    }

    curry = function(fn:any){
      var arity =fn.length;

      return function f1(...args: any[]){
        console.log('f1',args);
        if(args.length >= arity){
          return fn(...args);
        } else{
          console.log('need more args');
          return function f2(...moeArgs: any[]){
            var newAgs=args.concat(moeArgs);
            return f1(...newAgs)
          }
        }
        
      }
    }

    curriedSum = this.curry((a: any,b: any,c: any) => a+b+c);

    get = this.curry((property: any,object: any) => object[property]);
    getId = this.get('id');
    map = this.curry((fn: any, values: any) =>  values.map(fn));
    getIds = map(this.getId);


    /**
     * Q.5 Write a function which gets an array and an element
     * and return a array with this element at the end
     */

    numbers=[1,2];
    correctApproachArr = [1,2];
    append = (arr:any,el:any) => {
      arr.push(el);
      return arr;
    }

    newAppendFun = (arr: any,el: any) => {
      return [...arr,el];
    }

        /**
     * Q.6 Write a function which can concatenate 2 arrays
     * 
     */

        mergeArrays = (arr1: any,arr2: any) => {
          return arr1.concat(...arr2);
          // or
          return [...arr1,...arr2];
        }

        /**
         * Q.7 Check that user with such name exists in array of objects
         */

         newusers = [
          {
            id:1,
            name: 'Jack',
            isActive: true,
            age: 34
          },
      
          {
            id:2,
            name: 'John',
            isActive: true,
            age: 19
          },
          {
            id:3,
            name: 'Mike',
            isActive: false,
            age: 25
          }
        ]
      
        isNameExist = (prop: any, users: any) => users.some((user: any) => user.name === prop);

    /**
    * Q.8 Remove all duplicates from array
    */
    
    uniqueArr = (arr: any) => {
      return [...new Set(arr)]
    }

    newUniqueArr = (arr: any) => {
      return arr.reduce((acc: any,el: any) => {
        return acc.includes(el) ? acc: [...acc,el]
      },[])
    }

    /**
     * Q.9 --> find the number of occurences of minimum value in the list
     */
    arrMin = [3,2,1];
    minVal = Math.min(...this.arrMin);
    repMinNum = this.arrMin.filter((va: any) => va === this.minVal);

     /**
      * Q.10 --> Write a shallow comparison function
      */



    shallowComp = (source:any,target:any) => {
      if(typeof(source) !== typeof(target)){
        return false;
      }
      if(source instanceof  Object){
        if(Object.keys(source).length !== Object.keys(target).length){
          return false;
        }
        return Object.keys(source).every( key => source[key] === target[key]);
      }
      if(source instanceof  Array){
        if(source.length !== target.length){
          return false;
        }
        return source.every((el:any,index:any) => el === target[index])
      }
      return source === target;
    }

    deepComp = (source:any,target:any): boolean => {
      if(typeof(source) !== typeof(target)){
        return false;
      }
      if(source instanceof  Object){
        if(Object.keys(source).length !== Object.keys(target).length){
          return false;
        }
        return Object.keys(source).every( key => this.deepComp(source[key],target[key]));
      }
      if(source instanceof  Array){
        if(source.length !== target.length){
          return false;
        }
        return source.every((el:any,index:any) => this.deepComp(el,target[index]))
      }
      return source === target;
    }

    fibonacci = (n: any): number => {
      if(n < 2){
         return 1;
      }
      else{
       return  this.fibonacci(n-2) + this.fibonacci(n-1);
      }
    }

    isPalindrone = (str: any) => {
      return str === str.split('').reverse().join('');
    }

    isAnagram = (str1:string,str2:string) => {

      if(str1.length !== str2.length){
        return false;
      }
      
      const lowerStr1 = str1.toLowerCase();
      const lowerStr2 = str2.toLowerCase();
      if(lowerStr1 === lowerStr2){
        return false;
      }

      const sortStr1 = str1.split('').sort().join('');
      const sortStr2 = str2.split('').sort().join('');

      return sortStr1 === sortStr2;
    }

    countVowels = (str: string) => {
      const vowels = ['a','e','i','o','u'];
      let count =0;
      for(let char of str.toLowerCase()){
        if(vowels.includes(char)){
          count++;
        }
      }
      return count;
    }

    titleCase = (str: string) => {
      return str.toLowerCase().split('').map((word) => word.charAt(0).toUpperCase+word.slice(1)).join('');
    }

    convertTo24hrsFormat = (timeText: any) => {
      const timeTextLower = timeText.toLowerCase();
      let [hours,mins] = timeTextLower.split(':');

      if(timeTextLower.endsWith('am')){
        hours = hours === '12' ? '0' : hours;
      } else if(timeTextLower.endsWith('pm')){
        hours = hours === '12' ? hours : String(+hours+12)
      }

      return hours.padStart(2,0) +':' +mins.slice(0,-2).padStart(2,0);
    }

  ngOnInit(): void {

     /**
     * start of Ans to 7th ques
     */

     console.log(this.isNameExist('Jack',this.newusers));

      /**
     * end of Ans to 7th ques
     */

    /**
     * start of Ans to 5th ques
     */
    console.log('wrong approach',this.append(this.numbers,3));
    console.log('wrong approach modified the existing array',this.numbers);

    console.log('right approach',this.newAppendFun(this.correctApproachArr,3));
    console.log('right approach not modifying the existing array',this.correctApproachArr);
    /**
     * end of Ans to 5th ques
     */
    this.get('id',{id:1});
    console.log(this.curriedSum(1,2,3));
 
    this.executeCounter();


    console.log(this.var1);
    console.log(typeof(this.var1))

    console.log(this.var2);
    console.log(typeof(this.var2))

    
    const newUsers = this.users.map((values) => values.name);
    console.log('new users with only name',newUsers);

    const activeUsers = this.users.filter((user) => user.isActive );
    console.log('active users',activeUsers);

    const sortedUsers = this.users.sort((a,b) => a.age > b.age ? 1 : ( a.age < b.age ? -1 : 0)) ;
    console.log('sorted users wrt age', sortedUsers);

    const sortedUsersName = this.users.sort((a,b) => a.name > b.name ? 1 : ( a.name < b.name ? -1 : 0)) ;
    console.log('sorted users wrt name', sortedUsersName);
  }


   privateCounter = () => {
    let count =0;
    return {
      increment: (val = 1) => {
        count += val;
      },
      getValue: () => {
        return count;
      }
    }
  }

  counter = this.privateCounter();
  
  executeCounter(){
    console.log(this.counter.getValue());
    this.counter.increment();
    console.log(this.counter.getValue());
  }

/**
 * Q. Get only  array of names from users array
 * Q. Get only array of user which are active
 * Q. Sort users by age descending
 * 
 */
  users = [
    {
      id:1,
      name: 'Jack',
      isActive: true,
      age: 34
    },

    {
      id:2,
      name: 'John',
      isActive: true,
      age: 19
    },
    {
      id:3,
      name: 'Mike',
      isActive: false,
      age: 25
    }
  ]
}
