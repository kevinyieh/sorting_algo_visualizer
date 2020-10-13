import '@babel/polyfill';

export default class Bar {
    constructor(value,width,barChart){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value*2}px`;
        bar.style.width = `${width}%`;
        barChart.appendChild(bar);
        this.value = value;
        this.node = bar;
    }
    review(){
        this.node.classList.add("reviewing");
    }
    unreview(){
        this.node.classList.remove("reviewing");
    }
    highlight(){
        this.node.classList.add('highlight');
    }
    unhighlight(){
        this.node.classList.remove('highlight');
    }
}