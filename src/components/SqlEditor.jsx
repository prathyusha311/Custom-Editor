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
    // try {
    //     sqlparser.parse(newValue);
    //     monaco.editor.setModelMarkers(model, "owner", []);
    // } catch (e) {
    //     const errorMsg = newValue !== '' ? 'message : ' + createQueryError(e) : '';
    //     console.log(errorMsg);
    //     lineMarkers.push(createMarker(e.hash, errorMsg));
    //     monaco.editor.setModelMarkers(model, "owner", lineMarkers);
    // }
  }

  const options = {
    selectOnLineNumbers: true
  };
  return (
    <MonacoEditor
      // ref="monaco"
      width="800"
      height="600"
      language="policyDSL"
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
  'ALLOW',
  'USERS',
  'SSN',
  'MASK',
  'UNMASK'
];

const vault_schema = {
  vaults: [
    'Identity_vault',
    'Payment_vault',
    'HealthCare_vault'
  ],
  Verbs: [
    'Allow',
    'Allow_Access_to',
    'Deny_Access_to',
    'Deny',
    'Limit',
  ],

  Objects: [
    'User',
    'Vault',
    'Service Account',
  ],
  Users: [
    'Raju',
    'Sowmya',
    'Prakash',
    'Akshay',
    'All'
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
// monaco.languages.registerCompletionItemProvider('sql', {
//     triggerCharacters: [' ', '.'],
//     provideCompletionItems(model, position) {
//         const { lineNumber, column } = position
//         const textBeforePointer = model.getValueInRange({
//             startLineNumber: lineNumber,
//             startColumn: 0,
//             endLineNumber: lineNumber,
//             endColumn: column
//         })
//         const tokens = textBeforePointer.trim().split(/\s+/)
//         const lastToken = tokens[tokens.length - 1].toLowerCase()
//         if (lastToken === 'from') {
//             return {
//                 suggestions: db_schema.tables.map(renderTable)
//             }
//         } else if (lastToken === 'select') {
//             return {
//                 suggestions: getAllTableColumnCompletionItems()
//             }
//         }
//         return {
//             suggestions: db_schema.tables.map(renderTable)
//                 .concat(getAllTableColumnCompletionItems())
//                 .concat(db_keywords.map(renderKeyword))
//         }
//     }
// })

monaco.languages.register({ id: 'policyDSL' });


monaco.languages.registerCompletionItemProvider('policyDSL', {
  triggerCharacters: [' ', '.'],
  provideCompletionItems: (model, position) => {
    const { lineNumber, column } = position
    const textBeforePointer = model.getValueInRange({
      startLineNumber: lineNumber,
      startColumn: 0,
      endLineNumber: lineNumber,
      endColumn: column
    })
    console.log("text", textBeforePointer)
    const beforeTokens = textBeforePointer.trim().split(/\s+/)
    const lastToken = beforeTokens[beforeTokens.length - 1].toLowerCase()

    const entireText = model.getValue();
    const tokens = entireText.trim().split(/\s+/);
    console.log('tokens', tokens)
    console.log('lastToken', lastToken)

    let suggestions = null;
    if (lastToken.toLowerCase() == 'vault') {
      suggestions = vault_schema.vaults.map((vault) => {
        console.log("vault name", vault)
        return {
          label: vault,
          kind: monaco.languages.CompletionItemKind.Module,
          detail: '<vault_name>',
          sortText: SORT_TEXT.Table,
          insertText: vault
        }
      })
    }
    if (lastToken.toLowerCase() == 'user') {
      suggestions = vault_schema.Users.map((user) => {
        return {
          label: user,
          kind: monaco.languages.CompletionItemKind.Module,
          detail: '<user_name>',
          sortText: SORT_TEXT.Table,
          insertText: user
        }
      })
    }
    let lowerCaserVerbs = vault_schema.Verbs.map( v => v.toLowerCase())
    if (lowerCaserVerbs.includes(lastToken)) {
      console.log("contains", lastToken)
      suggestions = vault_schema.Objects.map((object) => {
        return {
          label: object,
          kind: monaco.languages.CompletionItemKind.Module,
          detail: '<resource_name>',
          sortText: SORT_TEXT.Table,
          insertText: object
        }
      })
    }
    suggestions = suggestions ? suggestions : vault_schema.Verbs.map((verb) => {
      return {
        label: verb,
        kind: monaco.languages.CompletionItemKind.Keyword,
        detail: '',
        sortText: SORT_TEXT.Keyword,
        insertText: verb
      }
    })
    return { suggestions: suggestions };
  }
});

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
  Object.keys(vault_schema.table_columns).forEach(table => {
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
    detail: '<vault name>',
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