const fs =  require('fs');

//-------------------------------------------------------------------------
// fetchCustomers
//
// get all of the customer records from json
//-------------------------------------------------------------------------
const fetchCustomers = () => {
    try {
        const customerString = fs.readFileSync('customer.json');
        return JSON.parse(customerString);
    } catch (e) {
        console.log(e);
        return [];
    }
};

//-------------------------------------------------------------------------
// saveCustomers
//
// write all of the customer records to json
//-------------------------------------------------------------------------
const saveCustomers = (customers) => {
    fs.writeFileSync('customer.json',JSON.stringify(customers));
};

//-------------------------------------------------------------------------
// addCustomer
//
// add single customer record, then save to json
//
// input:   id    -- Customer id, unique
//          name  -- Customer name
//          email -- Customer email address
//-------------------------------------------------------------------------
const addCustomer = (id, name, email) => {
    const customers = fetchCustomers();
    const customer = { id, name, email };

    const duplicateCustomer =  customers.filter((customer) => {
        return customer.id === id;
    });

    if (duplicateCustomer.length === 0) {
        customers.push(customer);
        saveCustomers(customers);
        return customer;
    };
};

//-------------------------------------------------------------------------
// getCustomer
//
// retrieve customer information formation for give id
//
// input:   id    -- Customer id being searched for
//-------------------------------------------------------------------------
const getCustomer = (id) => {
    const customers = fetchCustomers();

    const matchingCustomers =  customers.filter((customer) => {
        return customer.id === id;
    });

    return matchingCustomers[0];
};

//-------------------------------------------------------------------------
// listCustomers
//
// retrieve all of the customers stored in the json
//-------------------------------------------------------------------------
const listCustomers = () => {
    return fetchCustomers();
};

//-------------------------------------------------------------------------
// removeCustomer
//
// remove single customer stored  the json
//
// input:   id    -- Customer id being searched for
//-------------------------------------------------------------------------
const removeCustomer = (id) => {
    const customers = fetchCustomers();

    const filteredCustomers = customers.filter(customer => {
        return customer.id !== id;
    });

    saveCustomers(filteredCustomers);

    return filteredCustomers.length !== customers.length;
};

//-------------------------------------------------------------------------
// logCustomer
//
// output to console information about customer record
//
// input:   customer    -- Customer record being printed
//-------------------------------------------------------------------------
const logCustomer = (customer) => {
    console.log('----------------------------------------');
    console.log(`ID: ${customer.id}`);
    console.log(`Name: ${customer.name}`);
    console.log(`Email: ${customer.email}`);
    console.log('----------------------------------------');
};

module.exports = {
    addCustomer, getCustomer, listCustomers, removeCustomer, logCustomer
};
