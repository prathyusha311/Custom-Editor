import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import sqlparser from 'js-sql-parser';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const SqlEditor = () => {

    const [editor, setEditor] = React.useState();
    const [code, setCode] = React.useState('');

    const getEditor = (editor) => {
        console.log('on editor did mount');
        console.log(editor);
        setEditor(editor);
    }

    const onChange = (newValue, e) => {
        console.log('onChange', newValue);
        const lineMarkers = [];
        const model = editor.getModel();
        try {
            sqlparser.parse(newValue);
            monaco.editor.setModelMarkers(model, "owner", []);
        } catch (e) {
            const errorMsg = newValue !== '' ? 'message : ' + createQueryError(e) : '';
            console.log(errorMsg);
            lineMarkers.push(createMarker(e.hash, errorMsg));
            monaco.editor.setModelMarkers(model, "owner", lineMarkers);
        }
    }
    
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <MonacoEditor
                // ref="monaco"
                width="800"
                height="600"
                language="sql"
                // theme="vs-dark"
                value={code}
                options={options}
                onChange={onChange}
                editorDidMount={getEditor}
            />
        );
    
}

export default SqlEditor;

const createMarker = (errorHash, errorMsg) => {
    console.log(errorHash);
    console.log(errorMsg);
    return {
        startLineNumber: errorHash.loc.first_line - 1,
        startColumn: errorHash.loc.first_column,
        endLineNumber: errorHash.loc.last_line - 1,
        endColumn: errorHash.loc.last_column,
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

const db_keywords = [
    'ADD',
    'DISTINCT',
    'ALL',
    'AND',
    'AS',
    'ASC',
    'BEFORE',
    'DEFAULT',
    'DELETE',
    'DESC',
    'DUAL',
    'ELSE',
    'ELSEIF',
    'EXISTS',
    'EXIT',
    'EXPLAIN',
    'FALSE',
    'FOR',
    'FROM',
    'GOTO',
    'GROUP',
    'HAVING',
    'IF',
    'IN',
    'INNER',
    'INOUT',
    'INSERT',
    'INTO',
    'IS',
    'JOIN',
    'KEY',
    'KEYS',
    'LABEL',
    'LEFT',
    'LIKE',
    'LIMIT',
    'LOCALTIME',
    'LOCALTIMESTAMP',
    'LOOP',
    'NOT',
    'NULL',
    'ON',
    'OR',
    'ORDER',
    'OUT',
    'SELECT',
    'SET',
    'SHOW',
    'TERMINATED',
    'THEN',
    'TO',
    'TRAILING',
    'TRIGGER',
    'TRUE',
    'UNDO',
    'UNION',
    'UNIQUE',
    'UNLOCK',
    'UNSIGNED',
    'UPDATE',
    'USAGE',
    'USE',
    'USING',
    'UTC_DATE',
    'UTC_TIME',
    'UTC_TIMESTAMP',
    'VALUES',
    'WHEN',
    'WHERE',
    'WHILE',
    'WITH'
  ];

const db_schema = {
    tables: [
        'tb_user',
        'tb_log'
    ],
    table_columns: {
        tb_user: [
            { name: 'user_id', type: 'varchar' },
            { name: 'user_name', type: 'varchar' }
        ],
        tb_log: [
            { name: 'log_id', type: 'varchar' },
            { name: 'log_create_time', type: 'varchar' },
            { name: 'log_type', type: 'varchar' },
            { name: 'log_content', type: 'varchar' },
        ]
    }
}
monaco.languages.registerCompletionItemProvider('sql', {
    triggerCharacters: [' ', '.'],
    provideCompletionItems(model, position) {
        const { lineNumber, column } = position
        const textBeforePointer = model.getValueInRange({
            startLineNumber: lineNumber,
            startColumn: 0,
            endLineNumber: lineNumber,
            endColumn: column
        })
        const tokens = textBeforePointer.trim().split(/\s+/)
        const lastToken = tokens[tokens.length - 1].toLowerCase()
        if (lastToken === 'from') {
            return {
                suggestions: db_schema.tables.map(renderTable)
            }
        } else if (lastToken === 'select') {
            return {
                suggestions: getAllTableColumnCompletionItems()
            }
        }
        return {
            suggestions: db_schema.tables.map(renderTable)
                .concat(getAllTableColumnCompletionItems())
                .concat(db_keywords.map(renderKeyword))
        }
    }
})

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
        insertText: keyword
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