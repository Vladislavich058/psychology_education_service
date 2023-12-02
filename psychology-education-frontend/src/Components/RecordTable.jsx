import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { IconButton, Input, Option, Select } from "@material-tailwind/react";
import React from "react";
import RecordRow from "./RecordRow";

const RecordTable = ({
  records,
  activateRecord,
  blockRecord,
  setFilter,
  filter,
}) => {
  const TABLE_HEAD = ["Курс", "Email", "ФИО", "Дата", "Статус", ""];
  const sorts = [
    { label: "Без сортировки", value: "" },
    { label: "По дате", value: "createdDateTime" },
  ];
  const filters = [
    { label: "Без фильтрации", value: "" },
    { label: "В обработке", value: "waiting" },
    { label: "Одобрены", value: "activate" },
    { label: "Заблокированы", value: "block" },
  ];
  return (
    <div className="h-full">
      <div className="text-center uppercase font-medium text-3xl mb-10">
        Записи на курсы
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
        <div className="flex items-end gap-2">
          <div className="w-[250px]">
            <Select
              variant="static"
              className="text-lg text-black"
              value={filter.sort.value}
              onChange={(value) =>
                setFilter({ ...filter, sort: { ...filter.sort, value: value } })
              }
            >
              {sorts.map((sort) => (
                <Option
                  key={sort.label}
                  value={sort.value}
                  className="text-lg text-black"
                >
                  {sort.label}
                </Option>
              ))}
            </Select>
          </div>
          <IconButton
            variant="text"
            onClick={() =>
              filter.sort.type === "asc"
                ? setFilter({
                    ...filter,
                    sort: { ...filter.sort, type: "desc" },
                  })
                : setFilter({
                    ...filter,
                    sort: { ...filter.sort, type: "asc" },
                  })
            }
          >
            <AdjustmentsHorizontalIcon strokeWidth={2} className="h-6 w-6" />
          </IconButton>
        </div>
        <div className="flex items-end gap-2">
          <div className="w-[250px]">
            <Select
              variant="static"
              className="text-lg text-black"
              value={filter.filter}
              onChange={(value) => setFilter({ ...filter, filter: value })}
            >
              {filters.map((filter) => (
                <Option
                  key={filter.label}
                  value={filter.value}
                  className="text-lg text-black"
                >
                  {filter.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <table className="w-full min-w-max table-auto text-center mt-10">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 px-8 py-4"
              >
                <div className="font-normal leading-none opacity-70">
                  {head}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((record, index) => {
              const isLast = index === records.length - 1;
              const classes = isLast
                ? "px-8 py-4"
                : "px-8 py-4 border-b border-blue-gray-50";

              return (
                <RecordRow
                  key={index}
                  classes={classes}
                  record={record}
                  blockRecord={blockRecord}
                  activateRecord={activateRecord}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
