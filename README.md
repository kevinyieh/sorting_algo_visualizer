# Sorting Algo Visualizer

## Overview

[Sorting Algo Visualizer](https://kevinyieh.github.io/sorting_algo_visualizer/) is an application that (surprise surprise) visualizes sorting algorithms. It is meant to assist people in understanding how sorting algorithms work. It's also just something really satisfying to watch at max speed and max buckets (checkout out the [app](https://kevinyieh.github.io/sorting_algo_visualizer/)) to see what I mean!

![Application Page](https://github.com/kevinyieh/sorting_algo_visualizer/blob/gh-pages/images/basic-application-photo.PNG "Application Page")

## Technologies
- Javascript to handle sorting logic and display
- Webpack for bundling files

## Features
1. Users can press the sort button to sort the bars
![Sorting Visualized](https://github.com/kevinyieh/sorting_algo_visualizer/blob/gh-pages/images/slow-sort-demo.gif "Sorting Visualized")

2. Users can play, pause, and reset the sorting animation
![Play, pause, and reset](https://github.com/kevinyieh/sorting_algo_visualizer/blob/gh-pages/images/play-pause-reset-demo.gif "Play, pause, and reset")

3. Users can adjust the speed while the algorithm sorts
![Adjusting speed](https://github.com/kevinyieh/sorting_algo_visualizer/blob/gh-pages/images/speed-adjusting-demo.gif "Adjusting speed")

## Code Snippets
The code snippet below is a method belonging to the class SortBase, which all sorting classes inherit from. This method swaps the values of two **Bar** objects and it does this by increasing the value of the smaller bar and decreasing the height of the larger bar in increments (calculated based on the current speed).

```javascript
async swap(bar1,bar2){
    let small; let big;
    if (bar1.value < bar2.value) {
        small = bar1; big = bar2;
    }else{
        small = bar2; big = bar1;
    }
    const diff = Math.max(Math.floor((big.value - small.value)*(this.speed)),1);
    const bigOriginal = big.value;
    const smallOriginal = small.value;
    small.node.classList.add("swapping");
    big.node.classList.add("swapping");
    while(small.value !== bigOriginal){
        if (small.value + diff >= bigOriginal){
            small.updateValue(bigOriginal);
            big.updateValue(smallOriginal);
        }else {
            small.updateValue(small.value + diff);
            big.updateValue(big.value - diff);
        }
        small.updateHeight();
        big.updateHeight();
        await this.nextFrame();
    }
    small.node.classList.remove("swapping");
    big.node.classList.remove("swapping");
    return null;
}  
```

The code snippet below is the sort method (which is a method required in all "sorting classes") for **BubbleSort**. Note how there is no actual swapping of any elements, but instead the swap method (see above) is invoked with 2 **Bar** instances, which is stored in this.elements. Also, notice the **if(this.forcedQuit) return**, which can be found in various points in all "sorting classes" to allow for pausing sorting methods.
```javascript
async sort() {
    for(let i = 0; i < this.elements.length; i++){
        let big = 0;
        for(let j = 1; j < this.elements.length - i; j ++){
            if(this.forcedQuit) return;
            await this.review(this.elements[big],this.elements[j]);
            if(this.elements[big].value > this.elements[j].value){
                await this.swap(this.elements[big],this.elements[j]);
            }
            this.unreview(this.elements[big],this.elements[j]);
            big = j;
        }
    }
    return this.elements;
}
```
