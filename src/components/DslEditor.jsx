import React from "react";
import MonacoEditor from "react-monaco-editor";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "./index.css";

const options = {
  selectOnLineNumbers: true,
  suggest: {
    snippetsPreventQuickSuggestions: false,
  },
  lineHeight: "25px",
  tabCompletion: "on",
};

const DslEditor = () => {
  const [editor, setEditor] = React.useState();
  const [code, setCode] = React.useState("");
  const [open, setOpen] = React.useState("");
  const [ss, setSS] = React.useState();

  React.useEffect(() => {
    const listener = (e) => {
      setSS(e.detail.suggestions);
      console.log(e.detail.suggestions);
    };
    document.addEventListener("sugg", listener);
    return () => {
      document.removeEventListener("sugg", listener);
    };
  }, []);

  const getEditor = (editor) => {
    setEditor(editor);
    setTimeout(() => {
      editor.trigger("program", "editor.action.triggerSuggest", {});
    });
  };

  const handleSuggestionClick = (s) => {
    if (s.kind == 25) {
      const contribution = editor.getContribution("snippetController2");
      contribution.insert(s.insertText);
    } else {
      const { lineNumber, column } = editor.getPosition();
      const pointerPosition = {
        startLineNumber: lineNumber,
        startColumn: 0,
        endLineNumber: lineNumber,
        endColumn: column,
      };
      const textBeforePointer = editor
        .getModel()
        .getValueInRange(pointerPosition);
      const beforeTokens = textBeforePointer.trim().split(/\s+/);
      const lastToken = beforeTokens[beforeTokens.length - 1].toLowerCase();
      const startColumn = textBeforePointer.endsWith(" ")
        ? column
        : column - lastToken.length;
      const end = textBeforePointer == code ? " " : "";
      const range = new monaco.Range(
        lineNumber,
        startColumn,
        lineNumber,
        column
      );
      const id = { major: 1, minor: 1 };
      const op = {
        identifier: id,
        range: range,
        text: s.insertText + end,
        forceMoveMarkers: true,
      };
      editor.executeEdits("snippet", [op]);
    }
    editor.focus();
    setSS(undefined);
  };

  const onChange = (newValue, e) => {
    setCode(newValue);
    setTimeout(() => {
      editor.trigger("program", "editor.action.triggerSuggest", {});
    });
  };

  return (
    <Box width="100%" height="100%" position="relative" display="flex">
      <Box width="50%" height="100%">
        <MonacoEditor
          language="policyDSL"
          theme="myCoolTheme"
          // value={code}
          options={options}
          onChange={onChange}
          editorDidMount={getEditor}
        />
      </Box>
      <Box width="50%" height="100%" p={3}>
        <Box py={4} fontSize="22px" fontWeight="500">
          Suggestions
        </Box>
        <Box display="block" width="200px" height="200px" background="blue">
          <List>
            {ss
              ? ss.map((each) => (
                  <ListItem
                    button
                    onClick={handleSuggestionClick.bind(this, each)}
                    style={{
                      backgroundColor: "#fff",
                      boxShadow: "0 7px 24px 0 rgba(38, 39, 31, 0.2)",
                      padding: "12px",
                      marginBottom: "16px",
                      width: "360px",
                      borderRadius: "4px",
                    }}
                  >
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText primary={each.label} />
                  </ListItem>
                ))
              : "No suggestions"}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

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

monaco.languages.setMonarchTokensProvider("policyDSL", {
  ignoreCase: true,
  tokenizer: {
    root: [
      [/(create|update|read|delete|modify|all\s)/, "action"],
      [/(allow|deny)/, "decision"],
      [/(\son\s|with|if)/, "connector"],
      [/(action|resource|dlp|expression)/, "placeholder"],
      [/[a-zA-Z_.=]+/, "variable"],
    ],
  },
});

monaco.editor.defineTheme("myCoolTheme", {
  base: "vs",
  inherit: true,
  rules: [
    { background: "FFFFFF" },
    { token: "action", foreground: "#8e91ff" },
    { token: "decision", foreground: "#5e6c84" },
    { token: "connector", foreground: "#5e6c84" },
    { token: "variable", foreground: "#ff2f2f" },
    { token: "placeholder", foreground: "#808080" },
  ],
  colors: {
    // 'editor.foreground': '#000000',
    "editor.background": "#FFFFFF",
    // 'editorLineNumber.foreground': theme.palette.text.hint,
  },
});

const createMarker = (errorHash, errorMsg) => {
  //   console.log(errorHash);
  //   console.log(errorMsg);
  return {
    startLineNumber: errorHash.start.line - 1,
    startColumn: errorHash.start.column,
    endLineNumber: errorHash.end.line - 1,
    endColumn: errorHash.end.column,
    message: errorMsg,
    severity: monaco.MarkerSeverity.Error,
  };
};

const createQueryError = (e) => {
  return e.message.substring(e.message.indexOf("Expecting"));
};

const SORT_TEXT = {
  Table: "0",
  Column: "1",
  Keyword: "2",
};

const db_schema = {
  tables: ["patients", "contacts"],
  table_columns: {
    patients: [
      { name: "user_id", type: "varchar" },
      { name: "user_name", type: "varchar" },
    ],
    contacts: [
      { name: "email", type: "varchar" },
      { name: "mobile", type: "varchar" },
      { name: "address", type: "varchar" },
      { name: "gender", type: "varchar" },
    ],
  },
};

const actions = ["create", "read", "update", "delete", "modify"];

const connectors = ["with", "if", "where"];

const ifConditions = [
  "mfa_passed",
  "time_of_access",
  "geo_location",
  "ip_range",
  "calls_per_second",
  "records_per_query",
  "records_per_day",
];

const rangeQueries = ["time_of_access", "ip_range"];

const relationQueries = [
  "calls_per_second",
  "records_per_query",
  "records_per_day",
];

const relationalOperators = ["<", "<=", ">", ">=", "==", "!="];

monaco.languages.register({ id: "policyDSL" });

monaco.languages.registerCompletionItemProvider("policyDSL", {
  triggerCharacters: ["", ".", "/", ","],
  provideCompletionItems(model, position) {
    // console.log(position)
    const { lineNumber, column } = position;
    const pointerPosition = {
      startLineNumber: lineNumber,
      startColumn: 0,
      endLineNumber: lineNumber,
      endColumn: column,
    };
    const textBeforePointer = model.getValueInRange(pointerPosition);
    const beforeTokens = textBeforePointer.trim().split(/\s+/);
    const lastToken = beforeTokens[beforeTokens.length - 1].toLowerCase();
    const beforLastToken =
      beforeTokens.length >= 2 &&
      beforeTokens[beforeTokens.length - 2].toLowerCase();
    const entireText = model.getValue();
    const tokens = entireText.trim().split(/\s+/);

    let suggestions = null;

    if (lastToken.charAt(lastToken.length - 1) == ".") {
      const lastTokenWord = lastToken.substr(0, lastToken.length - 1);
      suggestions = [];
      if (db_schema.tables.indexOf(lastTokenWord) >= 0) {
        suggestions = getGivenTableColumnCompletionItems(lastTokenWord);
      }
    } else if (
      lastToken == "allowsnippet" ||
      lastToken == "denysnippet" ||
      lastToken == "allowreadsnippet"
    ) {
      suggestions = insertSnippet(pointerPosition);
    } else if (
      entireText == "" ||
      "allo".match(lastToken) ||
      "den".match(lastToken)
    ) {
      suggestions = insertSnippet(pointerPosition);
    } else if (
      !actions.includes(lastToken) &&
      (lastToken == "allow" ||
        lastToken == "deny" ||
        ((beforLastToken == "allow" || beforLastToken == "deny") &&
          regexMatcher(actions, lastToken)))
    ) {
      // suggestions = insertRead(pointerPosition)
      suggestions = actions.map(renderKeyword);
    } else if (actions.includes(lastToken)) {
      suggestions = [renderKeyword("on", false)];
    } else if (
      lastToken == "on" ||
      lastToken.charAt(lastToken.length - 1) == ","
    ) {
      suggestions = db_schema.tables.map(renderTable);
    } else if (db_schema.tables.includes(lastToken)) {
      if (beforeTokens.includes("read")) {
        suggestions = connectors.map(renderKeyword);
      } else {
        suggestions = ["if", "where"].map(renderKeyword);
      }
    } else if (lastToken == "with" || beforLastToken == "with") {
      suggestions = rules.map(renderRules);
    } else if (lastToken == "if") {
      suggestions = ifConditions.map(renderKeyword);
    }
    // else if (relationQueries.includes(lastToken)) {
    //     suggestions = relationalOperators.map(renderOperator)
    // } else if (rangeQueries.includes(lastToken)) {
    //     suggestions = rangeSnippet()
    // }
    suggestions = suggestions
      ? suggestions
      : actions
          .map(renderKeyword)
          .concat(connectors.map(renderKeyword))
          .concat(db_schema.tables.map(renderTable));
    const evt = new CustomEvent("sugg", { detail: { suggestions } });
    document.dispatchEvent(evt);
    return {};
  },
});

function regexMatcher(input, searchString) {
  const x = input.filter((item) => item.match(new RegExp(searchString, "g")));
  return x.length;
}

function insertSnippet(range) {
  return [
    {
      label: "AllowSnippet",
      kind: monaco.languages.CompletionItemKind.Snippet,
      documentation: "Describe your library here",
      // insertText: '${on resource with condition}',
      insertText:
        "Allow ${1:action} on ${2:resource} with ${3:dlp} if ${4:expression}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    },
    {
      label: "allowreadsnippet",
      kind: monaco.languages.CompletionItemKind.Snippet,
      documentation: "Describe your library here",
      // insertText: '${on resource with condition}',
      insertText:
        "Allow read on ${2:resource} with ${3:dlp} if ${4:expression}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      // range: {
      //     startLineNumber: 1,
      //     startColumn: 1,
      //     endLineNumber: 1,
      //     endColumn: 1
      // },
    },
    {
      label: "DenySnippet",
      kind: monaco.languages.CompletionItemKind.Snippet,
      documentation: "Describe your library here",
      insertText: "Deny ${1:action} on ${2:resource} if ${3:expression}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,

      // range: range
    },
    {
      label: "Allow",
      kind: monaco.languages.CompletionItemKind.Keyword,
      detail: "",
      sortText: SORT_TEXT.Keyword,
      insertText: "Allow",
    },
    {
      label: "Deny",
      kind: monaco.languages.CompletionItemKind.Keyword,
      detail: "",
      sortText: SORT_TEXT.Keyword,
      insertText: "Deny",
    },
  ];
}

function rangeSnippet() {
  return [
    {
      label: "between",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Description",
      // insertText: '${on resource with condition}',
      insertText: "between ${5:from} and ${6:to}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      // range: range
    },
    {
      label: "in",
      kind: monaco.languages.CompletionItemKind.Function,
      documentation: "Description",
      insertText: "in [${5:list}]",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,

      // range: range
    },
  ];
}

const rules = [
  {
    label: "Mask",
    value: 'DLP = "Mask"',
  },
  {
    label: "Redact",
    value: 'DLP = "Redact"',
  },
  {
    label: "Plain_Text",
    value: 'DLP = "Plain_Text"',
  },
  {
    label: "Random_Token",
    value: 'Tokenization = "Random_Token"',
  },
  {
    label: "FP_Token",
    value: 'Tokenization = "FP_Token"',
  },
];

function getGivenTableColumnCompletionItems(table) {
  const table_columns = [];
  if (db_schema.table_columns.hasOwnProperty(table)) {
    db_schema.table_columns[table].forEach((column) => {
      table_columns.push(renderTableColumn(table, column));
    });
  }
  return table_columns;
}

function getAllTableColumnCompletionItems() {
  const table_columns = [];
  Object.keys(db_schema.table_columns).forEach((table) => {
    db_schema.table_columns[table].forEach((column) => {
      table_columns.push(renderTableColumn(table, column));
    });
  });
  return table_columns;
}

function renderKeyword(keyword) {
  return {
    label: keyword,
    kind: monaco.languages.CompletionItemKind.Keyword,
    detail: "",
    sortText: SORT_TEXT.Keyword,
    insertText: keyword,
    // command: {
    //     // id: 'editor.action.focusNextGroup'
    //     id: 'jumpToNextSnippetPlaceholder'
    //     // id: 'editor.action.deleteLines'
    //     // editor.trigger('keyboard', 'type', { text: text });
    //     // id: 'editor.action.'
    // }
  };
}

function renderOperator(op) {
  return {
    label: op,
    kind: monaco.languages.CompletionItemKind.Operator,
    detail: "",
    // sortText: SORT_TEXT.,
    insertText: op,
  };
}

function renderTable(name) {
  return {
    label: name,
    kind: monaco.languages.CompletionItemKind.Module,
    detail: "<table>",
    sortText: SORT_TEXT.Table,
    insertText: name,
  };
}

function renderTableColumn(table, column) {
  return {
    label: column.name,
    kind: monaco.languages.CompletionItemKind.Field,
    detail: "<column> " + column.type + " " + table,
    sortText: SORT_TEXT.Column,
    insertText: column.name,
  };
}

function renderRules(rule) {
  return {
    label: rule.label,
    kind: monaco.languages.CompletionItemKind.Function,
    documentation: "Describe your rule here",
    insertText: rule.value,
  };
}
