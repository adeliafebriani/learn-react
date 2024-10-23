import { useEffect, useState, useRef, useReducer } from 'react';
import { Link, useNavigation } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import apiCall from '../util/apiCall';

function Posts() {
	// const [error, setError] = useState('');
	// const [isLoading, setLoading] = useState(false);
	// const [posts, setPosts] = useState([]);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const queryClient = useQueryClient();

	const postMutation = useMutation({
		mutationFn: body => apiCall.post('/posts', body),
		mutationKey: 'create-post',
		onSuccess: () => {
			queryClient.refetchQueries('get-posts');
			setBody('');
			setTitle('');
		},
		onError: error => {
			alert(error.response?.data?.message ?? error?.message);
		},
	});

	const { data, isFetching, isLoading, error, isError } = useQuery({
		queryKey: 'get-posts',
		queryFn: () => apiCall.get('/posts'),
		retry: 0,
		refetchOnWindowFocus: false,
	});

	const errorMessage = error?.response?.data?.message ?? error?.message;

	// useEffect(() => {
	// 	getPhotos();
	// }, []);

	// const getPhotos = async () => {
	// 	setLoading(true);
	// 	try {
	// 		// const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	// 		// const posts = await response.json();
	// 		const response = await apiCall.get('/posts');
	// 		setPosts(response.data);
	// 	} catch (error) {
	// 		const errorMessage = error.response.data.message ?? error.message;
	// 		setError(errorMessage);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	const handleRefresh = () => {
		queryClient.refetchQueries(['get-post']);
	};

	const handleSubmit = e => {
		e.preventDefault();
		postMutation.mutate({ body, title, userId: 1 });
	};

	if (isLoading) return <p>loading...</p>;
	if (isError) return <p>{errorMessage}</p>;

	return (
		<section className='App'>
			<h1>Create a Post</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Title
					<input value={title} name='title' onChange={e => setTitle(e.target.value)} />
				</label>
				<br />
				<label>
					Post
					<textarea value={body} name='body' onChange={e => setBody(e.target.value)}></textarea>
				</label>
				<br />
				<button disabled={postMutation.isPending}> {postMutation.isPending ? 'Creating...' : 'Create Post'}</button>
			</form>
			<h1 className='heading'>List of Posts</h1>
			<ol className='list'>
				{data?.data?.length > 0 &&
					data?.data?.map(({ title, id }) => (
						<li key={id}>
							<Link to={`/posts/${id}`}>{title}</Link>
						</li>
					))}
			</ol>
		</section>
	);
}

export default Posts;
