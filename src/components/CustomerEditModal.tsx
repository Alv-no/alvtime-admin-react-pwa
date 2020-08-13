import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import { adAuthenticatedFetch } from '../services/azureAd';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function CustomerEditModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const saveEmail = () => {
    adAuthenticatedFetch("localhost:8000/api/admin/CreateCustomers",{method:"post", body:{}})
  };




//   const method = "post";
//   const headers = { "Content-Type": "application/json" };
//   const messagebody = JSON.stringify(paramTasks);
//   const options = { method, headers, messagebody };



//   const response = await adAuthenticatedFetch(
//     config.HOST + "/api/user/Tasks",
//     options
//   );
//   const updatedTasks = await response.json();
//   if (response.status !== 200) {
//     throw Error(`${response.statusText}
//       ${updatedTasks.title}`);
//   }


const handleChangeEmail = (event:any) => {
    setOpen(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
        <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" onChange={handleChangeEmail} />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
        </FormControl>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
