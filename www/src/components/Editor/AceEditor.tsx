import * as React from 'react';
import {
  Theme, withStyles, WithStyles,
  Paper, RootRef
} from '@material-ui/core';
import * as ace from 'ace-builds';

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

export class Component extends React.PureComponent<WithStyles<keyof ReturnType<typeof styles>> & Props> {

  editor: ace.Ace.Editor;

  editorDom: React.RefObject<HTMLDivElement> = React.createRef();

  render() {
    return (
      <RootRef rootRef={this.editorDom}>
        <Paper elevation={12} className={this.props.classes.editor} />
      </RootRef>
    );
  }

  componentDidMount() {
    this.editor = ace.edit(this.editorDom.current as HTMLDivElement, {
      theme: 'ace/theme/dracula',
      mode: `ace/mode/${this.props.language}`,
      autoScrollEditorIntoView: true,
      showGutter: false,
      highlightActiveLine: false,
      readOnly: this.props.readOnly
    });
    this.editor.on('change', () => this.props.onChange(this.editor.getValue()));
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.editor.setValue(this.props.value);
    }

    if (prevProps.language !== this.props.language) {
      this.editor.session.setMode(`ace/mode/${this.props.language}`)
    }

    if (prevProps.readOnly !== this.props.readOnly) {
      this.editor.setOption('readOnly', Boolean(this.props.readOnly));
    }
  }
}

export default withStyles(styles as any, { withTheme: true })(Component);
