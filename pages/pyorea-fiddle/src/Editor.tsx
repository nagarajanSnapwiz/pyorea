import  {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  CSSProperties,
} from "react";
import { EditorView, basicSetup } from "codemirror";
import { placeholder, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";

type EditorProps = {
  minHeight?: string;
  maxHeight?: string;
  initialText?: string;
  placeHolder?: string;
  style?: CSSProperties;
};

export const Editor = forwardRef(
  (
    {
      minHeight,
      maxHeight,
      initialText,
      placeHolder: placeholderText,
      style,
    }: EditorProps,
    ref
  ) => {
    const domRef = useRef<HTMLDivElement>(null);

    const editorViewRef = useRef<EditorView | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        //@ts-ignore
        getValues: () => editorViewRef.current?.state.doc.text.join("\n"),
      }),
      []
    );

    useEffect(() => {
      const minMaxStyle = EditorView.theme({
        ...(minHeight ? { ".cm-content, .cm-gutter": { minHeight } } : {}),
        ...(maxHeight ? { "&": { maxHeight } } : {}),
        ".cm-scroller": { overflow: "auto" },
      });

      editorViewRef.current = new EditorView({
        ...(initialText ? { doc: initialText } : {}),
        extensions: [
          basicSetup,
          keymap.of([indentWithTab]),
          python(),
          placeholder(placeholderText || "Write your Python code here..."),
          minMaxStyle,
        ],
        parent: domRef.current!,
      });

      return () => {
        if (editorViewRef.current) {
          editorViewRef.current.destroy();
          editorViewRef.current = null;
        }
      };
    }, []);

    return <div ref={domRef} style={style}></div>;
  }
);
