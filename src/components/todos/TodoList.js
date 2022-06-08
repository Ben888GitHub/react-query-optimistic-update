import {
	useTodos,
	useAddTodo,
	useDeleteTodo,
	useUpdateTodo
} from '../../hooks/useAxios';
import { useState, Fragment, memo } from 'react';
import { Link } from 'react-router-dom';

function TodoList() {
	const { isLoading, data, error } = useTodos();

	const [value, setValue] = useState({
		title: '',
		description: ''
	});

	const { mutation } = useAddTodo(value);

	const { deleteMutation } = useDeleteTodo(value);

	const { updateMutation } = useUpdateTodo(value);

	const handleChange = (e) => {
		// console.log(e.target.name);
		setValue({
			...value,
			[e.target.name]: e.target.value
		});
	};

	if (isLoading) return <div>Loading</div>;

	if (error) return <div>Error</div>;

	// data && console.log(data);

	return (
		<>
			<h2>Todo List</h2>
			{data &&
				data?.map((todo, idx) => (
					<Fragment key={idx}>
						<Link to={`/${todo.id}`}>
							<h4>{todo.title}</h4>
						</Link>

						<h4>{todo.description}</h4>

						<button
							onClick={() => {
								setValue({ ...value, id: todo.id });
								deleteMutation.mutate({ id: todo.id });
							}}
						>
							Delete {todo.title}
						</button>
						<button
							style={{ marginLeft: 10 }}
							onClick={() => {
								const newTitle = prompt('New Title');
								setValue({
									...value,
									id: todo.id,
									title: newTitle,
									description: todo.description
								});
								updateMutation.mutate({
									id: todo.id,
									title: newTitle,
									description: todo.description
								});
							}}
						>
							Update {todo.title}
						</button>
						<hr />
					</Fragment>
				))}
			<select
				name="title"
				id="title"
				value={value.title}
				onChange={handleChange}
			>
				<option value="">Your Tool's Name</option>
				<option value="GraphQL">GraphQL</option>
				<option value="Redux Toolkit">Redux Toolkit</option>
				<option value="Supabase">Supabase</option>
				<option value="MongoDB">MongoDB</option>
			</select>
			<br />
			<select
				name="description"
				id="description"
				value={value.description}
				onChange={handleChange}
			>
				<option value="">Your Tool's Description</option>
				<option value="API Query Engine">API Query Engine</option>
				<option value="State Management for Large Apps">
					State Management for Large Apps
				</option>
				<option value="One of the best BAAS">One of the best BAAS</option>
				<option value="NoSQL Database">NoSQL Database</option>
			</select>
			<br />
			<button
				onClick={() =>
					mutation.mutate({
						id: Math.floor(Math.random() * 100),
						title: value.title,
						description: value.description
					})
				}
			>
				Add Tool
			</button>
		</>
	);
}

export default memo(TodoList);
