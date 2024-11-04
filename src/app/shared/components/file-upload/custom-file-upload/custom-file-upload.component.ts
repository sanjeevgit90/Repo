import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { FileUploadService } from '../file-upload.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { WANT_TO_REMOVE } from 'src/app/shared/constants/messagesConstant';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericApis } from 'src/app/shared/constants/apiEndPointPathName';

declare var window: any;

@Component({
	selector: 'app-custom-file-upload',
	templateUrl: './custom-file-upload.component.html',
	styleUrls: ['./custom-file-upload.component.css']
})
export class CustomFileUploadComponent implements OnInit {
	static readonly VALID_FILE_EXT = ['.jpg', '.jpeg', '.pdf', '.png', '.mp4', '.webm', '.avi', '.mkv', '.wmv', '.mov', '.flv', '3gp', '.mpeg', '.ogv'];
	static readonly DEFAULT_TEXT = "No File Chosen";
	@ViewChild('fileInput') fileInput!: ElementRef;
	@ViewChild('dialogModal') dialogModal!: ElementRef;
	@Input() inputId: any;
	@Input() label: string = '';
	@Input() allowedTypes: string = '*'; // File type filter (e.g., '.jpg, .png')
	@Input() maxSizeMB: number = 2; // Max file size in MB
	@Input() isMandatory: boolean = true;
	@Input() uploadFileModuleType: string = "";
	@Input() farmerFileUpload: boolean;
	@Input() formGroup: FormGroup;
	@Input() isDisabled: boolean = false;
	@Input() maxNoOfFiles: number = 2;
	@Input() fileDialogShouldOpen: boolean = false;
	allFilesList: Array<{ [key: string]: any }> = [];
	errorMessage: Record<string, string> = {
		required: 'The field is required',
	}
	singleFileSize = 0;
	showFilePane: boolean = false;
	fileCompText: string = CustomFileUploadComponent.DEFAULT_TEXT;
	resetFormContent: string = WANT_TO_REMOVE;
	modalPopup: any;
	private subscr: Subscription;
	viewDoc: string;
	constructor(
		private fileUploadService: FileUploadService,
		private commonService: CommonService
	) {
	}
	ngOnInit(): void {
		this.maxNoOfFiles = +this.maxNoOfFiles;
		this.singleFileSize = this.maxSizeMB * 1024 * 1024;
		this.subscr = this.formGroup.valueChanges.subscribe((val) => {
			this.allFilesList = [];
			if (val[this.inputId]) {
				val[this.inputId].forEach((el: { [key: string]: any }) => {
					this.allFilesList.push(el);
				});
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
			} else {
				if (inValidFileCnt) {
					this.commonService.showErrorMessage(`File size limit upto ${this.maxSizeMB} MB`, false);
				} else {
					const customName = `${(this.allFilesList.length + files.length)} files`;
					this.fileCompText = customName;
					files.forEach((el: { [key: string]: any }) => {
						el.selected = 1;
						this.allFilesList.push(el)
					});
					this.showFilePane = true;
				}

			}
		}


	};
	fileHandler = {
		next: (response: any) => {
			const resData = this.commonService.getAPIDataNode(response) || {};
			const fileName = _.get(resData, "id", "");
			const fileActualName = _.get(resData, "name", "");
			const currentFileIndex = _.findIndex(this.allFilesList, [
				'name',
				fileActualName,
			]);
			this.allFilesList[currentFileIndex] = resData;
			this.formGroup.controls[this.inputId].setValue(_.cloneDeep(this.allFilesList));
		},
		error: (error: any) => {
			this.commonService.showErrorMessage(error, false);
		},
		complete: () => {
		}
	};

	deleteFile(p_sFileName: string) {
		this.openDialog(p_sFileName);
	}
	onModalCallBack = () => {
		const deletedFileName = _.cloneDeep(this.modalPopup.fileName);
		if (deletedFileName) {
			this.modalPopup.hide();
			this.fileUploadService.deleteFile(deletedFileName).subscribe(
				{
					next: (response) => {
						const resData = this.commonService.getAPIDataNode(response) || "";
						this.commonService.showSuccessMessage(resData);
						this.allFilesList = this.allFilesList.filter((fi) => {
							return (fi.name !== deletedFileName)
						});
						const customName = this.allFilesList.length ? `${(this.allFilesList.length)} files` : CustomFileUploadComponent.DEFAULT_TEXT;
						this.fileCompText = customName;
						// let nameList = _.map(this.allFilesList, "name");
						this.formGroup.controls[this.inputId].setValue(_.cloneDeep(this.allFilesList));
					},
					error: (error) => {
						this.commonService.showErrorMessage(error, false);
					},
					complete: () => {
						if (!this.allFilesList.length) {
							this.fileInput.nativeElement.value = "";
							this.formGroup.controls[this.inputId].setValue([]);
							this.showFilePane = false;
						}
					}
				}
			);
		} else {
			this.commonService.showErrorMessage("file name missing!", false);
		}
	}

	openDialog(p_sFileName: string) {
		this.modalPopup = new window.bootstrap.Modal(this.dialogModal.nativeElement);
		this.modalPopup.fileName = p_sFileName;
		this.modalPopup.show();
	}

	viewDocuments(id: string) {
		this.viewDoc = `${environment.APIUrl}${GenericApis.DOWNLOAD_PUBLIC_API}${id}`
		window.open(this.viewDoc, '_blank');
	}

	isValidFileExtension(icon: string) {
		if (this.allowedTypes) {
			if (this.allowedTypes.includes("*")) {
				return CustomFileUploadComponent.VALID_FILE_EXT.some(el => icon.endsWith(el));
			} else {
				const fileExt: any = icon && icon.split('.').pop() || '';
				if (this.allowedTypes.includes(fileExt)) {
					return true;
				} else {
					return false;
				}
			}
		}
		return CustomFileUploadComponent.VALID_FILE_EXT.some(el => icon.endsWith(el));
	}
	openFile() {
		if ((this.allFilesList.length === this.maxNoOfFiles)) {
			this.commonService.showErrorMessage(`You can select max ${this.maxNoOfFiles} files`, false);
		} else {
			this.showFilePane = false;
			this.fileInput.nativeElement.click()
		}
	}
	openFilePane() {
		this.showFilePane = !this.showFilePane;
	}
	fileAction(fi: { [key: string]: any }, p_sAction: string) {
		switch (p_sAction) {
			case "upload":
				if (fi.selected) {
					if (this.farmerFileUpload) {
						this.fileUploadService.uploadFarmerFiles([fi], this.uploadFileModuleType).subscribe(this.fileHandler);
					} else {
						this.fileUploadService.uploadFiles([fi], this.uploadFileModuleType).subscribe(this.fileHandler);
					}
				}
				break;
			case "softDelete":
				this.allFilesList = this.allFilesList.filter((el) => {
					return (el.name !== fi.name)
				});
				const customName = this.allFilesList.length ? `${(this.allFilesList.length)} files` : CustomFileUploadComponent.DEFAULT_TEXT;
				this.fileCompText = customName;
				//let nameList = _.map(this.allFilesList, "name");
				this.formGroup.controls[this.inputId].setValue(_.cloneDeep(this.allFilesList));
				if (!this.allFilesList.length) {
					this.fileInput.nativeElement.value = "";
					this.formGroup.controls[this.inputId].setValue([]);
					this.showFilePane = false;
				}
				break;
			case "delete":
				this.openDialog(fi.name);
				break;
			default:
				break;
		}
	}
}


