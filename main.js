status = "";
objects = [];

function setup(){
    canvas = createCanvas(500,500);
    canvas.position(700,300);

    video = createCapture(VIDEO);
    video.hide();
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0,0,500,500);

    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected!";

            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x +15,objects[i].y+15);
            fill("#990000");
            stroke("#990000");
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == Input){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_found").innerHTML = Input+" Found!";

                var synth = window.speechSynthesis;
                speak_data = Input+" found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML = Input+" Not Found!";
            }
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects!";
    Input = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}
