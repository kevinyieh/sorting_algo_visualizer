import '@babel/polyfill';
export default class Visualizer {
    constructor(n,barChart){
        this.barChart = barChart;
        this.resetElements(n);
        this.speed = 0.03;
        this.swap = this.swap.bind(this);
        this.swapHelp = this.swapHelp.bind(this);
    }
    allElements(){
        return this.elements.map( obj => obj.value);
    }

    resetElements(n){
        if (n < 1 || n > 100) return null;
        this.elements = [];
        for(let i = 0; i < n; i++){
            let bar = document.createElement("div");
            bar.classList.add("bar");
            const value = 10 + Math.floor(Math.random()*190);
            bar.style.height = `${value*2}px`;
            bar.style.width = `${(1/n)*100}%`;
            this.barChart.appendChild(bar);
            this.elements.push({
                value,
                node: bar 
            });
        }
    }
    // swap(i,j){
    //     return () => {
    //         const temp = this.elements[j].value;
    //         this.elements[j].value = this.elements[i].value
    //         this.elements[i].value = temp;
    //         this.elements[j].node.style.height = `${this.elements[j].value*2}px`;
    //         this.elements[i].node.style.height = `${this.elements[i].value*2}px`;
    //     }
    // }
    async swap(i,j,animationHasStopped){
        let small; let big;
        if (this.elements[i].value < this.elements[j].value) {
            small = i; big = j;
        }else{
            small = j; big = i;
        }
        const diff = Math.floor((this.elements[big].value - this.elements[small].value)*(this.speed));
        this.elements[small].node.classList.add("swapping");
        this.elements[big].node.classList.add("swapping");
        await this.swapHelp(small,
            big,
            diff,
            this.elements[small].value,
            this.elements[big].value,
            animationHasStopped)();
        return null;
    }  
    swapHelp(small,big,diff,smallOriginal,bigOriginal,animationHasStopped){
        return () => {
            if(this.elements[small].value === bigOriginal ) {
                this.elements[small].node.classList.remove("swapping");
                this.elements[big].node.classList.remove("swapping");
                animationHasStopped();
                return null;
            }
            if (this.elements[small].value + diff >= bigOriginal){
                this.elements[small].value = bigOriginal;
                this.elements[big].value = smallOriginal;
            }else {
                this.elements[small].value += diff;
                this.elements[big].value -= diff;
            }
            this.elements[small].node.style.height = `${this.elements[small].value*2}px`;
            this.elements[big].node.style.height = `${this.elements[big].value*2}px`;
            requestAnimationFrame(this.swapHelp(small,
                big,
                diff,
                smallOriginal,
                bigOriginal,
                animationHasStopped))
        }
    }
}