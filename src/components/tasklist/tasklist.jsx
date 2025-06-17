import styles from './tasklist.module.css';
import { Form } from '../index';

import { Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context.js';

export const TaskList = () => {
	const { taskList, isLoading } = useContext(AppContext);

	return (
		<div className={styles.container}>
			<label className={styles.title}>
				{isLoading ? 'Загрузка...' : 'ToDo List'}
			</label>
			<Form />

			<div className={styles.todoTasksList}>
				{taskList.map((data) => (
					<Link
						to={`/tasks/${data.id}`}
						key={data.id}
						className={`${styles.link} ${data.complete ? styles.completed : ''}`}
					>
						{data.title}
					</Link>
				))}
			</div>
		</div>
	);
};
