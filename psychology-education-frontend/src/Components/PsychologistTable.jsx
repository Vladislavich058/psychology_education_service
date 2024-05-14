import {Button, Dialog, DialogBody, Input} from "@material-tailwind/react";
import React, {useState} from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import PsychologistRow from "./PsychologistRow";

const PsychologistTable = ({
                               psychologists,
                               deletePsychologist,
                               getPsychologistAnalitic,
                               setFilter,
                               filter,
                               fetchPsycho,
                           }) => {
    const TABLE_HEAD = [
        "Фото",
        "Email",
        "Имя",
        "Фамилия",
        "Отчество",
        "Номер телефона",
        "",
    ];
    const [open, setOpen] = useState(false);
    const handleOpenDialog = () => setOpen(!open);
    return (
        <div className="h-full">
            <div className="text-center uppercase font-medium text-3xl mb-10">
                Психологи
            </div>
            <div className="flex flex-wrap justify-between items-center">
                <div className="w-[300px] py-1">
                    <Input
                        placeholder="Поиск"
                        variant="static"
                        className="!text-lg"
                        value={filter.query}
                        onChange={(e) => setFilter({...filter, query: e.target.value})}
                        crossOrigin={undefined}
                    />
                </div>
                <div className="py-1">
                    <Button
                        variant="filled"
                        className="rounded-none text-sm"
                        onClick={() => setOpen(true)}
                    >
                        Добавить
                    </Button>
                </div>
            </div>
            <table className="w-full min-w-max table-auto text-center mt-10">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head) => (
                        <th
                            key={head}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 px-8 py-4"
                        >
                            <div className="font-normal leading-none opacity-70">
                                {head}
                            </div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {psychologists &&
                    psychologists.map((psychologist, index) => {
                        const isLast = index === psychologists.length - 1;
                        const classes = isLast
                            ? "px-8 py-4"
                            : "px-8 py-4 border-b border-blue-gray-50";

                        return (
                            <PsychologistRow
                                key={index}
                                psychologist={psychologist}
                                classes={classes}
                                deletePsychologist={deletePsychologist}
                                getPsychologistAnalitic={getPsychologistAnalitic}
                            />
                        );
                    })}
                </tbody>
            </table>
            <Dialog
                open={open}
                handler={handleOpenDialog}
                animate={{
                    mount: {scale: 1, y: 0},
                    unmount: {scale: 0.9, y: -100},
                }}
                size="sm"
            >
                <DialogBody>
                    <PersonalInfoForm fetchPsycho={fetchPsycho}/>
                </DialogBody>
            </Dialog>
        </div>
    );
};

export default PsychologistTable;
