import '@babel/polyfill';

export default class Bar {
    constructor(value,width,barChart){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value*3}px`;
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
        this.value= val;
        this.label.innerHTML = val;
    }
}