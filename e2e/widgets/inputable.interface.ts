export interface InputableInterface {

	getText(): Promise<string>;

	setText(text: string): Promise<void>;

	clear(): Promise<void>;
}
