import '@babel/polyfill';
import Bar from "./bar";
import timeout from "../util/timeout";

export default class Visualizer {
    constructor(n){
        this.barChart = document.getElementById("bar-chart");
        this.barChart.style.height = "400px";
        this.barChart.style.width = "600px";
        this.resetElements(n);
        this.speed = 0.03;
    }

    resetElements(n){
        if (n < 1 || n > 100) return null;
        this.elements = [];
        for(let i = 0; i < n; i++){
            const value = 10 + Math.floor(Math.random()*190);
            const width = (1/n)*100;
            this.elements.push(new Bar(value,width,this.barChart));
        }
    }
}


// this.swap = this.swap.bind(this);
// this.swapHelp = this.swapHelp.bind(this);
// this.review = this.review.bind(this);
// this.unreview = this.unreview.bind(this);
// this.highlight = this.highlight.bind(this);
// this.unhighlight = this.unhighlight.bind(this);


// async swap(i,j){
//     let small; let big;
//     if (this.elements[i].value < this.elements[j].value) {
//         small = i; big = j;
//     }else{
//         small = j; big = i;
//     }
//     const diff = Math.max(Math.floor((this.elements[big].value - this.elements[small].value)*(this.speed)),1);
//     this.elements[small].node.classList.add("swapping");
//     this.elements[big].node.classList.add("swapping");
//     this.swapHelp(small,
//         big,
//         diff,
//         this.elements[small].value,
//         this.elements[big].value)();
//     await timeout(2000);
//     return null;
// }  
// swapHelp(small,big,diff,smallOriginal,bigOriginal){
//     return () => {
//         if(this.elements[small].value === bigOriginal ) {
//             this.elements[small].node.classList.remove("swapping");
//             this.elements[big].node.classList.remove("swapping");
//             return null;
//         }
//         if (this.elements[small].value + diff >= bigOriginal){
//             this.elements[small].value = bigOriginal;
//             this.elements[big].value = smallOriginal;
//         }else {
//             this.elements[small].value += diff;
//             this.elements[big].value -= diff;
//         }
//         this.elements[small].node.style.height = `${this.elements[small].value*2}px`;
//         this.elements[big].node.style.height = `${this.elements[big].value*2}px`;
//         requestAnimationFrame(this.swapHelp(small,
//             big,
//             diff,
//             smallOriginal,
//             bigOriginal))
//     }
// }