// // monaco.languages.registerCompletionItemProvider('tcl', {
// //     triggerCharacters: [' ', '.'],
// //     provideCompletionItems(model, position) {
// //       const { lineNumber, column } = position
// //       const textBeforePointer = model.getValueInRange({
// //         startLineNumber: lineNumber,
// //         startColumn: 0,
// //         endLineNumber: lineNumber,
// //         endColumn: column
// //       })
// //       console.log("text", textBeforePointer)
// //       const beforeTokens = textBeforePointer.trim().split(/\s+/)
// //       const lastToken = beforeTokens[beforeTokens.length - 1].toLowerCase()

// //       const entireText = model.getValue();
// //       const tokens = entireText.trim().split(/\s+/);
// //       console.log(textBeforePointer)
// //       console.log(entireText)
// //       const aliasMap = [];
// //       const tablesTemp = [...db_schema.tables];
// //       const tableColumnsTemp = { ...db_schema.table_columns };
// //       // const extendedTables = [...db_schema.tables];
// //       // const extendedTableColumns = {...db_schema.table_columns};
// //       for (let i = 1; i < tokens.length - 1; i++) {
// //         if (tokens[i] === 'as') {
// //           aliasMap.push({
// //             name: tokens[i - 1],
// //             alias: tokens[i + 1]
// //           });
// //         }
// //       }

// //       aliasMap.forEach((map) => {
// //         if (db_schema.tables.indexOf(map.name) >= 0 && db_schema.table_columns.hasOwnProperty(map.name)) {
// //           db_schema.tables.push(map.alias);
// //           db_schema.table_columns[map.alias] = db_schema.table_columns[map.name];
// //         }
// //       })
// //       let suggestions = null;
// //       if (lastToken.charAt(lastToken.length - 1) == '.') {
// //         const lastTokenWord = lastToken.substr(0, lastToken.length - 1);
// //         suggestions = [];
// //         if (db_schema.tables.indexOf(lastTokenWord) >= 0) {
// //           suggestions = getGivenTableColumnCompletionItems(lastTokenWord);
// //         }
// //       } else if (lastToken === 'from') {
// //         suggestions = db_schema.tables.map(renderTable)
// //       } else if (lastToken === 'select') {
// //         suggestions = getAllTableColumnCompletionItems()
// //       } else if (lastToken == 'as') {
// //         suggestions = [];
// //       }
// //       suggestions = suggestions ? suggestions : db_keywords.map(renderKeyword)
// //         .concat(getAllTableColumnCompletionItems())
// //         .concat(db_schema.tables.map(renderTable));

// //       db_schema.tables = [...tablesTemp];
// //       db_schema.table_columns = { ...tableColumnsTemp };
// //       return { suggestions };
// //     }
// //   })

// {
//     tabValue == 0 && (
//         <Box display="flex" height="inherit">
//             <Box width="20%" height="100%" bgcolor="rgb(242, 242, 242)">
//                 {
//                     examples.map(item => (
//                         <Box pl="16px" py="8px" className={item.value == state ? classes.selectedListItem : classes.listItem}
//                             onClick={() => handleClick(item.value)}>
//                             <Typography variant="caption">{item.name}</Typography>
//                         </Box>

//                     ))
//                 }
//             </Box>
//             <Box p="16px">
//                 {/* <ReactMarkdown source={content[state]} /> */}
//             </Box>

//         </Box>

//     )
// }
// {
//     tabValue == 1 && <Typography>API</Typography>
// }