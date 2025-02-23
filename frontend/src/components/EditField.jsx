import { useState } from "react";

const EditField = ({ initial, update, placeholder }) => {
	const [val, setVal] = useState(initial);
	const [edit, setEdit] = useState(false);

	if (edit)
		return (
			<div className="flex gap-2">
				<input
					type="text"
					className="w-40 border box-border"
					value={val}
					onChange={(e) => setVal(e.target.value)}
					placeholder={placeholder}
				/>
				<span
					className="text-green-600"
					onClick={() => {
						update(val);
						setEdit(false);
					}}
				>
					✓
				</span>
				<span
					className="text-red-600"
					onClick={() => {
						setVal(initial);
						setEdit(false);
					}}
				>
					✘
				</span>
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
