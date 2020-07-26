import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Dialog } from '@material-ui/core';
import Editor from './components/Editor';

const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
        width: '800px',
        height: '800px'
    }
  }),
);

const App = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log('...clicked....')
        setOpen(false);
    };

    return (

        <div>
            <button type="button" onClick={handleOpen}>
                Open Modal
            </button>
            <Dialog
                fullWidth={true}
                maxWidth={false}
                open={open}
                onClose={handleClose}
            >
                <Editor onClose={handleClose}/>
            </Dialog>
        </div>
    );

}

export default App;
