import { Component, OnInit } from '@angular/core';
import { Pensioner } from 'src/app/entity/pensioner';
import { PensionDetailsService } from '../../services/pension-details.service'
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pensiondetails',
  templateUrl: './pensiondetails.component.html',
  styleUrls: ['./pensiondetails.component.css']
})

export class PensiondetailsComponent implements OnInit {

  pensioner: any;
  aadharNo: string;
  calculatedPension: any

  constructor(
    private _authStorageService: LocalstorageService,
    private PensionDetails: PensionDetailsService,
    private _router: Router
  ) {
      this.aadharNo = this._authStorageService.get('aadhar') || '';
      this.PensionDetails.pensionerDetail(this.aadharNo).subscribe((res:any) =>{
        if(res.status)
          this.pensioner = res.pensionerDetail;
        else
          this._router.navigateByUrl('/')
          // navigate to login page
      })
  }

  ngOnInit(): void {
  }

  calculatePension() {
    this.PensionDetails.calculatePension(this.aadharNo).subscribe((res:any) =>{
      if(res.status)
        this.calculatedPension = res.pensionDetails
    })
  }

}
