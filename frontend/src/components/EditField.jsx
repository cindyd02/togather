import { useState } from "react";

const EditField = ({ initial, update }) => {
	const [val, setVal] = useState("");
	const [edit, setEdit] = useState(false);

	if (edit)
		return (
			<div>
				<input
					type="text"
					value={val}
					onChange={(e) => setVal(e.target.value)}
					placeholder={initial}
				/>
				<button
					onClick={() => {
						update(val);
						setEdit(false);
					}}
				>
					Save
				</button>
				<button onClick={() => setEdit(false)}>Cancel</button>
			</div>
		);

	return (
		<div>
			{initial}{" "}
			<span className="underline" onClick={() => setEdit(true)}>
				(edit)
			</span>
		</div>
	);
};

export default EditField;
