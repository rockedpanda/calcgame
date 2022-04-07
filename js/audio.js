window.audio = {
  cache:{},
  types:['correct','wrong','good'],
  init:function(dom){
    console.log(dom);
    let fix = dom.canPlayType('audio/ogg') =='probably'?'.ogg':'.mp3';
    this.types.forEach((x)=>{
      fetch('./audio/'+x+fix).then(x=>x.blob()).then(t=>{
        this.cache[x] = t;
      });
    });
  },
  play:function(dom, type){
    dom.src = URL.createObjectURL(this.cache[type]);
    dom.play();
  }
};

window.result = {
  data:[],
  add:function(str, time, isCorrect){
    this.data.push([str,time,Date.now(),isCorrect?1:0].join(','));
    localStorage.setItem('results',this.data.join(';'));
    /* this.data.push({
      // start: time,
      // end: Date.now(),
      // str: str,
      // isCorrect: isCorrect
    }); */
  }
}