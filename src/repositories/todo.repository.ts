import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TodoList} from '../models';
import {Todo, TodoRelations} from '../models/todo.model';
import {TodoListRepository} from './todo-list.repository';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
  > {

  public readonly todoList: BelongsToAccessor<TodoList, typeof Todo.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoListRepository') protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(Todo, dataSource);
    this.todoList = this.createBelongsToAccessorFor('todoList', todoListRepositoryGetter,);
    this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
  }
}
