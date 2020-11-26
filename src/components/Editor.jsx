import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Divider, Tab, Tabs, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SimpleTypescriptEditor from './SimpleTypescriptEditor';
import SqlEditor from './SqlEditor';

const useStyles = makeStyles((theme) =>
    createStyles({
        tabsRoot: {
            minWidth: "40px",
            fontSize: "13px",
            fontWeight: 500
        },
        listItem: {
            cursor: "pointer",
            '&:hover': {
                backgroundColor: "rgb(232, 232, 232)",
            },
        },
        selectedListItem: {
            fontWeight: 500,
            color: "rgb(45, 127, 249)",
            backgroundColor: "rgba(47, 128, 249, 0.12)"
        }
    }),
);

const content = [
    '# This is a default\n\nAnd this is a default',
    '# This is a header\n\nAnd this is a paragraph',
    '# This is a header\n\nAnd this is a paragraph',
    '# This is a header\n\nAnd this is a paragraph',
    '# This is a header\n\nAnd this is a paragraph',
]

const examples = [
    {
        name: 'Example 1',
        value: 0
    },
    {
        name: 'Example 2',
        value: 1
    },
    {
        name: 'Example 3',
        value: 2
    },
    {
        name: 'Example 4',
        value: 3
    },
    {
        name: 'Example 5',
        value: 4
    }
]

const Editor = (props) => {
    const classes = useStyles();
    const [tabValue, setTabValue] = React.useState(0);

    const [state, setState] = React.useState(1);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleClick = (index) => {
        console.log(index);
        setState(index);
    }

    return (
        <Box height="900px">
            <Box display="flex" justifyContent="space-between" p="8px" color="hsl(0,0%,30%)">
                <Typography>scripting</Typography>
                <IconButton size="small" onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box height="2px" bgcolor="#bdbdbd"></Box>
            <Box>

            </Box>
            <Box display="flex" height="calc(100% - 64px)" overflow="hidden">
                {/* <Box width="90%" height="100%"> */}
                    {/* <Box height="60%">
                        <SimpleTypescriptEditor />
                    </Box>
                    <Box bgcolor="rgb(242, 242, 242)" borderBottom="2px solid rgba(0, 0, 0, 0.1)" color="hsl(0,0%,30%)"> */}
                        {/* <Tabs
                            value={tabValue} onChange={handleTabChange} indicatorColor="primary">
                            <Tab classes={{
                                root: classes.tabsRoot
                            }} label="Examples" />
                            <Tab classes={{
                                root: classes.tabsRoot
                            }} label="API" />
                        </Tabs> */}
                    {/* </Box> */}

                {/* </Box> */}
                {/* <Divider orientation="vertical" /> */}
                <Box width="100%">
                    <SqlEditor />
                </Box>
            </Box>
        </Box>
    )
}

export default Editor;