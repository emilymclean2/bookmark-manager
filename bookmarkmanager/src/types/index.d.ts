interface BookmarkItem {
	children?: BookmarkItem[];
	dateAdded?: number;
	dateGroupModified?: number;
	id: string;
	index?: number;
	parentId?: string;
	title: string;
	tags?: string[];
	url?: string;
}
