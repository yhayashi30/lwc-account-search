import { LightningElement, track, wire } from 'lwc';

import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

const columns = [
    { label: 'AccountName', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Type', fieldName: 'Type' },
    { label: 'DunsNumber', fieldName: 'DunsNumber' },
];

export default class AccountSearchResult extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    @track data = [];
    @track columns = columns;
    @track tableLoadingState = true;
    @track tableDisp = false;

    connectedCallback() {
        // subscribe to searchKeyChange event
        registerListener('searchResult', this.handleResult, this);
    }

    disconnectedCallback() {
        // unsubscribe from searchKeyChange event
        unregisterAllListeners(this);
    }

    handleResult(accountList) {
        const data = accountList;
        this.data = data;
        this.tableLoadingState = false;
        this.tableDisp = true;
    }
    
}