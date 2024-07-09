//! Le fichier seed.js est utilisé pour créer les tables dans la DB si elles n'existent pas encore (seed = graines).

//* Il faut installer le package "dotenv" pour pouvoir utiliser 'require('dotenv').config()
//* avec la commande `npm install dotenv`
require('dotenv').config();
//* Il faut installer les packages bcrypt et types/bcrypt pour pouvoir les utiliser
//* avec la commande `npm i bcrypt @types/bcrypt` */
const bcrypt = require('bcrypt');
//* Pour @vercel/postgres, voir le Figma Next.js dans les modules "SET UP YOUR DATABASE"
const { db } = require('@vercel/postgres');
//* Pour require les modules suivants, il faut les exporter avec module.exports, dans le fichier placeholder-data.js
const { users, listes, tasks, invoices } = require('../src/app/lib/placeholder-data.js');
const { create } = require('domain');

console.log(listes);

//= USERS
/**
 * seedUsers() est une fonction asynchrone.
 * Dans son bloc TRY, elle fait 2 requêtes sql.
 *      - première requête : 
 *              -> client.sql = fait référence à la méthode "sql" fournie par la bibliothèque cliente SQL qui exécute une requête SQL. Nom qui varie selon la bibliothèque.
 *              -> CREATE EXTENSION IF NOT EXISTS "uuid-ossp" vérifie si l'extension "uuid-ossp" est déjà installée dans la DB. Si ce n'est pas le cas, elle l'installe. "uuid-ossp" génère des UUIDs, utiles pour créer des identifiants uniques dans une DB.
 *              -> createTable() crée la table users, qui va contenir les clés "id", "name", "email", et "password"
 * 
 *      - deuxième requête :
 *              -> insertedUsers() retourne un objet lorsque toutes les promesses sont tenues.
 *              -> map sur la constante "users" destructurée en début de fichier.
 *              -> Pour chaque user, cryptage du mot de passe avec bcrypt.
 *              -> insertion en DB dans la table "users", aux clé 'id', ... de chaque valeur fournie dans la constante destructurée "users" du fichier importé en début de fichier.
 *              -> En cas de conflit d'id, ne rien faire.
 * 
 * Lorsque les deux fonctions ont été exécutées, seedUsers() retourne un objet contenant la retour de createTable() et le retour de insertedUsers().
 */
async function seedUsers(client) {
    try {
        //* Vérification de l'existence de "uuid-ossp" et ajout si nécessaire
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uudi-ossp"`;

        //* Création de la table "users" si elle n'existe pas déjà
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `;

        console.log('Created "users" table');

        //* Insertion de données dans la table users
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                    INSERT INTO users (id, name, email, password)
                    VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
                    ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };

    } catch (error) {
        console.error('Error seeding users:', errors);
        throw error;
    }
}




//= LISTES
async function seedListes(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        //* Création de la table "listes" si elle n'existe pas encore
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS listes (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID NOT NULL,
                name VARCHAR(255) NOT NULL,
                status VARCHAR(255) NOT NULL,
                date DATE NOT NULL
            );
        `;

        console.log(`Created "listes" table`);

        //* Insertion des données dans la table "listes"
        const insertedListes = await Promise.all(
            listes.map((list) =>  {
                return client.sql`
                INSERT INTO listes (user_id, name, status, date)
                VALUES (${list.user_id}, ${list.name} ,${list.status}, ${list.date})
                ON CONFLICT (id) DO NOTHING;
            `}),
        );

        console.log(`Seeded ${insertedListes.length} listes`);

        return {
            createTable,
            listes: insertedListes,
        };

    } catch (error) {
        console.error('Error seeding listes:', error);
        throw error;
    }
}


//= TASKS
async function seedTasks(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS tasks (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                list_id UUID NOT NULL,
                priority VARCHAR(255),
                name VARCHAR(255),
                status VARCHAR(255),
                date DATE NOT NULL,
            );
        `;

        console.log(`Created "tasks" table`);

        const insertedTasks = await Promise.all(
            tasks.map((task) => {
                return client.sql`
                    INSERT INTO tasks (list_id, priority, name, status, date)
                    VALUES (${task.list_id}, ${task.priority}, ${task.name}, ${task.status}, ${task.date})
                    ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );

        console.log(`Seeded ${tasks.length} tasks`);

        return {
            createTable,
            tasks: insertedTasks,
        };

    } catch (error) {
        console.error('Error seeding tasks:', error);
        throw error;
    }
}


//= INVOICES
async function seedInvoices(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS invoices(
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID NOT NULL,
                amount INT NOT NULL,
                status VARCHAR(255) NOT NULL,
                date DATE NOT NULL, 
            );
        `;

        console.log(`Created "invoices" table`);

        const insertedInvoices = await Promise.all(
            invoices.map((invoice) => {
                return client.sql`
                    INSERT INTO invoices (user_id, amount, status, date)
                    VALUES (${invoice.user_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
                    ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );

        console.log(`Seeded ${insertedInvoices.length} invoices`);

        return {
            createTable,
            invoices: insertedInvoices,
        };


    } catch (error) {
        console.error('Error seeding invoices: ', error);
        throw error;
    }
}