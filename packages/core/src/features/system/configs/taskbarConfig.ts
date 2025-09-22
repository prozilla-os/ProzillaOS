export interface TaskbarConfigOptions {
	/**
	 * Height of the taskbar in CSS pixels
	 * @default 3 * 16
	 */
	height: number;
}

export class TaskbarConfig {
	height: TaskbarConfigOptions["height"];

	constructor(options: Partial<TaskbarConfigOptions> = {}) {
		const { height } = options as TaskbarConfigOptions;
		
		this.height = height ?? 3 * 16;
	}
}