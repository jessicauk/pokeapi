import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";

interface DialogResponsiveProps {
  name: string;
  image: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogResponsive({
  name,
  image,
  open,
  setOpen,
}: DialogResponsiveProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      className=""
      fullScreen={fullScreen}
      maxWidth="md"
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      keepMounted
      aria-labelledby="responsive-dialog-title"
      classes={{ paper: "bg-slate-800 text-white text-4xl" }}
    >
      <DialogTitle id="responsive-dialog-title" className="capitalize">
        {name}
      </DialogTitle>
      <DialogContent className="flex flex-col justify-center items-center">
        <Image src={image} alt={name} width={200} height={200} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
          className="bg-red-600	text-white shadow-lg shadow-red-600/30 p-1.5 font-bold hover:bg-red-800"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
