import {DefaultStepper} from "Components/DefaultStepper";
import Topic from "Components/Topic";
import React from "react";
import {useParams} from "react-router-dom";

const TopicPage = ({role = ""}) => {
    const params = useParams();
    return (
        <div className="py-10 px-20">
            <Topic role={role}/>
            <DefaultStepper
                size={params.size}
                activeIndex={params.index}
                activeId={params.id}
            />
        </div>
    );
};

export default TopicPage;
