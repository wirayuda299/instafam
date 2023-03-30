import { useSession } from 'next-auth/react';
import Header from '../Header/Header';
import BottomNav from '../Navigation/BottomNav';
import Sidebar from '../Navigation/Sidebar';
import Search from '../Search';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession();
	return (
		<>
			<div className='bg-white h-full w-full dark:bg-black '>
				<div className='flex h-full w-full'>
					<Sidebar />
					<Search />

					<main className='w-full h-full'>
						<Header />
						{children}
						<BottomNav />
					</main>
				</div>
			</div>
		</>
	);
}
