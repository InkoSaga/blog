import * as React from 'react';
const $script = require('scriptjs');
import {
    Theme, withStyles, WithStyles,
    Paper, RootRef
} from '@material-ui/core';
import * as monacoTypes from 'monaco-editor';
let monaco: typeof monacoTypes;

const styles = (theme: Theme) => ({
    editor: {
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0)'
    }
});

export type Props = {
    language: string;
    value: string;
    readOnly?: boolean;
    onChange: (value: string) => void
}

const loadMonaco = async () => {
    return new Promise<any>(resolve => {
        $script('https://unpkg.com/monaco-editor/min/vs/loader.js', () => {
            (window['require']).config({ paths: { 'vs': 'https://unpkg.com/monaco-editor/min/vs' } });
            window['MonacoEnvironment'] = {
                getWorkerUrl: function(workerId, label) {
                  return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
                    self.MonacoEnvironment = {
                      baseUrl: 'https://unpkg.com/monaco-editor/min/'
                    };
                    importScripts('https://unpkg.com/monaco-editor/min/vs/base/worker/workerMain.js');`
                  )}`;
                }
              };
            (window['require'])(['vs/editor/editor.main'], () => resolve(monaco = window['monaco']));
        });
    });
}

export class Component extends React.Component<WithStyles<keyof ReturnType<typeof styles>> & Props> {

    editor: monacoTypes.editor.IStandaloneCodeEditor;

    editorDom: React.RefObject<HTMLDivElement> = React.createRef();

    render() {
        return (
          <RootRef rootRef={this.editorDom}>
            <Paper elevation={12} className={this.props.classes.editor} />
          </RootRef>
        );
      }

    resize = () => this.editor.layout();

    mount() {
        monaco.editor.defineTheme('vs-dark-fluent', {
          base: 'vs-dark',
          inherit: true,
          rules: [],
          colors: {
            'editor.background': '#00000000'
        }
        });

        this.editor = monaco.editor.create(this.editorDom.current as HTMLDivElement, {
            value: this.props.value,
            language: this.props.language,
            theme: 'vs-dark-fluent',
            lineNumbers: 'off',
            minimap: { enabled: false },
            wordWrap: 'on',
            readOnly: this.props.readOnly,
            scrollbar: {
                useShadows: false,
                verticalScrollbarSize: 0
            },
            folding: false,
            glyphMargin: false,
            lineDecorationsWidth: 0
        });

        this.editor.onDidChangeModelContent(event => this.props.onChange(this.editor.getValue()));

        window.addEventListener("resize", this.resize);
    }

    componentDidMount() {
        if (monaco) {
            this.mount();
        } else {
            loadMonaco().then(loaded => this.mount());
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
    }

    componentDidUpdate(prevProps: Props) {

    }
}

export default withStyles(styles as any, { withTheme: true })(Component);
