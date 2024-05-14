import {Alert, Button, Input, Spinner, Textarea,} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import {useFetching} from "Hooks/useFetching";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {ArrowUturnLeftIcon} from "@heroicons/react/24/solid";

const TopicForm = ({type = ""}) => {
    const params = useParams();
    const router = useNavigate();

    const [topic, setTopic] = useState({
        id: null,
        name: "",
        description: "",
        course: null,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur",
    });

    const {
        fetching: fetchAdd,
        isLaoding: isAddLoading,
        error: addError,
        errorOpen: addErrorOpen,
    } = useFetching(async () => {
        if (type === "edit") {
            await AdminService.updateTopic({topic}, params.courseId);
            fetchTopic();
        } else {
            await AdminService.addTopic({topic}, params.courseId);
            router(`/courses/${params.courseId}`);
        }
    });

    const {
        fetching: fetchTopic,
        isLoading: isTopicLoading,
        error: courseError,
        errorOpen: open,
    } = useFetching(async () => {
        const response = await AdminService.getTopicById(params.id);
        setTopic(response.data);
        reset();
    });

    useEffect(() => {
        if (type === "edit") {
            fetchTopic();
        }
    }, [params.id]);

    const handleChange = (event) => {
        setTopic({
            ...topic,
            [event.target.name]: event.target.value,
        });
    };

    const handleAdd = async (event) => {
        fetchAdd();
    };

    return (
        <div className="py-10">
            <Alert
                className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
                open={open || addErrorOpen}
            >
                {courseError || addError}
            </Alert>
            {isTopicLoading || isAddLoading ? (
                <div className="flex justify-center mt-12">
                    <Spinner/>
                </div>
            ) : (
                <div>
                    <ArrowUturnLeftIcon className="w-6 h-6 cursor-pointer" onClick={() => router(-1)}/>
                    <div className="text-center uppercase font-medium text-2xl text-black">
                        {type === "edit" ? "Редактирование урока" : "Добавление урока"}
                    </div>
                    <div className="flex justify-between items-start mt-5 gap-2">
                        <form
                            className="mb-2 text-black w-full"
                            onSubmit={(e) => handleSubmit(handleAdd)(e)}
                        >
                            <div className="flex flex-col gap-2">
                                <Input
                                    placeholder="Название"
                                    variant="static"
                                    className="text-xl !text-black"
                                    name="name"
                                    value={topic?.name}
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
                                <Textarea
                                    placeholder="Описание"
                                    variant="static"
                                    className="text-lg !text-black h-[500px]"
                                    name="description"
                                    value={topic?.description}
                                    {...register("description", {
                                        required: "Заполните поле!",
                                    })}
                                    error={errors?.description ? true : false}
                                    onChange={(e) => handleChange(e)}
                                />
                                <div className=" text-red-500 text-lg -mt-2">
                                    {errors?.description && (
                                        <p>
                                            {errors?.description?.message.toString() ||
                                                "Ошибка ввода!"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button
                                variant="filled"
                                size="sm"
                                className="mt-6 rounded-none"
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

export default TopicForm;
