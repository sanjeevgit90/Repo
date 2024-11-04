import { Injectable } from '@angular/core';
import { ApiHelper } from 'src/app/shared/helpers/api.helper';
import { UPLOAD_TYPE } from '../../constants/constant';

@Injectable({
	providedIn: 'root',
})

export class FileUploadService {
	constructor(
		private apiHelper: ApiHelper) {
	}

	uploadFiles(payload: any, moduleType: string, type?: string) {
		const formData = new FormData();
		for (let i = 0; i < payload.length; i++) {
			formData.append("file", payload[i]);
		}
		if (type == UPLOAD_TYPE.PRIVATE) {
			const endpoint = `v2/upload?moduleType=${moduleType}`//TODO
			return this.apiHelper.postUpload<any>(endpoint, formData)			
		}
		else {
			const endpoint = `v2/uploadPublic?moduleType=${moduleType}`//TODO
			return this.apiHelper.postUploadNoToken<any>(endpoint, formData)
		}
	}


	uploadExcelFiles(payload: any, moduleType: string, type?: string) {
	
		const formData = new FormData();
		for (let i = 0; i < payload.length; i++) {
			formData.append("file", payload[i]);
		}
		if (type == UPLOAD_TYPE.PRIVATE) {
			const endpoint = `uploadFiles/uploadExcel?uploadType=${moduleType}`//TODO
			return this.apiHelper.postUpload<any>(endpoint, formData)			
		}
		else {
			const endpoint = `uploadFiles/uploadExcel?uploadType=${moduleType}`//TODO
			return this.apiHelper.postUploadNoToken<any>(endpoint, formData)
		}
	}

	uploadFarmerFiles(payload: any, moduleType: string) {
		const formData = new FormData();
		for (let i = 0; i < payload.length; i++) {
			formData.append("file", payload[i]);
		}
		const endpoint = `v2/uploadPublic?moduleType=${moduleType}`;
		return this.apiHelper.postUploadNoToken<any>(endpoint, formData)
	}

	deleteFile(filename: string) {
		const endpoint = `v2/upload?filename=${filename}`
		return this.apiHelper.delete<any>(endpoint)
	}
}
