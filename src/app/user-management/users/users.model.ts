export class Users {
  id:string=''
  name: string = ''
  mobile: string = ''
  email: string = ''
  password: string = ''
  userType: string = ''
  roles: any;
  [key: string]: any;
}

export class Designation{
  designationId: any = '';
  name: any = ''
}

export class Roles {
  id:string=''
  name: string = ''
  status: any
  isSystemDefined: boolean
}

export class SelectedRoles {
  selectedRoleId:string=''
  selectedRolename: string = ''
}





