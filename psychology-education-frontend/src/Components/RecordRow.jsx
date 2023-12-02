import { Button } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const RecordRow = ({ classes, record, blockRecord, activateRecord }) => {
  return (
    <tr>
      <td className={classes}>
        <Link to={`/courses/${record.course.id}`}>
          <div className="flex justify-center cursor-pointer">
            <img
              className="w-[200px] object-cover overflow-hidden object-center h-[100px]"
              src={record.course?.photo.uri}
              alt={record.course?.photo.name}
            />
          </div>
          <div className="font-medium mt-2">{record.course?.name}</div>
        </Link>
      </td>
      <td className={classes}>{record.psychologist?.user?.email}</td>
      <td className={classes}>
        {record.psychologist?.surname} {record.psychologist?.name}{" "}
        {record.psychologist?.lastname}
      </td>
      <td className={classes}>
        {new Date(record.createdDateTime).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td className={classes}>
        {record.status === "waiting"
          ? "В обработке"
          : record.status === "activate"
          ? "Доступ разрешен"
          : "Отклонен"}
      </td>
      <td className={classes}>
        <Button
          variant="outlined"
          className="rounded-none text-black block mb-1"
          size="sm"
          onClick={() => blockRecord(record.id)}
        >
          Отклонить
        </Button>
        <Button
          variant="outlined"
          className="rounded-none text-black block"
          size="sm"
          onClick={() => activateRecord(record.id)}
        >
          Разрешить
        </Button>
      </td>
    </tr>
  );
};

export default RecordRow;
