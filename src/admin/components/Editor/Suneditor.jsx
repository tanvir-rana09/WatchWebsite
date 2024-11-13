import SunEditor from 'suneditor-react';
import  { forwardRef } from 'react';

const SunEditorWrapper = forwardRef((props, ref) => (
  <SunEditor {...props} getSunEditorInstance={(sunEditor) => {
    if (ref) ref.current = sunEditor;
  }} />
));
SunEditorWrapper.displayName = "SunEditorWrapper";

export default SunEditorWrapper;
