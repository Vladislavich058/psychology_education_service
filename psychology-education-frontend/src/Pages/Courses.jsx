import {Alert, Spinner} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import ClientService from "API/ClientService";
import CourseList from "Components/CourseList";
import {useAuth} from "Hooks/useAuth";
import {useCourses} from "Hooks/useCourses";
import {useFetching} from "Hooks/useFetching";
import React, {useEffect, useState} from "react";

const Courses = ({role = "", type = ""}) => {
    const [courses, setCourses] = useState([]);
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
    const {authUser} = useAuth();

    const searchCourses = useCourses(courses, filter.query);

    const {
        fetching: fetchCourses,
        isLoading: isCoursesLoading,
        error: courseError,
        errorOpen: open,
    } = useFetching(async () => {
        let response = {};
        if (role === "admin") {
            response = await AdminService.getCourses();
            setCourses(response.data);
        } else if (role === "" && type === "favourite") {
            response = await ClientService.getCourses();
            const favourites = response.data.filter((course) =>
                course.favourites
                    .map((favourite) => favourite.psychologist?.user.id)
                    .includes(authUser.id)
            );
            setCourses(favourites);
        } else if (role === "" && type === "study") {
            response = await ClientService.getCourses();
            const favourites = response.data.filter((course) =>
                course.records
                    .map((record) => record.psychologist?.user.id)
                    .includes(authUser.id)
            );
            setCourses(favourites);
        } else {
            response = await ClientService.getCourses();
            setCourses(response.data);
        }
    });

    const deleteCourse = async (id) => {
        try {
            await AdminService.deleteCourse(id);
            fetchCourses();
        } catch (e) {
            setErrorOpen(true);
            const errorMes =
                (e.response && e.response.data && e.response.data.message) ||
                e.message ||
                e.toString();
            setError(errorMes);
        }
    };

    const deleteFavouriteCourse = async (id) => {
        try {
            await ClientService.deleteFavouriteCourse(id);
            fetchCourses();
        } catch (e) {
            setErrorOpen(true);
            const errorMes =
                (e.response && e.response.data && e.response.data.message) ||
                e.message ||
                e.toString();
            setError(errorMes);
        }
    };

    const addFavouriteCourse = async (id) => {
        try {
            await ClientService.addFavouriteCourse(id);
            fetchCourses();
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
        fetchCourses();
    }, [type]);

    return (
        <div className="py-10">
            <Alert
                className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
                open={errorOpen || open}
            >
                {courseError || error}
            </Alert>
            {isCoursesLoading ? (
                <div className="flex justify-center mt-12">
                    <Spinner/>
                </div>
            ) : (
                <CourseList
                    filter={filter}
                    setFilter={setFilter}
                    courses={searchCourses}
                    fetchCourses={fetchCourses}
                    deleteCourse={deleteCourse}
                    deleteFavouriteCourse={deleteFavouriteCourse}
                    addFavouriteCourse={addFavouriteCourse}
                    coursesType={type}
                    role={role}
                />
            )}
        </div>
    );
};

export default Courses;
