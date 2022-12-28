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
import { solarizedDark } from 'cm6-theme-solarized-dark';

type EditorProps = {
  minHeight?: string;
  maxHeight?: string;
  height?: string;
  initialText?: string;
  placeHolder?: string;
  style?: CSSProperties;
};

export const Editor = forwardRef(
  (
    {
      minHeight,
      maxHeight,
      height,
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

        getValues: () => {
          const values = editorViewRef.current?.state.doc.toString();
          return values;
        },
        setValue: (value:string) => {
          const state = editorViewRef.current!.state;
          const update = state.update({changes: {from: 0, to: state.doc.length, insert:value}})
          editorViewRef.current!.update([update])

        } 
      }),
      []
    );

    useEffect(() => {
      const minMaxStyle = EditorView.theme({
        ...(minHeight ? { ".cm-content, .cm-gutter": { minHeight } } : {}),
        ...(maxHeight ? { "&": { maxHeight } } : {}),
        ...( height? { "&": { height } } : {}),
        ".cm-scroller": { overflow: "auto" },
      });

      editorViewRef.current = new EditorView({
        ...(initialText ? { doc: initialText } : {}),
        extensions: [
          basicSetup,
          keymap.of([indentWithTab]),
          python(),
          solarizedDark,
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
