import { Alert, Spinner } from "@material-tailwind/react";
import AdminService from "API/AdminService";
import PsychologistTable from "Components/PsychologistTable";
import { useFetching } from "Hooks/useFetching";
import { usePsychologists } from "Hooks/usePsychologists";
import React, { useEffect, useState } from "react";

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
          <Spinner />
        </div>
      ) : (
        <PsychologistTable
          psychologists={searchAndFilterPsychologists}
          deletePsychologist={deletePsychologist}
          setFilter={setFilter}
          filter={filter}
          fetchPsycho={fetchPsycho}
        />
      )}
    </div>
  );
};

export default Psychologists;
