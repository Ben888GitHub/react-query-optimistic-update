import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
	getTodos,
	getTodo,
	addTodo,
	deleteTodo,
	updateTodo
} from '../api/todos-api';

export const useTodos = () => {
	return useQuery('todos', getTodos, {
		keepPreviousData: true
	});
};

export const useTodo = (todoId) => {
	return useQuery(['todos', todoId], () => getTodo(todoId), {
		enabled: !!todoId,
		keepPreviousData: true
	});
};

export const useAddTodo = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation((todoValue) => addTodo(todoValue), {
		// When mutate is called:
		onMutate: async (newTodo) => {
			await queryClient.cancelQueries('todos'); // 1) firstly, cancel the existing query so it won't start updating it
			const oldTodo = await queryClient.getQueryData('todos'); // 2) get current data object

			queryClient.setQueryData('todos', [...oldTodo, newTodo]); // 3) then we update the data
			return { oldTodo, newTodo };
		},
		// If the mutation fails, use the context returned from onMutate to roll back
		onError: (error, newTodo, context) => {
			queryClient.setQueryData('todos', context.oldTodo);
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryClient.invalidateQueries('todos');
		}
	});

	return { mutation };
};

export const useDeleteTodo = (todoId) => {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation((id) => deleteTodo(id), {
		onSuccess: (newTodo) => {
			// Invalidate and refetch (real time update)
			queryClient.invalidateQueries('todos');
		}
	});

	return { deleteMutation };
};

export const useUpdateTodo = (id) => {
	const queryClient = useQueryClient();
	const updateMutation = useMutation((todoData) => updateTodo(todoData), {
		onMutate: async (newTodo) => {
			await queryClient.cancelQueries(['todos', newTodo.id]);
			const oldTodo = await queryClient.getQueryData(['todos', newTodo.id]);

			// Update data in real time
			queryClient.setQueryData(['todos', id], newTodo);

			// Return a context with the previous and new todo
			return { oldTodo, newTodo };
		},
		onError: (error, newTodo, context) => {
			queryClient.setQueryData(['todos', context.newTodo.id], context.oldTodo);
		},
		// Always refetch after error or success:
		onSettled: (newTodo) => {
			queryClient.invalidateQueries(['todos', newTodo.id]);
		}
	});

	return { updateMutation };
};
