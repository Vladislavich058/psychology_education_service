import { Alert, Spinner } from "@material-tailwind/react";
import AdminService from "API/AdminService";
import PsychologistTable from "Components/PsychologistTable";
import RecordTable from "Components/RecordTable";
import { useFetching } from "Hooks/useFetching";
import { usePsychologists } from "Hooks/usePsychologists";
import { useRecords } from "Hooks/useRecords";
import React, { useEffect, useState } from "react";

const Records = () => {
  const [records, setRecords] = useState([]);
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

  const searchAndFilterRecords = useRecords(
    records,
    filter.sort,
    filter.query,
    filter.filter
  );

  const {
    fetching: fetchRecords,
    isLoading: isRecordsLoading,
    error: recrodsError,
    errorOpen: open,
  } = useFetching(async () => {
    const response = await AdminService.getRecords();
    setRecords(response.data);
  });

  const activateRecords = async (id) => {
    try {
      await AdminService.activateRecords(id);
      fetchRecords();
    } catch (e) {
      setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    }
  };

  const blockRecords = async (id) => {
    try {
      await AdminService.blockRecords(id);
      fetchRecords();
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
    fetchRecords();
  }, []);

  return (
    <div className="py-10">
      <Alert
        className="my-1 mt-5 rounded-none font-medium text-xl bg-red-100 text-red-500"
        open={open || errorOpen}
      >
        {recrodsError || error}
      </Alert>
      {isRecordsLoading ? (
        <div className="flex justify-center mt-12">
          <Spinner />
        </div>
      ) : (
        <RecordTable
          records={searchAndFilterRecords}
          activateRecord={activateRecords}
          blockRecord={blockRecords}
          setFilter={setFilter}
          filter={filter}
        />
      )}
    </div>
  );
};

export default Records;
