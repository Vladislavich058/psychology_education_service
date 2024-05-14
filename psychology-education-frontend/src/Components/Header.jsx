import {Collapse, Dialog, DialogBody, IconButton, Navbar,} from "@material-tailwind/react";
import {useAuth} from "Hooks/useAuth";
import LogoIcon from "Images/logo1.png";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import PersonalInfoForm from "./PersonalInfoForm";

const Header = () => {
    const [openNav, setOpenNav] = useState(false);
    const {authUser, logout} = useAuth();
    const router = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const adminNavItems = [
        {label: "Психологи", route: "/psychologists"},
        {label: "Курсы", route: "/courses"},
        {label: "Записи", route: "/records"},
        {label: "Аналитика", route: "/analitics"},
    ];

    const psychologistNavItems = [
        {label: "Курсы", route: "/courses"},
        {label: "Избранное", route: "/courses/favourites"},
        {label: "Обучение", route: "/courses/study"},
        {label: "Тестирование", route: "/test"},
    ];

    const navList = (
        <ul className="text-black flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-10 mt-5 lg:mt-0">
            {authUser && authUser.role === "ROLE_ADMIN"
                ? adminNavItems.map(({label, route}, index) => (
                    <Link to={route} key={index}>
                        <li
                            className={`p-1 transition ease-in-out delay-100 lg:hover:-translate-y-1 lg:hover:scale-110 hover:font-medium cursor-pointer`}
                        >
                            {label}
                        </li>
                    </Link>
                ))
                : authUser && authUser.role === "ROLE_PSYCHOLOGIST"
                    ? psychologistNavItems.map(({label, route}, index) => (
                        <Link to={route} key={index}>
                            <li
                                className={`p-1 transition ease-in-out delay-100 lg:hover:-translate-y-1 lg:hover:scale-110 hover:font-medium cursor-pointer`}
                            >
                                {label}
                            </li>
                        </Link>
                    ))
                    : ""}
        </ul>
    );

    return (
        <Navbar
            className="sticky py-5 bg-gradient-to-b from-[#ffc0cb8b] to-white shadow-none border-none bg-opacity-100 top-0 h-max max-w-full rounded-none z-30">
            <div className="flex items-center gap-10">
                <div className="flex items-center text-black font-medium">
                    <div className="uppercase">psycho</div>
                    <img src={LogoIcon} alt="logo" className="w-[18px] block"/>
                    <div className="uppercase">nalitik</div>
                </div>
                <div className="hidden lg:block">{navList}</div>
                {authUser ? (
                    <div className="w-full justify-end hidden lg:flex">
                        <div className="flex gap-3">
                            {authUser.role !== "ROLE_ADMIN" ? (
                                <div
                                    className="p-1 transition ease-in-out delay-100 lg:hover:-translate-y-1 lg:hover:scale-110 hover:font-medium cursor-pointer text-black ml-auto"
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                >
                                    Профиль
                                </div>
                            ) : (
                                ""
                            )}
                            <div
                                className="p-1 transition ease-in-out delay-100 lg:hover:-translate-y-1 lg:hover:scale-110 hover:font-medium cursor-pointer text-red-500 ml-auto"
                                onClick={() => {
                                    logout();
                                    router("/");
                                }}
                            >
                                Выйти
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-black"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                {navList}
                {authUser ? (
                    <div className="mt-5 flex flex-col gap-1">
                        {authUser.role !== "ROLE_ADMIN" ? (
                            <div
                                className="p-1 transition ease-in-out delay-100 lg:hover:-translate-y-1 lg:hover:scale-110 hover:font-medium cursor-pointer text-black"
                                onClick={() => setOpen(true)}
                            >
                                Профиль
                            </div>
                        ) : (
                            ""
                        )}
                        <div
                            className="p-1 transition ease-in-out delay-100 lg:hover:-translate-y-1 lg:hover:scale-110 hover:font-medium cursor-pointer text-red-500"
                            onClick={() => {
                                logout();
                                router("/");
                            }}
                        >
                            Выйти
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </Collapse>
            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: {scale: 1, y: 0},
                    unmount: {scale: 0.9, y: -100},
                }}
                size="lg"
            >
                <DialogBody>
                    <PersonalInfoForm type="edit"/>
                </DialogBody>
            </Dialog>
        </Navbar>
    );
};

export default Header;
