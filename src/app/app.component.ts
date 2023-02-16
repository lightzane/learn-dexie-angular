import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, TodoList } from './db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * GET the data in indexedDB
   */
  todoLists$ = liveQuery(() => db.todoLists.toArray());
  listName = 'My new list';

  async addNewList(): Promise<void> {
    await db.todoLists.add({
      title: this.listName
    });
  }

  identifyList(index: number, list: TodoList): string {
    return `${list.id}${list.title}`;
  }

}
