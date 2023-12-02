import { useMemo } from "react";

export const useSortedRecords = (records, sort) => {
  const sortedRecords = useMemo(() => {
    if (sort.value) {
      if (sort.type === "asc") {
        return [...records].sort((a, b) =>
          a[sort.value].localeCompare(b[sort.value])
        );
      }
      return [...records].sort((a, b) =>
        b[sort.value].localeCompare(a[sort.value])
      );
    }
    return records;
  }, [sort, records]);
  return sortedRecords;
};

export const useSortedAndSerachedRecords = (records, sort, query) => {
  const sortedRecords = useSortedRecords(records, sort);
  const sortedAndSearchedRecords = useMemo(() => {
    if (query) {
      return sortedRecords.filter(
        (record) =>
          record.course?.name.toLowerCase().includes(query.toLowerCase()) ||
          record.psychologist?.user?.email
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          (
            record.psychologist?.surname +
            " " +
            record.psychologist?.name +
            " " +
            record.psychologist?.lastname
          )
            .toLowerCase()
            .includes(query.toLowerCase())
      );
    }
    return sortedRecords;
  }, [query, sortedRecords]);

  return sortedAndSearchedRecords;
};

export const useRecords = (records, sort, query, filter) => {
  const sortedAndSearchedRecords = useSortedAndSerachedRecords(
    records,
    sort,
    query
  );
  const sortedAndSearchedAndFilteredRecords = useMemo(() => {
    if (filter) {
      return sortedAndSearchedRecords.filter((record) =>
        record.status.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return sortedAndSearchedRecords;
  }, [filter, sortedAndSearchedRecords]);
  return sortedAndSearchedAndFilteredRecords;
};
