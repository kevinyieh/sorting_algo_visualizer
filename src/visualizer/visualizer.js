import '@babel/polyfill';
import Bar from "./bar";
import barParams from "./bar_params";

export default class Visualizer {
    constructor(n){
        this.barChart = document.getElementById("bar-chart");
        this.barChart.style.height = "100%";
        this.maxVal = barParams.maxVal;
        this.minVal = barParams.minVal;
        this.resetElements(n);
        this.removeAllChildren = this.removeAllChildren.bind(this);
    }

    resetElements(n){
        if (n < 1 || n > 100) return null;
        this.removeAllChildren();
        this.elements = [];
        for(let i = 0; i < n; i++){
            const value = this.minVal + Math.floor(Math.random()*(this.maxVal-this.minVal));
            const width = (1/n)*100;
            this.elements.push(new Bar(value,width,this.barChart,this.maxVal));
        }
    }
    finished(){
        this.elements.forEach( bar => {
            bar.node.classList.add("finished");
        } )
    }
    removeAllChildren(){
        while(this.barChart.firstChild){
            this.barChart.removeChild(this.barChart.firstChild);
        }
    }
}