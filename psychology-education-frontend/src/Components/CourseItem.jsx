import {
  PencilSquareIcon,
  XCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "Hooks/useAuth";

const CourseItem = ({
  course,
  setType,
  setOpen,
  deleteCourse,
  deleteFavouriteCourse,
  addFavouriteCourse,
  setId,
  role,
}) => {
  const { authUser } = useAuth();
  return (
    <Card className="w-[450px] my-5">
      <CardHeader floated={false}>
        <Link to={`/courses/${course.id}`}>
          <img
            key={course.photo.name}
            src={course.photo.uri}
            alt={course.photo.name}
            className="h-[250px] w-[450px] object-cover overflow-hidden object-center"
          />
        </Link>
      </CardHeader>
      <CardBody>
        <Link to={`/courses/${course.id}`}>
          <div className="text-xl text-black font-semibold hover:text-gray-500">
            {course.name}
          </div>
        </Link>
        <div className="py-1">{course.description}</div>
        <div className="py-1 text-sm flex justify-end">
          {new Date(course.createdDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
        {role === "admin" ? (
          <div className="flex justify-between items-center">
            <div className="py-1">
              <PencilSquareIcon
                className="w-6 h-6 cursor-pointer !text-black"
                onClick={() => {
                  setType("edit");
                  setOpen(true);
                  setId(course.id);
                }}
              />
            </div>
            <div className="py-1">
              <XCircleIcon
                className="w-6 h-6 cursor-pointer !text-black"
                onClick={() => deleteCourse(course.id)}
              />
            </div>
          </div>
        ) : (
          <div className="py-1">
            {course.favourites
              .map((favourite) => favourite.psychologist?.user.id)
              .includes(authUser.id) ? (
              <HeartIcon
                className="w-8 h-8 text-red-700 cursor-pointer"
                onClick={() => deleteFavouriteCourse(course.id)}
              />
            ) : (
              <HeartIconOutline
                className="w-8 h-8 text-red-700 cursor-pointer"
                onClick={() => addFavouriteCourse(course.id)}
              />
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default CourseItem;
