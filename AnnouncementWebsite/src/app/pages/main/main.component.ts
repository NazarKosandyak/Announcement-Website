import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMain } from 'src/app/interface/main.interface';
import { MainServiceService } from 'src/app/service/main-service.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  AdvertisementForm: FormGroup;
  EditForm: FormGroup;
  getTitle:string;
  titleDetails:string;
  descriptionDetails:string;
  dateDetails:string;
  showModalAdd: boolean = false;
  showModalEdit: boolean = false;
  showDetails:boolean = false;
  showSearch:boolean = true
  myData:any;
  searchArray:object[]
  date: Date = new Date();
  id: number;
  constructor(
    private FormBuilder: FormBuilder,
    private mainService: MainServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getData()
    this.initFormAdd()
    this.initEditForm()
  }
  getData(): void {
    this.mainService.get().subscribe(data => {
      this.myData = data;
    })
  }
  initFormAdd(): void {
    this.AdvertisementForm = this.FormBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    })
  }
  initEditForm(): void {
    this.EditForm = this.FormBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  addAnnouncement(): void {
    this.showModalAdd = true;
    document.body.style.background = 'rgba(0, 0, 0, 0.05)';
  }

  saveAnnouncment(): void {
    if (this.AdvertisementForm.value.title && this.AdvertisementForm.value.description) {
      let getDate:any  = this.date.getDate();
      let getMonth:any  = this.date.getMonth();
      let getMinutes:any = this.date.getMinutes();
      if(getDate < 10){
        getDate  = '0'+ getDate;
      }
      if(getMonth < 10){
        getMonth  = '0'+ getMonth;
      }
      if(getMinutes < 10){
        getMinutes  = '0'+ getMinutes;
      }
      else if(getDate >=10){
        getDate;
      }
      else if(getMonth >=10){
        getDate;
      }
      else if(getMinutes >=10){
        getMinutes;
      }
      const item = {
        ...this.AdvertisementForm.value,
        date: `${getDate}.${getMonth}.${this.date.getFullYear()} | ${this.date.getHours()}:${getMinutes}`
      }
      this.mainService.post(item).subscribe(() => {
        this.getData()
      })
      this.AdvertisementForm.reset();
      this.showModalAdd = false;
      this.success('Announcement created');
      document.body.style.background = 'none';
    }
    else {
      this.error('Please , fill all of the fields ');
    }


  }
  editAnnouncement(item): void {
    this.EditForm.patchValue({
      title: item.title,
      description: item.description
    });
    this.showModalEdit = true;
    this.id = item.id;
    document.body.style.background = 'rgba(0, 0, 0, 0.05)';
  }
  saveEdit(): void {
    if (this.EditForm.value.title && this.EditForm.value.description) {
      let getDate:any  = this.date.getDate();
      let getMonth:any  = this.date.getMonth();
      let getMinutes:any = this.date.getMinutes();
      if(getDate < 10){
        getDate  = '0'+ getDate;
      }
      if(getMonth < 10){
        getMonth  = '0'+ getMonth;
      }
      if(getMinutes < 10){
        getMinutes  = '0'+ getMinutes;
      }
      else if(getDate >=10){
        getDate;
      }
      else if(getMonth >=10){
        getDate;
      }
      else if(getMinutes >=10){
        getMinutes;
      }
      const editItem = {
        ...this.EditForm.value,
        date: `${getDate}.${getMonth}.${this.date.getFullYear()} | ${this.date.getHours()}:${getMinutes}`
      }
      this.mainService.update(editItem, this.id).subscribe(() => {
        this.getData();
      })
      this.showModalEdit = false;
      document.body.style.background = 'none';
      this.success('Successfully edited');
      this.showSearch = true
      this.searchArray = []
    }
    else {
      this.error('Please , fill all of the fields ');
    }
  }
  deleteAnnouncement(id): void {
    this.mainService.delete(id).subscribe(() => {
      this.getData();
      this.success('Successfully deleted');
    })
    this.showSearch = true
    this.searchArray = []
  }
  infoAnnouncement(item):void{
    this.titleDetails= item.title
    this.descriptionDetails=item.description
    this.dateDetails=item.date
    this.showDetails = true;
    document.body.style.background = 'rgba(0, 0, 0, 0.05)';
    

  }
  search():void{
    let getValue = document.querySelector('.search') as HTMLInputElement
    if(this.getTitle){
      const filterArray = this.myData.filter(function(item,index){
        if(item.title == getValue.value){
          return {item,index}
        }
      })
      this.searchArray = filterArray
      if(this.searchArray.length > 0){
        this.showSearch = false
  
      }
      else{
        this.error('There is no such title')
        this.showSearch = true
      }
    }
    else{
      this.warning('Please , enter the title')
    }
    
    
    
    this.getTitle = ''    
  }
  backToAll():void{
    this.showSearch = true
    this.searchArray = []
  }
  closeAdd(): void {
    this.showModalAdd = false;
    this.showModalEdit = false;
    this.showDetails = false;
    document.body.style.background = 'none';
  }
  success(messege): void {
    this.toastr.success(messege);
  }
  error(messege): void {
    this.toastr.error(messege);
  }
  warning(messege): void {
    this.toastr.warning(messege);
  }
}

