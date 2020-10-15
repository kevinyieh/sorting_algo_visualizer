import * as DOMUtil from "../util/dom_util";
export default class Nav {
    constructor(algos,visualizer){
        this.visualizer = visualizer;
        this.defaultBuckets = 10;
        this.speed = 0.1;
        this.algos = algos;
        this.nav = document.getElementById("nav");

        this.navLinks = document.createElement("div");
        this.navLinks.classList.add("nav-links");
        this.nav.appendChild(this.navLinks);

        this.controls = document.createElement("div");
        this.controls.classList.add("controls");
        this.nav.appendChild(this.controls);

        this.description = document.createElement("div");
        this.description.classList.add("description");
        this.nav.appendChild(this.description);
        
        this.setupAlgos = this.setupAlgos.bind(this);
        this.changeAlgo = this.changeAlgo.bind(this);
        this.handleRemote = this.handleRemote.bind(this);
        this.updateBuckets = this.updateBuckets.bind(this);
        this.updateSpeed = this.updateSpeed.bind(this);
        this.play = this.play.bind(this);

        this.setupLinks();
        this.setupControls();
        this.setupDescription();
    }

    setupLinks() {
        this.githubLink = document.createElement("a");
        this.githubIcon = document.createElement("i");
        this.githubIcon.classList.add("fab","fa-github");
        this.githubLink.appendChild(this.githubIcon);
        DOMUtil.setAttributes(this.githubLink,{href: "https://github.com/kevinyieh/sorting_algo_visualizer"})
        this.navLinks.appendChild(this.githubLink);
    }

    setupControls(){
        const sliderContainer = document.createElement("div");
        sliderContainer.classList.add("sliders-container");
        this.setupSpeedSlider(sliderContainer);
        this.setupQuantitySlider(sliderContainer);
        
        this.controls.appendChild(sliderContainer);

        this.controls.appendChild(this.separator());
        this.setupAlgos();
        this.controls.appendChild(this.separator());
        this.setupRemote();
        document.addEventListener("mousedown",this.changeAlgo);
        document.addEventListener("mousedown",this.handleRemote);
    }
    setupSpeedSlider(sliderContainer){
        this.speedSliderContainer = document.createElement("div");
        this.speedSliderContainer.classList.add("speed-slider-container");
        const speedSliderLabel = document.createElement("label");
        speedSliderLabel.innerHTML = "Speed ";
        this.speedSlider = document.createElement("input");
        DOMUtil.setAttributes(this.speedSlider,{type: "range", min: "1", max:"100", value: `${this.speed * 100}`, class:"speed-slider"});
        speedSliderLabel.appendChild(this.speedSlider);
        this.speedSliderContainer.appendChild(speedSliderLabel);
        sliderContainer.appendChild(this.speedSliderContainer);

        this.speedSlider.addEventListener("change",this.updateSpeed);
    }

    setupQuantitySlider(sliderContainer){
        this.quantitySliderContainer = document.createElement("div");
        this.quantitySliderContainer.classList.add("quantity-slider-container");
        const quantitySliderLabel = document.createElement("label");
        quantitySliderLabel.innerHTML = "Buckets ";
        this.quantitySlider = document.createElement("input");
        DOMUtil.setAttributes(this.quantitySlider,{type: "range", min: "6", max:"100", value: `${this.defaultBuckets}`, class:"quantity-slider"});
        quantitySliderLabel.appendChild(this.quantitySlider);
        this.quantitySliderContainer.appendChild(quantitySliderLabel);
        sliderContainer.appendChild(this.quantitySliderContainer);

        this.quantitySlider.addEventListener("change",this.updateBuckets)
    }
    setupAlgos(){
        this.algoList = document.createElement("div");
        this.algoList.classList.add("algo-list");
        Object.keys(this.algos).forEach( (algo,i) => {
            const algoItem = document.createElement("div");
            algoItem.innerHTML = algo;
            algoItem.classList.add("algo-item");
// ADD NODE TO ALGO PROP
            this.algos[algo] = Object.assign({sorter:this.algos[algo]},{node: algoItem});
// SELECT INITIAL ALGO
            if(i === 0){
                algoItem.classList.add("selected");
                this.currentAlgo = this.algos[algo];
            } 
            this.algoList.appendChild(algoItem);
        })
        this.controls.appendChild(this.algoList);
    }

    setupRemote() {
        this.remote = document.createElement("div");
        this.remote.classList.add("remote");

        this.playButtonContainer = document.createElement("div");
        this.playButtonContainer.classList.add("play-container");
        this.playButton = document.createElement("i");
        this.playButton.classList.add("fas","fa-play");
        this.playButtonContainer.appendChild(this.playButton);

        this.resetButtonContainer = document.createElement("div");
        this.resetButtonContainer.classList.add("reset-container");
        this.resetButton = document.createElement("i");
        this.resetButton.classList.add("fas","fa-sync-alt");
        this.resetButtonContainer.appendChild(this.resetButton);

        this.pauseButtonContainer = document.createElement("div");
        this.pauseButtonContainer.classList.add("pause-container");
        this.pauseButton = document.createElement("i");
        this.pauseButton.classList.add("fas","fa-stop");
        this.pauseButtonContainer.appendChild(this.pauseButton);

        this.remote.appendChild(this.playButtonContainer);
        this.remote.appendChild(this.pauseButtonContainer);
        this.remote.appendChild(this.resetButtonContainer);

        this.controls.appendChild(this.remote);
    }

    setupDescription(){
        this.descriptionTitle = document.createElement("h3");
        this.descriptionTitle.innerHTML = "Brief Description"
        this.descriptionBody = document.createElement("p");
        this.descriptionBody.classList.add("description-body");
        const temp = new this.currentAlgo.sorter(this.visualizer,this.speed);
        this.descriptionBody.innerHTML = temp.describe();
        this.description.appendChild(this.descriptionTitle);
        this.description.appendChild(this.descriptionBody);
    }

    updateSpeed(e){
        this.speed = parseInt(e.target.value)/100;
        if (this.sorter) this.sorter.updateSpeed(parseInt(e.target.value)/100);
    }
    updateBuckets(e){
        if (this.sorter) {
            this.sorter.forceQuit();
            this.sorter = null;
        }
        this.visualizer.resetElements(parseInt(parseInt(e.target.value)));
    }
    changeDescription(){
        const temp = new this.currentAlgo.sorter(this.visualizer,this.speed);
        this.descriptionBody.innerHTML = temp.describe();
    }
    changeAlgo(e){
        const classNames = e.target.className.split(" ")
        if(classNames.includes("algo-item") && !classNames.includes("selected")){
            if (this.sorter) {
                this.sorter.forceQuit();
                this.sorter = null;
            }
            this.currentAlgo.node.classList.toggle("selected");
            this.currentAlgo = this.algos[e.target.innerHTML];
            this.currentAlgo.node.classList.toggle("selected");
            this.changeDescription();
        }
    }
    handleRemote(e){
        switch(e.target){
            case this.playButton:
                this.play();
                break;
            case this.resetButton:
                if (this.sorter) {
                    this.sorter.forceQuit();
                    this.sorter = null;
                };
                this.visualizer.resetElements(this.quantitySlider.value);
                break;
            case this.pauseButton:
                if (this.sorter) {
                    this.sorter.forceQuit();
                    this.sorter = null;
                };
                break;
            default:
                break;
        }
    }
    play(){
        if (this.sorter) return;
        this.sorter = new this.currentAlgo.sorter(visualizer,this.speed);
        this.sorter.sort().then(() => {
            if(this.sorter) visualizer.finished();
            this.sorter = null;
        });
    }
    separator(){
        const sep = document.createElement("div");
        sep.classList.add("separator")
        return sep;
    }
}