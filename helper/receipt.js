const receipt = require('receipt');
const medicine = require('../models/medicine');

function printReceipt() {
    receipt.config.currency = 'Rp';
    receipt.config.width = 50;
    receipt.config.ruler = '-';
    
    const output = receipt.create([
        { type: 'text', value: [
            'MY AWESOME STORE',
            'Hi Doc',
            'HiDoc@store.com',
            'www.HiDoc.com'
        ], align: 'center' },
        { type: 'empty' },
        { type: 'properties', lines: [
            { name: 'Order Number', value: 'XXXXXXXXXXXX' },
            { name: 'Date', value: 'XX/XX/XXXX XX:XX' }
        ] },
        { type: 'table', lines: [
            { item: 'Product 1', qty: 1, cost: 1000 },
            { item: 'Product 2 with a really long name', qty: 1, cost: 17500, discount: { type: 'absolute', value: 1000 } },
            { item: 'Another product wth quite a name', qty: 2, cost: 900 },
        ] },
        { type: 'empty' },
        { type: 'text', value: 'Some extra information to add to the footer of this docket.', align: 'center' },
        { type: 'empty' },
        { type: 'properties', lines: [
            { name: 'GST (10.00%)', value: 'AUD XX.XX' },
            { name: 'Total amount (excl. GST)', value: 'AUD XX.XX' },
            { name: 'Total amount (incl. GST)', value: 'AUD XX.XX' }
        ] },
        { type: 'empty' },
        { type: 'properties', lines: [
            { name: 'Amount Received', value: 'AUD XX.XX' },
            { name: 'Amount Returned', value: 'AUD XX.XX' }
        ] },
        { type: 'empty' },
        { type: 'text', value: 'Final bits of text at the very base of a docket. This text wraps around as well!', align: 'center', padding: 5 }
    ]);
    
    return output
}



module.exports = printReceipt