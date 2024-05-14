import {Alert, Dialog, DialogBody, Spinner} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import MyChart from "Components/MyChart";
import PsychologistTable from "Components/PsychologistTable";
import {useFetching} from "Hooks/useFetching";
import {usePsychologists} from "Hooks/usePsychologists";
import React, {useEffect, useState} from "react";

const Psychologists = () => {
    const [psychologists, setPsychologists] = useState([]);
    const [error, setError] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [filter, setFilter] = useState({
        query: "",
        filter: "",
        sort: {
            type: "asc",
            value: "",
        },
    });
    const [openAnalitic, setOpenAnalitic] = useState(false);
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);
    const handleOpenDialog = () => setOpenAnalitic(!openAnalitic);

    const searchAndFilterPsychologists = usePsychologists(
        psychologists,
        filter.query
    );

    const {
        fetching: fetchPsycho,
        isLoading: isPsychoLoading,
        error: psychoError,
        errorOpen: open,
    } = useFetching(async () => {
        const response = await AdminService.getPsychologists();
        setPsychologists(response.data);
    });

    const deletePsychologist = async (id) => {
        try {
            await AdminService.deletePsychologist(id);
            fetchPsycho();
        } catch (e) {
            setErrorOpen(true);
            const errorMes =
                (e.response && e.response.data && e.response.data.message) ||
                e.message ||
                e.toString();
            setError(errorMes);
        }
    };

    const getPsychologistAnalitic = async (id) => {
        try {
            const response = await AdminService.getPsychologistAnalitic(id);
            let xValues = [];
            let yValues = [];
            response.data.map(({xvalue, yvalue}) => {
                xValues.push(xvalue);
                yValues.push(Number(yvalue) * 100);
            });
            setXValues(xValues);
            setYValues(yValues);
            setOpenAnalitic(true);
        } catch (e) {
            setErrorOpen(true);
            const errorMes =
                (e.response && e.response.data && e.response.data.message) ||
                e.message ||
                e.toString();
            setError(errorMes);
        }
    };

    useEffect(() => {
        fetchPsycho();
    }, []);

    return (
        <div className="py-10">
            <Alert
                className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
                open={open || errorOpen}
            >
                {psychoError || error}
            </Alert>
            {isPsychoLoading ? (
                <div className="flex justify-center mt-12">
                    <Spinner/>
                </div>
            ) : (
                <PsychologistTable
                    psychologists={searchAndFilterPsychologists}
                    deletePsychologist={deletePsychologist}
                    getPsychologistAnalitic={getPsychologistAnalitic}
                    setFilter={setFilter}
                    filter={filter}
                    fetchPsycho={fetchPsycho}
                />
            )}
            <Dialog
                open={openAnalitic}
                handler={handleOpenDialog}
                animate={{
                    mount: {scale: 1, y: 0},
                    unmount: {scale: 0.9, y: -100},
                }}
                size="lg"
            >
                <DialogBody>
                    <MyChart
                        xValues={xValues}
                        yValues={yValues}
                        label={"Курс"}
                        xTitle={"Курсы"}
                        yTitle={"Прогресс %"}
                        maxTips={100}
                    />
                </DialogBody>
            </Dialog>
        </div>
    );
};

export default Psychologists;
