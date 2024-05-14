import Test from "Components/Test";
import TopicForm from "Components/TopicForm";
import Analitics from "Pages/Analitics";
import CoursePage from "Pages/CoursePage";
import Courses from "Pages/Courses";
import Login from "Pages/Login";
import Psychologists from "Pages/Psychologists";
import Records from "Pages/Records";
import TopicPage from "Pages/TopicPage";
import React from "react";

export const publicRoutes = [{path: "/", element: <Login/>}];

export const adminRoutes = [
    {path: "/psychologists", element: <Psychologists/>},
    {path: "/courses", element: <Courses role="admin"/>},
    {path: "/records", element: <Records/>},
    {path: "/analitics", element: <Analitics/>},
    {path: "/courses/:id", element: <CoursePage role="admin"/>},
    {path: "/topics/:size/:index/:id", element: <TopicPage role="admin"/>},
    {path: "/topics/add/:courseId", element: <TopicForm/>},
    {path: "/topics/edit/:id/:courseId", element: <TopicForm type="edit"/>},
];

export const psychologistRoutes = [
    {path: "/courses", element: <Courses/>},
    {path: "/test", element: <Test/>},
    {path: "/courses/favourites", element: <Courses type="favourite"/>},
    {path: "/courses/study", element: <Courses type="study"/>},
    {path: "/courses/:id", element: <CoursePage/>},
    {path: "/topics/:size/:index/:id", element: <TopicPage/>},
];
