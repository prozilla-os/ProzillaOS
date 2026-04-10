import { SettingsManager, VirtualRoot } from "../../../src/features";

export class MockSettingsManager extends SettingsManager {

	constructor(virtualRoot: VirtualRoot) {
		super(virtualRoot);
	}

}