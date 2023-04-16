import {TodoContainer} from '@/components/todoContainer';

export default function Home() {
	return (
		// <main className="dark"> TODO: Add dark mode
		<main className="">
			<div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-slate-800">
				<div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
					<div className="w-full max-w-md space-y-8">
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
							T O D O
						</h2>
						<TodoContainer/>
					</div>
				</div>
			</div>
		</main>
	)
}
