import React, { useEffect, useState } from 'react';
import './App.css';
import Folder from './Folder';
import { toast } from 'react-toastify';
import axios from "axios";

function App() {
	const [foldersList, setFoldersList] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<div className="App">
				<h1>Tree Structure</h1>
				<Folder folder={foldersList} />
			</div>

			<div>
				<button type="button" className="btn btn-primary" onClick={handleAddFolder}>Add Folder</button>
				<ol>
					{foldersList.map(item => item.type == "folder" && (
						<li key={item.id}>
							<div>
								{item.name}&nbsp;&nbsp;
								<button type="button" className="btn btn-primary" onClick={() => handleAddFile(item)}>Add File Here</button>
								<button type="button" className="btn btn-primary" onClick={() => handleDeleteFolder(item)}>Delete Folder</button>
							</div>
							<ul>
								{foldersList.filter(subItem => subItem.parentId === item._id).map(subItem => (
									<li key={subItem.id}>
										{subItem.name}&nbsp;&nbsp;
										<button type="button" className="btn btn-primary" onClick={() => handleDeleteFile(subItem)}>Delete File</button>
									</li>
								))}
							</ul>
						</li>
					))}
				</ol>
			</div>
		</>
	);

	async function getData() {
		try {
			const res = await axios.get("https://back-vhem.onrender.com/api/getTree");
			setFoldersList(res.data.data);
		} catch (error) {
			toast.error(error?.message);
		}
	}

	async function setData(values) {
		try {
			const res = await axios.post("https://back-vhem.onrender.com/api/setTree", values);
			getData();
			toast.success(res.data?.message);
		} catch (error) {
			toast.error(error?.message);
		}
	}

	async function deleteData(values) {
		try {
			const res = await axios.post("https://back-vhem.onrender.com/api/deleteTree", values);
			getData();
			toast.success(res.data?.message);
		} catch (error) {
			toast.error(error?.message);
		}
	}

	function handleAddFolder() {
		const folderName = prompt('Enter the name for the new Folder:');
		setData({
			type: "folder",
			name: folderName || "Folder",
		});
	}

	function handleAddFile(item) {
		const fileName = prompt('Enter the name for the new File:');
		setData({
			type: "file",
			name: fileName || "File",
			parentId: item._id
		});
	}

	function handleDeleteFolder(item) {
		deleteData({ _id: item._id });
	}

	function handleDeleteFile(item) {
		deleteData({ _id: item._id });
	}
}

export default App;
