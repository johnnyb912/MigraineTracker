export enum EnumNavOption {
    LOGIN,
    DASHBOARD,
    BILLING,
    ADMIN,
    CLAIMS,
    FORMS,
    CONTACT,
    MESSAGES,
    PROFILE,
    PAYMENT,
    PAYMENTHISTORY,
    PAYMENTMETHODS,
    EMPLOYERCHANGES,
    EMPLOYEECHANGES
}

export interface INavOption {
    baseNavOption   : EnumNavOption;
    title           : string;
    subNav          : any[];
}
