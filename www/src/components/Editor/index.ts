import AceEditor from './AceEditor';
import MonacoEditor from './MonacoEditor';

import { isMobile } from 'is-mobile';

export default isMobile() ? AceEditor : MonacoEditor;