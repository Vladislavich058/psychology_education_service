import {Alert, Button, Input, Spinner} from "@material-tailwind/react";
import LoginService from "API/LoginService";
import {useAuth} from "Hooks/useAuth";
import {useFetching} from "Hooks/useFetching";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const {login} = useAuth();
    const router = useNavigate();

    const {
        fetching: fetchLogin,
        isLoading: isLoginLoading,
        error: loginError,
        errorOpen: loginErrorOpen,
    } = useFetching(async () => {
        const response = await LoginService.login({user});
        login(response.data);
        router("/courses");
    });

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({
        mode: "onBlur",
    });

    const handleLogin = async () => {
        fetchLogin();
    };

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    return (
        <div className="min-h-[85vh] flex py-40 justify-center">
            {isLoginLoading ? (
                <div className="flex justify-center mt-12">
                    <Spinner/>
                </div>
            ) : (
                <div>
                    <div className="text-center text-xl lg:text-3xl font-medium">
                        Вход
                    </div>
                    <form
                        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                        onSubmit={(e) => handleSubmit(handleLogin)(e)}
                    >
                        <div className="mb-1 flex flex-col gap-4">
                            <Input
                                variant="static"
                                placeholder="Email"
                                name="email"
                                className="text-lg"
                                {...register("email", {
                                    required: "Заполните поле",
                                    pattern: {
                                        value:
                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Неверный формат email!",
                                    },
                                })}
                                error={errors?.email ? true : false}
                                crossOrigin={undefined}
                                onChange={(e) => handleChange(e)}
                            />
                            <div className="text-red-500 -mt-3">
                                {errors?.email && (
                                    <p>{errors?.email?.message.toString() || "Ошибка ввода!"}</p>
                                )}
                            </div>
                            <Input
                                type="password"
                                variant="static"
                                placeholder="Пароль"
                                name="password"
                                className="text-lg"
                                {...register("password", {
                                    required: "Заполните поле",
                                })}
                                error={errors?.password ? true : false}
                                crossOrigin={undefined}
                                onChange={(e) => handleChange(e)}
                            />
                            <div className="text-red-500 -mt-3">
                                {errors?.password && (
                                    <p>
                                        {errors?.password?.message.toString() || "Ошибка ввода!"}
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="outlined"
                            className="rounded-none mt-10 text-black text-base py-2"
                            fullWidth
                            type="submit"
                            disabled={!isValid}
                        >
                            Вход
                        </Button>
                    </form>
                    <Alert
                        className="my-1 mt-5 rounded-none font-medium text-lg bg-red-100 text-red-500"
                        open={loginErrorOpen}
                    >
                        {loginError}
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default Login;
