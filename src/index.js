import Visualizer from "./visualizer/visualizer";
import bubbleSort from "./algos/bubble_sort";
import '@babel/polyfill';

document.addEventListener("DOMContentLoaded", () => {
    const barChart = document.getElementsByClassName("bar-chart")[0];
    barChart.style.height = "400px";
    barChart.style.width = "600px";
    const visualizer = new Visualizer(10,barChart);
    window.visualizer = visualizer;
    const sorter = new bubbleSort(visualizer.allElements(),visualizer.swap);
    setTimeout(sorter.sort,1000);
})

