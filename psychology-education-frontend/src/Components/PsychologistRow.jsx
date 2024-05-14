import {Button, Dialog, DialogBody} from "@material-tailwind/react";
import React, {useState} from "react";
import AavatarLogo from "Images/avatar.png";

const PsychologistRow = ({classes, psychologist, deletePsychologist, getPsychologistAnalitic}) => {
    const [open, setOpen] = useState(false);
    const handleOpenDialog = () => setOpen(!open);
    return (
        <tr>
            <td className={classes}>
                <div
                    className="flex justify-center cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    <img
                        className="w-20 object-cover overflow-hidden object-center h-20 rounded-full"
                        src={psychologist.photo ? psychologist.photo.uri : AavatarLogo}
                        alt={psychologist.photo ? psychologist.photo.name : "avatar"}
                    />
                </div>
            </td>
            <td className={classes}>{psychologist.user.email}</td>
            <td className={classes}>{psychologist.name}</td>
            <td className={classes}>{psychologist.surname}</td>
            <td className={classes}>{psychologist.lastname}</td>
            <td className={classes}>{psychologist.phone}</td>
            <td className={classes}>
                <Button
                    variant="outlined"
                    className="rounded-none text-black block"
                    fullWidth
                    size="sm"
                    onClick={() => deletePsychologist(psychologist.id)}
                >
                    Удалить
                </Button>
                <Button
                    variant="outlined"
                    className="rounded-none text-black block mt-1"
                    size="sm"
                    fullWidth
                    onClick={() => getPsychologistAnalitic(psychologist.id)}
                >
                    Аналитика
                </Button>
            </td>
            <Dialog
                open={open}
                handler={handleOpenDialog}
                animate={{
                    mount: {scale: 1, y: 0},
                    unmount: {scale: 0.9, y: -100},
                }}
            >
                <DialogBody>
                    <img
                        className=""
                        src={psychologist.photo ? psychologist.photo.uri : AavatarLogo}
                        alt={psychologist.photo ? psychologist.photo.name : "avatar"}
                    />
                </DialogBody>
            </Dialog>
        </tr>
    );
};

export default PsychologistRow;
