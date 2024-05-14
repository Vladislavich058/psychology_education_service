import {Alert, Button, Input, Spinner} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import LoginService from "API/LoginService";
import {useFetching} from "Hooks/useFetching";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import AavatarLogo from "Images/avatar.png";
import {useAuth} from "Hooks/useAuth";

const PersonalInfoForm = ({type = "", fetchPsycho = null}) => {
    const [psychologist, setPsychologist] = useState({
        id: null,
        name: "",
        surname: "",
        lastname: "",
        phone: "",
        photo: null,
        user: {
            id: null,
            email: "",
            password: "",
        },
    });
    const [photos, setPhotos] = useState([]);
    const {login} = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur",
    });

    const router = useNavigate();

    const {
        fetching: fetchAdd,
        isLaoding: isAddLoading,
        error: addError,
        errorOpen: addErrorOpen,
    } = useFetching(async () => {
        let formData = new FormData();
        formData.append(
            "psychologist",
            new Blob([JSON.stringify(psychologist)], {
                type: "application/json",
            })
        );
        formData.append("photo", photos[0]);
        if (type === "edit") {
            const response = await LoginService.updateCurrentUser(formData);
            login(response.data)
            fetchPsychologist();
        } else {
            await AdminService.addPsychologist(formData);
            fetchPsycho();
            router("/psychologists");
        }
    });

    const {
        fetching: fetchPsychologist,
        isLaoding: isPsychologistLoading,
        error: psychologistError,
        errorOpen: psychologistErrorOpen,
    } = useFetching(async () => {
        let response = await LoginService.getCurrentUser();
        setPsychologist(response.data);
        reset();
    });

    useEffect(() => {
        if (type === "edit") {
            fetchPsychologist();
        }
    }, []);

    const handleChange = (event) => {
        setPsychologist({
            ...psychologist,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeUser = (event) => {
        const user = {
            ...psychologist.user,
            [event.target.name]: event.target.value,
        };
        setPsychologist({
            ...psychologist,
            user: user,
        });
    };

    const handleChangePhoto = (event) => {
        setPhotos(event.target.files);
    };

    const handleAdd = async (event) => {
        fetchAdd();
    };

    return (
        <div className="p-5">
            {isAddLoading || isPsychologistLoading ? (
                <div className="flex justify-center mt-12">
                    <Spinner/>
                </div>
            ) : (
                <div>
                    <Alert
                        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
                        open={addErrorOpen || psychologistErrorOpen}
                    >
                        {addError || psychologistError}
                    </Alert>
                    <div className="text-center uppercase font-medium text-2xl text-black">
                        {type === "edit"
                            ? "Редактирование профиля"
                            : "Добавление психолога"}
                    </div>
                    <div className="flex justify-between items-start mt-5 gap-2">
                        {type === "edit" ? (
                            <div className="w-full flex justify-center">
                                <img
                                    className="w-[300px] h-[300px] object-cover overflow-hidden object-center rounded-full"
                                    src={
                                        psychologist.photo ? psychologist.photo.uri : AavatarLogo
                                    }
                                    alt={psychologist.photo ? psychologist.photo.name : "avatar"}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <form
                            className="mb-2 text-black w-full"
                            onSubmit={(e) => handleSubmit(handleAdd)(e)}
                        >
                            <div className="flex flex-col gap-2">
                                <Input
                                    placeholder="Имя"
                                    variant="static"
                                    className="text-lg !text-black"
                                    name="name"
                                    value={psychologist && psychologist.name}
                                    {...register("name", {
                                        required: "Заполните поле!",
                                        pattern: {
                                            value: /^[A-Za-zА-Яа-яЁё]+$/,
                                            message: "Имя должно содержать только буквы!",
                                        },
                                    })}
                                    error={errors?.name ? true : false}
                                    crossOrigin={undefined}
                                    onChange={(e) => handleChange(e)}
                                />
                                <div className=" text-red-500 -mt-1">
                                    {errors?.name && (
                                        <p>{errors?.name?.message.toString() || "Ошибка ввода!"}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input
                                    placeholder="Фамилия"
                                    variant="static"
                                    className="text-lg !text-black"
                                    name="surname"
                                    value={psychologist?.surname}
                                    {...register("surname", {
                                        required: "Заполните поле!",
                                        pattern: {
                                            value: /^[A-Za-zА-Яа-яЁё]+$/,
                                            message: "Фамилия должна содержать только буквы!",
                                        },
                                    })}
                                    error={errors?.surname ? true : false}
                                    crossOrigin={undefined}
                                    onChange={(e) => handleChange(e)}
                                />
                                <div className=" text-red-500 -mt-1">
                                    {errors?.surname && (
                                        <p>
                                            {errors?.surname?.message.toString() || "Ошибка ввода!"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input
                                    placeholder="Отчество"
                                    variant="static"
                                    className="text-lg !text-black"
                                    name="lastname"
                                    value={psychologist?.lastname}
                                    {...register("lastname", {
                                        pattern: {
                                            value: /^[A-Za-zА-Яа-яЁё]*$/,
                                            message: "Отчество должно содержать только буквы!",
                                        },
                                    })}
                                    error={errors?.lastname ? true : false}
                                    crossOrigin={undefined}
                                    onChange={(e) => handleChange(e)}
                                />
                                <div className=" text-red-500 -mt-1">
                                    {errors?.lastname && (
                                        <p>
                                            {errors?.lastname?.message.toString() || "Ошибка ввода!"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <div>Фото</div>
                                    <Input
                                        size="lg"
                                        variant="static"
                                        type="file"
                                        accept=".jpg,.png,.jpeg"
                                        {...register("photo", {
                                            required: "Выберите фото!",
                                        })}
                                        error={errors?.photo ? true : false}
                                        crossOrigin={undefined}
                                        onChange={(e) => handleChangePhoto(e)}
                                    />
                                </div>
                                <div className=" text-red-500 -mt-1">
                                    {errors?.photo && (
                                        <p>
                                            {errors?.photo?.message.toString() || "Ошибка ввода!"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input
                                    size="lg"
                                    variant="static"
                                    placeholder="Номер телефона"
                                    value={psychologist?.phone}
                                    {...register("phone", {
                                        required: "Заполните поле!",
                                        pattern: {
                                            value: /^(80|\+375)(\(?(29|44|25|33)\)?)[\d]{7}$/,
                                            message: "Неверный формат номера телефона!",
                                        },
                                    })}
                                    error={errors?.phone ? true : false}
                                    crossOrigin={undefined}
                                    onChange={(e) => handleChange(e)}
                                />
                                <div className="text-red-500 -mt-1">
                                    {errors?.phone && (
                                        <p>
                                            {errors?.phone?.message.toString() || "Ошибка ввода!"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input
                                    size="lg"
                                    placeholder="Email"
                                    variant="static"
                                    value={psychologist?.user.email}
                                    className="text-lg !text-black"
                                    {...register("email", {
                                        required: "Заполните поле!",
                                        pattern: {
                                            value:
                                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Неверный формат email!",
                                        },
                                    })}
                                    error={errors?.email ? true : false}
                                    crossOrigin={undefined}
                                    onChange={(e) => handleChangeUser(e)}
                                />
                                <div className=" text-red-500 -mt-1">
                                    {errors?.email && (
                                        <p>
                                            {errors?.email?.message.toString() || "Ошибка ввода!"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input
                                    type="password"
                                    size="lg"
                                    variant="static"
                                    className="text-lg !text-black"
                                    placeholder="Пароль"
                                    {...register("password", {
                                        required: "Заполните поле!",
                                        minLength: {
                                            value: 5,
                                            message: "Минимум 5 символов!",
                                        },
                                    })}
                                    error={errors?.password ? true : false}
                                    crossOrigin={undefined}
                                    onChange={(e) => handleChangeUser(e)}
                                />
                                <div className="text-red-500 -mt-1">
                                    {errors?.password && (
                                        <p>
                                            {errors?.password?.message.toString() || "Ошибка ввода!"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="filled"
                                size="sm"
                                className="mt-6 rounded-none"
                                fullWidth
                                type="submit"
                                disabled={!isValid}
                            >
                                {type === "edit" ? "Сохранить" : "Добавить"}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalInfoForm;
