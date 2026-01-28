export function heading1(text: string) {
	return `# ${text}`;
}

export function heading2(text: string) {
	return `## ${text}`;
}

export function heading3(text: string) {
	return `### ${text}`;
}

export function heading4(text: string) {
	return `#### ${text}`;
}

export function heading5(text: string) {
	return `##### ${text}`;
}

export function heading6(text: string) {
	return `###### ${text}`;
}

export function bold(text: string) {
	return `**${text}**`;
}

export function italic(text: string) {
	return `*${text}*`;
}

export function code(text: string) {
	return `\`${text}\``;
}

export function codeBlock(text: string) {
	return `\`\`\`${text}\`\`\``;
}

export function strikethrough(text: string) {
	return `~~${text}~~`;
}

export function link(label: string, url: string) {
	return `[${label}](${url})`;
}

export function quote(text: string) {
	return `> ${text}`;
}

export function horizontalRule() {
	return "---";
}