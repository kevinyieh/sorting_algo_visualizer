import '@babel/polyfill';
import timeout from "../util/timeout";

export default class Sorter {
    constructor(viz,speed){
        this.elements = viz.elements;
        this.speed = speed;
        this.finished = viz.finished;
        this.forcedQuit = false;
    }
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

    async nextFrame() {
        return new Promise(resolve => {
            requestAnimationFrame(resolve);
        })
    }
    async review(bar1,bar2){
        bar1.review(); bar2.review();
        await timeout(200*(1-this.speed)**2+10);
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
    updateSpeed(newSpeed){
        this.speed = newSpeed;
    }
    forceQuit(){
        this.forcedQuit = true;
    }
}