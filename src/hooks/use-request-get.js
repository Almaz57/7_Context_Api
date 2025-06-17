import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '../components/index';

export const useRequestGet = (flagToSort, flagFilter, inputText) => {
	const [isLoading, setIsLoading] = useState(false);
	const [taskList, setTaskList] = useState([]);
	const prevParams = useRef(null);

	const debouncedInputText = useDebounce(inputText, 500);

	useEffect(() => {
		console.log('get запрос');

		const currentParams = {
			sort: flagToSort,
			filter: flagFilter,
			searchText: flagFilter ? debouncedInputText.trim() : '',
		};

		const isSameParams =
			prevParams.current &&
			prevParams.current.sort === currentParams.sort &&
			prevParams.current.filter === currentParams.filter &&
			(currentParams.filter
				? prevParams.current.searchText === currentParams.searchText
				: true);

		if (isSameParams) return;

		const params = new URLSearchParams();

		if (currentParams.sort) {
			params.append('_sort', 'title');
			params.append('_order', 'asc');
		}

		if (currentParams.filter && currentParams.searchText) {
			params.append('title_like', currentParams.searchText);
		}

		const url = `http://localhost:3000/tasks?${params.toString()}`;
		console.log('fetch url:', url);

		setIsLoading(true);
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setTaskList(data);
				prevParams.current = currentParams;
			})
			.finally(() => setIsLoading(false));
	}, [flagToSort, flagFilter, debouncedInputText]);

	return { taskList, setTaskList, isLoading };
};
