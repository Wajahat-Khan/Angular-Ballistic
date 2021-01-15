import { Component, OnInit } from '@angular/core';
import { Services } from './providers/services'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  customers : any;
  current:any;
  locations={"ON":"Ontario","AB":"Alberta","BC":"British Columbia","SK":"Saskatchewan","MB":"Manitoba"}
  constructor(
    private services: Services,
    private modalService: NgbModal
	) {
	}

  ngOnInit() { 
  this.services.getCustomers().subscribe(data=>{
    this.customers = data;
    let objJsonStr = JSON.stringify(data[0]);
    this.services.postRequest(btoa(objJsonStr)).subscribe(data=>{
      console.log(data)
    })
  }, err=>{
    console.log(err)
  })
  }


  open(content,customer) {
    this.current = customer;
    this.modalService.open(content,{ centered: true,ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
     
    }, (reason) => {
     
    });
  }
}
