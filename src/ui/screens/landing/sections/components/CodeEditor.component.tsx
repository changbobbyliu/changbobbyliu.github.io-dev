import { useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { editor } from "monaco-editor";

export const CodeEditor = () => {
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	return (
		<MonacoEditor
			height="300px"
			defaultLanguage="typescript"
			onMount={(editor) => {
				console.log("editor mounted");
				editorRef.current = editor;
			}}
		/>
	);
};
