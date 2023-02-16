// db.ts
import Dexie, { Table } from 'dexie';

export interface TodoList {
    id?: number;
    title: string;
}
export interface TodoItem {
    id?: number;
    todoListId: number;
    title: string;
    done?: boolean;
}

export class AppDB extends Dexie {
    todoItems!: Table<TodoItem, number>; // * will be called as `db.todoItems` later
    todoLists!: Table<TodoList, number>;

    constructor() {
        super('ngDexieLiveQuery'); // * name of the IndexedDB

        /**
         * Never index properties containing images, movies or large (huge) strings.
         * Store them in IndexedDB, yes! but just don’t index them!
         * @see README.md
         * 
         * Indexed properties will display (on the left) in IndexedDB under its table name
         */
        this.version(1).stores({
            todoLists: '++id', // * auto-incremented primary key
            todoItems: '++id, todoListId',
        });

        /**
         * The populate event occurs only once in a database’ lifetime - in case the database was not present on the client when db.open() was called, and the object stores was needed to be created.
         * When upgrading database, on(“populate”) will NOT be called since it was already called before when database was created in the previous version. In case you change the code that subscribes to the populate event between versions, you should add an upgrade function to the new version that upgrades earlier populated data.
         * The populate event is fired during an onupgradeneeded event and before db.open() has been successfully committed. In case an exception is thrown or an error event happens during the populate event, the entire database creation will be aborted and db.open() will fail.
         * @see https://dexie.org/docs/Dexie/Dexie.on.populate#description
         */
        this.on('populate', () => this.populate());
    }

    async populate() {

        /**
         * `table.add()`
         * Adds an object to the object store.
         * @see https://dexie.org/docs/Table/Table.add()
         */
        const todoListId = await db.todoLists.add({
            title: 'To Do Today',
        });

        await db.todoItems.bulkAdd([
            {
                todoListId,
                title: 'Feed the birds',
            },
            {
                todoListId,
                title: 'Watch a movie',
            },
            {
                todoListId,
                title: 'Have some sleep',
            },
        ]);
    }
}

export const db = new AppDB();
