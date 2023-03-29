import Head from 'next/head';
import Suggestions from '@/components/Suggestions/Suggestions';
import { IUserPostProps } from '@/types/post';
import Loader from '@/components/Loader/Loader';
import dynamic from 'next/dynamic';
import { db } from '@/config/firebase';
import {
	query,
	collection,
	where,
	getDocs,
	orderBy,
	doc,
	getDoc,
} from 'firebase/firestore';
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from './api/auth/[...nextauth]';
import { IUser } from '@/types/user';

export interface Props {
	posts: {
		posts: IUserPostProps[];
	};
}

const PostCard = dynamic(() => import('@/components/Card/Post'), {
	loading: () => <Loader />,
	ssr: true,
});

export default function Home({
	posts,
	user,
	otherUsers,
}: {
	posts: IUserPostProps[];
	user: IUser;
	otherUsers: IUser[];
}) {
	const { data: session } = useSession();

	return (
		<>
			<Head>
				<title>Instafam | Connect with people around the world</title>
				<meta
					name='description'
					content='Instafam is social media web app that let you connect with people around the world'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta
					httpEquiv='Content-Security-Policy'
					content='upgrade-insecure-requests'
				/>
				<meta
					httpEquiv='Content-Security-Policy'
					content='block-all-mixed-content'
				/>
				<meta name='referrer' content='strict-origin' />
				<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='theme-color' content='#000000' />
				<meta name='robots' content='noindex, nofollow' />
				<meta name='googlebot' content='noindex, nofollow' />
				<meta name='google' content='notranslate' />
				<meta name='google' content='nositelinkssearchbox' />
				<meta name='X-Content-Type-Options' content='nosniff' />
				<meta name='X-Frame-Options' content='DENY' />
				<meta name='X-XSS-Protection' content='1; mode=block' />
				<meta name='referrer' content='strict-origin' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Suspense fallback={<h1>Loading...</h1>}>
				<section className='w-full h-full md:p-3 max-w-7xl'>
					<div className='w-full flex justify-between items-start first:flex-grow'>
						<div className='w-full h-full flex flex-col p-5'>
							<Suspense fallback={<Loader />}>
								{posts?.map((post) => (
									<PostCard
										post={post}
										followingLists={user.following}
										key={post.docId}
									/>
								))}
							</Suspense>
						</div>
						<Suspense>
							<Suggestions recommendation={otherUsers} session={session} />
						</Suspense>
					</div>
				</section>
			</Suspense>
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);
	if (!session || !session.user) {
		return {
			redirect: {
				destination: '/auth/signin',
				permanent: false,
			},
		};
	}

	const res = await getDocs(
		query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
	);
	const posts = res.docs.map((doc) => doc.data());
	const user = await getDoc(doc(db, 'users', `${session.user.id}`));
	const currentuser = user.data();
	const otherUsers = await getDocs(
		query(collection(db, 'users'), where('uid', '!=', `${session.user.uid}`))
	);
	context.res.setHeader(
		'Cache-Control',
		's-maxage=60, stale-while-revalidate=59'
	);
	return {
		props: {
			posts: posts ?? [],
			user: currentuser ?? [],
			otherUsers: otherUsers.docs.map((doc) => doc.data()) ?? [],
		},
	};
}
