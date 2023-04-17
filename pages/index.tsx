import {TodoContainer} from '@/components/todoContainer';
import {useState} from 'react';
import {ThemeType} from '@/types/ThemeType';
import {SunIcon} from '@/icons/sunIcon';
import {MoonIcon} from '@/icons/moonIcon';

export default function Home() {
	const [theme, setTheme] = useState<ThemeType>('light');

	const isThemeLight = theme === 'light';

	return (
		<main className={theme}>
			<div className="absolute right-0 p-2 sm:p-8 text-gray-400 dark:text-gray-200">
				<a className="cursor-pointer" onClick={() => setTheme(isThemeLight? 'dark' : 'light')}>
					{ isThemeLight ?
						<MoonIcon/>
						:
						<SunIcon/>
					}
				</a>
			</div>
			<div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-slate-800">
				<div className="flex min-h-full w-full max-w-lg p-3 sm:p-8 py-12">
					<div className="w-full space-y-8">
						<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
							T O D O
						</h2>
						<TodoContainer/>
					</div>
				</div>
			</div>
		</main>
	)
}
