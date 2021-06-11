import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import STATUS_FIELD from '@salesforce/schema/Account.Status';


const fields = [STATUS_FIELD];


export default class AutoMotiveProgressIndicator extends LightningElement {
    // steps = [
    //     { label: 'In Stock', value: 'step-1' },
    //     { label: 'So', value: 'step-2' },
    //     { label: 'Purchased', value: 'step-3' },
       
    // ];
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    account;

    get revenue() {
        return getFieldValue(this.account.data, REVENUE_FIELD);
    }

}
