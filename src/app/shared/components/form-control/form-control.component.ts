import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { validationPattern } from '../../utility';
import { commonMessage } from '../../constants/constant';


@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  @Input() control = new FormControl();
  @Input() inputId:string = '';
  @Input() placeholder:string = ''
  @Input() lable:string = '';
  @Input () inputType:string = '';
  @Input () fieldType:string = 'text';
  @Input() isRequired:boolean = false;
  @Input() dropdownData:any;
  @Input() maxlength:number=100;
  @Input() minlength:number = 0;
  @Input() isLabel:boolean = true;
  @Input() cssClass:string = 'btn-brown';
  @Input() isChecked:boolean= false;
  @Input() chkboxLable:string = '';
  @Input() radioBtnName:string='';
  @Input() radioboxLable:string = '';
  @Input() accept:string = '';
  @Input() regxPattern= '';
  @Input() dropdownIdKey:string= 'id';
  @Input() dropdownNameKey:string= 'name';
  @Input() cName: FormControl;
  @Input() valueKey:string = 'id';
  @Input() disabled:boolean=false;
  @Input() readonly:boolean=false;
  @Input() maximum:number;

  mobPattern: any = validationPattern.mobileNumber;
  emailPattern: any = validationPattern.email;
  ifscPattern:any = validationPattern.ifscRegex
  datepickerConfig: Partial<BsDatepickerConfig>;

  validationMsg:{[key:string]:any} =  commonMessage;

  errorMessage:Record<string, string> = {
    required:'The field is required',
    email:'Email is invalid',
    minlength:`The field must be at least `,
    pattern:`Mobile number must be 10 digits.`
  }


  constructor() {
     this.datepickerConfig = {
      containerClass: 'theme-dark-blue', // Add custom CSS classes
      dateInputFormat: 'DD/MM/YYYY', // Customize date format
      showWeekNumbers: false, // Show week numbers
    };
   }

  ngOnInit(): void {
  }

}
