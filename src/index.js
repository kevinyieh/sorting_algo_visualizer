import Visualizer from "./visualizer/visualizer";
import bubbleSort from "./algos/bubble_sort";
import mergeSort from "./algos/merge_sort";
import quickSort from "./algos/quick_sort";
import heapSort from "./algos/heap_sort";
import insertionSort from "./algos/insertion_sort";
import Nav from "./nav/nav";
import '@babel/polyfill';

document.addEventListener("DOMContentLoaded", () => {
    const visualizer = new Visualizer(10);
    window.visualizer = visualizer;
    const sorter = new mergeSort(visualizer);
    const nav = new Nav({
        "Bubble Sort": bubbleSort,
        "Merge Sort": mergeSort,
        "Quick Sort": quickSort,
        "Heap Sort": heapSort,
        "Insertion Sort": insertionSort
    }, visualizer);
})

