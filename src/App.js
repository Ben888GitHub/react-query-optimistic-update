import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/todos/TodoList';
import Todo from './components/todos/Todo';

// Instantiate new Client
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<h1>React Query Todo App with Optimistic Update</h1>
				<Routes>
					<Route path="/" element={<TodoList />} />
					<Route path="/:id" element={<Todo />} />
				</Routes>
			</div>
		</QueryClientProvider>
	);
}

export default App;
