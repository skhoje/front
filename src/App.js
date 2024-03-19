import React, { useEffect, useState, } from 'react';
// import axios from "axios";
import './App.css'; // Import your CSS file for styling
import Folder from './Folder';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function App() {
	const [folders, setFolders] = useState([
		{
			id: 0,
			name: 'Root',
			children: [],
		},
	]);
	// const [openMenuIndex, setOpenMenuIndex] = useState(null);

	useEffect(() => {
		getData()
	}, [])

	const [foldersList, setFoldersList] = useState([])

	return (<>
		<div className="App">
			<h1>Tree Structure</h1>
			<Folder
				folder={foldersList}

			/>

		</div>
		{/* ================================================================= Dynamic App Start =============================================================== */}
		<div>
			<button type="button" class="btn btn-primary"
				onClick={e => {
					const folderName = prompt('Enter the name for the new Folder :')
					setData({
						type: "folder",
						name: folderName || "Folder",
					})
				}}
			>Add Folder</button>
			<ol>
				{foldersList?.map(item => item.type === "folder" &&
					<li>
						<div>
							{item.name} &nbsp;&nbsp;
							<button type="button" class="btn btn-primary" onClick={e => {
								const fileName = prompt('Enter the name for the new File :')
								setData({
									type: "file",
									name: fileName || "File",
									parentId: item._id
								})
							}}>Add File Here</button>
							<button type="button" class="btn btn-primary" onClick={e => deleteData({ _id: item._id })}>Delete Folder</button>
						</div>
						<ul>
							{foldersList.map(item2 =>
								item2.type == "file" &&
								item2.parentId == item._id &&
								<li>
									{item2.name}&nbsp;&nbsp;
									<button type="button" class="btn btn-primary" onClick={e => deleteData({ _id: item2._id })}>Delete File</button>
								</li>)}
						</ul>
					</li>
				)}
			</ol>
		</div>
		{/* ================================================================= Dynamic App End =============================================================== */}
	</>
	)

	async function getData() {
		try {
			const res = await axios.get("https://backend-2-78ub.onrender.com/api/getTree")
			setFoldersList(res.data.data)
			console.log(res.data.data);
		} catch (error) {
			toast.error(error?.message)
			console.log(error);
		}
	}

	async function setData(values) {
		try {
			// type, name , children , parentId
			const res = await axios.post("https://backend-2-78ub.onrender.com/api/setTree", values)
			getData()
			toast.success(res.data?.message)
			// console.log(res);
		} catch (error) {
			toast.error(error?.message)
			console.log(error);
		}
	}

	async function deleteData(values) {
		try {
			// _id
			const res = await axios.post("https://backend-2-78ub.onrender.com/api/deleteTree", values)
			getData()
			toast.success(res.data?.message)
			// console.log(res);
		} catch (error) {
			toast.error(error?.message)
			console.log(error);
		}
	}
}


export default App;
