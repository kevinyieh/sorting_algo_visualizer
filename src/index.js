import Visualizer from "./visualizer/visualizer";
import BubbleSort from "./algos/bubble_sort";
import MergeSort from "./algos/merge_sort";
import QuickSort from "./algos/quick_sort";
import HeapSort from "./algos/heap_sort";
import InsertionSort from "./algos/insertion_sort";
import CocktailSort from "./algos/cocktail_sort";
import Nav from "./nav/nav";
import '@babel/polyfill';

document.addEventListener("DOMContentLoaded", () => {
    const visualizer = new Visualizer(10);
    window.visualizer = visualizer;
    const nav = new Nav({
        "Bubble": BubbleSort,
        "Merge": MergeSort,
        "Quick": QuickSort,
        "Heap": HeapSort,
        "Insertion": InsertionSort,
        "Cocktail": CocktailSort
    }, visualizer);
})

