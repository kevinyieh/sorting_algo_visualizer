import '@babel/polyfill';

export default class Bar {
    constructor(value,width,barChart,maxVal){
        let bar = document.createElement("div");
        this.maxVal = maxVal;
        bar.classList.add("bar");
        bar.style.height = `${(value/maxVal)*100}%`;
        bar.style.width = `${width}%`;
        barChart.appendChild(bar);
        this.label = document.createElement("div");
        this.label.classList.add("label");
        this.label.innerHTML = value;
        if (width > 5) bar.appendChild(this.label);
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
    updateValue(val){
        debugger;
        this.value= val;
        this.label.innerHTML = val;
        debugger;
    }
    updateHeight(){
        debugger;
        this.node.style.height = `${(this.value/this.maxVal)*100}%`;
        debugger;
    }
}