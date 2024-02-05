/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 108.0, "series": [{"data": [[300.0, 6.0], [100.0, 78.0], [400.0, 15.0], [500.0, 21.0]], "isOverall": false, "label": "Get Cats-5", "isController": false}, {"data": [[400.0, 26.0], [100.0, 81.0], [500.0, 13.0]], "isOverall": false, "label": "Get Reptiles-0", "isController": false}, {"data": [[300.0, 1.0], [100.0, 88.0], [400.0, 15.0], [500.0, 16.0]], "isOverall": false, "label": "Get Cats-4", "isController": false}, {"data": [[100.0, 84.0], [400.0, 21.0], [500.0, 15.0]], "isOverall": false, "label": "Get Reptiles-1", "isController": false}, {"data": [[400.0, 15.0], [100.0, 86.0], [200.0, 1.0], [500.0, 18.0]], "isOverall": false, "label": "Get Cats-3", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [100.0, 81.0], [400.0, 16.0], [500.0, 19.0]], "isOverall": false, "label": "Get Reptiles-2", "isController": false}, {"data": [[300.0, 1.0], [400.0, 12.0], [100.0, 93.0], [500.0, 14.0]], "isOverall": false, "label": "Get Cats-2", "isController": false}, {"data": [[100.0, 88.0], [400.0, 14.0], [200.0, 1.0], [500.0, 17.0]], "isOverall": false, "label": "Get Cats-1", "isController": false}, {"data": [[100.0, 93.0], [400.0, 12.0], [500.0, 15.0]], "isOverall": false, "label": "Get Cats-0", "isController": false}, {"data": [[600.0, 5.0], [700.0, 1.0], [400.0, 42.0], [800.0, 4.0], [100.0, 2.0], [500.0, 66.0]], "isOverall": false, "label": "Get Reptiles-7", "isController": false}, {"data": [[600.0, 3.0], [700.0, 3.0], [400.0, 55.0], [100.0, 2.0], [500.0, 57.0]], "isOverall": false, "label": "Get Reptiles-8", "isController": false}, {"data": [[600.0, 4.0], [700.0, 1.0], [400.0, 53.0], [100.0, 2.0], [900.0, 1.0], [500.0, 59.0]], "isOverall": false, "label": "Get Reptiles-9", "isController": false}, {"data": [[300.0, 3.0], [100.0, 86.0], [400.0, 16.0], [500.0, 15.0]], "isOverall": false, "label": "Get Reptiles-3", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0], [100.0, 80.0], [400.0, 23.0], [500.0, 14.0]], "isOverall": false, "label": "Get Reptiles-4", "isController": false}, {"data": [[600.0, 1.0], [300.0, 7.0], [700.0, 1.0], [100.0, 67.0], [400.0, 26.0], [800.0, 1.0], [500.0, 17.0]], "isOverall": false, "label": "Get Reptiles-5", "isController": false}, {"data": [[600.0, 4.0], [300.0, 13.0], [100.0, 67.0], [400.0, 18.0], [500.0, 18.0]], "isOverall": false, "label": "Get Reptiles-6", "isController": false}, {"data": [[300.0, 2.0], [100.0, 93.0], [400.0, 14.0], [500.0, 11.0]], "isOverall": false, "label": "Cart Details-2", "isController": false}, {"data": [[100.0, 94.0], [400.0, 12.0], [500.0, 14.0]], "isOverall": false, "label": "Cart Details-1", "isController": false}, {"data": [[100.0, 93.0], [400.0, 11.0], [500.0, 16.0]], "isOverall": false, "label": "Cart Details-0", "isController": false}, {"data": [[300.0, 10.0], [600.0, 1.0], [700.0, 1.0], [400.0, 17.0], [100.0, 75.0], [800.0, 1.0], [500.0, 15.0]], "isOverall": false, "label": "Cart Details-6", "isController": false}, {"data": [[600.0, 3.0], [300.0, 2.0], [100.0, 80.0], [400.0, 16.0], [500.0, 19.0]], "isOverall": false, "label": "Cart Details-5", "isController": false}, {"data": [[300.0, 1.0], [400.0, 19.0], [100.0, 90.0], [500.0, 10.0]], "isOverall": false, "label": "Cart Details-4", "isController": false}, {"data": [[100.0, 86.0], [400.0, 15.0], [500.0, 19.0]], "isOverall": false, "label": "Cart Details-3", "isController": false}, {"data": [[600.0, 5.0], [700.0, 3.0], [100.0, 7.0], [400.0, 47.0], [800.0, 1.0], [900.0, 1.0], [500.0, 56.0]], "isOverall": false, "label": "Get Cats-9", "isController": false}, {"data": [[600.0, 6.0], [700.0, 2.0], [100.0, 3.0], [400.0, 51.0], [800.0, 2.0], [900.0, 1.0], [500.0, 55.0]], "isOverall": false, "label": "Get Cats-8", "isController": false}, {"data": [[600.0, 4.0], [300.0, 1.0], [700.0, 2.0], [400.0, 60.0], [100.0, 2.0], [500.0, 51.0]], "isOverall": false, "label": "Cart Details-9", "isController": false}, {"data": [[700.0, 2.0], [100.0, 2.0], [400.0, 51.0], [500.0, 65.0]], "isOverall": false, "label": "Get Cats-7", "isController": false}, {"data": [[600.0, 3.0], [700.0, 2.0], [400.0, 54.0], [100.0, 3.0], [200.0, 1.0], [500.0, 57.0]], "isOverall": false, "label": "Cart Details-8", "isController": false}, {"data": [[300.0, 10.0], [600.0, 3.0], [700.0, 2.0], [400.0, 17.0], [100.0, 67.0], [200.0, 1.0], [500.0, 20.0]], "isOverall": false, "label": "Get Cats-6", "isController": false}, {"data": [[600.0, 5.0], [700.0, 2.0], [400.0, 57.0], [100.0, 3.0], [500.0, 53.0]], "isOverall": false, "label": "Cart Details-7", "isController": false}, {"data": [[1100.0, 7.0], [1200.0, 3.0], [1300.0, 1.0], [1400.0, 13.0], [1500.0, 14.0], [800.0, 74.0], [1600.0, 1.0], [1700.0, 2.0], [900.0, 4.0], [1800.0, 1.0]], "isOverall": false, "label": "Get Adult Male Persian Cat", "isController": false}, {"data": [[1100.0, 10.0], [1200.0, 6.0], [1400.0, 22.0], [1500.0, 16.0], [800.0, 53.0], [900.0, 8.0], [1000.0, 5.0]], "isOverall": false, "label": "Get Reptiles", "isController": false}, {"data": [[300.0, 2.0], [100.0, 102.0], [400.0, 8.0], [500.0, 8.0]], "isOverall": false, "label": "Remove One Cat From Cart-4", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [400.0, 9.0], [100.0, 95.0], [500.0, 14.0]], "isOverall": false, "label": "Remove One Cat From Cart-3", "isController": false}, {"data": [[300.0, 10.0], [600.0, 2.0], [700.0, 2.0], [400.0, 15.0], [100.0, 83.0], [500.0, 8.0]], "isOverall": false, "label": "Remove One Cat From Cart-6", "isController": false}, {"data": [[600.0, 1.0], [300.0, 3.0], [100.0, 89.0], [400.0, 15.0], [800.0, 1.0], [500.0, 11.0]], "isOverall": false, "label": "Remove One Cat From Cart-5", "isController": false}, {"data": [[100.0, 105.0], [400.0, 9.0], [500.0, 6.0]], "isOverall": false, "label": "Remove One Cat From Cart-0", "isController": false}, {"data": [[300.0, 1.0], [100.0, 102.0], [400.0, 7.0], [500.0, 10.0]], "isOverall": false, "label": "Remove One Cat From Cart-2", "isController": false}, {"data": [[400.0, 13.0], [100.0, 96.0], [500.0, 11.0]], "isOverall": false, "label": "Remove One Cat From Cart-1", "isController": false}, {"data": [[1100.0, 12.0], [1200.0, 3.0], [1300.0, 2.0], [1400.0, 10.0], [1500.0, 8.0], [800.0, 66.0], [1600.0, 5.0], [1700.0, 2.0], [900.0, 7.0], [1000.0, 5.0]], "isOverall": false, "label": "Get Cats", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [800.0, 43.0], [900.0, 8.0], [1000.0, 3.0], [1100.0, 2.0], [1200.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [1500.0, 1.0], [1600.0, 28.0], [1700.0, 18.0], [1800.0, 3.0], [1900.0, 4.0], [2000.0, 4.0]], "isOverall": false, "label": "Get Fish", "isController": false}, {"data": [[700.0, 1.0], [400.0, 63.0], [800.0, 3.0], [100.0, 1.0], [500.0, 52.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-7", "isController": false}, {"data": [[300.0, 7.0], [600.0, 3.0], [700.0, 1.0], [100.0, 71.0], [400.0, 21.0], [500.0, 17.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-6", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [400.0, 50.0], [100.0, 2.0], [800.0, 2.0], [900.0, 1.0], [500.0, 63.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-9", "isController": false}, {"data": [[600.0, 3.0], [400.0, 51.0], [100.0, 1.0], [500.0, 65.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-8", "isController": false}, {"data": [[300.0, 2.0], [100.0, 88.0], [400.0, 13.0], [500.0, 17.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-3", "isController": false}, {"data": [[300.0, 1.0], [100.0, 86.0], [400.0, 24.0], [500.0, 9.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-2", "isController": false}, {"data": [[300.0, 3.0], [600.0, 3.0], [100.0, 78.0], [400.0, 18.0], [800.0, 2.0], [500.0, 16.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-5", "isController": false}, {"data": [[300.0, 2.0], [100.0, 87.0], [400.0, 16.0], [500.0, 15.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-4", "isController": false}, {"data": [[300.0, 1.0], [100.0, 92.0], [400.0, 10.0], [800.0, 1.0], [500.0, 16.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-1", "isController": false}, {"data": [[100.0, 88.0], [400.0, 15.0], [500.0, 17.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-0", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [600.0, 3.0], [400.0, 55.0], [100.0, 5.0], [500.0, 55.0]], "isOverall": false, "label": "Remove One Cat From Cart-8", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [400.0, 60.0], [100.0, 6.0], [800.0, 1.0], [500.0, 50.0]], "isOverall": false, "label": "Remove One Cat From Cart-7", "isController": false}, {"data": [[600.0, 2.0], [700.0, 2.0], [400.0, 51.0], [100.0, 6.0], [800.0, 1.0], [500.0, 58.0]], "isOverall": false, "label": "Remove One Cat From Cart-9", "isController": false}, {"data": [[1100.0, 10.0], [1200.0, 3.0], [1400.0, 11.0], [1500.0, 14.0], [800.0, 62.0], [1600.0, 1.0], [900.0, 13.0], [1000.0, 6.0]], "isOverall": false, "label": "Cart Details", "isController": false}, {"data": [[600.0, 7.0], [700.0, 2.0], [400.0, 52.0], [100.0, 9.0], [800.0, 2.0], [500.0, 48.0]], "isOverall": false, "label": "Get Koi Fish-9", "isController": false}, {"data": [[600.0, 7.0], [700.0, 4.0], [100.0, 8.0], [400.0, 44.0], [800.0, 1.0], [200.0, 1.0], [500.0, 55.0]], "isOverall": false, "label": "Get Koi Fish-8", "isController": false}, {"data": [[300.0, 5.0], [600.0, 3.0], [700.0, 2.0], [100.0, 94.0], [400.0, 5.0], [500.0, 11.0]], "isOverall": false, "label": "Get Koi Fish-5", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0], [100.0, 101.0], [400.0, 7.0], [500.0, 9.0]], "isOverall": false, "label": "Get Koi Fish-4", "isController": false}, {"data": [[600.0, 6.0], [700.0, 3.0], [400.0, 46.0], [800.0, 2.0], [100.0, 6.0], [500.0, 57.0]], "isOverall": false, "label": "Get Koi Fish-7", "isController": false}, {"data": [[600.0, 6.0], [300.0, 12.0], [100.0, 89.0], [400.0, 4.0], [900.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "Get Koi Fish-6", "isController": false}, {"data": [[600.0, 1.0], [100.0, 104.0], [400.0, 10.0], [500.0, 5.0]], "isOverall": false, "label": "Get Koi Fish-1", "isController": false}, {"data": [[100.0, 108.0], [400.0, 5.0], [500.0, 7.0]], "isOverall": false, "label": "Get Koi Fish-0", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [100.0, 101.0], [400.0, 8.0], [500.0, 9.0]], "isOverall": false, "label": "Get Koi Fish-3", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [700.0, 1.0], [100.0, 101.0], [400.0, 8.0], [500.0, 8.0]], "isOverall": false, "label": "Get Koi Fish-2", "isController": false}, {"data": [[1100.0, 14.0], [1200.0, 4.0], [1300.0, 1.0], [1400.0, 13.0], [1500.0, 10.0], [800.0, 64.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 8.0], [1000.0, 4.0]], "isOverall": false, "label": "Get Persian Cats", "isController": false}, {"data": [[1100.0, 4.0], [1200.0, 1.0], [1400.0, 11.0], [1500.0, 8.0], [1600.0, 2.0], [800.0, 69.0], [900.0, 15.0], [1000.0, 8.0], [500.0, 2.0]], "isOverall": false, "label": "Get Bulldog", "isController": false}, {"data": [[1100.0, 10.0], [1200.0, 4.0], [1400.0, 3.0], [1500.0, 11.0], [400.0, 1.0], [800.0, 68.0], [900.0, 9.0], [1000.0, 14.0]], "isOverall": false, "label": "Get Dog", "isController": false}, {"data": [[10500.0, 1.0], [10700.0, 1.0], [10600.0, 1.0], [11000.0, 7.0], [11200.0, 6.0], [10800.0, 5.0], [10900.0, 3.0], [11100.0, 6.0], [11300.0, 9.0], [11600.0, 9.0], [11500.0, 8.0], [11700.0, 3.0], [11400.0, 7.0], [11800.0, 8.0], [11900.0, 3.0], [12100.0, 1.0], [12000.0, 3.0], [12300.0, 2.0], [12600.0, 2.0], [12400.0, 2.0], [13200.0, 1.0], [13000.0, 1.0], [13700.0, 1.0], [14300.0, 1.0], [13900.0, 2.0], [14600.0, 1.0], [15000.0, 1.0], [14900.0, 1.0], [15300.0, 1.0], [15800.0, 1.0], [15400.0, 2.0], [15700.0, 2.0], [15500.0, 2.0], [16300.0, 1.0], [16200.0, 3.0], [16400.0, 1.0], [16700.0, 2.0], [17200.0, 1.0], [17100.0, 2.0], [16500.0, 1.0], [18300.0, 1.0], [18400.0, 1.0], [17700.0, 1.0], [17600.0, 1.0], [18600.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[100.0, 97.0], [200.0, 1.0], [400.0, 8.0], [500.0, 14.0]], "isOverall": false, "label": "Get Order Confirm Form-0", "isController": false}, {"data": [[300.0, 1.0], [400.0, 16.0], [100.0, 93.0], [500.0, 10.0]], "isOverall": false, "label": "Get Order Confirm Form-1", "isController": false}, {"data": [[300.0, 1.0], [100.0, 96.0], [400.0, 13.0], [500.0, 10.0]], "isOverall": false, "label": "Get Order Confirm Form-2", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [100.0, 91.0], [400.0, 13.0], [500.0, 14.0]], "isOverall": false, "label": "Get Order Confirm Form-3", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [400.0, 19.0], [100.0, 92.0], [500.0, 7.0]], "isOverall": false, "label": "Get Order Confirm Form-4", "isController": false}, {"data": [[300.0, 5.0], [600.0, 2.0], [700.0, 1.0], [400.0, 12.0], [100.0, 85.0], [800.0, 1.0], [500.0, 14.0]], "isOverall": false, "label": "Get Order Confirm Form-5", "isController": false}, {"data": [[300.0, 5.0], [600.0, 4.0], [400.0, 15.0], [100.0, 80.0], [800.0, 1.0], [500.0, 15.0]], "isOverall": false, "label": "Get Order Confirm Form-6", "isController": false}, {"data": [[300.0, 1.0], [600.0, 3.0], [700.0, 2.0], [400.0, 58.0], [100.0, 1.0], [500.0, 55.0]], "isOverall": false, "label": "Get Order Confirm Form-7", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [700.0, 3.0], [400.0, 44.0], [800.0, 1.0], [100.0, 3.0], [500.0, 66.0]], "isOverall": false, "label": "Get Order Confirm Form-8", "isController": false}, {"data": [[700.0, 1.0], [100.0, 6.0], [400.0, 50.0], [800.0, 1.0], [500.0, 62.0]], "isOverall": false, "label": "Get Order Confirm Form-9", "isController": false}, {"data": [[600.0, 3.0], [700.0, 2.0], [100.0, 10.0], [400.0, 53.0], [800.0, 2.0], [500.0, 50.0]], "isOverall": false, "label": "Get Bulldog-9", "isController": false}, {"data": [[600.0, 7.0], [300.0, 1.0], [700.0, 1.0], [400.0, 49.0], [100.0, 12.0], [800.0, 1.0], [500.0, 49.0]], "isOverall": false, "label": "Get Bulldog-8", "isController": false}, {"data": [[600.0, 7.0], [300.0, 1.0], [400.0, 46.0], [100.0, 7.0], [500.0, 59.0]], "isOverall": false, "label": "Get Bulldog-7", "isController": false}, {"data": [[300.0, 13.0], [600.0, 2.0], [700.0, 1.0], [400.0, 11.0], [100.0, 83.0], [800.0, 1.0], [500.0, 9.0]], "isOverall": false, "label": "Get Bulldog-6", "isController": false}, {"data": [[400.0, 5.0], [100.0, 106.0], [500.0, 9.0]], "isOverall": false, "label": "Get Bulldog-1", "isController": false}, {"data": [[100.0, 98.0], [400.0, 10.0], [500.0, 12.0]], "isOverall": false, "label": "Get Bulldog-0", "isController": false}, {"data": [[1100.0, 9.0], [1200.0, 2.0], [1400.0, 4.0], [1500.0, 4.0], [800.0, 72.0], [400.0, 1.0], [1600.0, 3.0], [900.0, 15.0], [1000.0, 8.0], [500.0, 2.0]], "isOverall": false, "label": "Get Koi Fish", "isController": false}, {"data": [[600.0, 4.0], [300.0, 7.0], [700.0, 1.0], [400.0, 14.0], [100.0, 87.0], [800.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "Get Bulldog-5", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [700.0, 1.0], [100.0, 89.0], [400.0, 12.0], [200.0, 1.0], [500.0, 15.0]], "isOverall": false, "label": "Get Bulldog-4", "isController": false}, {"data": [[600.0, 1.0], [300.0, 3.0], [100.0, 98.0], [400.0, 9.0], [200.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "Get Bulldog-3", "isController": false}, {"data": [[600.0, 1.0], [100.0, 94.0], [400.0, 13.0], [500.0, 12.0]], "isOverall": false, "label": "Get Bulldog-2", "isController": false}, {"data": [[600.0, 3.0], [700.0, 2.0], [100.0, 17.0], [400.0, 43.0], [500.0, 55.0]], "isOverall": false, "label": "Get Fish-9", "isController": false}, {"data": [[1100.0, 13.0], [1200.0, 3.0], [1300.0, 4.0], [1400.0, 9.0], [1500.0, 9.0], [800.0, 65.0], [900.0, 10.0], [1000.0, 7.0]], "isOverall": false, "label": "Get Iguana Reptiles", "isController": false}, {"data": [[600.0, 8.0], [700.0, 3.0], [100.0, 7.0], [400.0, 49.0], [800.0, 1.0], [500.0, 52.0]], "isOverall": false, "label": "Get Fish-7", "isController": false}, {"data": [[600.0, 3.0], [700.0, 4.0], [100.0, 24.0], [400.0, 30.0], [800.0, 1.0], [900.0, 1.0], [500.0, 57.0]], "isOverall": false, "label": "Get Fish-8", "isController": false}, {"data": [[600.0, 8.0], [300.0, 3.0], [700.0, 7.0], [800.0, 3.0], [400.0, 24.0], [100.0, 48.0], [500.0, 26.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Fish-5", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 13.0], [300.0, 7.0], [700.0, 4.0], [100.0, 48.0], [400.0, 21.0], [800.0, 1.0], [900.0, 1.0], [500.0, 24.0]], "isOverall": false, "label": "Get Fish-6", "isController": false}, {"data": [[600.0, 6.0], [300.0, 1.0], [700.0, 2.0], [800.0, 3.0], [100.0, 63.0], [400.0, 15.0], [900.0, 1.0], [500.0, 29.0]], "isOverall": false, "label": "Get Fish-3", "isController": false}, {"data": [[600.0, 6.0], [300.0, 2.0], [700.0, 3.0], [800.0, 2.0], [400.0, 24.0], [100.0, 48.0], [900.0, 1.0], [500.0, 34.0]], "isOverall": false, "label": "Get Fish-4", "isController": false}, {"data": [[600.0, 3.0], [700.0, 1.0], [100.0, 84.0], [400.0, 11.0], [900.0, 1.0], [500.0, 20.0]], "isOverall": false, "label": "Get Fish-1", "isController": false}, {"data": [[600.0, 6.0], [300.0, 2.0], [700.0, 3.0], [800.0, 2.0], [100.0, 67.0], [400.0, 20.0], [500.0, 20.0]], "isOverall": false, "label": "Get Fish-2", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 40.0], [700.0, 16.0], [800.0, 2.0], [100.0, 57.0], [400.0, 1.0], [1000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Get Fish-0", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [100.0, 94.0], [400.0, 10.0], [500.0, 13.0]], "isOverall": false, "label": "Get Iguana Reptiles-1", "isController": false}, {"data": [[300.0, 9.0], [600.0, 4.0], [700.0, 3.0], [100.0, 71.0], [800.0, 2.0], [400.0, 15.0], [900.0, 1.0], [500.0, 15.0]], "isOverall": false, "label": "Get Persian Cats-6", "isController": false}, {"data": [[100.0, 102.0], [400.0, 9.0], [500.0, 9.0]], "isOverall": false, "label": "Get Iguana Reptiles-0", "isController": false}, {"data": [[600.0, 4.0], [300.0, 1.0], [700.0, 1.0], [400.0, 66.0], [100.0, 3.0], [500.0, 45.0]], "isOverall": false, "label": "Get Persian Cats-7", "isController": false}, {"data": [[600.0, 1.0], [100.0, 87.0], [400.0, 17.0], [500.0, 15.0]], "isOverall": false, "label": "Get Iguana Reptiles-3", "isController": false}, {"data": [[600.0, 7.0], [400.0, 46.0], [100.0, 2.0], [800.0, 2.0], [500.0, 63.0]], "isOverall": false, "label": "Get Persian Cats-8", "isController": false}, {"data": [[300.0, 3.0], [100.0, 84.0], [400.0, 15.0], [500.0, 18.0]], "isOverall": false, "label": "Get Iguana Reptiles-2", "isController": false}, {"data": [[600.0, 4.0], [700.0, 1.0], [800.0, 2.0], [400.0, 63.0], [100.0, 1.0], [500.0, 49.0]], "isOverall": false, "label": "Get Persian Cats-9", "isController": false}, {"data": [[100.0, 104.0], [400.0, 5.0], [500.0, 11.0]], "isOverall": false, "label": "Get Dog-0", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 101.0], [400.0, 6.0], [500.0, 11.0]], "isOverall": false, "label": "Get Dog-2", "isController": false}, {"data": [[100.0, 98.0], [400.0, 8.0], [500.0, 14.0]], "isOverall": false, "label": "Get Dog-1", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [100.0, 95.0], [800.0, 2.0], [400.0, 8.0], [500.0, 11.0]], "isOverall": false, "label": "Get Dog-4", "isController": false}, {"data": [[600.0, 5.0], [700.0, 4.0], [400.0, 46.0], [200.0, 1.0], [100.0, 6.0], [800.0, 2.0], [500.0, 56.0]], "isOverall": false, "label": "Get Iguana Reptiles-9", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [700.0, 1.0], [100.0, 97.0], [400.0, 7.0], [500.0, 12.0]], "isOverall": false, "label": "Get Dog-3", "isController": false}, {"data": [[700.0, 2.0], [400.0, 63.0], [100.0, 6.0], [800.0, 1.0], [900.0, 1.0], [500.0, 47.0]], "isOverall": false, "label": "Get Iguana Reptiles-8", "isController": false}, {"data": [[300.0, 7.0], [600.0, 3.0], [700.0, 6.0], [100.0, 81.0], [400.0, 11.0], [900.0, 1.0], [500.0, 11.0]], "isOverall": false, "label": "Get Dog-6", "isController": false}, {"data": [[300.0, 8.0], [600.0, 3.0], [700.0, 2.0], [100.0, 89.0], [400.0, 11.0], [800.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "Get Dog-5", "isController": false}, {"data": [[1100.0, 9.0], [1200.0, 1.0], [1400.0, 7.0], [1500.0, 16.0], [800.0, 77.0], [900.0, 7.0], [1000.0, 3.0]], "isOverall": false, "label": "Get Order Confirm Form", "isController": false}, {"data": [[600.0, 6.0], [300.0, 1.0], [700.0, 4.0], [100.0, 10.0], [400.0, 45.0], [500.0, 54.0]], "isOverall": false, "label": "Get Dog-8", "isController": false}, {"data": [[300.0, 7.0], [600.0, 2.0], [700.0, 1.0], [100.0, 79.0], [400.0, 13.0], [500.0, 18.0]], "isOverall": false, "label": "Get Iguana Reptiles-5", "isController": false}, {"data": [[600.0, 6.0], [300.0, 1.0], [700.0, 4.0], [100.0, 11.0], [400.0, 41.0], [800.0, 2.0], [500.0, 55.0]], "isOverall": false, "label": "Get Dog-7", "isController": false}, {"data": [[300.0, 2.0], [100.0, 95.0], [400.0, 4.0], [500.0, 19.0]], "isOverall": false, "label": "Get Iguana Reptiles-4", "isController": false}, {"data": [[600.0, 4.0], [700.0, 3.0], [400.0, 47.0], [100.0, 7.0], [800.0, 3.0], [500.0, 56.0]], "isOverall": false, "label": "Get Iguana Reptiles-7", "isController": false}, {"data": [[600.0, 8.0], [300.0, 1.0], [700.0, 1.0], [100.0, 6.0], [400.0, 47.0], [800.0, 2.0], [500.0, 55.0]], "isOverall": false, "label": "Get Dog-9", "isController": false}, {"data": [[300.0, 12.0], [600.0, 4.0], [700.0, 2.0], [100.0, 71.0], [400.0, 12.0], [500.0, 19.0]], "isOverall": false, "label": "Get Iguana Reptiles-6", "isController": false}, {"data": [[1100.0, 9.0], [1200.0, 1.0], [1400.0, 7.0], [1500.0, 7.0], [800.0, 81.0], [1600.0, 1.0], [900.0, 8.0], [1000.0, 6.0]], "isOverall": false, "label": "Remove One Cat From Cart", "isController": false}, {"data": [[100.0, 94.0], [400.0, 17.0], [500.0, 9.0]], "isOverall": false, "label": "Get Persian Cats-0", "isController": false}, {"data": [[300.0, 2.0], [100.0, 88.0], [400.0, 15.0], [500.0, 15.0]], "isOverall": false, "label": "Get Persian Cats-1", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [100.0, 86.0], [400.0, 8.0], [500.0, 23.0]], "isOverall": false, "label": "Get Persian Cats-2", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0], [100.0, 85.0], [400.0, 16.0], [500.0, 16.0]], "isOverall": false, "label": "Get Persian Cats-3", "isController": false}, {"data": [[300.0, 2.0], [600.0, 3.0], [100.0, 92.0], [400.0, 11.0], [500.0, 12.0]], "isOverall": false, "label": "Get Persian Cats-4", "isController": false}, {"data": [[300.0, 8.0], [600.0, 2.0], [700.0, 1.0], [100.0, 71.0], [400.0, 18.0], [800.0, 1.0], [500.0, 19.0]], "isOverall": false, "label": "Get Persian Cats-5", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 18600.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 10.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 10708.0, "series": [{"data": [[0.0, 10708.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 4926.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 196.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 10.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 2.755102040816327, "minX": 1.70700432E12, "maxY": 56.86855912821195, "series": [{"data": [[1.70700444E12, 2.755102040816327], [1.70700438E12, 56.04151922623263], [1.70700432E12, 56.86855912821195]], "isOverall": false, "label": "Load Testing", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70700444E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 933.8333333333334, "minX": 1.70700432E12, "maxY": 167798.53333333333, "series": [{"data": [[1.70700444E12, 933.8333333333334], [1.70700438E12, 162666.23333333334], [1.70700432E12, 151350.46666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.70700444E12, 1003.95], [1.70700438E12, 167798.53333333333], [1.70700432E12, 145623.08333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70700444E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 168.0, "minX": 1.70700432E12, "maxY": 13123.849999999999, "series": [{"data": [[1.70700438E12, 299.26666666666654], [1.70700432E12, 251.01666666666674]], "isOverall": false, "label": "Get Cats-5", "isController": false}, {"data": [[1.70700438E12, 288.5], [1.70700432E12, 272.48333333333335]], "isOverall": false, "label": "Get Reptiles-0", "isController": false}, {"data": [[1.70700438E12, 271.83333333333337], [1.70700432E12, 243.58333333333343]], "isOverall": false, "label": "Get Cats-4", "isController": false}, {"data": [[1.70700438E12, 300.91666666666663], [1.70700432E12, 236.28333333333327]], "isOverall": false, "label": "Get Reptiles-1", "isController": false}, {"data": [[1.70700438E12, 274.6166666666667], [1.70700432E12, 249.11666666666676]], "isOverall": false, "label": "Get Cats-3", "isController": false}, {"data": [[1.70700438E12, 270.03333333333325], [1.70700432E12, 286.0]], "isOverall": false, "label": "Get Reptiles-2", "isController": false}, {"data": [[1.70700438E12, 248.45000000000002], [1.70700432E12, 235.18333333333328]], "isOverall": false, "label": "Get Cats-2", "isController": false}, {"data": [[1.70700438E12, 271.4666666666666], [1.70700432E12, 243.18333333333328]], "isOverall": false, "label": "Get Cats-1", "isController": false}, {"data": [[1.70700438E12, 256.21666666666664], [1.70700432E12, 241.96666666666664]], "isOverall": false, "label": "Get Cats-0", "isController": false}, {"data": [[1.70700438E12, 505.1666666666668], [1.70700432E12, 534.1833333333334]], "isOverall": false, "label": "Get Reptiles-7", "isController": false}, {"data": [[1.70700438E12, 502.8833333333334], [1.70700432E12, 511.44999999999993]], "isOverall": false, "label": "Get Reptiles-8", "isController": false}, {"data": [[1.70700438E12, 515.7166666666667], [1.70700432E12, 501.45000000000005]], "isOverall": false, "label": "Get Reptiles-9", "isController": false}, {"data": [[1.70700438E12, 278.0333333333334], [1.70700432E12, 240.00000000000003]], "isOverall": false, "label": "Get Reptiles-3", "isController": false}, {"data": [[1.70700438E12, 281.65], [1.70700432E12, 276.3666666666668]], "isOverall": false, "label": "Get Reptiles-4", "isController": false}, {"data": [[1.70700438E12, 332.5833333333333], [1.70700432E12, 285.2833333333333]], "isOverall": false, "label": "Get Reptiles-5", "isController": false}, {"data": [[1.70700438E12, 317.1166666666667], [1.70700432E12, 279.98333333333335]], "isOverall": false, "label": "Get Reptiles-6", "isController": false}, {"data": [[1.70700438E12, 226.1904761904762], [1.70700432E12, 258.1929824561405]], "isOverall": false, "label": "Cart Details-2", "isController": false}, {"data": [[1.70700438E12, 253.9047619047618], [1.70700432E12, 230.59649122807014]], "isOverall": false, "label": "Cart Details-1", "isController": false}, {"data": [[1.70700438E12, 245.66129032258067], [1.70700432E12, 257.7586206896552]], "isOverall": false, "label": "Cart Details-0", "isController": false}, {"data": [[1.70700438E12, 294.20634920634933], [1.70700432E12, 268.8070175438596]], "isOverall": false, "label": "Cart Details-6", "isController": false}, {"data": [[1.70700438E12, 285.93650793650784], [1.70700432E12, 272.77192982456137]], "isOverall": false, "label": "Cart Details-5", "isController": false}, {"data": [[1.70700438E12, 262.06349206349205], [1.70700432E12, 234.56140350877195]], "isOverall": false, "label": "Cart Details-4", "isController": false}, {"data": [[1.70700438E12, 264.4285714285714], [1.70700432E12, 263.47368421052636]], "isOverall": false, "label": "Cart Details-3", "isController": false}, {"data": [[1.70700438E12, 483.01666666666665], [1.70700432E12, 529.0000000000003]], "isOverall": false, "label": "Get Cats-9", "isController": false}, {"data": [[1.70700438E12, 514.3499999999999], [1.70700432E12, 515.4666666666667]], "isOverall": false, "label": "Get Cats-8", "isController": false}, {"data": [[1.70700438E12, 515.8253968253969], [1.70700432E12, 492.56140350877195]], "isOverall": false, "label": "Cart Details-9", "isController": false}, {"data": [[1.70700438E12, 509.83333333333326], [1.70700432E12, 502.2166666666667]], "isOverall": false, "label": "Get Cats-7", "isController": false}, {"data": [[1.70700438E12, 509.9841269841269], [1.70700432E12, 495.45614035087704]], "isOverall": false, "label": "Cart Details-8", "isController": false}, {"data": [[1.70700438E12, 331.31666666666666], [1.70700432E12, 278.1333333333334]], "isOverall": false, "label": "Get Cats-6", "isController": false}, {"data": [[1.70700438E12, 508.3492063492063], [1.70700432E12, 497.4561403508773]], "isOverall": false, "label": "Cart Details-7", "isController": false}, {"data": [[1.70700438E12, 1094.2833333333338], [1.70700432E12, 1046.0]], "isOverall": false, "label": "Get Adult Male Persian Cat", "isController": false}, {"data": [[1.70700438E12, 1142.8499999999997], [1.70700432E12, 1094.316666666667]], "isOverall": false, "label": "Get Reptiles", "isController": false}, {"data": [[1.70700438E12, 210.31944444444437], [1.70700432E12, 218.6041666666667]], "isOverall": false, "label": "Remove One Cat From Cart-4", "isController": false}, {"data": [[1.70700438E12, 226.56338028169014], [1.70700432E12, 254.0]], "isOverall": false, "label": "Remove One Cat From Cart-3", "isController": false}, {"data": [[1.70700438E12, 261.1111111111111], [1.70700432E12, 256.22916666666663]], "isOverall": false, "label": "Remove One Cat From Cart-6", "isController": false}, {"data": [[1.70700438E12, 240.43055555555554], [1.70700432E12, 270.1041666666667]], "isOverall": false, "label": "Remove One Cat From Cart-5", "isController": false}, {"data": [[1.70700438E12, 203.97142857142853], [1.70700432E12, 233.61999999999998]], "isOverall": false, "label": "Remove One Cat From Cart-0", "isController": false}, {"data": [[1.70700438E12, 222.91666666666669], [1.70700432E12, 211.10416666666666]], "isOverall": false, "label": "Remove One Cat From Cart-2", "isController": false}, {"data": [[1.70700438E12, 242.90277777777774], [1.70700432E12, 224.35416666666669]], "isOverall": false, "label": "Remove One Cat From Cart-1", "isController": false}, {"data": [[1.70700438E12, 1077.4333333333332], [1.70700432E12, 1059.7166666666665]], "isOverall": false, "label": "Get Cats", "isController": false}, {"data": [[1.70700438E12, 941.7222222222223], [1.70700432E12, 1668.3939393939393]], "isOverall": false, "label": "Get Fish", "isController": false}, {"data": [[1.70700438E12, 511.16666666666646], [1.70700432E12, 505.8333333333333]], "isOverall": false, "label": "Get Adult Male Persian Cat-7", "isController": false}, {"data": [[1.70700438E12, 338.96666666666664], [1.70700432E12, 252.51666666666662]], "isOverall": false, "label": "Get Adult Male Persian Cat-6", "isController": false}, {"data": [[1.70700438E12, 514.5166666666668], [1.70700432E12, 511.2666666666668]], "isOverall": false, "label": "Get Adult Male Persian Cat-9", "isController": false}, {"data": [[1.70700438E12, 499.0666666666666], [1.70700432E12, 513.2000000000002]], "isOverall": false, "label": "Get Adult Male Persian Cat-8", "isController": false}, {"data": [[1.70700438E12, 260.59999999999997], [1.70700432E12, 250.39999999999995]], "isOverall": false, "label": "Get Adult Male Persian Cat-3", "isController": false}, {"data": [[1.70700438E12, 285.4833333333334], [1.70700432E12, 233.4]], "isOverall": false, "label": "Get Adult Male Persian Cat-2", "isController": false}, {"data": [[1.70700438E12, 310.6166666666666], [1.70700432E12, 261.6333333333333]], "isOverall": false, "label": "Get Adult Male Persian Cat-5", "isController": false}, {"data": [[1.70700438E12, 260.0333333333333], [1.70700432E12, 250.54999999999995]], "isOverall": false, "label": "Get Adult Male Persian Cat-4", "isController": false}, {"data": [[1.70700438E12, 262.96666666666664], [1.70700432E12, 236.83333333333331]], "isOverall": false, "label": "Get Adult Male Persian Cat-1", "isController": false}, {"data": [[1.70700438E12, 263.28333333333336], [1.70700432E12, 264.61666666666673]], "isOverall": false, "label": "Get Adult Male Persian Cat-0", "isController": false}, {"data": [[1.70700438E12, 484.72222222222234], [1.70700432E12, 485.0]], "isOverall": false, "label": "Remove One Cat From Cart-8", "isController": false}, {"data": [[1.70700438E12, 482.8888888888889], [1.70700432E12, 492.00000000000006]], "isOverall": false, "label": "Remove One Cat From Cart-7", "isController": false}, {"data": [[1.70700438E12, 489.7777777777778], [1.70700432E12, 506.9166666666666]], "isOverall": false, "label": "Remove One Cat From Cart-9", "isController": false}, {"data": [[1.70700438E12, 1068.5079365079366], [1.70700432E12, 1034.7719298245615]], "isOverall": false, "label": "Cart Details", "isController": false}, {"data": [[1.70700438E12, 496.3793103448277], [1.70700432E12, 492.62903225806457]], "isOverall": false, "label": "Get Koi Fish-9", "isController": false}, {"data": [[1.70700438E12, 497.5172413793104], [1.70700432E12, 502.0967741935483]], "isOverall": false, "label": "Get Koi Fish-8", "isController": false}, {"data": [[1.70700438E12, 255.5614035087719], [1.70700432E12, 224.82539682539678]], "isOverall": false, "label": "Get Koi Fish-5", "isController": false}, {"data": [[1.70700438E12, 222.6315789473684], [1.70700432E12, 227.90476190476184]], "isOverall": false, "label": "Get Koi Fish-4", "isController": false}, {"data": [[1.70700438E12, 508.2413793103449], [1.70700432E12, 506.5161290322581]], "isOverall": false, "label": "Get Koi Fish-7", "isController": false}, {"data": [[1.70700438E12, 261.59649122807014], [1.70700432E12, 232.17460317460322]], "isOverall": false, "label": "Get Koi Fish-6", "isController": false}, {"data": [[1.70700438E12, 239.70175438596488], [1.70700432E12, 190.6984126984127]], "isOverall": false, "label": "Get Koi Fish-1", "isController": false}, {"data": [[1.70700438E12, 217.0], [1.70700432E12, 200.421875]], "isOverall": false, "label": "Get Koi Fish-0", "isController": false}, {"data": [[1.70700438E12, 224.20689655172407], [1.70700432E12, 219.32258064516125]], "isOverall": false, "label": "Get Koi Fish-3", "isController": false}, {"data": [[1.70700438E12, 236.4655172413793], [1.70700432E12, 209.741935483871]], "isOverall": false, "label": "Get Koi Fish-2", "isController": false}, {"data": [[1.70700438E12, 1083.5999999999997], [1.70700432E12, 1033.2]], "isOverall": false, "label": "Get Persian Cats", "isController": false}, {"data": [[1.70700438E12, 984.6833333333333], [1.70700432E12, 1023.0333333333334]], "isOverall": false, "label": "Get Bulldog", "isController": false}, {"data": [[1.70700438E12, 1008.3389830508474], [1.70700432E12, 997.7540983606557]], "isOverall": false, "label": "Get Dog", "isController": false}, {"data": [[1.70700438E12, 12296.33333333333], [1.70700432E12, 13123.849999999999]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.70700444E12, 173.5], [1.70700438E12, 245.2254901960784], [1.70700432E12, 203.57142857142856]], "isOverall": false, "label": "Get Order Confirm Form-0", "isController": false}, {"data": [[1.70700444E12, 168.0], [1.70700438E12, 241.7961165048543], [1.70700432E12, 264.5384615384615]], "isOverall": false, "label": "Get Order Confirm Form-1", "isController": false}, {"data": [[1.70700444E12, 376.2], [1.70700438E12, 228.0980392156863], [1.70700432E12, 222.23076923076925]], "isOverall": false, "label": "Get Order Confirm Form-2", "isController": false}, {"data": [[1.70700444E12, 244.25], [1.70700438E12, 252.00980392156848], [1.70700432E12, 226.35714285714286]], "isOverall": false, "label": "Get Order Confirm Form-3", "isController": false}, {"data": [[1.70700444E12, 255.75], [1.70700438E12, 240.6176470588236], [1.70700432E12, 288.50000000000006]], "isOverall": false, "label": "Get Order Confirm Form-4", "isController": false}, {"data": [[1.70700444E12, 332.0], [1.70700438E12, 264.6407766990292], [1.70700432E12, 241.23076923076925]], "isOverall": false, "label": "Get Order Confirm Form-5", "isController": false}, {"data": [[1.70700444E12, 422.0], [1.70700438E12, 272.24271844660205], [1.70700432E12, 279.53846153846155]], "isOverall": false, "label": "Get Order Confirm Form-6", "isController": false}, {"data": [[1.70700444E12, 497.2], [1.70700438E12, 503.53846153846155], [1.70700432E12, 495.81818181818176]], "isOverall": false, "label": "Get Order Confirm Form-7", "isController": false}, {"data": [[1.70700444E12, 421.6], [1.70700438E12, 502.71153846153874], [1.70700432E12, 513.6363636363636]], "isOverall": false, "label": "Get Order Confirm Form-8", "isController": false}, {"data": [[1.70700444E12, 373.2], [1.70700438E12, 501.3076923076922], [1.70700432E12, 487.45454545454544]], "isOverall": false, "label": "Get Order Confirm Form-9", "isController": false}, {"data": [[1.70700438E12, 491.3666666666667], [1.70700432E12, 483.00000000000006]], "isOverall": false, "label": "Get Bulldog-9", "isController": false}, {"data": [[1.70700438E12, 498.11864406779665], [1.70700432E12, 468.19672131147524]], "isOverall": false, "label": "Get Bulldog-8", "isController": false}, {"data": [[1.70700438E12, 496.5762711864407], [1.70700432E12, 494.4262295081967]], "isOverall": false, "label": "Get Bulldog-7", "isController": false}, {"data": [[1.70700438E12, 277.79661016949143], [1.70700432E12, 235.40983606557387]], "isOverall": false, "label": "Get Bulldog-6", "isController": false}, {"data": [[1.70700438E12, 196.01694915254237], [1.70700432E12, 219.67213114754094]], "isOverall": false, "label": "Get Bulldog-1", "isController": false}, {"data": [[1.70700438E12, 227.06779661016944], [1.70700432E12, 245.01639344262287]], "isOverall": false, "label": "Get Bulldog-0", "isController": false}, {"data": [[1.70700438E12, 974.7586206896552], [1.70700432E12, 959.5645161290323]], "isOverall": false, "label": "Get Koi Fish", "isController": false}, {"data": [[1.70700438E12, 249.3050847457627], [1.70700432E12, 259.967213114754]], "isOverall": false, "label": "Get Bulldog-5", "isController": false}, {"data": [[1.70700438E12, 237.7627118644067], [1.70700432E12, 272.9016393442623]], "isOverall": false, "label": "Get Bulldog-4", "isController": false}, {"data": [[1.70700438E12, 226.16949152542372], [1.70700432E12, 221.44262295081967]], "isOverall": false, "label": "Get Bulldog-3", "isController": false}, {"data": [[1.70700438E12, 242.0169491525424], [1.70700432E12, 241.7213114754098]], "isOverall": false, "label": "Get Bulldog-2", "isController": false}, {"data": [[1.70700438E12, 454.9444444444445], [1.70700432E12, 476.2121212121211]], "isOverall": false, "label": "Get Fish-9", "isController": false}, {"data": [[1.70700438E12, 1060.95], [1.70700432E12, 998.6833333333335]], "isOverall": false, "label": "Get Iguana Reptiles", "isController": false}, {"data": [[1.70700438E12, 489.9999999999999], [1.70700432E12, 514.0606060606062]], "isOverall": false, "label": "Get Fish-7", "isController": false}, {"data": [[1.70700438E12, 435.2830188679245], [1.70700432E12, 478.1044776119403]], "isOverall": false, "label": "Get Fish-8", "isController": false}, {"data": [[1.70700438E12, 250.13725490196074], [1.70700432E12, 513.2463768115942]], "isOverall": false, "label": "Get Fish-5", "isController": false}, {"data": [[1.70700438E12, 245.7843137254903], [1.70700432E12, 505.9710144927535]], "isOverall": false, "label": "Get Fish-6", "isController": false}, {"data": [[1.70700438E12, 210.53846153846155], [1.70700432E12, 458.9117647058823]], "isOverall": false, "label": "Get Fish-3", "isController": false}, {"data": [[1.70700438E12, 250.78431372549016], [1.70700432E12, 493.5652173913042]], "isOverall": false, "label": "Get Fish-4", "isController": false}, {"data": [[1.70700438E12, 228.49019607843138], [1.70700432E12, 318.26086956521743]], "isOverall": false, "label": "Get Fish-1", "isController": false}, {"data": [[1.70700438E12, 221.39215686274508], [1.70700432E12, 413.66666666666674]], "isOverall": false, "label": "Get Fish-2", "isController": false}, {"data": [[1.70700438E12, 194.64000000000004], [1.70700432E12, 620.1857142857144]], "isOverall": false, "label": "Get Fish-0", "isController": false}, {"data": [[1.70700438E12, 256.25], [1.70700432E12, 222.95]], "isOverall": false, "label": "Get Iguana Reptiles-1", "isController": false}, {"data": [[1.70700438E12, 328.7333333333334], [1.70700432E12, 289.35]], "isOverall": false, "label": "Get Persian Cats-6", "isController": false}, {"data": [[1.70700438E12, 241.03333333333336], [1.70700432E12, 207.41666666666666]], "isOverall": false, "label": "Get Iguana Reptiles-0", "isController": false}, {"data": [[1.70700438E12, 490.1], [1.70700432E12, 502.48333333333335]], "isOverall": false, "label": "Get Persian Cats-7", "isController": false}, {"data": [[1.70700438E12, 280.78333333333336], [1.70700432E12, 243.2999999999999]], "isOverall": false, "label": "Get Iguana Reptiles-3", "isController": false}, {"data": [[1.70700438E12, 518.8333333333335], [1.70700432E12, 516.6166666666668]], "isOverall": false, "label": "Get Persian Cats-8", "isController": false}, {"data": [[1.70700438E12, 281.8500000000001], [1.70700432E12, 251.23333333333338]], "isOverall": false, "label": "Get Iguana Reptiles-2", "isController": false}, {"data": [[1.70700438E12, 504.84999999999985], [1.70700432E12, 517.4666666666665]], "isOverall": false, "label": "Get Persian Cats-9", "isController": false}, {"data": [[1.70700438E12, 227.47457627118646], [1.70700432E12, 213.2295081967213]], "isOverall": false, "label": "Get Dog-0", "isController": false}, {"data": [[1.70700438E12, 236.0], [1.70700432E12, 208.90163934426224]], "isOverall": false, "label": "Get Dog-2", "isController": false}, {"data": [[1.70700438E12, 234.8474576271187], [1.70700432E12, 230.21311475409826]], "isOverall": false, "label": "Get Dog-1", "isController": false}, {"data": [[1.70700438E12, 235.0], [1.70700432E12, 254.14754098360658]], "isOverall": false, "label": "Get Dog-4", "isController": false}, {"data": [[1.70700438E12, 504.73333333333335], [1.70700432E12, 512.4333333333333]], "isOverall": false, "label": "Get Iguana Reptiles-9", "isController": false}, {"data": [[1.70700438E12, 235.33898305084745], [1.70700432E12, 239.39344262295074]], "isOverall": false, "label": "Get Dog-3", "isController": false}, {"data": [[1.70700438E12, 489.6333333333334], [1.70700432E12, 498.45000000000005]], "isOverall": false, "label": "Get Iguana Reptiles-8", "isController": false}, {"data": [[1.70700438E12, 287.18644067796623], [1.70700432E12, 275.6885245901639]], "isOverall": false, "label": "Get Dog-6", "isController": false}, {"data": [[1.70700438E12, 247.79661016949152], [1.70700432E12, 250.36065573770497]], "isOverall": false, "label": "Get Dog-5", "isController": false}, {"data": [[1.70700444E12, 864.4], [1.70700438E12, 1027.4519230769235], [1.70700432E12, 1015.6363636363636]], "isOverall": false, "label": "Get Order Confirm Form", "isController": false}, {"data": [[1.70700438E12, 476.5762711864406], [1.70700432E12, 506.704918032787]], "isOverall": false, "label": "Get Dog-8", "isController": false}, {"data": [[1.70700438E12, 292.5], [1.70700432E12, 260.8499999999999]], "isOverall": false, "label": "Get Iguana Reptiles-5", "isController": false}, {"data": [[1.70700438E12, 507.1186440677966], [1.70700432E12, 481.37704918032784]], "isOverall": false, "label": "Get Dog-7", "isController": false}, {"data": [[1.70700438E12, 251.25000000000003], [1.70700432E12, 224.80000000000004]], "isOverall": false, "label": "Get Iguana Reptiles-4", "isController": false}, {"data": [[1.70700438E12, 499.18333333333334], [1.70700432E12, 509.75]], "isOverall": false, "label": "Get Iguana Reptiles-7", "isController": false}, {"data": [[1.70700438E12, 499.11864406779665], [1.70700432E12, 509.9344262295083]], "isOverall": false, "label": "Get Dog-9", "isController": false}, {"data": [[1.70700438E12, 342.0166666666667], [1.70700432E12, 246.00000000000003]], "isOverall": false, "label": "Get Iguana Reptiles-6", "isController": false}, {"data": [[1.70700438E12, 958.2083333333333], [1.70700432E12, 1006.1874999999999]], "isOverall": false, "label": "Remove One Cat From Cart", "isController": false}, {"data": [[1.70700438E12, 257.5333333333334], [1.70700432E12, 231.4]], "isOverall": false, "label": "Get Persian Cats-0", "isController": false}, {"data": [[1.70700438E12, 271.11666666666673], [1.70700432E12, 239.75]], "isOverall": false, "label": "Get Persian Cats-1", "isController": false}, {"data": [[1.70700438E12, 292.58333333333326], [1.70700432E12, 238.1666666666666]], "isOverall": false, "label": "Get Persian Cats-2", "isController": false}, {"data": [[1.70700438E12, 294.41666666666674], [1.70700432E12, 234.83333333333331]], "isOverall": false, "label": "Get Persian Cats-3", "isController": false}, {"data": [[1.70700438E12, 270.3833333333334], [1.70700432E12, 224.45000000000002]], "isOverall": false, "label": "Get Persian Cats-4", "isController": false}, {"data": [[1.70700438E12, 330.2], [1.70700432E12, 266.04999999999995]], "isOverall": false, "label": "Get Persian Cats-5", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70700444E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.70700432E12, "maxY": 3346.4333333333343, "series": [{"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Cats-5", "isController": false}, {"data": [[1.70700438E12, 288.4666666666667], [1.70700432E12, 272.4666666666667]], "isOverall": false, "label": "Get Reptiles-0", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Cats-4", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Reptiles-1", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Cats-3", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Reptiles-2", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Cats-2", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Cats-1", "isController": false}, {"data": [[1.70700438E12, 256.16666666666663], [1.70700432E12, 241.95000000000002]], "isOverall": false, "label": "Get Cats-0", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Reptiles-7", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Reptiles-8", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Reptiles-9", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Reptiles-3", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Reptiles-4", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Reptiles-5", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Reptiles-6", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Cart Details-2", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Cart Details-1", "isController": false}, {"data": [[1.70700438E12, 245.61290322580643], [1.70700432E12, 257.6724137931035]], "isOverall": false, "label": "Cart Details-0", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Cart Details-6", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Cart Details-5", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Cart Details-4", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Cart Details-3", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Cats-9", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Cats-8", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Cart Details-9", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Cats-7", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Cart Details-8", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Cats-6", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Cart Details-7", "isController": false}, {"data": [[1.70700438E12, 263.1666666666667], [1.70700432E12, 264.6000000000001]], "isOverall": false, "label": "Get Adult Male Persian Cat", "isController": false}, {"data": [[1.70700438E12, 288.4666666666667], [1.70700432E12, 272.4666666666667]], "isOverall": false, "label": "Get Reptiles", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-4", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-3", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-6", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-5", "isController": false}, {"data": [[1.70700438E12, 203.94285714285715], [1.70700432E12, 233.61999999999998]], "isOverall": false, "label": "Remove One Cat From Cart-0", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-2", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-1", "isController": false}, {"data": [[1.70700438E12, 256.16666666666663], [1.70700432E12, 241.95000000000002]], "isOverall": false, "label": "Get Cats", "isController": false}, {"data": [[1.70700438E12, 193.44444444444446], [1.70700432E12, 646.6969696969695]], "isOverall": false, "label": "Get Fish", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-7", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-6", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-9", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-8", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-3", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-2", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-5", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-4", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-1", "isController": false}, {"data": [[1.70700438E12, 263.1666666666667], [1.70700432E12, 264.6000000000001]], "isOverall": false, "label": "Get Adult Male Persian Cat-0", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-8", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-7", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-9", "isController": false}, {"data": [[1.70700438E12, 249.7777777777778], [1.70700432E12, 253.280701754386]], "isOverall": false, "label": "Cart Details", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-9", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-8", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-5", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-4", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-7", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-6", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-1", "isController": false}, {"data": [[1.70700438E12, 217.0], [1.70700432E12, 200.39062500000003]], "isOverall": false, "label": "Get Koi Fish-0", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-3", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-2", "isController": false}, {"data": [[1.70700438E12, 257.5333333333334], [1.70700432E12, 231.38333333333333]], "isOverall": false, "label": "Get Persian Cats", "isController": false}, {"data": [[1.70700438E12, 226.16666666666666], [1.70700432E12, 246.06666666666666]], "isOverall": false, "label": "Get Bulldog", "isController": false}, {"data": [[1.70700438E12, 227.4576271186441], [1.70700432E12, 213.21311475409834]], "isOverall": false, "label": "Get Dog", "isController": false}, {"data": [[1.70700438E12, 2803.5166666666664], [1.70700432E12, 3346.4333333333343]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.70700444E12, 173.5], [1.70700438E12, 245.1764705882351], [1.70700432E12, 203.57142857142856]], "isOverall": false, "label": "Get Order Confirm Form-0", "isController": false}, {"data": [[1.70700444E12, 0.0], [1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-1", "isController": false}, {"data": [[1.70700444E12, 0.0], [1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-2", "isController": false}, {"data": [[1.70700444E12, 0.0], [1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-3", "isController": false}, {"data": [[1.70700444E12, 0.0], [1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-4", "isController": false}, {"data": [[1.70700444E12, 0.0], [1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-5", "isController": false}, {"data": [[1.70700444E12, 0.0], [1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-6", "isController": false}, {"data": [[1.70700444E12, 0.0], [1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-7", "isController": false}, {"data": [[1.70700444E12, 0.0], [1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-8", "isController": false}, {"data": [[1.70700444E12, 0.0], [1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-9", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Bulldog-9", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Bulldog-8", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Bulldog-7", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Bulldog-6", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Bulldog-1", "isController": false}, {"data": [[1.70700438E12, 226.98305084745763], [1.70700432E12, 244.95081967213113]], "isOverall": false, "label": "Get Bulldog-0", "isController": false}, {"data": [[1.70700438E12, 215.3620689655172], [1.70700432E12, 201.38709677419357]], "isOverall": false, "label": "Get Koi Fish", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Bulldog-5", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Bulldog-4", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Bulldog-3", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Bulldog-2", "isController": false}, {"data": [[1.70700438E12, 454.9444444444445], [1.70700432E12, 476.1515151515153]], "isOverall": false, "label": "Get Fish-9", "isController": false}, {"data": [[1.70700438E12, 241.03333333333336], [1.70700432E12, 207.40000000000003]], "isOverall": false, "label": "Get Iguana Reptiles", "isController": false}, {"data": [[1.70700438E12, 489.9999999999999], [1.70700432E12, 513.9848484848484]], "isOverall": false, "label": "Get Fish-7", "isController": false}, {"data": [[1.70700438E12, 435.2830188679245], [1.70700432E12, 478.0447761194029]], "isOverall": false, "label": "Get Fish-8", "isController": false}, {"data": [[1.70700438E12, 250.1176470588235], [1.70700432E12, 513.2463768115942]], "isOverall": false, "label": "Get Fish-5", "isController": false}, {"data": [[1.70700438E12, 245.7450980392157], [1.70700432E12, 505.9565217391305]], "isOverall": false, "label": "Get Fish-6", "isController": false}, {"data": [[1.70700438E12, 210.53846153846155], [1.70700432E12, 458.8970588235293]], "isOverall": false, "label": "Get Fish-3", "isController": false}, {"data": [[1.70700438E12, 250.72549019607845], [1.70700432E12, 493.5507246376811]], "isOverall": false, "label": "Get Fish-4", "isController": false}, {"data": [[1.70700438E12, 228.13725490196074], [1.70700432E12, 317.98550724637676]], "isOverall": false, "label": "Get Fish-1", "isController": false}, {"data": [[1.70700438E12, 221.31372549019608], [1.70700432E12, 413.55072463768107]], "isOverall": false, "label": "Get Fish-2", "isController": false}, {"data": [[1.70700438E12, 194.59999999999997], [1.70700432E12, 619.9714285714283]], "isOverall": false, "label": "Get Fish-0", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-1", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-6", "isController": false}, {"data": [[1.70700438E12, 241.03333333333336], [1.70700432E12, 207.40000000000003]], "isOverall": false, "label": "Get Iguana Reptiles-0", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-7", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-3", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-8", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-2", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-9", "isController": false}, {"data": [[1.70700438E12, 227.4576271186441], [1.70700432E12, 213.21311475409834]], "isOverall": false, "label": "Get Dog-0", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Dog-2", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Dog-1", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Dog-4", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-9", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Dog-3", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-8", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Dog-6", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Dog-5", "isController": false}, {"data": [[1.70700444E12, 175.4], [1.70700438E12, 243.71153846153862], [1.70700432E12, 211.72727272727272]], "isOverall": false, "label": "Get Order Confirm Form", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Dog-8", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-5", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Dog-7", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-4", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-7", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Dog-9", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-6", "isController": false}, {"data": [[1.70700438E12, 207.5], [1.70700432E12, 229.52083333333331]], "isOverall": false, "label": "Remove One Cat From Cart", "isController": false}, {"data": [[1.70700438E12, 257.5333333333334], [1.70700432E12, 231.38333333333333]], "isOverall": false, "label": "Get Persian Cats-0", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-1", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-2", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-3", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-4", "isController": false}, {"data": [[1.70700438E12, 0.0], [1.70700432E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-5", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70700444E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 153.0, "minX": 1.70700432E12, "maxY": 2353.0, "series": [{"data": [[1.70700444E12, 898.0], [1.70700438E12, 1975.0], [1.70700432E12, 2353.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.70700444E12, 613.2000000000008], [1.70700438E12, 708.9000000000005], [1.70700432E12, 751.8000000000011]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.70700444E12, 898.0], [1.70700438E12, 1495.0], [1.70700432E12, 1590.2600000000002]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.70700444E12, 870.5999999999999], [1.70700438E12, 876.0], [1.70700432E12, 884.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.70700444E12, 158.0], [1.70700438E12, 153.0], [1.70700432E12, 153.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.70700444E12, 473.0], [1.70700438E12, 469.0], [1.70700432E12, 469.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70700444E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
            },
        };
    },