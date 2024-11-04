import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { placehoder } from 'src/app/shared/constants/constant';


@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  placeholderValue:string = placehoder.pleaseEnter;
  captchatext: any;

  @Output() captchaValue = new EventEmitter<string>();
  @Input() formGroup: FormGroup;
  @Input() captacha: string = '';


  @ViewChild('myCanvas')
	private myCanvas: ElementRef = {} as ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  getCaptcha(length:any){
    let captchaVal: any = this.myCanvas.nativeElement.getContext('2d');
    let randomChars ='0123456789';
    // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
    this.captchatext = '';
		for (let i = 0; i < length; i++) {
			this.captchatext += randomChars.charAt(
				Math.floor(Math.random() * randomChars.length)
			);
		}
    captchaVal.font = '22px Roboto';
		captchaVal.fillStyle = '#49a760';
		captchaVal?.fillRect(0, 0, 200, 400);
		captchaVal.fillStyle = '#fff';
		captchaVal?.fillText(this.captchatext, 17, 20);
    this.captchaValue.emit(this.captchatext)
  }

  captcha(){
    this.getCaptcha(5);
  }

  ngAfterViewInit(): void {
		this.captcha();
	}
}
