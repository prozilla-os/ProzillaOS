import { Storage } from "../storage/storage";
import { VirtualDriveConfig } from "../system/configs";

export class VirtualDriveStorage extends Storage {
	virtualDriveConfig: VirtualDriveConfig;

	static readonly KEY = "drive";

	constructor(virtualDriveConfig: VirtualDriveConfig) {
		super();
		this.virtualDriveConfig = virtualDriveConfig;
		this.synchronize();

		// Migrate old unused keys
		if (this.virtualDriveConfig.saveData) {
			this.virtualDriveConfig.saveData.migrations?.forEach(([oldKey, newKey]) => this.rename(oldKey, newKey));
		}
	}

	override load(key: string): string | null {
		this.synchronize();
		return super.load(key);
	}

	override store(key: string, value: string) {
		this.synchronize();
		super.store(key, value);
	}

	synchronize() {
		if (!this.virtualDriveConfig.saveData)
			return;
		this.enableCompression = this.virtualDriveConfig.saveData.enableCompression;
		this.prefix = this.virtualDriveConfig.saveData.prefix;
	}

}