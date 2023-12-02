import { Button, Dialog, DialogBody, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import CourseForm from "./CourseForm";
import CourseItem from "./CourseItem";

const CourseList = ({
  filter,
  setFilter,
  courses,
  fetchCourses,
  deleteCourse,
  deleteFavouriteCourse,
  addFavouriteCourse,
  coursesType,
  role,
}) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [id, setId] = useState(null);
  const handleOpenDialog = () => setOpen(!open);
  return (
    <div className="h-full">
      <div className="text-center uppercase font-medium text-3xl mb-10">
        {coursesType === "favourite"
          ? "Избранное"
          : coursesType === "study"
          ? "Обучение"
          : "Курсы"}
      </div>
      <div className="flex flex-wrap justify-between items-center">
        <div className="w-[300px] py-1">
          <Input
            placeholder="Поиск"
            variant="static"
            className="!text-lg"
            value={filter.query}
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            crossOrigin={undefined}
          />
        </div>
        {role === "admin" ? (
          <div className="py-1">
            <Button
              variant="filled"
              className="rounded-none text-sm"
              onClick={() => {
                setOpen(true);
                setType("");
              }}
            >
              Добавить
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-wrap gap-3 justify-around mt-5">
        {courses?.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            setType={setType}
            setOpen={setOpen}
            setId={setId}
            deleteCourse={deleteCourse}
            deleteFavouriteCourse={deleteFavouriteCourse}
            addFavouriteCourse={addFavouriteCourse}
            role={role}
          />
        ))}
      </div>
      <Dialog
        open={open}
        handler={handleOpenDialog}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="sm"
      >
        <DialogBody>
          <CourseForm type={type} id={id} fetchCourses={fetchCourses} />
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default CourseList;
