import {ChangeEvent} from 'react';
import {CheckIcon} from '@/icons/checkIcon';

interface CustomCheckInterface {
	isChecked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomCheck = ({isChecked, onChange}: CustomCheckInterface) => (
	<div className="h-7 w-7">
		<input type="checkbox"
		       id="custom-check"
		       className="opacity-0 absolute w-7 h-7 cursor-pointer"
		       checked={isChecked}
		       onChange={onChange}/>
		<div className="bg-white dark:bg-transparent border border-gray-500 rounded-full w-full h-full flex justify-center items-center">
			<div className="hidden items-center justify-center w-full h-full rounded-full bg-gradient-to-r from-blue-700 via-purple-700 to-purple-600">
				<CheckIcon/>
			</div>
		</div>
	</div>
);
