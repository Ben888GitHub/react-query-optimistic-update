import { useTodo } from '../../hooks/useAxios';
import { memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Todo() {
	let params = useParams();
	let navigate = useNavigate();
	const { isLoading, data, error } = useTodo(params.id);

	if (isLoading) return <div>Loading</div>;

	if (error) return <div>Error</div>;

	return (
		<>
			<button onClick={() => navigate(-1)}>Back</button>

			{data && (
				<>
					<h1>{data?.title}</h1>
					<p>{data?.description}</p>
				</>
			)}
		</>
	);
}

export default memo(Todo);
