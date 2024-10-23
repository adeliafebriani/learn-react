import { createBrowserRouter, NavLink, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './HomePage';
import Post from './post';
import Posts from './posts';
import Login from './Login';
import Counter from './Counter';
import MetaMask from './MetaMask';

const queryClient = new QueryClient();

export const Root = () => {
	return (
		<header>
			<nav className='nav'>
				<NavLink to='/homepage' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
					Home
				</NavLink>
				<NavLink to='/metamask' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
					MetaMask
				</NavLink>
				<NavLink to='/posts' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
					Posts
				</NavLink>
				<NavLink to='/login' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
					Login
				</NavLink>
				<NavLink to='/counter' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
					Counter
				</NavLink>
			</nav>
			<Outlet />
		</header>
	);
};

export const routes = createBrowserRouter([
	{
		path: '/',
		element: (
			<QueryClientProvider client={queryClient}>
				<Root />
			</QueryClientProvider>
		),
		children: [
			{
				path: 'homepage',
				element: <HomePage />,
			},
			{
				path: 'metamask',
				element: <MetaMask />,
			},
			{
				path: 'counter',
				element: <Counter />,
			},
			{
				path: 'login',
				element: <Login />,
			},

			{
				path: 'posts',
				element: <Posts />,
			},
			{
				path: '/posts/:postId',
				element: <Post />,
				loader: async ({ request, params }) => {
					const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
						signal: request.signal,
					});
					const post = await response.json();
					return post;
				},
			},
		],
	},
]);
