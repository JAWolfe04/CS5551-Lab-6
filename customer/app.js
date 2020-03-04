const fs = require('fs');
const lodash = require('lodash');
const yargs = require('yargs');

const middle = require('./customerMiddle.js');

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

if (command === 'add') {
    const customer = middle.addCustomer(argv.id, argv.name, argv.email);

    if(customer) {
        middle.logCustomer(customer);
    } else {
        console.log("This Customer already exists");
    }
} else if (command === 'get') {

} else if (command === 'list') {
    const customers = middle.listCustomers();

    customers.forEach(customer => {
        middle.logCustomer(customer);
    });
} else if (command === 'remove') {

} else {
    console.log('command note recognized');
};