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
	//var reason = "";
	const classes = useStyles();

	// chrome.runtime.onInstalled.addListener((details) => {
	// 	if (details.reason === "install") {
	// 		console.log("first install");
	// 		reason = "first install";
	// 	} else if (details.reason === "update") {
	// 		console.log("update");
	// 		reason = "update";
	// 	} else {
	// 		reason = "unknown";
	// 	}
	// });

	const getChromeBookmarks = async () => {
		console.log("testing getting bookmarks");

		logTree(await chrome.bookmarks.getTree());
		chrome.storage.local.set({ bookmarksList: bookmarksList }, () => {
			console.log("value is set to:" + bookmarksList);
		});
		console.log(bookmarksList.length);
	};

	const logItems = (bookmarkItem: chrome.bookmarks.BookmarkTreeNode) => {
		if (bookmarkItem.url) {
			bookmarksList.push({ ...bookmarkItem, tags: [] });
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
			</CardActions>
		</Card>
	);
}

export default App;
