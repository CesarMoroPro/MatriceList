//* Pour que les variables suivants puisse être REQUIRE dans le fichier "seed.js" et non importés, il faut les exporter en fin de fichier avec `module.exports = {};`

const users = [
    {
        id: "410544b2-4001-4271-9855-fec4b6a6442a",
        firstname: "John",
        name: "Smith",
        email: "johnsmith@test.killer",
        password: "user01"
    },

    {
        id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
        firstname: "Jane",
        name: "Smith",
        email: "janesmith@test.wtf",
        password: "user02"
    },
    {
        id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
        firstname: "Johnny",
        name: "Cash",
        email: "johnnycash@test.rock",
        password: "user03"
    },
];

const listes = [
    /* Dans le fichier seed.js, on a ajouté une directive SQL "UNIQUE (user_id, name)" pour qu'un utilisateur ne puisse pas ajouter deux fois la même liste (d'après le nom de la liste).
    
    La première liste ci-dessous sert à tester qu'une liste appartenant à un utilisateur A peut porter le même nom qu'une liste appartenant à un utilisateur B.
    On lui attribue donc le même nom que la liste situé à l'index 1 (user_id: users[0].id, name: "liste 1.1") mais en lui attribuant l'utilisateur à l'index 1 (user_id: users[1].id) */
    {
        id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        user_id: users[1].id,
        name: "liste 1.1",
        status: "active",
        date: new Date(),
    },
    {
        id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        user_id: users[0].id,
        name: "liste 1.1",
        status: "active",
        date: new Date(),
    },
    {
        id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
        user_id: users[0].id,
        name: "liste 1.2",
        status: "active",
        date: new Date(),
    },
    {
        id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
        user_id: users[0].id,
        name: "liste 1.3",
        status: "active",
        date: new Date(),
    },
    {
        id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        user_id: users[1].id,
        name: "liste 2.1",
        status: "active",
        date: new Date(),
    },
    {
        id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        user_id: users[1].id,
        name: "liste 2.2",
        status: "active",
        date: new Date(),
    },
    {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
        user_id: users[1].id,
        name: "liste 2.3",
        status: "active",
        date: new Date(),
    },
    {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
        user_id: users[1].id,
        name: "liste 2.4",
        status: "active",
        date: new Date(),
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        user_id: users[2].id,
        name: "liste 3.1",
        status: "active",
        date: new Date(),
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        user_id: users[2].id,
        name: "liste 3.2",
        status: "active",
        date: new Date(),
    },
];

const tasks = [
    {
        id: '4d3ef2c8-fc32-498d-9282-047281f0bee9',
        list_id: listes[0].id,
        priority: "UI",
        name: "Première tâche de la liste 1.1",
        status: "active",
        date: new Date(),
    },
    {
        id: '1cc36a79-6834-4bcb-987d-9af479e9122a',
        list_id: listes[3].id,
        priority: "UNI",
        name: "Première tâche de la liste 2.1",
        status: "completed",
        date: new Date(),
    },
    {
        id: '14ffbbab-7244-4fab-8840-cbd88ff1f716',
        list_id: listes[3].id,
        priority: "INU",
        name: "Deuxième tâche de la liste 2.1",
        status: "active",
        date: new Date(),
    },
    {
        id: '5aa7e8ff-c01f-4a7d-9b0b-f7a6b2c49a28',
        list_id: listes[7].id,
        priority: "NUNI",
        name: "Première tâche de la liste 3.1",
        status: "completed",
        date: new Date(),
    },
    {
        id: 'f84d37f8-0575-442d-87bb-51f1acde08e3',
        list_id: listes[7].id,
        priority: "UI",
        name: "Deuxième tâche de la liste 3.1",
        status: "completed",
        date: new Date(),
    },
];

const invoices = [
    {
        user_id: users[0].id,
        amount: "15",
        status: "paid",
        date: new Date(),
    },
    {
        user_id: users[1].id,
        amount: "15",
        status: "pending",
        date: new Date(),
    },
    {
        user_id: users[2].id,
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