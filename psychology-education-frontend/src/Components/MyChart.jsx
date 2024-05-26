import React from "react";
import {Bar} from "react-chartjs-2";
import {Chart, registerables} from "chart.js";

Chart.register(...registerables);

const MyChart = ({xValues, yValues, label, xTitle, yTitle, maxTips}) => {
    const data = {
        labels: xValues,
        datasets: [
            {
                label: label,
                backgroundColor: "rgba(0,0,0,0.2)",
                borderColor: "rgba(0,0,0,0.7)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(0,0,0,0.5)",
                hoverBorderColor: "rgba(0,0,0,1)",
                data: yValues,
            },
        ],
    };
    return (
        <div className="h-[70vh] w-full">
            <Bar
                data={data}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: yTitle,
                                color: "black",
                            },
                            ticks: {
                                stepSize: 1,
                                maxTicksLimit: maxTips,
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: xTitle,
                                color: "black",
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default MyChart;
