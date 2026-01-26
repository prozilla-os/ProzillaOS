interface PageData {
	name: string;
    rawName: string;
    kind: string;
    isDeprecated: boolean;
}

interface MemberPageData extends PageData {
	group?: string;
	codeKeyword?: string;
	keyword?: string;
}

export function formatModulePageTitle({ name }: PageData) {
	return name.toUpperCase();
}

export function formatMemberPageTitle({ group, rawName: name }: MemberPageData) {
	let title = "";
	if (group?.toLowerCase().startsWith("component")) {
		const componentName = name.endsWith("()") ? name.substring(0, name.length - 2) : name;
		title = `<${componentName}/>`;
	} else {
		title = name;
	}

	title = "`" + title + "`";

	if (group) {
		title = formatGroupName(group) + " " + title;
	}

	return title;
}

export function formatGroupName(group: string) {
	if (group.endsWith("ses")) {
		return group.substring(0, group.length - 2);
	} else if (group.endsWith("s")) {
		return group.substring(0, group.length - 1);
	}

	return group;
}