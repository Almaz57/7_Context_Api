import styles from './task.module.css';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useRequestUpdate, useRequestDelete } from '../index';
import { useContext } from 'react';
import { AppContext } from '../context.js';

export const Task = () => {
	const { taskList, setTaskList, isLoading } = useContext(AppContext);

	const { requestUpdate, isUpdating } = useRequestUpdate(setTaskList);
	const { requestDelete, isDeleting } = useRequestDelete(setTaskList);

	const navigate = useNavigate(); // для программной навигации
	const { id } = useParams(); // id из URL
	// Пока данные загружаются — показываем "Загрузка..."
	if (taskList.length === 0 || isLoading) {
		return <p>Загрузка...</p>;
	}
	const task = taskList.find((t) => String(t.id) === id);

	//Если задача не найдена — перенаправляем на 404
	if (!task) {
		console.log(taskList);
		return <Navigate to="/404" replace />;
	}

	return (
		<>
			<button className={styles.homeBtn} onClick={() => navigate('/')}>
				На главную
			</button>

			<div className={styles.todoTask}>
				<input
					className={styles.checkbox}
					type="checkbox"
					checked={task.complete}
					disabled={isUpdating}
					onChange={() => requestUpdate(task.id, !task.complete)}
				></input>
				<label className={styles.label}>{task.title}</label>
				<button
					className={styles.delBtn}
					onClick={() => {
						requestDelete(task.id);
						navigate('/');
					}}
					disabled={isDeleting}
				>
					Delete
				</button>
			</div>
		</>
	);
};

// {
//   "tasks": [
//     { "id": 1750149710767, "title": "",      "complete": true  },
//     { "id": 1750149718228, "title": "wewqe", "complete": false },
//   ]
// }
