import * as _ from 'lodash';

export const onlyLettersAndSpaces = (str: string) => {
    return /^[A-Za-z\s]*$/.test(str);
};
export const onlyNumbersAllowed = (value: string) => {
    value = value.replace(/\D/g, '');
    return value;
}
export const onlyAlphaBetAndSpaceAllowed = (value: string) => {
    value = value.replace(/[^A-Za-z\s]/, "");
    return value;
}
export const onlyAlphanumericAllowed = (value: string) => {
    value = value.replace(/[^a-zA-Z0-9]/, "");
    return value;
}

export const sumOfTheOneKeyOfObject = (p_sList: Array<any>, key: string) => {
    const totalCosts = _.sumBy(p_sList, el => {
        return (+el[key]) || 0;
    });
    let strTotalCosts = totalCosts + "";
    if (strTotalCosts.includes(".")) {
        return (+((+totalCosts).toFixed(2)));
    }
    return totalCosts;
}
export const checkIfDuplicateExists = (arr: Array<any>) => {
    return new Set(arr).size !== arr.length
}

export const removeMutipleSpaces = (value: string) => {
    if (value) {
        value = value.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    }
    return value;
}

export const validationPattern = {
    mobileNumber: /^[0-9]{10}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    // ifscRegex: /^[A-Za-z]{4}[0][\d]{6}$/
     ifscRegex: /^[a-zA-Z0-9]+$/
}
export const changeDateInAPIFormat = (date: Date): string => {
    //YYYY-MM-DD
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    //return `${year}-${month}-${day}`;
    return `${day}-${month}-${year}`
    // please use other better lib for this purpose
}

export const ddMMYYYYYFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`;
}
