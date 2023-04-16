import {Todo} from '@/interfaces/todo';
import {TodoListType} from '@/interfaces/todoListType';

export interface ResultContextType {
	todoList: Todo[];
	reloadTodoList: (listType?: TodoListType) => void;
}
