import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskList, Task, NotFound } from '../../components/index';
import { AppContext } from '../context';
import { useState } from 'react';
import { useRequestGet, useRequestAdd } from '../index';

export const App = () => {
	const [inputText, setInputText] = useState(''); // Поле для ввода задачи
	const [flagToSort, setFlagToSort] = useState(false); // Режим фильтрации
	const [flagFilter, setflagFilter] = useState(false); // Режим сортировки

	const { taskList, setTaskList, isLoading } = useRequestGet(
		flagToSort,
		flagFilter,
		inputText,
	);
	const { requestAdd, isCreating } = useRequestAdd(setTaskList, inputText);

	return (
		<AppContext
			value={{
				inputText,
				setInputText,
				flagToSort,
				setFlagToSort,
				flagFilter,
				setflagFilter,
				requestAdd,
				isCreating,
				taskList,
				setTaskList,
				isLoading,
			}}
		>
			<Routes>
				<Route path="/" element={<TaskList />} />
				<Route path="/tasks/:id" element={<Task />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" replace />} />
			</Routes>
		</AppContext>
	);
};
