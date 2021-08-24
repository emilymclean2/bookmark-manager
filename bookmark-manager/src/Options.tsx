import React, { useState, useEffect } from "react";
import { Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import axios from "axios";

const useStyles = makeStyles({
	options: {
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

function Options() {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	console.log("test please???");

	return (
		<Card className={classes.options}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Word of the Day
				</Typography>
				<Typography variant="h5" component="h2">
					be{bull}nev{bull}o{bull}lent
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					adjective
				</Typography>
				<Typography variant="body2" component="p">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
}

export default Options;
