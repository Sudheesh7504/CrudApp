import { Component } from '@angular/core';
import { MobileService } from './mobile.service';

interface Mobile {
  name: string;
  price: number;
  ram: string;
  storage: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CrudApp';

 


  constructor(private _mobileService:MobileService){

  }

  mobiles:any=null;
  formHeader="add mobile";
  mobileName="";
  price:number=0
  ram="";
  storage="";
  id=null;
  showForm=false

  ngOnInit():void{
this.getMobiles()
  }

getMobiles(){
  this._mobileService.fetchMobiles().subscribe(
    (data:any)=>{
      this.mobiles=data;
    },
    (error:any)=>{
      console.log("error")
    }
  )
}

deleteMobiles(id:number){
  this._mobileService.deleteMobiles(id).subscribe(
    (res)=>{
      this.getMobiles();
    }
  )
}

openForm(data:any=null){
  this.showForm=true;
  if(data){
    this.mobileName=data.name;
    this.price=data.price;
    this.ram=data.ram;
    this.storage=data.storage;
    this.id=data.id;
    this.formHeader="Edit Mobile"

  }
  else{
    this.id=null;
    this.formHeader="Add Mobile"
  }
}

closeForm(){
  this.showForm=false;
  this.clearForm()
}

clearForm() {
  this.mobileName = '';
  this.price = 0;
  this.ram = '';
  this.storage = '';
  this.id = null;
  this.formHeader = 'Add Mobile';
}


saveMobile() {
  this.showForm = false;

  const body: Mobile = {
    name: this.mobileName,
    price: this.price,
    ram: this.ram,
    storage: this.storage
  };

  if (this.id) {
    this._mobileService.putMobile(this.id, body).subscribe(
      (res) => {
        this.getMobiles();
      },
      (error: any) => {
        console.log("error");
      }
    );
  } else {
    this._mobileService.postMobile(body).subscribe(
      (res) => {
        this.getMobiles();
      },
      (error: any) => {
        console.log("error");
      }
    );
  }


}
}

