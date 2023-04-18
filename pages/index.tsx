import {TodoContainer} from '@/components/todoContainer';
import {useEffect, useState} from 'react';
import {ThemeType} from '@/types/ThemeType';
import {SunIcon} from '@/icons/sunIcon';
import {MoonIcon} from '@/icons/moonIcon';

export default function Home() {
	const [theme, setTheme] = useState<ThemeType>('light');

	useEffect(() => {
		const themeKey = window?.localStorage.getItem('themeKey');
		if (themeKey) setTheme(themeKey as ThemeType);
	}, [])

	const toggleTheme = () => {
		const value = isThemeLight ? 'dark' : 'light';
		window?.localStorage?.setItem('themeKey', value);
		setTheme(value);
	}

	const isThemeLight = theme === 'light';

	return (
		<main className={theme}>
			<div className="absolute right-0 p-2 sm:p-8 text-gray-400 dark:text-gray-200 z-10">
				<a className="cursor-pointer" onClick={() => toggleTheme()}>
					{isThemeLight ?
						<MoonIcon/>
						:
						<SunIcon/>
					}
				</a>
			</div>
			<div className="flex min-h-screen w-full justify-center bg-white dark:bg-slate-800">
				<div className="bg-center bg-scroll bg-img-landscape h-60 sm:h-72 w-full absolute top-0 z-0">
					<div className="bg-violet-500 dark:bg-violet-800 h-full bg-opacity-70 dark:bg-opacity-70"></div>
				</div>
				<div className="flex min-h-full w-full max-w-lg mt-10 sm:mt-20 p-3 sm:p-8 pb-12 z-10">
					<div className="w-full space-y-8">
						<h2 className="text-3xl font-bold text-white">
							T O D O
						</h2>
						<TodoContainer/>
					</div>
				</div>
			</div>
		</main>
	)
}
