import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validationPattern } from '../../utility';
import { placehoder } from '../../constants/constant';
import { Router } from '@angular/router';
import _ from 'lodash';
import { RootReducerState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-otp-dialogue',
  templateUrl: './otp-dialogue.component.html',
  styleUrls: ['./otp-dialogue.component.css']
})
export class OtpDialogueComponent implements OnInit {
  formGroup: FormGroup;
  showOtpField: boolean = false;
  mobilePattern: any = validationPattern.mobileNumber;
	placeholderValue: any = placehoder.pleaseEnter;
  timer: number = 0;
  showResend : boolean = false;
  @Output() dialogueAction: EventEmitter<{ [key: string]: any }> = new EventEmitter();
  farmerId: string = '';


  constructor(
    private router: Router,    private store: Store<RootReducerState>,

    ) {
   }

  ngOnInit(): void {
    this.initializeFormControls();
  }


  initializeFormControls() {
		this.formGroup = new FormGroup({
      mobile: new FormControl(''),
      templateId: new FormControl(''),
      otp : new FormControl(''),
    });
	}


  showResendButton(){
    this.timer = 0;
		this.showResend = true;
  }

}
