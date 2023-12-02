import { ArrowUturnLeftIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Spinner,
} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import ClientService from "API/ClientService";
import { useAuth } from "Hooks/useAuth";
import { useFetching } from "Hooks/useFetching";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CoursePage = ({ role = "" }) => {
  const [course, setCourse] = useState({
    id: null,
    photo: {},
    name: "",
    description: "",
    topics: [],
    records: [],
  });
  const params = useParams();
  const router = useNavigate();
  const { authUser } = useAuth();
  const [error, setError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const {
    fetching: fetchCourse,
    isLoading: isCourseLoading,
    error: courseError,
    errorOpen: open,
  } = useFetching(async () => {
    let response = {};
    if (role === "admin") {
      response = await AdminService.getCourseById(params.id);
    } else {
      response = await ClientService.getCourseById(params.id);
    }
    setCourse(response.data);
  });

  const addRecord = async (id) => {
    try {
      await ClientService.addRecord(id);
      fetchCourse();
    } catch (e) {
      setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    }
  };

  const studyCourse = course?.records.filter(
    (record) => record.psychologist?.user.id === authUser.id
  )[0];

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="py-10">
      <Alert
        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
        open={open || errorOpen}
      >
        {courseError || error}
      </Alert>
      {isCourseLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div className="px-20">
          <ArrowUturnLeftIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => router(-1)}
          />
          <div className="flex justify-center w-full py-5">
            <img
              src={course.photo.uri}
              alt={course.photo.name}
              className="max-h-[550px] w-full object-cover overflow-hidden object-center"
            />
          </div>
          <div className="text-4xl py-2 font-semibold text-black">
            {course.name}
          </div>
          <div className="py-2 italic">{course.description}</div>
          <Card className="text-black">
            <CardBody>
              <div className="py-1 mb-2 text-lg font-medium">
                Содержание курса
              </div>
              <div className="flex flex-col gap-1">
                {course.topics.map((topic, index) => {
                  const isStudied = topic?.progresses
                    .map((progress) => progress.psychologist.user.id)
                    .includes(authUser.id);
                  return (
                    <Link
                      to={
                        role === "admin"
                          ? `/topics/${course.topics.length}/${index}/${topic.id}`
                          : role === "" && studyCourse?.status === "activate"
                          ? `/topics/${course.topics.length}/${index}/${topic.id}`
                          : ""
                      }
                      key={topic.id}
                      className="flex items-center gap-2 hover:font-medium"
                    >
                      <div className="font-medium">{index + 1}.</div>
                      <div>{topic.name}</div>
                      {isStudied ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      ) : (
                        ""
                      )}
                    </Link>
                  );
                })}
              </div>
              {!studyCourse ? (
                <Button
                  variant="filled"
                  size="sm"
                  className="mt-6 rounded-none"
                  onClick={() =>
                    role === "admin"
                      ? router(`/topics/add/${course.id}`)
                      : addRecord(course.id)
                  }
                >
                  {role === "admin" ? "Добавить урок" : "Записаться на курс"}
                </Button>
              ) : role === "" && studyCourse ? (
                <div className="mt-5 font-medium">
                  {studyCourse.status === "waiting"
                    ? "Ожидайте решения администратора..."
                    : studyCourse.status === "activate"
                    ? "Доступ предоставлен"
                    : "К сожалению в доступе к курсу отказано."}
                </div>
              ) : (
                ""
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
