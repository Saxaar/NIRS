import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';

export default function AproveDialog(props) {

  const { onClose, onAprove, open, text } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{text}</DialogTitle>
        <DialogActions>
            <IconButton onClick={onAprove} aria-label="close">
                <CheckIcon />
            </IconButton>
            <IconButton onClick={onClose} aria-label="close">
                <CloseIcon />
            </IconButton>
        </DialogActions>
    </Dialog>
  );
}

AproveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAprove: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};