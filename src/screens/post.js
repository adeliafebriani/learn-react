import { useState, useEffect } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
const Post = () => {
	// const { postId } = useParams();
	// const [error, setError] = useState('');
	// const [isLoading, setLoading] = useState(false);
	// const [post, setPost] = useState({});
	const { title, body } = useLoaderData();

	// useEffect(() => {
	// 	getPosts();
	// }, [postId]);

	// const getPosts = async () => {
	// 	setLoading(true);
	// 	try {
	// 		const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
	// 		const post = await response.json();
	// 		setPost(post);
	// 	} catch (error) {
	// 		const errorMessage = error.response.data.message ?? error.message;
	// 		setError(errorMessage);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };

	// if (isLoading) return <p>loading...</p>;
	// if (error) return <p>{error}</p>;

	return (
		// <article>
		// 	<h1>{post?.title}</h1>
		// 	<p>{post?.body}</p>
		// </article>
		<article>
			<h1>{title}</h1>
			<p>{body}</p>
		</article>
	);
};

export default Post;
