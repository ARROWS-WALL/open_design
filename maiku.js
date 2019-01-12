class Microphone {
constructor(){
    this.audioctx=null;
    this.audioctx=new AudioContext();
    this.analyser=new AnalyserNode(this.audioctx,{smoothingTimeConstant:0.5});
    this.gain=new GainNode(this.audioctx,{gain:10});
    navigator.mediaDevices.getUserMedia({audio:true,video:false})
    .then(
      (strm)=>{
        var audio = this.audioctx.createMediaStreamSource(strm);
        audio.connect(this.analyser).connect(this.gain).connect(this.audioctx.destination);
      },
      (err)=>{
        console.log(err);
      }
    );
    this.run=-1;
  }
  toggle(){
    if(this.run<0){
      document.getElementById("micbtn").innerHTML="On";
      this.run=1;
    }
    else {
      this.run^=1;
      var btn=document.getElementById("micbtn");
      btn.innerHTML=this.run?"On":"Off";
    }
  }
  getLevel(array){
    if(this.analyser){
      this.analyser.getByteFrequencyData(array);
	}
  }
}
document.addEventListener("DOMContentLoaded", function(event) {
	var mic;
	var arr=new Uint8Array(100);
	var meter = [];
	var value = this;
	mic = new Microphone();

	mic.getLevel(arr);
	var lev=[0,0,0];
	for(var i=0;i<33;++i){
		lev[0]+=arr[1+i]/33;
		lev[1]+=arr[34+i]/33;
		lev[2]+=arr[67+i]/33;
	}
//var Bass = lev[0]/256;
//var Middle = lev[1]/256;
//var Treble = lev[2]/256;

	for(var j=0;j<3;++j){
		meter[j]=lev[j]/256;
	}
	console.log(meter[0]);
	console.log(meter[1]);
	console.log(meter[2]);

	document.getElementById("one").innerHTML = meter[0];
	document.getElementById("two").innerHTML = meter[1];
	document.getElementById("thr").innerHTML = meter[2];
})

