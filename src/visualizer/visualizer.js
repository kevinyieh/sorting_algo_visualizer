import '@babel/polyfill';
import Bar from "./bar";
import timeout from "../util/timeout";

export default class Visualizer {
    constructor(n){
        this.barChart = document.getElementById("bar-chart");
        this.barChart.style.height = "600px";
        this.barChart.style.width = "900px";
        this.resetElements(n);
        this.removeAllChildren = this.removeAllChildren.bind(this);
    }

    resetElements(n){
        if (n < 1 || n > 100) return null;
        this.removeAllChildren();
        this.elements = [];
        for(let i = 0; i < n; i++){
            const value = 10 + Math.floor(Math.random()*190);
            const width = (1/n)*100;
            this.elements.push(new Bar(value,width,this.barChart));
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