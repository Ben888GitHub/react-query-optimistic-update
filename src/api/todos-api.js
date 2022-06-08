import axios from 'axios';

export const getTodos = async () => {
	const { data } = await axios.get('http://localhost:3001/todos');
	return data;
};

export const getTodo = async (id) => {
	const { data } = await axios.get(`http://localhost:3001/todos/${id}`);
	return data;
};

export const addTodo = async (todo) => {
	const { data } = await axios.post('http://localhost:3001/todos', todo);

	return data;
};

export const deleteTodo = async (id) => {
	console.log(id);
	const { data } = await axios.delete(`http://localhost:3001/todos/${id.id}`);
	return data;
};

export const updateTodo = async (todo) => {
	const { data } = await axios.put(
		`http://localhost:3001/todos/${todo.id}`,
		todo
	);
	return data;
};

// export { getTodos, getTodo, addTodo, deleteTodo, updateTodo };
