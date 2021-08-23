import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	App: {
		minWidth: 300,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

function App() {
	const classes = useStyles();
	return (
		<Card className={classes.App}>
			<CardContent>
				<Typography variant="h5" component="h2">
					No bookmarks loaded!
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					onClick={() => {
						console.log("test");
						window.open("https://google.com");
					}}
				>
					Click here to load bookmarks
				</Button>
			</CardActions>
		</Card>
	);
}

export default App;
