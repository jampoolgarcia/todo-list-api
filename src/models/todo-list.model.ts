import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {TodoListImage, TodoListImageWithRelations} from './todo-list-image.model';
// add TodoWithRelations to the following import
import {Todo} from './todo.model';

@model()
export class TodoList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  color?: string;

  @hasMany(() => Todo)
  todos: Todo[];

  @hasOne(() => TodoListImage)
  image: TodoListImage;

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  // describe navigational properties here
  todo?: TodoListWithRelations[];

  // Add the following line
  image?: TodoListImageWithRelations;
}

export type TodoListWithRelations = TodoList & TodoListRelations;
