const fs = require('fs');
const lodash = require('lodash');
const yargs = require('yargs');

const middle = require('./customerMiddle.js');
//------------------------------------------------------------------
// id, name and email parameters
//------------------------------------------------------------------
const idOptions = {
    describe: 'Customer ID',
    demand : true,
    alias : 'id'
};

const nameOptions = {
    describe: 'Customer name',
    demand : true,
    alias : 'name'
};

const emailOptions = {
    describe: 'Customer email',
    demand : true,
    alias : 'email'
};

//------------------------------------------------------------------
const argv =  yargs
    .command('add', 'Add a Customer', {
        id: idOptions,
        name: nameOptions,
        email: emailOptions
    })
    .command('get', 'Get customer information', {
        id: idOptions
    })
    .command('list', 'List all customer IDs')
    .command('remove', 'Remove a Customer', {
        id: idOptions
    })
    .help()
    .argv;

const command = yargs.argv._[0];

//------------------------------------------------------------------
if (command === 'add') {

    const customer = middle.addCustomer(argv.id, argv.name, argv.email);

    if(customer) {  //add unique customer record for given id
        middle.logCustomer(customer);
    } else {
        console.log("This Customer already exists");
    }
} else if (command === 'get') { // get customer for give id value
    const customer = middle.getCustomer(argv.id);

    if(customer) {
        middle.logCustomer(customer);
    } else {
        console.log('Customer not found')
    }
} else if (command === 'list') {   // list all the customers
    const customers = middle.listCustomers();

    customers.forEach(customer => {
        middle.logCustomer(customer);
    });
} else if (command === 'remove') {
    const removed = middle.removeCustomer(argv.id);

    if(removed) { // remove customer if id found
        console.log('Customer removed');
    } else {
        console.log('Unable to find customer');
    }
} else { //do not know what to do
    console.log('command not recognized');
};
