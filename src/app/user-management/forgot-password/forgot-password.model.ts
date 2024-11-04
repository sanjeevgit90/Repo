export class Login {
    username: string = ''
    password: string = ''
}

export class SaveCaptcha {
    username: string = ''
    captcha: string = ''
}

export class GenerateOTP {
  username: string = ''
  templateId: string = ''
  notificationTypes: []
}

export class ForgotPassword {
  username: string = ''
  otp: string = ''
  newPassword: string ='';
  confirmPassword: string ='';
}
