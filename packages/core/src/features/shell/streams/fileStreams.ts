import { Stream } from "./stream";
import { VirtualFile } from "../../virtual-drive";

/**
 * A stream that reads content from a {@link VirtualFile} and pushes it into the stream buffer.
 */
export class FileInputStream extends Stream {
	private file: VirtualFile;

	constructor(file: VirtualFile) {
		super();
		this.file = file;
		void this.init();
	}

	private async init() {
		const content = await this.file.read();
		if (content != null)
			await this.write(content);
		this.end();
	}
}

/**
 * A stream that collects written data and saves it to a {@link VirtualFile} upon completion.
 */
export class FileOutputStream extends Stream {
	private file: VirtualFile;
	private writeBuffer = "";

	constructor(file: VirtualFile) {
		super();
		this.file = file;

		this.on(Stream.DATA_EVENT, (data) => {
			this.writeBuffer += data;
		});

		this.on(Stream.END_EVENT, () => {
			this.file.setContent(this.writeBuffer);
		});
	}
}