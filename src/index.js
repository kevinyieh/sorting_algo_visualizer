import Visualizer from "./visualizer/visualizer";
import bubbleSort from "./algos/bubble_sort";
import mergeSort from "./algos/merge_sort";
import '@babel/polyfill';

document.addEventListener("DOMContentLoaded", () => {
    const visualizer = new Visualizer(10);
    window.visualizer = visualizer;
    const sorter = new mergeSort(visualizer);
    // const sorter = new bubbleSort(visualizer);
    // console.log(sorter.sort());
    sorter.sort();
})

