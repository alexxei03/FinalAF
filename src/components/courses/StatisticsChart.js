import React from "react";
import ReactECharts from "echarts-for-react";
import "./css/StatisticsChart.css";

const StatisticsChart = () => {
    // 📊 Данные для роста студентов
    const studentsOption = {
        title: { text: "Рост студентов", left: "center" },
        tooltip: { trigger: "axis" },
        xAxis: { type: "category", data: ["Январь", "Февраль", "Март", "Апрель", "Май"] },
        yAxis: { type: "value" },
        series: [
            {
                name: "Студенты",
                type: "bar",
                data: [120, 150, 170, 190, 220],
                color: "#1f77b4",
                barWidth: "50%",
            },
        ],
    };

    // 📈 Данные для количества курсов
    const coursesOption = {
        title: { text: "Количество курсов", left: "center" },
        tooltip: { trigger: "axis" },
        xAxis: { type: "category", data: ["Январь", "Февраль", "Март", "Апрель", "Май"] },
        yAxis: { type: "value" },
        series: [
            {
                name: "Курсы",
                type: "line",
                data: [15, 18, 20, 25, 30],
                color: "#ff7f0e",
                smooth: true,
            },
        ],
    };

    // 🥧 Данные для категорий курсов
    const categoryOption = {
        title: { text: "Категории курсов", left: "center" },
        tooltip: { trigger: "item" },
        series: [
            {
                name: "Категории",
                type: "pie",
                radius: "50%",
                data: [
                    { value: 50, name: "Программирование" },
                    { value: 30, name: "Дизайн" },
                    { value: 20, name: "Маркетинг" },
                ],
                emphasis: {
                    itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0, 0, 0, 0.5)" },
                },
            },
        ],
    };

    return (
        <div className="statistics-charts">
            <div className="chart-box">
                <ReactECharts option={studentsOption} style={{ height: "300px" }} />
            </div>
            <div className="chart-box">
                <ReactECharts option={coursesOption} style={{ height: "300px" }} />
            </div>
            <div className="chart-box">
                <ReactECharts option={categoryOption} style={{ height: "300px" }} />
            </div>
        </div>
    );
};

export default StatisticsChart;
