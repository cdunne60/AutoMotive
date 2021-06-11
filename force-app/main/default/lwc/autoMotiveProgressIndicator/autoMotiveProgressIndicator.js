import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import STATUS_FIELD from '@salesforce/schema/Asset.Status';


const fields = [STATUS_FIELD];


export default class AutoMotiveProgressIndicator extends LightningElement {
    // steps = [
    //     { label: 'In Stock', value: 'step-1' },
    //     { label: 'So', value: 'step-2' },
    //     { label: 'Purchased', value: 'step-3' },
       
    // ];
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    asset;

    get revenue() {
        return getFieldValue(this.asset.data, REVENUE_FIELD);
    }
    get status() {
        return this.asset.data.fields.Status.value;
    }

    get currentStatus(){
        let tempCurrentStatus
        if(this.asset.data) {
            switch (this.asset.data.fields.Status.value) {
                case "New":
                    tempCurrentStatus = "1";
                    break
                case "Paperwork In Review":
                    tempCurrentStatus = "2";
                    break
                case "Change Pending":
                    tempCurrentStatus = "3";
                    break
            }
        }
        return tempCurrentStatus;
    }

}
