import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import parser from './../../policyGrammar';
import './index.css';
    

const DslEditor = () => {

    const [editor, setEditor] = React.useState();
    const [code, setCode] = React.useState('');

    const getEditor = (editor) => {
        console.log('on editor did mount');
        setEditor(editor);
    }


    const onChange = (newValue, e) => {
        // const lineMarkers = [];
        // const model = editor.getModel();
        // const position = editor.getPosition();
        // const word = model.getWordUntilPosition(position);
        // const linesArray = newValue.split('\n')
        // // console.log(linesArray)
        // if (word.word == 'read') {
        //     console.log('in read.................')
        //     editor.trigger('keyboard', 'editor.action.deleteLines', {});
        //     let text = "AllowReadSnippet"; //snippet label
        //     editor.trigger('keyboard', 'editor.action.triggerSuggest', {});
        //     editor.trigger('keyboard', 'type', { text: text });
        //     setTimeout(() => {
        //         editor.trigger('editor', 'acceptSelectedSuggestion', {});
        //     }, 100);
        // }
        // try {
        //     parser.parse(newValue);
        //     monaco.editor.setModelMarkers(model, "owner", []);
        // } catch (e) {
        //     // const errorMsg = newValue !== '' ? 'message : ' + createQueryError(e) : '';
        //     // console.log(e);
        //     lineMarkers.push(createMarker(e.location, e.message));
        //     monaco.editor.setModelMarkers(model, "owner", lineMarkers);
        // }
    }

    const options = {
        selectOnLineNumbers: true,
        suggest: {
            snippetsPreventQuickSuggestions: false
        },
        lineHeight: '25px',
        // padding: {
        //     top: 100
        // }
    };

    return (
        <MonacoEditor
            // ref="monaco"
            // width="1500"
            // height="600"
            language="policyDSL"
            // theme="vs-dark"
            theme="myCoolTheme"
            value={code}
            options={options}
            onChange={onChange}
            editorDidMount={getEditor}
        />
    );

}

export default DslEditor;


// function changeCommandKeybinding(editor, id, keybinding) {
//     editor._standaloneKeybindingService.addDynamicKeybinding('-' + id);
//     editor._standaloneKeybindingService.addDynamicKeybinding(id, keybinding);
//     // console.log('changeCommandKeybinding......')
//     // editor._standaloneKeybindingService._getResolver()._lookupMap.get(
//     //     "editor.action.toggleTabFocusMode")[0].resolvedKeybinding._parts[0].keyCode = monaco.KeyCode.Space;
//     // editor._standaloneKeybindingService.updateResolver();
// }

//   changeCommandKeybinding(
//     editor,
//     'editor.action.toggleTabFocusMode', 
//     monaco.KeyCode.Space | monaco.KeyCode.Tab
//   );



// // Register a tokens provider for the language
// monaco.languages.setMonarchTokensProvider('policyDSL', {
//     ignoreCase: true,
//     tokenizer: {
//         root: [
//             [/(\bcreate\b|\bupdate\b|\bread\b|\bdelete\b|\bmodify\b|\ball_actions\b)/, "action"],
//             [/(\ballow\b|\bdeny\b)/, "decision"],
//             [/\b(\son|with|if)\b/, "connector"],
//             // [/(\b on\b|\bwith\b|\bif\b|\b on\b)/, "connector"],
//             [/"(.*?)"/, "variable"],
//             [/\b(action|resource|dlp|expression)\b/, "test"]
//         ]
//     }
// });

// monaco.editor.defineTheme('myCoolTheme', {
//     base: 'vs-dark',
//     inherit: true,
//     rules: [
//         { token: 'action', foreground: '#4169e1' },
//         { token: 'decision', foreground: '#4169e1' },
//         { token: 'connector', foreground: '#4169e1' },
//         { token: 'variable', foreground: '#fb4203' },
//         { token: 'test', foreground: '#808080' }
//     ]
// });

monaco.languages.setMonarchTokensProvider('policyDSL', {
    ignoreCase: true,
    tokenizer: {
        root: [
            [/(create|update|read|delete|modify|all\s)/, "action"],
            [/(allow|deny)/, "decision"],
            [/(\son\s|with|if)/, "connector"],
            [/(action|resource|dlp|expression)/, "placeholder"],
            [/[a-zA-Z_.=]+/, "variable"]
        ]
    }
});

monaco.editor.defineTheme('myCoolTheme', {
    base: 'vs',
    inherit: true,
    rules: [
        { background: 'FFFFFF' },
        { token: 'action', foreground: '#8e91ff' },
        { token: 'decision', foreground: '#5e6c84' },
        { token: 'connector', foreground: '#5e6c84' },
        { token: 'variable', foreground: '#ff2f2f' },
        { token: 'placeholder', foreground: '#808080' }
    ],
    colors: {
        // 'editor.foreground': '#000000',
        'editor.background': '#FFFFFF',
        // 'editorLineNumber.foreground': theme.palette.text.hint,
    },
});

const createMarker = (errorHash, errorMsg) => {
    console.log(errorHash);
    console.log(errorMsg);
    return {
        startLineNumber: errorHash.start.line - 1,
        startColumn: errorHash.start.column,
        endLineNumber: errorHash.end.line - 1,
        endColumn: errorHash.end.column,
        message: errorMsg,
        severity: monaco.MarkerSeverity.Error
    };
};

const createQueryError = (e) => {
    return e.message.substring(e.message.indexOf('Expecting'));
};

const SORT_TEXT = {
    Table: '0',
    Column: '1',
    Keyword: '2'
}

const db_schema = {
    tables: [
        'patients',
        'contacts'
    ],
    table_columns: {
        patients: [
            { name: 'user_id', type: 'varchar' },
            { name: 'user_name', type: 'varchar' }
        ],
        contacts: [
            { name: 'email', type: 'varchar' },
            { name: 'mobile', type: 'varchar' },
            { name: 'address', type: 'varchar' },
            { name: 'gender', type: 'varchar' },
        ]
    }
}

const actions = [
    'create',
    'read',
    'update',
    'delete',
    'modify',
    'all'
]

const connectors = [
    'with',
    'if',
    'where'
]

const ifConditions = [
    'mfa_passed',
    'time_of_access',
    'geo_location',
    'ip_range',
    'calls_per_second',
    'records_per_query',
    'records_per_day',
]

const rangeQueries = [
    'time_of_access',
    'ip_range'
]

const relationQueries = [
    'calls_per_second',
    'records_per_query',
    'records_per_day',
]

const relationalOperators = [
    '<',
    '<=',
    '>',
    '>=',
    '==',
    '!='
]

monaco.languages.register({ id: 'policyDSL' });

monaco.languages.registerCompletionItemProvider('policyDSL', {
    triggerCharacters: ['', '.', '/', ','],
    provideCompletionItems(model, position) {
        // console.log(position)
        const { lineNumber, column } = position
        const pointerPosition = {
            startLineNumber: lineNumber,
            startColumn: 0,
            endLineNumber: lineNumber,
            endColumn: column
        }
        const textBeforePointer = model.getValueInRange(pointerPosition)
        const beforeTokens = textBeforePointer.trim().split(/\s+/)
        const lastToken = beforeTokens[beforeTokens.length - 1].toLowerCase()
        const beforLastToken = beforeTokens.length >= 2 && beforeTokens[beforeTokens.length - 2].toLowerCase()
        const entireText = model.getValue();
        const tokens = entireText.trim().split(/\s+/);
        console.log(lastToken)
        // console.log(textBeforePointer)
        console.log(beforeTokens)
        // console.log(entireText)

        let suggestions = null;

        if (lastToken.charAt(lastToken.length - 1) == '.') {
            const lastTokenWord = lastToken.substr(0, lastToken.length - 1);
            suggestions = [];
            if (db_schema.tables.indexOf(lastTokenWord) >= 0) {
                suggestions = getGivenTableColumnCompletionItems(lastTokenWord);
            }
        } else if (lastToken == 'allowsnippet' || lastToken == 'denysnippet' || lastToken == 'allowreadsnippet') {
            suggestions = insertSnippet(pointerPosition)
        } else if (entireText == '' || 'allo'.match(lastToken) || 'den'.match(lastToken)) {
            suggestions = insertSnippet(pointerPosition)
        } else if (!actions.includes(lastToken) && (lastToken == 'allow' || lastToken == 'deny' || ((beforLastToken == 'allow' || beforLastToken == 'deny') && regexMatcher(actions, lastToken)))) {
            // suggestions = insertRead(pointerPosition)
            suggestions = actions.map(renderKeyword)
        } else if (actions.includes(lastToken)) {
            suggestions = [renderKeyword('on', false)]
        } else if (lastToken == 'on' || lastToken.charAt(lastToken.length - 1) == ',' || beforLastToken == 'on') {
            suggestions = db_schema.tables.map(renderTable)
        } else if (db_schema.tables.includes(lastToken)) {
            if (beforeTokens.includes('read')) {
                suggestions = connectors.map(renderKeyword)
            } else {
                suggestions = ['if', 'where'].map(renderKeyword)
            }
        } else if (lastToken == 'with' || beforLastToken == 'with') {
            suggestions = rules.map(renderRules)
        } else if (lastToken == 'if') {
            suggestions = ifConditions.map(renderKeyword)
        }
        // else if (relationQueries.includes(lastToken)) {
        //     suggestions = relationalOperators.map(renderOperator)
        // } else if (rangeQueries.includes(lastToken)) {
        //     suggestions = rangeSnippet()
        // }
        suggestions = suggestions ? suggestions : actions.map(renderKeyword)
            .concat(connectors.map(renderKeyword))
            .concat(db_schema.tables.map(renderTable))
        return { suggestions };
    }
})

function regexMatcher(input, searchString) {
    const x = input.filter(item => item.match(new RegExp(searchString, "g")))
    return x.length
}

function insertSnippet(range) {
    return [
        {
            label: 'AllowSnippet',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Describe your library here",
            // insertText: '${on resource with condition}',
            insertText: 'Allow ${1:action} on ${2:resource} with ${3:dlp} if ${4:expression} \n\n\n\n\n ',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
        {
            label: 'allowreadsnippet',
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Describe your library here",
            // insertText: '${on resource with condition}',
            insertText: 'Allow read on ${2:resource} with ${3:dlp} if ${4:expression}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            // range: {
            //     startLineNumber: 1,
            //     startColumn: 1,
            //     endLineNumber: 1,
            //     endColumn: 1
            // },
        },
        {
            label: 'DenySnippet',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: "Describe your library here",
            insertText: 'Deny ${1:action} on ${2:resource} if ${3:expression}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,

            // range: range
        },
        {
            label: 'Allow',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: '',
            sortText: SORT_TEXT.Keyword,
            insertText: 'Allow'
        },
        {
            label: 'Deny',
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: '',
            sortText: SORT_TEXT.Keyword,
            insertText: 'Deny'
        }
    ]
}

function rangeSnippet() {
    return [{
        label: 'between',
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: "Description",
        // insertText: '${on resource with condition}',
        insertText: 'between ${5:from} and ${6:to}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        // range: range
    },
    {
        label: 'in',
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: "Description",
        insertText: 'in [${5:list}]',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,

        // range: range
    }]
}

const rules = [
    {
        label: 'Mask',
        value: 'DLP = "Mask"'
    },
    {
        label: 'Redact',
        value: 'DLP = "Redact"'
    },
    {
        label: 'Plain_Text',
        value: 'DLP = "Plain_Text"'
    },
    {
        label: 'Random_Token',
        value: 'Tokenization = "Random_Token"'
    },
    {
        label: 'FP_Token',
        value: 'Tokenization = "FP_Token"'
    }
]

function getGivenTableColumnCompletionItems(table) {
    const table_columns = []
    if (db_schema.table_columns.hasOwnProperty(table)) {
        db_schema.table_columns[table].forEach(column => {
            table_columns.push(renderTableColumn(table, column))
        })
    }
    return table_columns
}


function getAllTableColumnCompletionItems() {
    const table_columns = []
    Object.keys(db_schema.table_columns).forEach(table => {
        db_schema.table_columns[table].forEach(column => {
            table_columns.push(renderTableColumn(table, column))
        })
    })
    return table_columns
}

function renderKeyword(keyword) {
    return {
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        detail: '',
        sortText: SORT_TEXT.Keyword,
        insertText: keyword,
        // command: {
        //     // id: 'editor.action.focusNextGroup'
        //     id: 'jumpToNextSnippetPlaceholder'
        //     // id: 'editor.action.deleteLines'
        //     // editor.trigger('keyboard', 'type', { text: text });
        //     // id: 'editor.action.'
        // }
    }
}

function renderOperator(op) {
    return {
        label: op,
        kind: monaco.languages.CompletionItemKind.Operator,
        detail: '',
        // sortText: SORT_TEXT.,
        insertText: op
    }
}

function renderTable(name) {
    return {
        label: name,
        kind: monaco.languages.CompletionItemKind.Module,
        detail: '<table>',
        sortText: SORT_TEXT.Table,
        insertText: name
    }
}

function renderTableColumn(table, column) {
    return {
        label: column.name,
        kind: monaco.languages.CompletionItemKind.Field,
        detail: '<column> ' + column.type + ' ' + table,
        sortText: SORT_TEXT.Column,
        insertText: column.name
    }
}

function renderRules(rule) {
    return {
        label: rule.label,
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: "Describe your rule here",
        insertText: rule.value
    }
}