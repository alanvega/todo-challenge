import {Todo} from '@/interfaces/todo';
import {TodoListType} from '@/types/todoListType';

export interface ResultContextType {
	todoList: Todo[];
	reloadTodoList: (listType?: TodoListType) => void;
}
