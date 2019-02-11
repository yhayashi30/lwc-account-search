import { LightningElement, track, wire } from 'lwc';
import findAccounts from '@salesforce/apex/AccountSearchFormController.findAccounts';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class AccountSearchForm extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    @track acocuntName = "";
    @track phone = "";
    @track type = "";
    @track dunsNumber =""

    get options() {
        return [
            { label: 'Prospect', value: 'Prospect' },
            { label: 'Customer - Direct', value: 'Customer - Direct' },
            { label: 'Customer - Channel', value: 'Customer - Channel' },
            { label: 'Channel Partner / Reseller', value: 'Channel Partner / Reseller' },
            { label: 'Installation Partner', value: 'Installation Partner' },
            { label: 'Technology Partner', value: 'Technology Partner' },
            { label: 'Other', value: 'Other' }
        ];
    }

    handleAccountNameChange(event) {
        this.acocuntName = event.detail.value;
    }

    handlePhoneChange(event) {
        this.phone = event.detail.value;
    }

    handleTypeChange(event) {
        this.type = event.detail.value;
    }

    handleDunsNumberChange(event) {
        this.dunsNumber = event.detail.value;
    }

    handleSearch() {
        let params = {};
        params.accountName = this.acocuntName;
        params.phone = this.phone;
        params.type = this.type;
        params.dunsNumber = this.dunsNumber;

        let pageRef = this.pageRef;
        findAccounts(params)
            .then(result => {
                fireEvent(pageRef, 'searchResult', result);
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
            });
    }

}