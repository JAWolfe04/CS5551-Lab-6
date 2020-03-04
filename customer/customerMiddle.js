const fs =  require('fs');

const fetchCustomers = () => {
    try {
        const customerString = fs.readFileSync('customer.json');
        return JSON.parse(customerString);
    } catch (e) {
        console.log(e);
        return [];
    }
};

const saveCustomers = (customers) => {
    fs.writeFileSync('customer.json',JSON.stringify(customers));
};

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

const getCustomer = (id) => {
    const customers = fetchCustomers();

    const matchingCustomers =  customers.filter((customer) => {
        return customer.id === id;
    });

    return matchingCustomers[0];
};

const listCustomers = () => {
    return fetchCustomers();
};

const removeCustomer = (id) => {
    const customers = fetchCustomers();

    const filteredCustomers = customers.filter(customer => {
        return customer.id !== id;
    });

    saveCustomers(filteredCustomers);

    return filteredCustomers.length !== customers.length;
};

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