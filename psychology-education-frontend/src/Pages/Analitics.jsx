import {Alert, Spinner} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import MyChart from "Components/MyChart";
import {useFetching} from "Hooks/useFetching";
import React, {useEffect, useState} from "react";

const Analitics = () => {
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);

    const {
        fetching: fetchAnalitic,
        isLoading: isAnaliticLoading,
        error: analiticError,
        errorOpen: analiticErrorOpen,
    } = useFetching(async () => {
        const response = await AdminService.getCoursesRating();
        let xValues = [];
        let yValues = [];
        response.data.map(({xvalue, yvalue}) => {
            xValues.push(xvalue);
            yValues.push(yvalue);
        });
        setXValues(xValues);
        setYValues(yValues);
    });

    useEffect(() => {
        fetchAnalitic();
    }, []);

    return (
        <div className="py-10">
            <Alert
                className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
                open={analiticErrorOpen}
            >
                {analiticError}
            </Alert>
            {isAnaliticLoading ? (
                <div className="flex justify-center mt-12">
                    <Spinner/>
                </div>
            ) : (
                <div className="flex justify-center">
                    <MyChart
                        xValues={xValues}
                        yValues={yValues}
                        label={"Курс"}
                        xTitle={"Курсы"}
                        yTitle={"Оценка"}
                        maxTips={5}
                    />
                </div>
            )}
        </div>
    );
};

export default Analitics;
