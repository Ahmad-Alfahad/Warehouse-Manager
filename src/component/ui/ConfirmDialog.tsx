import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
    open : boolean;
    title : string ;
    description : string ;
    onConfirm : () => void ;
    onClose : () => void ;
}
export default function ConfirmDialod({
    open ,
    title ,
    description,
    onConfirm,
    onClose,
}:Props
)
{
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{description}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} >Cancel</Button>
                <Button onClick={onConfirm}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}