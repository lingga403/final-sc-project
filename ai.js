
  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/JX5Xu99X0/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    var cnv = createCanvas(520, 440);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    background(255, 0, 200);
    // Create the video
    video = createCapture(VIDEO);
    video.size(520, 440);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    if(label == "BAUT BAD")
    {
      fill('red')
    }
      else
      {
        fill('green')
      }
    fill(255);
    textSize(20);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }