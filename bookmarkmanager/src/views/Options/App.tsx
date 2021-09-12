import React, { useEffect, useState } from "react";
import "./App.css";
import clsx from "clsx";
import {
	Button,
	Typography,
	AppBar,
	Toolbar,
	IconButton,
	InputBase,
	CssBaseline,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Switch,
	FormControlLabel,
	alpha,
	makeStyles,
	useTheme,
	Theme,
	colors,
} from "@material-ui/core";

import { Menu, Search, ChevronLeft, ChevronRight, Inbox, Mail } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: "flex",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		backgroundColor: colors.pink.A700,
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

function App() {
	const classes = useStyles();
	const theme = useTheme();
	const [darkMode, setDarkMode] = useState(false);
	const [bookmarksList, setBookmarkList] = useState<BookmarkItem[]>([]);
	const [showList, setShowList] = useState(false);
	const [open, setOpen] = useState(false);
	const [tagList, setTagList] = useState<string[]>([]);

	useEffect(() => {
		setTagList(["recipe", "tumblr", "pumpkin", "soup", "slow cooker"]);
	}, []);

	useEffect(() => {
		if (bookmarksList.length > 0) {
			setShowList(true);
			//console.log(bookmarksList);
		}
	}, [bookmarksList]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const getBookmarks = async () => {
		chrome.storage.local.get(["bookmarksList"], (result) => {
			setBookmarkList(result.bookmarksList);
		});
	};

	const setTagsAutomatically = () => {
		bookmarksList.forEach((bookmark) => {
			tagList.forEach((tag) => {
				if (bookmark.title.includes(tag) && !bookmark.tags?.includes(tag)) {
					if (!bookmark.tags) {
						bookmark.tags = [];
					} else {
						bookmark.tags.push(tag);
					}
				}
			});
		});
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
					>
						<Menu />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						Bookmark Manager
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<Search />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}</IconButton>
				</div>
				<div>
					<FormControlLabel
						label="Dark Mode"
						labelPlacement="start"
						control={
							<Switch
								checked={darkMode}
								onChange={() => {
									setDarkMode(!darkMode);
								}}
								name="darkModeSwitch"
								inputProps={{ "aria-label": "secondary checkbox" }}
							/>
						}
					/>
				</div>
				<Divider />

				<List>
					{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				<Button
					size="small"
					onClick={() => {
						getBookmarks();
						setTagsAutomatically();
					}}
				>
					Click here to load bookmarks
				</Button>
				{/* make this into a table */}
				{showList
					? bookmarksList.map((bookmark) => {
							return (
								<div>
									<Typography variant="h6">
										{bookmark.title} : {bookmark.url}
									</Typography>
								</div>
							);
					  })
					: null}
			</main>
			{/* <Typography style={{ fontSize: 50 }}>{bookmarksList[100]}</Typography> */}
		</div>
	);
}

export default App;
