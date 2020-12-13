 // JavaScript function that wraps everything and runs when DOM is ready

 $(document).ready(function() {

    function DateWithoutTime() {
        var date = new Date();
        date.setHours(0,0,0,0);

        return date;
    }

    var today = new Date();
    var currentDate = today.toDateString();
    var localDate = today.toLocaleDateString();
    //var currentHour24 = currentDate.getHours();

    console.log(currentDate);
    console.log(localDate);

    // add a day
    var nextDay = today.setDate(today.getDate() + 1);
    console.log(nextDay);
    
    var d = new Date();
    d.setDate(d.getDate() + 1);
    console.log(d);








 })    