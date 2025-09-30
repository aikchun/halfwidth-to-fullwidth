import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";

export const Tasks = (props) => {
	const { tasks } = props;
	return (
		<Grid size={12} sx={{ width: "calc(50% - 8px)" }}>
			{tasks.map((t) => (
				<Button
					variant="contained"
					fullWidth
					onClick={t.onClick}
					key={t.name}
					sx={t.sx}
				>
					{t.displayName}
				</Button>
			))}
		</Grid>
	);
};
