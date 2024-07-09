//* Pour que les variables suivants puisse être REQUIRE dans le fichier "seed.js" et non importés, il faut les exporter en fin de fichier avec `module.exports = {};`

const users = [
    {
        id: "u01",
        name: "John Smith",
        email: "johnsmith@test.killer",
    },

    {
        id: "u02",
        name: "Jane Smith",
        email: "janesmith@test.wtf"
    },
    {
        id: "u03",
        name: "Johnny Cash",
        email: "johnnycash@test.rock",
    },
];

const listes = [
    {
        id: '01',
        user_id: "u01",
        name: "liste 1",
        status: "active",
        date: new Date(),
    },
    {
        id: "02",
        user_id: "u01",
        name: "liste 2",
        status: "active",
        date: new Date(),
    },
    {
        id: '03',
        user_id: "u01",
        name: "liste 3",
        status: "active",
        date: new Date(),
    },
    {
        id: '04',
        user_id: "u02",
        name: "liste 1",
        status: "active",
        date: new Date(),
    },
    {
        id: '05',
        user_id: "u02",
        name: "liste 2",
        status: "active",
        date: new Date(),
    },
    {
        id: '06',
        user_id: "u02",
        name: "liste 3",
        status: "active",
        date: new Date(),
    },
    {
        id: '07',
        user_id: "u02",
        name: "liste 4",
        status: "active",
        date: new Date(),
    },
    {
        id: '08',
        user_id: "u03",
        name: "liste 1",
        status: "active",
        date: new Date(),
    },
    {
        id: '09',
        user_id: "u03",
        name: "liste 2",
        status: "active",
        date: new Date(),
    },
];

const tasks = [
    {
        id: "t01",
        list_id: "L01",
        priority: "ui",
        name: "Première tâche",
        status: "active",
        date: new Date(),
    },
    {
        id: "t02",
        list_id: "L02",
        priority: "UNI",
        name: "Seconde tâche",
        status: "completed",
        date: new Date(),
    },
    {
        id: "t03",
        list_id: "L05",
        priority: "INU",
        name: "Première tâche",
        status: "active",
        date: new Date(),
    },
    {
        id: "t04",
        list_id: "L08",
        priority: "NUNI",
        name: "Seconde tâche",
        status: "completed",
        date: new Date(),
    },
];

const invoices = [
    {
        id: "i01",
        user_id: "u01",
        amount: "15",
        status: "paid",
        date: new Date(),
    },
    {
        id: "i02",
        user_id: "u02",
        amount: "15",
        status: "pending",
        date: new Date(),
    },
    {
        id: "i03",
        user_id: "u03",
        amount: "15",
        status: "paid",
        date: new Date(),
    },
];

module.exports = {
    users,
    listes,
    tasks,
    invoices,
};