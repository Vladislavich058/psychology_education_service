import {Alert, Button, Input, Spinner} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import {useFetching} from "Hooks/useFetching";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const CourseForm = ({type = "", fetchCourses = null, id = null}) => {
    const [course, setCourse] = useState({
        id: null,
        name: "",
        description: "",
        photo: null,
    });
    const [photos, setPhotos] = useState([]);

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
            "course",
            new Blob([JSON.stringify(course)], {
                type: "application/json",
            })
        );
        formData.append("photo", photos[0]);
        if (type === "edit") {
            const response = await AdminService.updateCourse(formData);
            setCourse(response.data);
        } else {
            await AdminService.addCourse(formData);
            fetchCourses();
            router("/courses");
        }
    });

    const {
        fetching: fetchCourse,
        isLaoding: isCourseLoading,
        error: courseError,
        errorOpen: courseErrorOpen,
    } = useFetching(async () => {
        const response = await AdminService.getCourseById(id);
        setCourse(response.data);
        reset();
    });

    useEffect(() => {
        if (type === "edit") {
            fetchCourse();
        }
    }, []);

    const handleChange = (event) => {
        setCourse({
            ...course,
            [event.target.name]: event.target.value,
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
            {isAddLoading || isCourseLoading ? (
                <div className="flex justify-center mt-12">
                    <Spinner/>
                </div>
            ) : (
                <div>
                    <Alert
                        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
                        open={addErrorOpen || courseErrorOpen}
                    >
                        {addError || courseError}
                    </Alert>
                    <div className="text-center uppercase font-medium text-2xl text-black">
                        {type === "edit" ? "Редактирование курса" : "Добавление курса"}
                    </div>
                    {type === "edit" ? (
                        <div className="flex justify-center py-5">
                            <img
                                className="w-[200px] h-[200px] object-cover overflow-hidden object-center"
                                src={course.photo?.uri}
                                alt={course.photo?.name}
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
                                placeholder="Название"
                                variant="static"
                                className="text-lg !text-black"
                                name="name"
                                value={course?.name}
                                {...register("name", {
                                    required: "Заполните поле!",
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
                                placeholder="Описание"
                                variant="static"
                                className="text-lg !text-black"
                                name="description"
                                value={course?.description}
                                {...register("description", {
                                    required: "Заполните поле!",
                                })}
                                error={errors?.description ? true : false}
                                crossOrigin={undefined}
                                onChange={(e) => handleChange(e)}
                            />
                            <div className=" text-red-500 -mt-1">
                                {errors?.description && (
                                    <p>
                                        {errors?.description?.message.toString() || "Ошибка ввода!"}
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
                                    <p>{errors?.photo?.message.toString() || "Ошибка ввода!"}</p>
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
            )}
        </div>
    );
};

export default CourseForm;
