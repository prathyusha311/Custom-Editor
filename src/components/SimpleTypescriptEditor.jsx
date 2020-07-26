import React from 'react';
import MonacoEditor from 'react-monaco-editor'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { content } from './typings/utils';

const code = [
    '',
    "/**",
    " * @param {User} user",
    " * @param {Context} context",
    " * @param {function} callback",
    " */",
    "function onMyEvent(user, context, callback) {",
    "",
    "}"
].join('\n');

const SimpleTypescriptEditor = () => {

    const onChange = (newValue, e) => {
        // console.log('onChange', newValue, e);
    }

    React.useEffect(() => {
        monaco.languages.typescript.javascriptDefaults.addExtraLib(content);
    },[])

        return (
            <MonacoEditor
                language="javascript"
                // theme="vs"
                defaultValue=''
                value={code}
                onChange={onChange}
            />
        )
}

export default SimpleTypescriptEditor;
