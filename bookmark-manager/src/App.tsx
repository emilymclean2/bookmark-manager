import React, { useState, useEffect } from "react";
import { Card, CardActions, CardContent, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import axios from "axios";

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
	var bookmarksList: BookmarkItem[] = [];
	const getChromeBookmarks = async () => {
		console.log("testing getting bookmarks");

		logTree(await chrome.bookmarks.getTree());
		setNoOfBookmarksState(bookmarksList.length);
	};

	const logItems = (bookmarkItem: chrome.bookmarks.BookmarkTreeNode) => {
		if (bookmarkItem.url) {
			bookmarksList.push(bookmarkItem);
		}
		if (bookmarkItem.children) {
			bookmarkItem.children.forEach((child) => {
				logItems(child);
			});
		}
	};

	const logTree = (bookmarkItems: chrome.bookmarks.BookmarkTreeNode[]) => {
		logItems(bookmarkItems[0]);
	};

	//const [gotData, setGotData] = useState<boolean>(false);
	const [noOfBookmarksState, setNoOfBookmarksState] = useState(0);
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
						getChromeBookmarks();
					}}
				>
					Click here to load bookmarks
				</Button>
				{noOfBookmarksState > 0 ? <Typography>{noOfBookmarksState}</Typography> : null}
			</CardActions>
		</Card>
	);
}

export default App;
