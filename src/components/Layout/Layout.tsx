import dynamic from 'next/dynamic';
import Head from 'next/head';
const MainHeader = dynamic(() => import('@/components/Header/Header'));
const Sidebar = dynamic(() => import('@/components/Navigation/Sidebar'));
const SearchForm = dynamic(() => import('@/components/Search'));
const BottomNavigation = dynamic(
	() => import('@/components/Navigation/BottomNav')
);
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Head>
				<title>Instafam - Connect with people around the world</title>
				<meta
					name='description'
					content='Instafam is social media web app that let you connect with people around the world'
				/>
				<meta
					name='keywords'
					content='social media, instafam, nextjs, tailwindcss, reactjs, firebase'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='bg-white h-full w-full dark:bg-black transition-all'>
				<div className='flex h-full w-full'>
					<section className='hidden md:block'>
						<Sidebar />
					</section>
					<SearchForm />
					<main className='w-full h-full'>
						<MainHeader />
						{children}
						<section className='block md:hidden'>
							<BottomNavigation />
						</section>
					</main>
				</div>
			</div>
		</>
	);
}
