import {Alert, Button, Rating, Spinner, Textarea} from "@material-tailwind/react";
import ClientService from "API/ClientService";
import {useFetching} from "Hooks/useFetching";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

const ReviewForm = ({fetchCourse, id}) => {
    const [review, setReview] = useState({
        message: "",
        stars: 3,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm({
        mode: "onSubmit",
    });

    const handleChange = (event) => {
        setReview({
            ...review,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeStars = (value) => {
        setReview({
            ...review,
            stars: value,
        });
    };

    const {
        fetching: fetchAdd,
        isLaoding: isAddLoading,
        error: addError,
        errorOpen: addErrorOpen,
    } = useFetching(async () => {
        await ClientService.addReview(id, {review});
        reset();
        fetchCourse();
    });

    const handleAdd = () => {
        fetchAdd();
    };

    return (
        <div className="py-10">
            <Alert
                className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
                open={addErrorOpen}
            >
                {addError}
            </Alert>
            {isAddLoading ? (
                <div className="flex justify-center mt-12">
                    <Spinner/>
                </div>
            ) : (
                <form
                    className="mb-2 text-black w-full"
                    onSubmit={(e) => handleSubmit(handleAdd)(e)}
                >
                    <div className="flex flex-col gap-2">
                        <Rating
                            value={review.stars}
                            onChange={(value) => handleChangeStars(value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Textarea
                            placeholder="Написать отзыв..."
                            variant="static"
                            className="text-lg !text-black"
                            name="message"
                            value={review?.message}
                            {...register("message", {
                                required: "Заполните поле!",
                            })}
                            error={errors?.description ? true : false}
                            onChange={(e) => handleChange(e)}
                        />
                        <div className=" text-red-500 text-lg -mt-2">
                            {errors?.message && (
                                <p>{errors?.message?.message.toString() || "Ошибка ввода!"}</p>
                            )}
                        </div>
                    </div>
                    <Button
                        variant="filled"
                        size="sm"
                        className="mt-6 rounded-none"
                        type="submit"
                    >
                        Отправить
                    </Button>
                </form>
            )}
        </div>
    );
};

export default ReviewForm;
