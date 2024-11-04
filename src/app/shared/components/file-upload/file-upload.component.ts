import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {Subscription} from 'rxjs';
import {WANT_TO_REMOVE} from '../../constants/messagesConstant';
import {CommonService} from '../../services/common.service';
import {FileUploadService} from './file-upload.service';

declare var window: any;

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
	static readonly VALID_FILE_EXT = ['.jpg', '.jpeg', '.pdf', '.png', '.mp4', '.webm', '.avi', '.mkv', '.wmv', '.mov', '.flv', '3gp', '.mpeg', '.ogv'];

	@ViewChild('fileInput') fileInput!: ElementRef;
	@ViewChild('dialogModal') dialogModal!: ElementRef;
	@Input() inputId: string = "";
	@Input() label: string = '';
	@Input() allowedTypes: string = '*'; // File type filter (e.g., '.jpg, .png')
	@Input() maxSizeMB: number = 2; // Max file size in MB
	@Input() isMandatory: boolean = true;
	@Input() uploadFileModuleType: string = "";
	@Input() farmerFileUpload: boolean;
	@Input() formGroup: FormGroup;
	@Input() isDisabled:boolean = false;
	@Input() isExcelUpload: boolean;
	errorMessage: Record<string, string> = {
		required: 'The field is required',
	}
	singleFileSize = 0;
	selectedFiles: File[] = [];
	uploadedFile: string = "";
	private subscr: Subscription;
	resetFormContent: string = WANT_TO_REMOVE;
	modalPopup: any;
	@Output() navigatePage: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		private fileUploadService: FileUploadService,
		private commonService: CommonService
	) {
	}

	ngOnInit(): void {
		this.singleFileSize = this.maxSizeMB * 1024 * 1024;
		this.subscr = this.formGroup.valueChanges.subscribe((val) => {
			if (val[this.inputId]) {
				this.uploadedFile = val[this.inputId];
			}
		});
		if (!this.inputId) {
			this.commonService.showErrorMessage("inputId is missing", false);
			return;
		}

	}

	ngOnDestroy() {
		this.subscr && this.subscr.unsubscribe();
	}

	handleFileChange = (e: any) => {
		this.uploadedFile = "";
		const files: File[] = Array.from(e.target.files);
		let inValidFileCnt = 0;
		let _bIsInValidExt = 0;
		if (files && files.length) {
			for (let index = 0; index < files.length; index++) {
				if (files[index]) {
					if (this.isValidFileExtension(files[index].name)) {
						if (files[index].size > this.singleFileSize) {
							inValidFileCnt++;
						}
					} else {
						_bIsInValidExt = 1;
						break;
					}
				}
			}
			if (_bIsInValidExt) {
				this.commonService.showErrorMessage("Please select valid file extension", false);
				this.reset();
			} else {
				if (inValidFileCnt) {
					this.commonService.showErrorMessage(`File size limit upto ${this.maxSizeMB} MB`, false);
					this.reset();
				} else {
					this.selectedFiles = Array.from(files);
				}
			}
		}
	};

	uploadFile() {
		if (this.selectedFiles.length) {
			if (this.farmerFileUpload) {
				this.uploadFileWithNoToken();
			} 
			else if(this.isExcelUpload) {
				this.uploadExcelWithToken()
			}
			else {
				this.uploadFileWithToken();
			}

		} else {
			this.commonService.showErrorMessage("Please Select at lease one file.");
		}
	}

	fileHandler = {
		next: (response: any) => {
			const resData = this.commonService.getAPIDataNode(response) || {};
			const fileName = _.get(resData, "id", "");
			this.formGroup.controls[this.inputId].setValue(fileName);
			this.navigatePage.emit()
		},
		error: (error: any) => {
			this.commonService.showErrorMessage(error, false);
		},
		complete: () => {
		}
	};

	uploadFileWithNoToken() {
		this.fileUploadService.uploadFarmerFiles(this.selectedFiles, this.uploadFileModuleType).subscribe(this.fileHandler);
	}

	uploadFileWithToken() {
		this.fileUploadService.uploadFiles(this.selectedFiles, this.uploadFileModuleType).subscribe(this.fileHandler);
	}

	uploadExcelWithToken() {
		this.fileUploadService.uploadExcelFiles(this.selectedFiles, this.uploadFileModuleType, 'private').subscribe(this.fileHandler);
	}

	deleteFile() {
		this.openDialog();

	}

	reset() {
		this.uploadedFile = "";
		this.fileInput.nativeElement.value = "";
		this.formGroup.controls[this.inputId].setValue("");
		this.selectedFiles = [];
	}

	fileInputClick = (event: any) => {
		if (!this.uploadedFile) {
			return true;
		}
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	onModalCallBack = () => {
		this.modalPopup.hide();
		this.fileUploadService.deleteFile(this.uploadedFile).subscribe(
			{
				next: (response) => {
					const resData = this.commonService.getAPIDataNode(response) || "";
					this.commonService.showSuccessMessage(resData);
				},
				error: (error) => {
					this.commonService.showErrorMessage(error, false);
				},
				complete: () => {
					this.reset();
				}
			}
		);
	}

	openDialog() {
		this.modalPopup = new window.bootstrap.Modal(this.dialogModal.nativeElement);
		this.modalPopup.show();
	}

	isValidFileExtension(icon: string) {
		if (this.allowedTypes) {
			if (this.allowedTypes.includes("*")) {
				return FileUploadComponent.VALID_FILE_EXT.some(el => icon.endsWith(el));
			} else {
				const fileExt: any = icon && icon.split('.').pop() || '';
				if (this.allowedTypes.includes(fileExt)) {
					return true;
				} else {
					return false;
				}
			}
		}
		return FileUploadComponent.VALID_FILE_EXT.some(el => icon.endsWith(el));
	}
}


