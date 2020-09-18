$(document).ready(function(){

    // hook up an event handler for the load button click
    // wait to initialize until the button is clicked

    // $("#initializeButton").click(function(){
      $(document).ready(function () {

        //disable the buttion after it has been clicked
        $("initializeButton").prop('disabled', true);

        tableau.extensions.initializeAsync().then(function(){

            //Initalization succeeded! Get the Dashboard
            //var dashboard = tableau.extensions.dashboardContent.dashboard;
            let dataSourceFetchPromises = [];

            // Maps dataSource id to dataSource so we can keep track of unique dataSources.
            let dashboardDataSources = {};
      
            // To get dataSource info, first get the dashboard.
            const dashboard = tableau.extensions.dashboardContent.dashboard;
      
            // Then loop through each worksheet and get its dataSources, save promise for later.
            dashboard.worksheets.forEach(function (worksheet) {
              dataSourceFetchPromises.push(worksheet.getDataSourcesAsync());
            });
      
            Promise.all(dataSourceFetchPromises).then(function (fetchResults) {
              fetchResults.forEach(function (dataSourcesForWorksheet) {
                dataSourcesForWorksheet.forEach(function (dataSource) {
                  if (!dashboardDataSources[dataSource.id]) { // We've already seen it, skip it.
                    dashboardDataSources[dataSource.id] = dataSource;
                  }
                });
              });
      
              // buildDataSourcesTable(dashboardDataSources);
      
              // This just modifies the UI by removing the loading banner and showing the dataSources table.
              $('#loading').addClass('hidden');
              $('#dataSourcesTable').removeClass('hidden').addClass('show');
            });

            // Display the name of the dashboard in the UI
            $("#resultBox").html("<h1>" + dashboard.name + "</h1>");
           
    //    Call to get the logical tables used by the worksheet
// dataSource.getLogicalTablesAsync().then(logicalTables => {
//     // Loop through each table in this data source
//     logicalTables.forEach( table => {
//       console.log(table.caption);
//       });
//   });
 //  After initialization, ask Tableau what sheets are available
    const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

    // Find a specific worksheet
    var worksheet = worksheets.find(function (sheet) {
      return sheet.name === "Name of Worksheet I want";
    });

    // Or iterate through the array of worksheets
    worksheets.forEach(function (worksheet) {
      //  process each worksheet...
      // get the summary data for the sheet
 worksheet.getSummaryDataAsync().then(function (sumdata) {

  const worksheetData = sumdata;
  // The getSummaryDataAsync() method returns a DataTable
  // Map the DataTable (worksheetData) into a format for display, etc.
console.log(worksheetData._data[0][0]._value, Math.round(worksheetData._data[0][1]._value/1000000));
google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
     [worksheetData._data[1][0]._value, Math.round(worksheetData._data[1][1]._value/1000000)],
     [worksheetData._data[0][0]._value, Math.round(worksheetData._data[0][1]._value/1000000)],
    [worksheetData._data[2][0]._value, Math.round(worksheetData._data[2][1]._value/1000000)]
   ]);

  // var data = google.visualization.arrayToDataTable([
  //   ['Label', 'Value'],
  //   ['Memory', 800],
  //   ['CPU', 550],
  //   ['Network', 680]
  // ]);
    // grab the CSV
  //  $.get("example.csv", function(csvString) {
 // transform the CSV string into a 2-dimensional array
//  var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});

 // this new DataTable object holds all the data
  //  var data = new google.visualization.arrayToDataTable(arrayData);
   var options = {
     width: 1200, height: 200,
     redFrom: 0, redTo: 50,
     yellowFrom:50, yellowTo: 200,
     max: 600,
     minorTicks: 10,
     majorTicks:['0', '100', '200', '300', '400', '500', '600']
   };

   var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

   chart.draw(data, options);
   console.log(data);
   
   //  data.setValue(0, 1,30);
   //  console.log(data);
     //chart.draw(data, options);
   
  // setInterval(function() {
    // data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
    // chart.draw(data, options);
  // }, 10000);
  // setInterval(function() {
    // data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
     //chart.draw(data, options);
   //}, 10000);
  // })  
}

 });
    });
     
        }, function(err){
            //something went wrong in initialization
            $("#resultBox").html("Error while Initializing: " + err.toString());
        });

        // function buildDataSourcesTable (dataSources) {
        //     // Clear the table first.
        //     $('#dataSourcesTable > tbody tr').remove();
        //     const dataSourcesTable = $('#dataSourcesTable > tbody')[0];
        
        //     // Add an entry to the dataSources table for each dataSource.
        //     for (let dataSourceId in dataSources) {
        //       const dataSource = dataSources[dataSourceId];
        
        //       let newRow = dataSourcesTable.insertRow(dataSourcesTable.rows.length);
        //       let nameCell = newRow.insertCell(0);
        //       let refreshCell = newRow.insertCell(1);
        //       let infoCell = newRow.insertCell(2);
        
        //       let refreshButton = document.createElement('button');
        //       refreshButton.innerHTML = ('Refresh Now');
        //       refreshButton.type = 'button';
        //       refreshButton.className = 'btn btn-primary';
        //       refreshButton.addEventListener('click', function () { refreshDataSource(dataSource); });
        
        //       let infoSpan = document.createElement('span');
        //       infoSpan.className = 'glyphicon glyphicon-info-sign';
        //       infoSpan.addEventListener('click', function () { showModal(dataSource); });
        
        //       nameCell.innerHTML = dataSource.name;
        //       refreshCell.appendChild(refreshButton);
        //       infoCell.appendChild(infoSpan);
        //     }
        //   }

        
    });

    
});