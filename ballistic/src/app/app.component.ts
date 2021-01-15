import { Component, OnInit } from '@angular/core';
import { Services } from './providers/services'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

interface Alert {
  type: string;
  message: string;
}
const ALERTS: Alert[] = [{
  type: 'danger',
  message: 'This is a error in POST API Call',
},
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  customers : any;
  current:any;
  alerts: Alert[];
  alert_show:any;
  locations={"ON":"Ontario","AB":"Alberta","BC":"British Columbia","SK":"Saskatchewan","MB":"Manitoba"}
  constructor(
    private services: Services,
    private modalService: NgbModal
	) {
    this.reset();
  }
  close(alert: Alert) {
    // this.alerts.splice(this.alerts.indexOf(alert), 1);
    this.alert_show=false;
  }

  reset() {
    this.alerts = Array.from(ALERTS);
    this.alert_show=false;
  }

  showError(){
    this.alert_show = true;
  }

  ngOnInit() { 
  this.services.getCustomers().subscribe(data=>{
    this.customers = data;
    let objJsonStr = JSON.stringify(data[0]);
    this.services.postRequest(btoa(objJsonStr)).subscribe(data=>{
    }, err=>{
      this.showError();
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
