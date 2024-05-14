import {useMemo} from "react";

export const usePsychologists = (psychologists, query) => {
    const searchPsychologists = useMemo(() => {
        if (query) {
            return psychologists.filter(
                (psychologist) =>
                    psychologist.user.email.toLowerCase().includes(query.toLowerCase()) ||
                    psychologist.phone.toLowerCase().includes(query.toLowerCase()) ||
                    psychologist.name.toLowerCase().includes(query.toLowerCase()) ||
                    psychologist.surname.toLowerCase().includes(query.toLowerCase()) ||
                    psychologist.lastname.toLowerCase().includes(query.toLowerCase()) ||
                    (
                        psychologist.surname.toLowerCase() +
                        " " +
                        psychologist.name.toLowerCase() +
                        " " +
                        psychologist.lastname.toLowerCase()
                    ).includes(query.toLowerCase())
            );
        }
        return psychologists;
    }, [query, psychologists]);
    return searchPsychologists;
};
