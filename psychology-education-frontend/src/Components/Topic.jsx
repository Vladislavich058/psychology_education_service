import {
  PencilSquareIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Spinner,
} from "@material-tailwind/react";
import AdminService from "API/AdminService";
import ClientService from "API/ClientService";
import { useAuth } from "Hooks/useAuth";
import { useFetching } from "Hooks/useFetching";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Topic = ({ role = "" }) => {
  const params = useParams();
  const [error, setError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [topic, setTopic] = useState({
    id: null,
    name: "",
    description: "",
    course: null,
    progresses: [],
  });
  const {
    fetching: fetchTopic,
    isLoading: isTopicLoading,
    error: courseError,
    errorOpen: open,
  } = useFetching(async () => {
    let response = {};
    if (role === "admin") {
      response = await AdminService.getTopicById(params.id);
    } else {
      response = await ClientService.getTopicById(params.id);
    }
    setTopic(response.data);
  });
  const router = useNavigate();

  const deleteTopic = async (id) => {
    try {
      await AdminService.deleteTopic(id);
      router(`/courses/${topic.course}`);
    } catch (e) {
      setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    }
  };

  const addProgress = async (id) => {
    try {
      await ClientService.addProgress(id);
      fetchTopic();
    } catch (e) {
      setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    }
  };
  const { authUser } = useAuth();
  const isStudied = topic?.progresses
    .map((progress) => progress.psychologist.user.id)
    .includes(authUser.id);

  useEffect(() => {
    fetchTopic();
  }, [params.id]);

  return (
    <div>
      <Alert
        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
        open={open || errorOpen}
      >
        {courseError || error}
      </Alert>
      {isTopicLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <div>
          <Card className="text-black">
            <CardBody>
              {role === "admin" ? (
                <div className="flex justify-end gap-5 items-center">
                  <div className="py-1">
                    <PencilSquareIcon
                      className="w-6 h-6 cursor-pointer !text-black"
                      onClick={() =>
                        router(`/topics/edit/${topic.id}/${topic.course}`)
                      }
                    />
                  </div>
                  <div className="py-1">
                    <XCircleIcon
                      className="w-6 h-6 cursor-pointer !text-black"
                      onClick={() => deleteTopic(topic.id)}
                    />
                  </div>
                </div>
              ) : isStudied ? (
                <div className="flex justify-end">
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                </div>
              ) : (
                ""
              )}
              <div className="text-4xl py-2 font-semibold text-black">
                {topic.name}
              </div>
              <div
                className="py-2"
                dangerouslySetInnerHTML={{ __html: topic.description }}
              />
            </CardBody>
            <CardFooter className="flex justify-between items-center">
              <Link to={`/courses/${topic.course}`} className="italic">
                Вернуться к курсу...
              </Link>
              {role === "" && !isStudied ? (
                <Button
                  variant="filled"
                  size="sm"
                  className="mt-6 rounded-none"
                  onClick={() => addProgress(topic.id)}
                >
                  Изучил
                </Button>
              ) : (
                ""
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Topic;
