import '@babel/polyfill';
import timeout from "../util/timeout";

export default class Sorter {
    constructor(viz){
        this.elements = viz.elements;
        this.speed = viz.speed;
    }
    async swap(bar1,bar2){
        let small; let big;
        if (bar1.value < bar2.value) {
            small = bar1; big = bar2;
        }else{
            small = bar2; big = bar1;
        }
        const diff = Math.max(Math.floor((big.value - small.value)*(this.speed)),1);
        small.node.classList.add("swapping");
        big.node.classList.add("swapping");
        this.swapHelp(small,
            big,
            diff,
            small.value,
            big.value)();
        await timeout(3000);
        return null;
    }  
    swapHelp(small,big,diff,smallOriginal,bigOriginal){
        return () => {
            if(small.value === bigOriginal ) {
                small.node.classList.remove("swapping");
                big.node.classList.remove("swapping");
                return null;
            }
            if (small.value + diff >= bigOriginal){
                small.value = bigOriginal;
                big.value = smallOriginal;
            }else {
                small.value += diff;
                big.value -= diff;
            }
            small.node.style.height = `${small.value*2}px`;
            big.node.style.height = `${big.value*2}px`;
            requestAnimationFrame(this.swapHelp(small,
                big,
                diff,
                smallOriginal,
                bigOriginal))
        }
    }
    async review(bar1,bar2){
        bar1.review(); bar2.review();
        await timeout(2000);
    }
    unreview(bar1,bar2){
        bar1.unreview(); bar2.unreview();
    }
    highlight(bar){
        bar.highlight();
    }
    unhighlight(bar){
        bar.unhighlight();
    }
}