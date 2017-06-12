
  
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDPp5lQ8lTRiRTlP1malNfwHzFDFobcsNc",
    authDomain: "train-scheduler-3c096.firebaseapp.com",
    databaseURL: "https://train-scheduler-3c096.firebaseio.com",
    projectId: "train-scheduler-3c096",
    storageBucket: "train-scheduler-3c096.appspot.com",
    messagingSenderId: "696821977931"
  };
  firebase.initializeApp(config);
 var database = firebase.database();

 var trainName = "";
 var destination = "";
 var arrival = "";
 var frequency = 0;
 var away = "";


$("#addTrain").on("click", function(){



  trainName = $("#name").val().trim();
  destination = $("#destination").val().trim();
  arrival = $("#arrival").val().trim();
  frequency = $("#frequency").val().trim();
  away = $("#away").val().trim();

  
  database.ref("/trains").push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        arrival: arrival,
        away: away,

       

      });

    
});

    database.ref("/trains").on("child_added", function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().frequency);
      console.log(snapshot.val().arrival);


  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  arrival = snapshot.val().arrival;
  frequency = snapshot.val().frequency;


var utcDate = moment.utc('2017-06-12 19:27:09Z');
var localDate = utcDate.local();

  var firstTrainMoment = moment(arrival, "HH:mm");
  var nowMoment = moment(); 

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, "minutes");
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var awayTrain = frequency - minutesSinceLastArrival;

  var arrivalTrain = nowMoment.add(away, "minutes");
  var formatNextArrival = arrivalTrain.format("HH:mm");




  // add to the table
  var tr = $("<tr>");
  var a = $("<td>");
  var b = $("<td>");
  var c = $("<td>");
  var d = $("<td>");
  var e = $("<td>");
  a.append(trainName);
  b.append(destination);
  c.append(arrival);
  d.append(frequency);
  e.append(awayTrain);
  tr.append(a).append(b).append(c).append(d).append(e);
  $("#newTrains").append(tr);


    // Handle the errors
   
  }, function (errorObject) {

  // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);

});






    