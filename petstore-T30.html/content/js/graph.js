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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 50.0, "series": [{"data": [[600.0, 2.0], [300.0, 3.0], [100.0, 41.0], [400.0, 7.0], [500.0, 7.0]], "isOverall": false, "label": "Get Cats-5", "isController": false}, {"data": [[300.0, 2.0], [100.0, 37.0], [400.0, 11.0], [500.0, 10.0]], "isOverall": false, "label": "Get Reptiles-0", "isController": false}, {"data": [[600.0, 3.0], [300.0, 2.0], [100.0, 43.0], [400.0, 8.0], [500.0, 4.0]], "isOverall": false, "label": "Get Cats-4", "isController": false}, {"data": [[100.0, 43.0], [400.0, 5.0], [500.0, 12.0]], "isOverall": false, "label": "Get Reptiles-1", "isController": false}, {"data": [[300.0, 2.0], [100.0, 45.0], [400.0, 8.0], [500.0, 5.0]], "isOverall": false, "label": "Get Cats-3", "isController": false}, {"data": [[100.0, 42.0], [400.0, 11.0], [500.0, 7.0]], "isOverall": false, "label": "Get Reptiles-2", "isController": false}, {"data": [[600.0, 2.0], [100.0, 41.0], [400.0, 10.0], [500.0, 7.0]], "isOverall": false, "label": "Get Cats-2", "isController": false}, {"data": [[100.0, 46.0], [400.0, 6.0], [500.0, 8.0]], "isOverall": false, "label": "Get Cats-1", "isController": false}, {"data": [[300.0, 3.0], [100.0, 45.0], [400.0, 3.0], [900.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "Get Cats-0", "isController": false}, {"data": [[600.0, 1.0], [400.0, 25.0], [500.0, 34.0]], "isOverall": false, "label": "Get Reptiles-7", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [400.0, 28.0], [100.0, 1.0], [500.0, 28.0]], "isOverall": false, "label": "Get Reptiles-8", "isController": false}, {"data": [[600.0, 5.0], [700.0, 1.0], [400.0, 26.0], [100.0, 1.0], [800.0, 1.0], [900.0, 1.0], [500.0, 25.0]], "isOverall": false, "label": "Get Reptiles-9", "isController": false}, {"data": [[1400.0, 1.0], [100.0, 40.0], [400.0, 10.0], [500.0, 9.0]], "isOverall": false, "label": "Get Reptiles-3", "isController": false}, {"data": [[600.0, 1.0], [100.0, 40.0], [400.0, 10.0], [500.0, 9.0]], "isOverall": false, "label": "Get Reptiles-4", "isController": false}, {"data": [[300.0, 5.0], [600.0, 1.0], [100.0, 31.0], [400.0, 10.0], [500.0, 13.0]], "isOverall": false, "label": "Get Reptiles-5", "isController": false}, {"data": [[600.0, 1.0], [300.0, 5.0], [100.0, 32.0], [400.0, 7.0], [500.0, 15.0]], "isOverall": false, "label": "Get Reptiles-6", "isController": false}, {"data": [[600.0, 1.0], [100.0, 46.0], [400.0, 8.0], [500.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "Cart Details-2", "isController": false}, {"data": [[600.0, 1.0], [100.0, 43.0], [400.0, 7.0], [500.0, 9.0]], "isOverall": false, "label": "Cart Details-1", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [700.0, 1.0], [100.0, 39.0], [400.0, 9.0], [500.0, 7.0]], "isOverall": false, "label": "Cart Details-0", "isController": false}, {"data": [[300.0, 3.0], [600.0, 2.0], [1400.0, 1.0], [100.0, 34.0], [400.0, 8.0], [1000.0, 1.0], [500.0, 11.0]], "isOverall": false, "label": "Cart Details-6", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [100.0, 35.0], [400.0, 14.0], [500.0, 8.0]], "isOverall": false, "label": "Cart Details-5", "isController": false}, {"data": [[300.0, 1.0], [1400.0, 1.0], [100.0, 40.0], [400.0, 7.0], [200.0, 1.0], [500.0, 10.0]], "isOverall": false, "label": "Cart Details-4", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 41.0], [400.0, 11.0], [500.0, 5.0], [1000.0, 1.0]], "isOverall": false, "label": "Cart Details-3", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [700.0, 1.0], [400.0, 23.0], [100.0, 7.0], [800.0, 1.0], [500.0, 25.0]], "isOverall": false, "label": "Get Cats-9", "isController": false}, {"data": [[700.0, 1.0], [400.0, 21.0], [100.0, 9.0], [500.0, 28.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Cats-8", "isController": false}, {"data": [[600.0, 1.0], [400.0, 28.0], [100.0, 3.0], [500.0, 28.0]], "isOverall": false, "label": "Cart Details-9", "isController": false}, {"data": [[600.0, 6.0], [100.0, 2.0], [400.0, 25.0], [800.0, 2.0], [900.0, 2.0], [500.0, 23.0]], "isOverall": false, "label": "Get Cats-7", "isController": false}, {"data": [[600.0, 1.0], [700.0, 2.0], [400.0, 33.0], [100.0, 1.0], [500.0, 23.0]], "isOverall": false, "label": "Cart Details-8", "isController": false}, {"data": [[600.0, 2.0], [300.0, 4.0], [700.0, 1.0], [100.0, 33.0], [400.0, 10.0], [500.0, 10.0]], "isOverall": false, "label": "Get Cats-6", "isController": false}, {"data": [[600.0, 2.0], [400.0, 29.0], [100.0, 2.0], [500.0, 27.0]], "isOverall": false, "label": "Cart Details-7", "isController": false}, {"data": [[2200.0, 1.0], [1100.0, 6.0], [1200.0, 2.0], [1300.0, 3.0], [1400.0, 5.0], [1500.0, 5.0], [800.0, 27.0], [1600.0, 2.0], [900.0, 5.0], [1800.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "Get Adult Male Persian Cat", "isController": false}, {"data": [[1100.0, 4.0], [1300.0, 2.0], [1400.0, 11.0], [1500.0, 8.0], [800.0, 23.0], [1700.0, 1.0], [900.0, 6.0], [1000.0, 4.0], [2000.0, 1.0]], "isOverall": false, "label": "Get Reptiles", "isController": false}, {"data": [[700.0, 2.0], [100.0, 45.0], [400.0, 7.0], [500.0, 6.0]], "isOverall": false, "label": "Remove One Cat From Cart-4", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [100.0, 50.0], [400.0, 5.0], [500.0, 3.0]], "isOverall": false, "label": "Remove One Cat From Cart-3", "isController": false}, {"data": [[300.0, 4.0], [700.0, 1.0], [100.0, 42.0], [400.0, 8.0], [500.0, 5.0]], "isOverall": false, "label": "Remove One Cat From Cart-6", "isController": false}, {"data": [[600.0, 3.0], [100.0, 44.0], [400.0, 10.0], [500.0, 3.0]], "isOverall": false, "label": "Remove One Cat From Cart-5", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 2.0], [700.0, 1.0], [100.0, 47.0], [400.0, 5.0], [1000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Remove One Cat From Cart-0", "isController": false}, {"data": [[600.0, 1.0], [100.0, 49.0], [400.0, 6.0], [500.0, 4.0]], "isOverall": false, "label": "Remove One Cat From Cart-2", "isController": false}, {"data": [[600.0, 1.0], [100.0, 50.0], [400.0, 4.0], [500.0, 5.0]], "isOverall": false, "label": "Remove One Cat From Cart-1", "isController": false}, {"data": [[1100.0, 8.0], [1200.0, 5.0], [1300.0, 3.0], [1400.0, 3.0], [700.0, 1.0], [1500.0, 3.0], [800.0, 24.0], [1600.0, 2.0], [900.0, 4.0], [1900.0, 1.0], [1000.0, 6.0]], "isOverall": false, "label": "Get Cats", "isController": false}, {"data": [[2200.0, 1.0], [1100.0, 3.0], [1200.0, 1.0], [1300.0, 4.0], [1400.0, 1.0], [1500.0, 4.0], [1600.0, 8.0], [800.0, 16.0], [1700.0, 15.0], [1800.0, 2.0], [1900.0, 3.0], [1000.0, 2.0]], "isOverall": false, "label": "Get Fish", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [700.0, 1.0], [400.0, 26.0], [100.0, 2.0], [900.0, 1.0], [500.0, 27.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-7", "isController": false}, {"data": [[600.0, 2.0], [300.0, 5.0], [700.0, 2.0], [100.0, 34.0], [800.0, 2.0], [400.0, 8.0], [500.0, 7.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-6", "isController": false}, {"data": [[1400.0, 1.0], [700.0, 1.0], [400.0, 20.0], [100.0, 7.0], [900.0, 1.0], [500.0, 30.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-9", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [400.0, 29.0], [900.0, 1.0], [500.0, 26.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-8", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [700.0, 1.0], [100.0, 44.0], [400.0, 6.0], [500.0, 6.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-3", "isController": false}, {"data": [[700.0, 2.0], [100.0, 41.0], [400.0, 7.0], [500.0, 10.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-2", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [700.0, 1.0], [100.0, 41.0], [400.0, 7.0], [900.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-5", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0], [100.0, 42.0], [400.0, 9.0], [500.0, 6.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-4", "isController": false}, {"data": [[300.0, 3.0], [700.0, 2.0], [100.0, 41.0], [400.0, 10.0], [500.0, 4.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-1", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [700.0, 1.0], [100.0, 43.0], [800.0, 1.0], [400.0, 9.0], [500.0, 4.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-0", "isController": false}, {"data": [[600.0, 2.0], [1300.0, 1.0], [1500.0, 1.0], [100.0, 4.0], [400.0, 22.0], [900.0, 1.0], [500.0, 29.0]], "isOverall": false, "label": "Remove One Cat From Cart-8", "isController": false}, {"data": [[0.0, 1.0], [600.0, 2.0], [700.0, 1.0], [400.0, 20.0], [100.0, 9.0], [800.0, 1.0], [900.0, 3.0], [500.0, 23.0]], "isOverall": false, "label": "Remove One Cat From Cart-7", "isController": false}, {"data": [[600.0, 3.0], [100.0, 10.0], [400.0, 25.0], [800.0, 1.0], [500.0, 21.0]], "isOverall": false, "label": "Remove One Cat From Cart-9", "isController": false}, {"data": [[1100.0, 4.0], [1200.0, 2.0], [1400.0, 5.0], [1500.0, 7.0], [800.0, 31.0], [1600.0, 3.0], [1700.0, 1.0], [900.0, 1.0], [1000.0, 5.0], [2000.0, 1.0]], "isOverall": false, "label": "Cart Details", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [100.0, 5.0], [400.0, 22.0], [500.0, 30.0]], "isOverall": false, "label": "Get Koi Fish-9", "isController": false}, {"data": [[600.0, 4.0], [700.0, 2.0], [400.0, 27.0], [800.0, 2.0], [100.0, 5.0], [500.0, 20.0]], "isOverall": false, "label": "Get Koi Fish-8", "isController": false}, {"data": [[600.0, 4.0], [300.0, 3.0], [700.0, 1.0], [100.0, 44.0], [400.0, 3.0], [500.0, 4.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Koi Fish-5", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [700.0, 3.0], [100.0, 46.0], [400.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "Get Koi Fish-4", "isController": false}, {"data": [[600.0, 2.0], [1400.0, 1.0], [700.0, 1.0], [400.0, 19.0], [100.0, 5.0], [500.0, 30.0], [1000.0, 2.0]], "isOverall": false, "label": "Get Koi Fish-7", "isController": false}, {"data": [[300.0, 7.0], [600.0, 1.0], [100.0, 43.0], [400.0, 4.0], [800.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Get Koi Fish-6", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [100.0, 48.0], [400.0, 6.0], [500.0, 3.0]], "isOverall": false, "label": "Get Koi Fish-1", "isController": false}, {"data": [[300.0, 3.0], [100.0, 48.0], [400.0, 5.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "Get Koi Fish-0", "isController": false}, {"data": [[300.0, 1.0], [600.0, 2.0], [700.0, 1.0], [100.0, 46.0], [400.0, 4.0], [900.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "Get Koi Fish-3", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 49.0], [400.0, 3.0], [500.0, 6.0]], "isOverall": false, "label": "Get Koi Fish-2", "isController": false}, {"data": [[1100.0, 7.0], [1200.0, 1.0], [1300.0, 2.0], [1400.0, 5.0], [1500.0, 5.0], [800.0, 30.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 6.0], [1000.0, 2.0]], "isOverall": false, "label": "Get Persian Cats", "isController": false}, {"data": [[1100.0, 1.0], [1300.0, 1.0], [1400.0, 8.0], [2700.0, 1.0], [700.0, 1.0], [1500.0, 4.0], [800.0, 27.0], [1600.0, 1.0], [1700.0, 1.0], [900.0, 5.0], [1000.0, 10.0]], "isOverall": false, "label": "Get Bulldog", "isController": false}, {"data": [[800.0, 34.0], [900.0, 3.0], [1000.0, 2.0], [1100.0, 5.0], [1200.0, 1.0], [1400.0, 4.0], [1500.0, 3.0], [400.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 3.0], [500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get Dog", "isController": false}, {"data": [[11200.0, 1.0], [11000.0, 3.0], [10900.0, 1.0], [11300.0, 5.0], [11600.0, 1.0], [11400.0, 1.0], [11500.0, 1.0], [11800.0, 3.0], [12000.0, 1.0], [11900.0, 1.0], [12100.0, 2.0], [12200.0, 1.0], [12400.0, 3.0], [12500.0, 1.0], [12300.0, 4.0], [12700.0, 2.0], [12900.0, 2.0], [12800.0, 2.0], [13300.0, 1.0], [13400.0, 3.0], [13500.0, 1.0], [13700.0, 1.0], [14100.0, 2.0], [13900.0, 1.0], [14200.0, 1.0], [14400.0, 1.0], [14700.0, 1.0], [15300.0, 1.0], [15200.0, 1.0], [15800.0, 1.0], [15700.0, 1.0], [16300.0, 1.0], [16100.0, 1.0], [17200.0, 1.0], [16500.0, 1.0], [17100.0, 1.0], [18000.0, 1.0], [17900.0, 1.0], [19000.0, 1.0], [19100.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[600.0, 1.0], [1200.0, 1.0], [300.0, 1.0], [700.0, 1.0], [800.0, 3.0], [100.0, 37.0], [400.0, 7.0], [500.0, 9.0]], "isOverall": false, "label": "Get Order Confirm Form-0", "isController": false}, {"data": [[600.0, 2.0], [100.0, 45.0], [400.0, 2.0], [500.0, 11.0]], "isOverall": false, "label": "Get Order Confirm Form-1", "isController": false}, {"data": [[600.0, 3.0], [100.0, 45.0], [400.0, 5.0], [500.0, 7.0]], "isOverall": false, "label": "Get Order Confirm Form-2", "isController": false}, {"data": [[300.0, 2.0], [1500.0, 1.0], [100.0, 39.0], [400.0, 11.0], [1000.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "Get Order Confirm Form-3", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [100.0, 45.0], [400.0, 5.0], [500.0, 8.0]], "isOverall": false, "label": "Get Order Confirm Form-4", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [100.0, 40.0], [400.0, 12.0], [800.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Get Order Confirm Form-5", "isController": false}, {"data": [[300.0, 5.0], [100.0, 39.0], [400.0, 7.0], [500.0, 9.0]], "isOverall": false, "label": "Get Order Confirm Form-6", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [700.0, 1.0], [400.0, 28.0], [900.0, 2.0], [500.0, 25.0], [1000.0, 2.0]], "isOverall": false, "label": "Get Order Confirm Form-7", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [400.0, 30.0], [800.0, 1.0], [100.0, 2.0], [500.0, 24.0]], "isOverall": false, "label": "Get Order Confirm Form-8", "isController": false}, {"data": [[600.0, 1.0], [400.0, 26.0], [100.0, 5.0], [500.0, 27.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Order Confirm Form-9", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [1500.0, 1.0], [400.0, 30.0], [100.0, 3.0], [500.0, 23.0]], "isOverall": false, "label": "Get Bulldog-9", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [400.0, 21.0], [100.0, 5.0], [500.0, 30.0], [1000.0, 2.0]], "isOverall": false, "label": "Get Bulldog-8", "isController": false}, {"data": [[600.0, 2.0], [400.0, 25.0], [100.0, 4.0], [500.0, 28.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Bulldog-7", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0], [100.0, 36.0], [400.0, 7.0], [800.0, 1.0], [500.0, 12.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Bulldog-6", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 49.0], [400.0, 4.0], [800.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Get Bulldog-1", "isController": false}, {"data": [[300.0, 8.0], [100.0, 39.0], [400.0, 7.0], [500.0, 5.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Bulldog-0", "isController": false}, {"data": [[1100.0, 5.0], [1200.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 3.0], [800.0, 32.0], [1600.0, 2.0], [1700.0, 2.0], [900.0, 6.0], [1800.0, 1.0], [1000.0, 5.0]], "isOverall": false, "label": "Get Koi Fish", "isController": false}, {"data": [[600.0, 2.0], [300.0, 2.0], [100.0, 42.0], [400.0, 6.0], [800.0, 2.0], [500.0, 6.0]], "isOverall": false, "label": "Get Bulldog-5", "isController": false}, {"data": [[100.0, 45.0], [400.0, 7.0], [900.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "Get Bulldog-4", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [400.0, 5.0], [100.0, 48.0], [500.0, 5.0]], "isOverall": false, "label": "Get Bulldog-3", "isController": false}, {"data": [[700.0, 1.0], [100.0, 48.0], [400.0, 6.0], [500.0, 5.0]], "isOverall": false, "label": "Get Bulldog-2", "isController": false}, {"data": [[600.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [100.0, 12.0], [400.0, 21.0], [800.0, 1.0], [900.0, 1.0], [500.0, 22.0]], "isOverall": false, "label": "Get Fish-9", "isController": false}, {"data": [[1100.0, 6.0], [1200.0, 3.0], [1300.0, 1.0], [1400.0, 4.0], [1500.0, 5.0], [800.0, 31.0], [1600.0, 1.0], [900.0, 3.0], [1000.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "Get Iguana Reptiles", "isController": false}, {"data": [[600.0, 4.0], [100.0, 10.0], [400.0, 12.0], [900.0, 2.0], [500.0, 30.0], [1000.0, 2.0]], "isOverall": false, "label": "Get Fish-7", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [700.0, 1.0], [100.0, 12.0], [400.0, 21.0], [800.0, 2.0], [900.0, 1.0], [500.0, 19.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Fish-8", "isController": false}, {"data": [[600.0, 5.0], [1200.0, 2.0], [700.0, 4.0], [400.0, 12.0], [100.0, 24.0], [500.0, 13.0]], "isOverall": false, "label": "Get Fish-5", "isController": false}, {"data": [[600.0, 12.0], [300.0, 1.0], [700.0, 3.0], [400.0, 11.0], [100.0, 22.0], [500.0, 11.0]], "isOverall": false, "label": "Get Fish-6", "isController": false}, {"data": [[600.0, 4.0], [700.0, 1.0], [100.0, 33.0], [400.0, 12.0], [500.0, 10.0]], "isOverall": false, "label": "Get Fish-3", "isController": false}, {"data": [[600.0, 4.0], [300.0, 1.0], [700.0, 4.0], [400.0, 9.0], [100.0, 26.0], [500.0, 16.0]], "isOverall": false, "label": "Get Fish-4", "isController": false}, {"data": [[300.0, 3.0], [700.0, 3.0], [100.0, 35.0], [400.0, 9.0], [800.0, 1.0], [500.0, 9.0]], "isOverall": false, "label": "Get Fish-1", "isController": false}, {"data": [[600.0, 4.0], [300.0, 4.0], [400.0, 9.0], [100.0, 29.0], [500.0, 14.0]], "isOverall": false, "label": "Get Fish-2", "isController": false}, {"data": [[600.0, 20.0], [300.0, 4.0], [700.0, 9.0], [100.0, 21.0], [400.0, 4.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Fish-0", "isController": false}, {"data": [[300.0, 1.0], [100.0, 45.0], [400.0, 4.0], [500.0, 10.0]], "isOverall": false, "label": "Get Iguana Reptiles-1", "isController": false}, {"data": [[300.0, 3.0], [100.0, 34.0], [400.0, 8.0], [800.0, 1.0], [900.0, 1.0], [500.0, 13.0]], "isOverall": false, "label": "Get Persian Cats-6", "isController": false}, {"data": [[300.0, 2.0], [100.0, 44.0], [400.0, 11.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "Get Iguana Reptiles-0", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [400.0, 24.0], [100.0, 3.0], [500.0, 31.0]], "isOverall": false, "label": "Get Persian Cats-7", "isController": false}, {"data": [[600.0, 1.0], [100.0, 45.0], [400.0, 8.0], [500.0, 6.0]], "isOverall": false, "label": "Get Iguana Reptiles-3", "isController": false}, {"data": [[600.0, 3.0], [700.0, 1.0], [400.0, 24.0], [100.0, 3.0], [500.0, 29.0]], "isOverall": false, "label": "Get Persian Cats-8", "isController": false}, {"data": [[300.0, 1.0], [100.0, 44.0], [400.0, 7.0], [500.0, 8.0]], "isOverall": false, "label": "Get Iguana Reptiles-2", "isController": false}, {"data": [[600.0, 3.0], [700.0, 1.0], [400.0, 17.0], [100.0, 5.0], [800.0, 1.0], [500.0, 33.0]], "isOverall": false, "label": "Get Persian Cats-9", "isController": false}, {"data": [[100.0, 49.0], [400.0, 4.0], [800.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "Get Dog-0", "isController": false}, {"data": [[700.0, 1.0], [100.0, 46.0], [400.0, 8.0], [500.0, 5.0]], "isOverall": false, "label": "Get Dog-2", "isController": false}, {"data": [[300.0, 1.0], [1400.0, 1.0], [100.0, 49.0], [400.0, 5.0], [500.0, 4.0]], "isOverall": false, "label": "Get Dog-1", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 45.0], [400.0, 6.0], [500.0, 7.0]], "isOverall": false, "label": "Get Dog-4", "isController": false}, {"data": [[600.0, 1.0], [100.0, 6.0], [400.0, 25.0], [200.0, 1.0], [900.0, 1.0], [500.0, 26.0]], "isOverall": false, "label": "Get Iguana Reptiles-9", "isController": false}, {"data": [[100.0, 47.0], [400.0, 5.0], [900.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "Get Dog-3", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [400.0, 22.0], [100.0, 7.0], [500.0, 28.0]], "isOverall": false, "label": "Get Iguana Reptiles-8", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 4.0], [600.0, 2.0], [700.0, 1.0], [100.0, 38.0], [400.0, 6.0], [500.0, 8.0]], "isOverall": false, "label": "Get Dog-6", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [700.0, 1.0], [100.0, 41.0], [400.0, 6.0], [1000.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "Get Dog-5", "isController": false}, {"data": [[2200.0, 1.0], [800.0, 25.0], [900.0, 5.0], [1000.0, 2.0], [1100.0, 4.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 6.0], [1500.0, 8.0], [1600.0, 4.0], [1700.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Get Order Confirm Form", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 3.0], [700.0, 1.0], [400.0, 23.0], [100.0, 5.0], [800.0, 1.0], [500.0, 25.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Dog-8", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [700.0, 1.0], [100.0, 40.0], [400.0, 5.0], [500.0, 10.0]], "isOverall": false, "label": "Get Iguana Reptiles-5", "isController": false}, {"data": [[600.0, 2.0], [1400.0, 1.0], [100.0, 5.0], [400.0, 28.0], [500.0, 23.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Dog-7", "isController": false}, {"data": [[300.0, 4.0], [100.0, 44.0], [400.0, 9.0], [500.0, 3.0]], "isOverall": false, "label": "Get Iguana Reptiles-4", "isController": false}, {"data": [[600.0, 2.0], [700.0, 1.0], [400.0, 21.0], [100.0, 7.0], [500.0, 29.0]], "isOverall": false, "label": "Get Iguana Reptiles-7", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [100.0, 7.0], [400.0, 21.0], [500.0, 28.0]], "isOverall": false, "label": "Get Dog-9", "isController": false}, {"data": [[600.0, 4.0], [300.0, 3.0], [700.0, 1.0], [100.0, 35.0], [400.0, 8.0], [500.0, 9.0]], "isOverall": false, "label": "Get Iguana Reptiles-6", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 3.0], [1200.0, 3.0], [1300.0, 1.0], [1400.0, 4.0], [1500.0, 3.0], [800.0, 35.0], [1600.0, 2.0], [1700.0, 2.0], [900.0, 2.0], [1800.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "Remove One Cat From Cart", "isController": false}, {"data": [[800.0, 1.0], [100.0, 45.0], [400.0, 7.0], [500.0, 7.0]], "isOverall": false, "label": "Get Persian Cats-0", "isController": false}, {"data": [[600.0, 1.0], [100.0, 42.0], [400.0, 8.0], [500.0, 9.0]], "isOverall": false, "label": "Get Persian Cats-1", "isController": false}, {"data": [[100.0, 44.0], [400.0, 9.0], [500.0, 7.0]], "isOverall": false, "label": "Get Persian Cats-2", "isController": false}, {"data": [[600.0, 1.0], [100.0, 40.0], [400.0, 14.0], [1000.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "Get Persian Cats-3", "isController": false}, {"data": [[600.0, 1.0], [100.0, 44.0], [400.0, 6.0], [500.0, 9.0]], "isOverall": false, "label": "Get Persian Cats-4", "isController": false}, {"data": [[300.0, 4.0], [600.0, 1.0], [100.0, 35.0], [400.0, 9.0], [500.0, 11.0]], "isOverall": false, "label": "Get Persian Cats-5", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 19100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 5273.0, "series": [{"data": [[0.0, 5273.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 2511.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 134.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 2.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 2.755102040816327, "minX": 1.70700366E12, "maxY": 28.36223381138632, "series": [{"data": [[1.70700366E12, 28.304896365274864], [1.70700378E12, 2.755102040816327], [1.70700372E12, 28.36223381138632]], "isOverall": false, "label": "Load Testing", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70700378E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 56.0, "minX": 1.0, "maxY": 17912.0, "series": [{"data": [[29.0, 579.0], [30.0, 265.57627118644064]], "isOverall": false, "label": "Get Cats-5", "isController": false}, {"data": [[29.983333333333334, 270.79999999999995]], "isOverall": false, "label": "Get Cats-5-Aggregated", "isController": false}, {"data": [[30.0, 297.4666666666667]], "isOverall": false, "label": "Get Reptiles-0", "isController": false}, {"data": [[30.0, 297.4666666666667]], "isOverall": false, "label": "Get Reptiles-0-Aggregated", "isController": false}, {"data": [[29.0, 168.0], [30.0, 266.32203389830505]], "isOverall": false, "label": "Get Cats-4", "isController": false}, {"data": [[29.983333333333334, 264.6833333333333]], "isOverall": false, "label": "Get Cats-4-Aggregated", "isController": false}, {"data": [[30.0, 266.5833333333333]], "isOverall": false, "label": "Get Reptiles-1", "isController": false}, {"data": [[30.0, 266.5833333333333]], "isOverall": false, "label": "Get Reptiles-1-Aggregated", "isController": false}, {"data": [[29.0, 477.0], [30.0, 241.76271186440684]], "isOverall": false, "label": "Get Cats-3", "isController": false}, {"data": [[29.983333333333334, 245.6833333333334]], "isOverall": false, "label": "Get Cats-3-Aggregated", "isController": false}, {"data": [[30.0, 270.3833333333333]], "isOverall": false, "label": "Get Reptiles-2", "isController": false}, {"data": [[30.0, 270.3833333333333]], "isOverall": false, "label": "Get Reptiles-2-Aggregated", "isController": false}, {"data": [[29.0, 179.0], [30.0, 279.83050847457633]], "isOverall": false, "label": "Get Cats-2", "isController": false}, {"data": [[29.983333333333334, 278.15000000000003]], "isOverall": false, "label": "Get Cats-2-Aggregated", "isController": false}, {"data": [[29.0, 177.0], [30.0, 248.7627118644068]], "isOverall": false, "label": "Get Cats-1", "isController": false}, {"data": [[29.983333333333334, 247.5666666666667]], "isOverall": false, "label": "Get Cats-1-Aggregated", "isController": false}, {"data": [[29.0, 181.0], [30.0, 260.6271186440678]], "isOverall": false, "label": "Get Cats-0", "isController": false}, {"data": [[29.983333333333334, 259.3]], "isOverall": false, "label": "Get Cats-0-Aggregated", "isController": false}, {"data": [[30.0, 508.71666666666664]], "isOverall": false, "label": "Get Reptiles-7", "isController": false}, {"data": [[30.0, 508.71666666666664]], "isOverall": false, "label": "Get Reptiles-7-Aggregated", "isController": false}, {"data": [[30.0, 497.79999999999995]], "isOverall": false, "label": "Get Reptiles-8", "isController": false}, {"data": [[30.0, 497.79999999999995]], "isOverall": false, "label": "Get Reptiles-8-Aggregated", "isController": false}, {"data": [[30.0, 526.0333333333333]], "isOverall": false, "label": "Get Reptiles-9", "isController": false}, {"data": [[30.0, 526.0333333333333]], "isOverall": false, "label": "Get Reptiles-9-Aggregated", "isController": false}, {"data": [[30.0, 296.0833333333334]], "isOverall": false, "label": "Get Reptiles-3", "isController": false}, {"data": [[30.0, 296.0833333333334]], "isOverall": false, "label": "Get Reptiles-3-Aggregated", "isController": false}, {"data": [[30.0, 283.3166666666667]], "isOverall": false, "label": "Get Reptiles-4", "isController": false}, {"data": [[30.0, 283.3166666666667]], "isOverall": false, "label": "Get Reptiles-4-Aggregated", "isController": false}, {"data": [[30.0, 318.75000000000006]], "isOverall": false, "label": "Get Reptiles-5", "isController": false}, {"data": [[30.0, 318.75000000000006]], "isOverall": false, "label": "Get Reptiles-5-Aggregated", "isController": false}, {"data": [[30.0, 313.50000000000006]], "isOverall": false, "label": "Get Reptiles-6", "isController": false}, {"data": [[30.0, 313.50000000000006]], "isOverall": false, "label": "Get Reptiles-6-Aggregated", "isController": false}, {"data": [[18.0, 326.5], [19.0, 446.33333333333337], [21.0, 330.5], [23.0, 482.0], [25.0, 164.0], [27.0, 481.0], [29.0, 213.69230769230774], [30.0, 245.32352941176472]], "isOverall": false, "label": "Cart Details-2", "isController": false}, {"data": [[28.033333333333335, 256.5166666666667]], "isOverall": false, "label": "Cart Details-2-Aggregated", "isController": false}, {"data": [[18.0, 319.0], [19.0, 390.3333333333333], [21.0, 176.0], [23.0, 514.0], [25.0, 407.0], [27.0, 173.0], [29.0, 194.3846153846154], [30.0, 264.85294117647055]], "isOverall": false, "label": "Cart Details-1", "isController": false}, {"data": [[28.033333333333335, 266.8]], "isOverall": false, "label": "Cart Details-1-Aggregated", "isController": false}, {"data": [[18.0, 345.5], [19.0, 404.3333333333333], [21.0, 180.0], [23.0, 481.0], [25.0, 407.75], [27.0, 175.0], [29.0, 201.0], [30.0, 304.14705882352945]], "isOverall": false, "label": "Cart Details-0", "isController": false}, {"data": [[28.033333333333335, 291.75000000000006]], "isOverall": false, "label": "Cart Details-0-Aggregated", "isController": false}, {"data": [[18.0, 536.0], [19.0, 342.6666666666667], [21.0, 339.0], [23.0, 321.0], [25.0, 427.0], [27.0, 519.0], [29.0, 216.3846153846154], [30.0, 348.8529411764706]], "isOverall": false, "label": "Cart Details-6", "isController": false}, {"data": [[28.033333333333335, 333.33333333333337]], "isOverall": false, "label": "Cart Details-6-Aggregated", "isController": false}, {"data": [[18.0, 483.5], [19.0, 390.0], [21.0, 316.5], [23.0, 479.0], [25.0, 441.0], [27.0, 160.0], [29.0, 265.84615384615387], [30.0, 286.73529411764713]], "isOverall": false, "label": "Cart Details-5", "isController": false}, {"data": [[28.033333333333335, 306.3]], "isOverall": false, "label": "Cart Details-5-Aggregated", "isController": false}, {"data": [[18.0, 324.0], [19.0, 378.3333333333333], [21.0, 327.0], [23.0, 488.0], [25.0, 431.25], [27.0, 161.0], [29.0, 197.6923076923077], [30.0, 294.0588235294117]], "isOverall": false, "label": "Cart Details-4", "isController": false}, {"data": [[28.033333333333335, 289.64999999999986]], "isOverall": false, "label": "Cart Details-4-Aggregated", "isController": false}, {"data": [[18.0, 499.0], [19.0, 168.33333333333334], [21.0, 342.5], [23.0, 159.0], [25.0, 410.5], [27.0, 492.0], [29.0, 192.07692307692307], [30.0, 293.88235294117635]], "isOverall": false, "label": "Cart Details-3", "isController": false}, {"data": [[28.033333333333335, 282.8333333333332]], "isOverall": false, "label": "Cart Details-3-Aggregated", "isController": false}, {"data": [[29.0, 477.0], [30.0, 489.57627118644075]], "isOverall": false, "label": "Get Cats-9", "isController": false}, {"data": [[29.983333333333334, 489.36666666666673]], "isOverall": false, "label": "Get Cats-9-Aggregated", "isController": false}, {"data": [[29.0, 477.0], [30.0, 467.61016949152537]], "isOverall": false, "label": "Get Cats-8", "isController": false}, {"data": [[29.983333333333334, 467.7666666666666]], "isOverall": false, "label": "Get Cats-8-Aggregated", "isController": false}, {"data": [[18.0, 522.0], [19.0, 513.3333333333334], [21.0, 482.5], [23.0, 472.0], [25.0, 340.25], [27.0, 475.0], [29.0, 500.84615384615387], [30.0, 497.0294117647059]], "isOverall": false, "label": "Cart Details-9", "isController": false}, {"data": [[28.033333333333335, 487.7833333333334]], "isOverall": false, "label": "Cart Details-9-Aggregated", "isController": false}, {"data": [[29.0, 528.0], [30.0, 531.5762711864409]], "isOverall": false, "label": "Get Cats-7", "isController": false}, {"data": [[29.983333333333334, 531.5166666666669]], "isOverall": false, "label": "Get Cats-7-Aggregated", "isController": false}, {"data": [[18.0, 501.0], [19.0, 498.6666666666667], [21.0, 523.0], [23.0, 489.0], [25.0, 495.25], [27.0, 513.0], [29.0, 522.3846153846154], [30.0, 498.4705882352941]], "isOverall": false, "label": "Cart Details-8", "isController": false}, {"data": [[28.033333333333335, 504.4333333333333]], "isOverall": false, "label": "Cart Details-8-Aggregated", "isController": false}, {"data": [[29.0, 511.0], [30.0, 309.64406779661016]], "isOverall": false, "label": "Get Cats-6", "isController": false}, {"data": [[29.983333333333334, 313.0]], "isOverall": false, "label": "Get Cats-6-Aggregated", "isController": false}, {"data": [[18.0, 523.5], [19.0, 493.3333333333333], [21.0, 507.5], [23.0, 481.0], [25.0, 509.25], [27.0, 478.0], [29.0, 481.07692307692304], [30.0, 494.5]], "isOverall": false, "label": "Cart Details-7", "isController": false}, {"data": [[28.033333333333335, 493.41666666666663]], "isOverall": false, "label": "Cart Details-7-Aggregated", "isController": false}, {"data": [[25.0, 1468.0], [29.0, 1081.1666666666667], [30.0, 1116.2553191489362]], "isOverall": false, "label": "Get Adult Male Persian Cat", "isController": false}, {"data": [[29.716666666666672, 1115.1]], "isOverall": false, "label": "Get Adult Male Persian Cat-Aggregated", "isController": false}, {"data": [[30.0, 1151.5000000000002]], "isOverall": false, "label": "Get Reptiles", "isController": false}, {"data": [[30.0, 1151.5000000000002]], "isOverall": false, "label": "Get Reptiles-Aggregated", "isController": false}, {"data": [[11.0, 171.0], [16.0, 488.0], [17.0, 170.0], [18.0, 332.75], [19.0, 158.0], [21.0, 157.0], [22.0, 159.0], [23.0, 169.0], [24.0, 172.0], [6.0, 533.0], [25.0, 171.33333333333334], [26.0, 165.5], [28.0, 159.0], [29.0, 168.125], [30.0, 289.9393939393939]], "isOverall": false, "label": "Remove One Cat From Cart-4", "isController": false}, {"data": [[26.799999999999997, 257.08333333333337]], "isOverall": false, "label": "Remove One Cat From Cart-4-Aggregated", "isController": false}, {"data": [[11.0, 159.0], [16.0, 160.0], [17.0, 496.0], [18.0, 246.5], [19.0, 495.0], [21.0, 175.0], [22.0, 530.0], [23.0, 158.0], [24.0, 169.0], [6.0, 476.0], [25.0, 217.33333333333334], [26.0, 172.0], [28.0, 161.0], [29.0, 165.25], [30.0, 215.42424242424244]], "isOverall": false, "label": "Remove One Cat From Cart-3", "isController": false}, {"data": [[26.799999999999997, 223.2]], "isOverall": false, "label": "Remove One Cat From Cart-3-Aggregated", "isController": false}, {"data": [[11.0, 160.0], [16.0, 320.0], [17.0, 470.0], [18.0, 252.25], [19.0, 476.0], [21.0, 157.0], [22.0, 482.0], [23.0, 177.0], [24.0, 488.0], [6.0, 496.0], [25.0, 157.66666666666666], [26.0, 166.5], [28.0, 167.0], [29.0, 164.875], [30.0, 272.06060606060606]], "isOverall": false, "label": "Remove One Cat From Cart-6", "isController": false}, {"data": [[26.799999999999997, 258.4166666666667]], "isOverall": false, "label": "Remove One Cat From Cart-6-Aggregated", "isController": false}, {"data": [[11.0, 161.0], [16.0, 466.0], [17.0, 161.0], [18.0, 325.5], [19.0, 529.0], [21.0, 160.0], [22.0, 476.0], [23.0, 165.0], [24.0, 489.0], [6.0, 470.0], [25.0, 166.33333333333334], [26.0, 173.0], [28.0, 167.0], [29.0, 165.625], [30.0, 268.9090909090909]], "isOverall": false, "label": "Remove One Cat From Cart-5", "isController": false}, {"data": [[26.799999999999997, 259.8333333333333]], "isOverall": false, "label": "Remove One Cat From Cart-5-Aggregated", "isController": false}, {"data": [[11.0, 173.0], [16.0, 484.0], [17.0, 171.0], [18.0, 259.5], [19.0, 477.0], [21.0, 178.0], [22.0, 162.0], [23.0, 169.0], [24.0, 175.0], [6.0, 529.0], [25.0, 176.66666666666666], [26.0, 175.5], [28.0, 177.0], [29.0, 173.375], [30.0, 292.090909090909]], "isOverall": false, "label": "Remove One Cat From Cart-0", "isController": false}, {"data": [[26.799999999999997, 260.6666666666666]], "isOverall": false, "label": "Remove One Cat From Cart-0-Aggregated", "isController": false}, {"data": [[11.0, 165.0], [16.0, 516.0], [17.0, 475.0], [18.0, 166.75], [19.0, 536.0], [21.0, 160.0], [22.0, 181.0], [23.0, 158.0], [24.0, 474.0], [6.0, 529.0], [25.0, 166.0], [26.0, 167.0], [28.0, 173.0], [29.0, 167.37499999999997], [30.0, 228.33333333333337]], "isOverall": false, "label": "Remove One Cat From Cart-2", "isController": false}, {"data": [[26.799999999999997, 229.0]], "isOverall": false, "label": "Remove One Cat From Cart-2-Aggregated", "isController": false}, {"data": [[11.0, 171.0], [16.0, 477.0], [17.0, 170.0], [18.0, 245.5], [19.0, 536.0], [21.0, 159.0], [22.0, 170.0], [23.0, 166.0], [24.0, 513.0], [6.0, 175.0], [25.0, 167.66666666666666], [26.0, 169.0], [28.0, 173.0], [29.0, 162.87499999999997], [30.0, 235.06060606060606]], "isOverall": false, "label": "Remove One Cat From Cart-1", "isController": false}, {"data": [[26.799999999999997, 226.55000000000004]], "isOverall": false, "label": "Remove One Cat From Cart-1-Aggregated", "isController": false}, {"data": [[29.0, 879.0], [30.0, 1086.864406779661]], "isOverall": false, "label": "Get Cats", "isController": false}, {"data": [[29.983333333333334, 1083.4]], "isOverall": false, "label": "Get Cats-Aggregated", "isController": false}, {"data": [[8.0, 1390.0], [10.0, 1718.0], [11.0, 1708.0], [12.0, 1700.0], [13.0, 1711.0], [14.0, 1704.0], [15.0, 1713.0], [16.0, 1810.0], [17.0, 1733.0], [18.0, 1655.5], [20.0, 1734.0], [21.0, 1675.5], [23.0, 1663.0], [6.0, 1750.5], [24.0, 1648.0], [26.0, 2112.0], [27.0, 1725.5], [7.0, 1458.0], [29.0, 1697.0], [30.0, 1177.514285714286]], "isOverall": false, "label": "Get Fish", "isController": false}, {"data": [[24.9, 1402.2500000000002]], "isOverall": false, "label": "Get Fish-Aggregated", "isController": false}, {"data": [[25.0, 477.0], [29.0, 484.0], [30.0, 510.5106382978725]], "isOverall": false, "label": "Get Adult Male Persian Cat-7", "isController": false}, {"data": [[29.716666666666672, 504.65000000000015]], "isOverall": false, "label": "Get Adult Male Persian Cat-7-Aggregated", "isController": false}, {"data": [[25.0, 480.0], [29.0, 392.58333333333337], [30.0, 296.19148936170205]], "isOverall": false, "label": "Get Adult Male Persian Cat-6", "isController": false}, {"data": [[29.716666666666672, 318.5333333333332]], "isOverall": false, "label": "Get Adult Male Persian Cat-6-Aggregated", "isController": false}, {"data": [[25.0, 508.0], [29.0, 422.16666666666663], [30.0, 513.5744680851063]], "isOverall": false, "label": "Get Adult Male Persian Cat-9", "isController": false}, {"data": [[29.716666666666672, 495.2]], "isOverall": false, "label": "Get Adult Male Persian Cat-9-Aggregated", "isController": false}, {"data": [[25.0, 516.0], [29.0, 501.25000000000006], [30.0, 517.0425531914893]], "isOverall": false, "label": "Get Adult Male Persian Cat-8", "isController": false}, {"data": [[29.716666666666672, 513.8666666666667]], "isOverall": false, "label": "Get Adult Male Persian Cat-8-Aggregated", "isController": false}, {"data": [[25.0, 516.0], [29.0, 348.16666666666663], [30.0, 237.3404255319149]], "isOverall": false, "label": "Get Adult Male Persian Cat-3", "isController": false}, {"data": [[29.716666666666672, 264.15]], "isOverall": false, "label": "Get Adult Male Persian Cat-3-Aggregated", "isController": false}, {"data": [[25.0, 500.0], [29.0, 278.5833333333333], [30.0, 278.3617021276596]], "isOverall": false, "label": "Get Adult Male Persian Cat-2", "isController": false}, {"data": [[29.716666666666672, 282.1000000000001]], "isOverall": false, "label": "Get Adult Male Persian Cat-2-Aggregated", "isController": false}, {"data": [[25.0, 501.0], [29.0, 312.5833333333333], [30.0, 262.5319148936169]], "isOverall": false, "label": "Get Adult Male Persian Cat-5", "isController": false}, {"data": [[29.716666666666672, 276.51666666666654]], "isOverall": false, "label": "Get Adult Male Persian Cat-5-Aggregated", "isController": false}, {"data": [[25.0, 158.0], [29.0, 306.0], [30.0, 257.4893617021276]], "isOverall": false, "label": "Get Adult Male Persian Cat-4", "isController": false}, {"data": [[29.716666666666672, 265.53333333333336]], "isOverall": false, "label": "Get Adult Male Persian Cat-4-Aggregated", "isController": false}, {"data": [[25.0, 480.0], [29.0, 307.1666666666667], [30.0, 260.4255319148936]], "isOverall": false, "label": "Get Adult Male Persian Cat-1", "isController": false}, {"data": [[29.716666666666672, 273.4333333333334]], "isOverall": false, "label": "Get Adult Male Persian Cat-1-Aggregated", "isController": false}, {"data": [[25.0, 472.0], [29.0, 257.3333333333333], [30.0, 291.57446808510633]], "isOverall": false, "label": "Get Adult Male Persian Cat-0", "isController": false}, {"data": [[29.716666666666672, 287.7333333333334]], "isOverall": false, "label": "Get Adult Male Persian Cat-0-Aggregated", "isController": false}, {"data": [[11.0, 478.0], [16.0, 479.0], [17.0, 165.0], [18.0, 505.5], [19.0, 554.0], [21.0, 525.0], [22.0, 519.0], [23.0, 493.0], [24.0, 525.0], [6.0, 484.0], [25.0, 473.0], [26.0, 497.0], [28.0, 522.0], [29.0, 513.375], [30.0, 550.8484848484848]], "isOverall": false, "label": "Remove One Cat From Cart-8", "isController": false}, {"data": [[26.799999999999997, 524.3999999999999]], "isOverall": false, "label": "Remove One Cat From Cart-8-Aggregated", "isController": false}, {"data": [[11.0, 497.0], [16.0, 533.0], [17.0, 623.0], [18.0, 324.0], [19.0, 475.0], [21.0, 536.0], [22.0, 181.0], [23.0, 172.0], [24.0, 488.0], [6.0, 56.0], [25.0, 503.3333333333333], [26.0, 338.0], [28.0, 526.0], [29.0, 463.5], [30.0, 538.6363636363636]], "isOverall": false, "label": "Remove One Cat From Cart-7", "isController": false}, {"data": [[26.799999999999997, 484.2000000000001]], "isOverall": false, "label": "Remove One Cat From Cart-7-Aggregated", "isController": false}, {"data": [[11.0, 483.0], [16.0, 484.0], [17.0, 855.0], [18.0, 496.5], [19.0, 475.0], [21.0, 174.0], [22.0, 500.0], [23.0, 172.0], [24.0, 536.0], [6.0, 484.0], [25.0, 376.3333333333333], [26.0, 474.5], [28.0, 512.0], [29.0, 522.0], [30.0, 439.4848484848485]], "isOverall": false, "label": "Remove One Cat From Cart-9", "isController": false}, {"data": [[26.799999999999997, 456.9666666666667]], "isOverall": false, "label": "Remove One Cat From Cart-9-Aggregated", "isController": false}, {"data": [[18.0, 1348.5], [19.0, 1307.3333333333333], [21.0, 1023.5], [23.0, 1434.0], [25.0, 1327.25], [27.0, 850.0], [29.0, 931.5384615384615], [30.0, 1124.7352941176473]], "isOverall": false, "label": "Cart Details", "isController": false}, {"data": [[28.033333333333335, 1110.166666666666]], "isOverall": false, "label": "Cart Details-Aggregated", "isController": false}, {"data": [[17.0, 323.5], [18.0, 473.0], [21.0, 517.5], [22.0, 483.0], [23.0, 494.5], [24.0, 346.5], [27.0, 483.0], [14.0, 522.0], [28.0, 548.6666666666666], [15.0, 410.0], [30.0, 493.48837209302326]], "isOverall": false, "label": "Get Koi Fish-9", "isController": false}, {"data": [[27.583333333333332, 483.51666666666677]], "isOverall": false, "label": "Get Koi Fish-9-Aggregated", "isController": false}, {"data": [[17.0, 595.5], [18.0, 520.0], [21.0, 572.0], [22.0, 473.0], [23.0, 503.5], [24.0, 500.0], [27.0, 885.0], [14.0, 512.0], [28.0, 541.0], [15.0, 547.0], [30.0, 475.6744186046512]], "isOverall": false, "label": "Get Koi Fish-8", "isController": false}, {"data": [[27.583333333333332, 498.3833333333334]], "isOverall": false, "label": "Get Koi Fish-8-Aggregated", "isController": false}, {"data": [[17.0, 477.0], [18.0, 173.0], [21.0, 396.5], [22.0, 170.0], [23.0, 166.5], [24.0, 165.0], [27.0, 698.0], [14.0, 160.0], [28.0, 278.6666666666667], [15.0, 433.0], [30.0, 254.9767441860466]], "isOverall": false, "label": "Get Koi Fish-5", "isController": false}, {"data": [[27.583333333333332, 271.2833333333333]], "isOverall": false, "label": "Get Koi Fish-5-Aggregated", "isController": false}, {"data": [[17.0, 612.0], [18.0, 174.0], [21.0, 473.5], [22.0, 167.0], [23.0, 166.5], [24.0, 170.5], [27.0, 537.0], [14.0, 179.0], [28.0, 281.0], [15.0, 429.0], [30.0, 232.88372093023258]], "isOverall": false, "label": "Get Koi Fish-4", "isController": false}, {"data": [[27.583333333333332, 260.28333333333336]], "isOverall": false, "label": "Get Koi Fish-4-Aggregated", "isController": false}, {"data": [[17.0, 356.5], [18.0, 478.0], [21.0, 514.5], [22.0, 520.0], [23.0, 531.0], [24.0, 495.5], [27.0, 548.0], [14.0, 477.0], [28.0, 666.0], [15.0, 501.5], [30.0, 524.0232558139536]], "isOverall": false, "label": "Get Koi Fish-7", "isController": false}, {"data": [[27.583333333333332, 522.5333333333334]], "isOverall": false, "label": "Get Koi Fish-7-Aggregated", "isController": false}, {"data": [[17.0, 176.0], [18.0, 158.0], [21.0, 366.0], [22.0, 159.0], [23.0, 169.5], [24.0, 159.5], [27.0, 638.0], [14.0, 175.0], [28.0, 215.0], [15.0, 246.5], [30.0, 250.99999999999997]], "isOverall": false, "label": "Get Koi Fish-6", "isController": false}, {"data": [[27.583333333333332, 246.71666666666673]], "isOverall": false, "label": "Get Koi Fish-6-Aggregated", "isController": false}, {"data": [[17.0, 350.0], [18.0, 174.0], [21.0, 165.5], [22.0, 171.0], [23.0, 177.5], [24.0, 166.0], [27.0, 182.0], [14.0, 173.0], [28.0, 171.66666666666666], [15.0, 169.0], [30.0, 247.95348837209306]], "isOverall": false, "label": "Get Koi Fish-1", "isController": false}, {"data": [[27.583333333333332, 232.21666666666667]], "isOverall": false, "label": "Get Koi Fish-1-Aggregated", "isController": false}, {"data": [[17.0, 358.0], [18.0, 179.0], [21.0, 331.5], [22.0, 179.0], [23.0, 169.0], [24.0, 179.0], [27.0, 183.0], [14.0, 177.0], [28.0, 181.66666666666666], [15.0, 171.0], [30.0, 245.2325581395349]], "isOverall": false, "label": "Get Koi Fish-0", "isController": false}, {"data": [[27.583333333333332, 237.08333333333337]], "isOverall": false, "label": "Get Koi Fish-0-Aggregated", "isController": false}, {"data": [[17.0, 357.0], [18.0, 179.0], [21.0, 240.5], [22.0, 171.0], [23.0, 163.5], [24.0, 161.5], [27.0, 520.0], [14.0, 163.0], [28.0, 166.66666666666666], [15.0, 434.5], [30.0, 264.0232558139535]], "isOverall": false, "label": "Get Koi Fish-3", "isController": false}, {"data": [[27.583333333333332, 259.9999999999999]], "isOverall": false, "label": "Get Koi Fish-3-Aggregated", "isController": false}, {"data": [[17.0, 626.0], [18.0, 175.0], [21.0, 352.5], [22.0, 180.0], [23.0, 179.5], [24.0, 161.0], [27.0, 535.0], [14.0, 175.0], [28.0, 178.66666666666666], [15.0, 168.5], [30.0, 220.1627906976744]], "isOverall": false, "label": "Get Koi Fish-2", "isController": false}, {"data": [[27.583333333333332, 234.05]], "isOverall": false, "label": "Get Koi Fish-2-Aggregated", "isController": false}, {"data": [[29.0, 1197.5], [30.0, 1062.1964285714287]], "isOverall": false, "label": "Get Persian Cats", "isController": false}, {"data": [[29.933333333333334, 1071.2166666666667]], "isOverall": false, "label": "Get Persian Cats-Aggregated", "isController": false}, {"data": [[25.0, 975.0], [28.0, 1121.0], [30.0, 1092.4482758620686]], "isOverall": false, "label": "Get Bulldog", "isController": false}, {"data": [[29.883333333333333, 1090.9666666666672]], "isOverall": false, "label": "Get Bulldog-Aggregated", "isController": false}, {"data": [[18.0, 883.0], [21.0, 882.0], [24.0, 522.0], [25.0, 683.5], [27.0, 1471.6666666666667], [30.0, 1074.921568627451]], "isOverall": false, "label": "Get Dog", "isController": false}, {"data": [[29.08333333333334, 1062.8666666666666]], "isOverall": false, "label": "Get Dog-Aggregated", "isController": false}, {"data": [[2.0, 17912.0], [3.0, 12796.0], [4.0, 17134.0], [5.0, 14168.0], [6.0, 12856.0], [7.0, 11015.0], [8.0, 11536.0], [9.0, 16144.0], [10.0, 16557.0], [11.0, 14799.0], [12.0, 13343.0], [13.0, 11311.0], [14.0, 11047.0], [15.0, 12114.0], [16.0, 11356.0], [1.0, 14272.0], [17.0, 13480.0], [18.0, 10984.0], [19.0, 11351.0], [20.0, 11441.0], [21.0, 11017.0], [22.0, 11889.0], [23.0, 11678.0], [24.0, 11354.0], [25.0, 11219.0], [26.0, 12438.0], [27.0, 15790.0], [28.0, 12704.0], [29.0, 12382.0], [30.0, 13858.967741935483]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[22.750000000000014, 13428.583333333334]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[2.0, 525.0], [3.0, 175.0], [4.0, 482.0], [5.0, 168.0], [6.0, 160.0], [7.0, 177.0], [8.0, 179.0], [9.0, 486.0], [10.0, 479.0], [11.0, 530.0], [12.0, 183.0], [13.0, 180.0], [14.0, 162.0], [15.0, 176.0], [16.0, 179.0], [1.0, 195.0], [17.0, 542.0], [18.0, 176.0], [19.0, 183.0], [20.0, 177.0], [21.0, 181.0], [22.0, 181.0], [23.0, 174.0], [24.0, 177.0], [25.0, 175.0], [26.0, 186.0], [27.0, 175.0], [28.0, 175.0], [29.0, 180.0], [30.0, 418.80645161290334]], "isOverall": false, "label": "Get Order Confirm Form-0", "isController": false}, {"data": [[22.750000000000014, 335.0166666666666]], "isOverall": false, "label": "Get Order Confirm Form-0-Aggregated", "isController": false}, {"data": [[2.0, 173.0], [3.0, 172.0], [4.0, 519.0], [5.0, 172.0], [6.0, 171.0], [7.0, 158.0], [8.0, 162.0], [9.0, 160.0], [10.0, 530.0], [11.0, 550.0], [12.0, 166.0], [13.0, 161.0], [14.0, 474.0], [15.0, 171.0], [16.0, 171.0], [1.0, 182.0], [17.0, 526.0], [18.0, 174.0], [19.0, 154.0], [20.0, 173.0], [21.0, 179.0], [22.0, 178.0], [23.0, 172.0], [24.0, 173.0], [25.0, 160.0], [26.0, 161.0], [27.0, 160.0], [28.0, 161.0], [29.0, 161.0], [30.0, 293.6451612903226]], "isOverall": false, "label": "Get Order Confirm Form-1", "isController": false}, {"data": [[22.750000000000014, 262.11666666666673]], "isOverall": false, "label": "Get Order Confirm Form-1-Aggregated", "isController": false}, {"data": [[2.0, 479.0], [3.0, 172.0], [4.0, 481.0], [5.0, 171.0], [6.0, 170.0], [7.0, 159.0], [8.0, 176.0], [9.0, 482.0], [10.0, 158.0], [11.0, 176.0], [12.0, 168.0], [13.0, 178.0], [14.0, 174.0], [15.0, 158.0], [16.0, 176.0], [1.0, 177.0], [17.0, 549.0], [18.0, 158.0], [19.0, 172.0], [20.0, 161.0], [21.0, 178.0], [22.0, 176.0], [23.0, 161.0], [24.0, 172.0], [25.0, 173.0], [26.0, 184.0], [27.0, 174.0], [28.0, 173.0], [29.0, 176.0], [30.0, 303.51612903225805]], "isOverall": false, "label": "Get Order Confirm Form-2", "isController": false}, {"data": [[22.750000000000014, 261.1833333333333]], "isOverall": false, "label": "Get Order Confirm Form-2-Aggregated", "isController": false}, {"data": [[2.0, 518.0], [3.0, 166.0], [4.0, 475.0], [5.0, 487.0], [6.0, 159.0], [7.0, 172.0], [8.0, 175.0], [9.0, 514.0], [10.0, 481.0], [11.0, 497.0], [12.0, 492.0], [13.0, 161.0], [14.0, 158.0], [15.0, 165.0], [16.0, 161.0], [1.0, 163.0], [17.0, 482.0], [18.0, 161.0], [19.0, 181.0], [20.0, 166.0], [21.0, 158.0], [22.0, 162.0], [23.0, 166.0], [24.0, 156.0], [25.0, 156.0], [26.0, 169.0], [27.0, 163.0], [28.0, 161.0], [29.0, 172.0], [30.0, 344.1612903225806]], "isOverall": false, "label": "Get Order Confirm Form-3", "isController": false}, {"data": [[22.750000000000014, 301.09999999999997]], "isOverall": false, "label": "Get Order Confirm Form-3-Aggregated", "isController": false}, {"data": [[2.0, 539.0], [3.0, 161.0], [4.0, 159.0], [5.0, 165.0], [6.0, 159.0], [7.0, 175.0], [8.0, 156.0], [9.0, 492.0], [10.0, 517.0], [11.0, 533.0], [12.0, 177.0], [13.0, 173.0], [14.0, 481.0], [15.0, 172.0], [16.0, 173.0], [1.0, 181.0], [17.0, 179.0], [18.0, 158.0], [19.0, 157.0], [20.0, 173.0], [21.0, 162.0], [22.0, 159.0], [23.0, 160.0], [24.0, 175.0], [25.0, 172.0], [26.0, 168.0], [27.0, 159.0], [28.0, 171.0], [29.0, 175.0], [30.0, 278.41935483870964]], "isOverall": false, "label": "Get Order Confirm Form-4", "isController": false}, {"data": [[22.750000000000014, 253.5333333333334]], "isOverall": false, "label": "Get Order Confirm Form-4-Aggregated", "isController": false}, {"data": [[2.0, 473.0], [3.0, 160.0], [4.0, 487.0], [5.0, 157.0], [6.0, 160.0], [7.0, 170.0], [8.0, 173.0], [9.0, 496.0], [10.0, 481.0], [11.0, 513.0], [12.0, 171.0], [13.0, 170.0], [14.0, 474.0], [15.0, 173.0], [16.0, 176.0], [1.0, 171.0], [17.0, 537.0], [18.0, 160.0], [19.0, 162.0], [20.0, 166.0], [21.0, 177.0], [22.0, 178.0], [23.0, 159.0], [24.0, 157.0], [25.0, 163.0], [26.0, 168.0], [27.0, 162.0], [28.0, 170.0], [29.0, 156.0], [30.0, 320.7096774193549]], "isOverall": false, "label": "Get Order Confirm Form-5", "isController": false}, {"data": [[22.750000000000014, 284.36666666666673]], "isOverall": false, "label": "Get Order Confirm Form-5-Aggregated", "isController": false}, {"data": [[2.0, 539.0], [3.0, 160.0], [4.0, 492.0], [5.0, 158.0], [6.0, 172.0], [7.0, 159.0], [8.0, 172.0], [9.0, 486.0], [10.0, 519.0], [11.0, 351.0], [12.0, 159.0], [13.0, 159.0], [14.0, 484.0], [15.0, 171.0], [16.0, 174.0], [1.0, 166.0], [17.0, 526.0], [18.0, 156.0], [19.0, 159.0], [20.0, 158.0], [21.0, 158.0], [22.0, 176.0], [23.0, 158.0], [24.0, 156.0], [25.0, 161.0], [26.0, 159.0], [27.0, 159.0], [28.0, 161.0], [29.0, 174.0], [30.0, 298.41935483870975]], "isOverall": false, "label": "Get Order Confirm Form-6", "isController": false}, {"data": [[22.750000000000014, 270.54999999999995]], "isOverall": false, "label": "Get Order Confirm Form-6-Aggregated", "isController": false}, {"data": [[2.0, 490.0], [3.0, 483.0], [4.0, 482.0], [5.0, 526.0], [6.0, 509.0], [7.0, 519.0], [8.0, 535.0], [9.0, 478.0], [10.0, 667.0], [11.0, 351.0], [12.0, 476.0], [13.0, 479.0], [14.0, 483.0], [15.0, 481.0], [16.0, 517.0], [1.0, 526.0], [17.0, 531.0], [18.0, 486.0], [19.0, 496.0], [20.0, 520.0], [21.0, 518.0], [22.0, 497.0], [23.0, 489.0], [24.0, 522.0], [25.0, 517.0], [26.0, 486.0], [27.0, 486.0], [28.0, 486.0], [29.0, 498.0], [30.0, 582.4516129032257]], "isOverall": false, "label": "Get Order Confirm Form-7", "isController": false}, {"data": [[22.750000000000014, 543.1666666666665]], "isOverall": false, "label": "Get Order Confirm Form-7-Aggregated", "isController": false}, {"data": [[2.0, 524.0], [3.0, 572.0], [4.0, 518.0], [5.0, 477.0], [6.0, 516.0], [7.0, 482.0], [8.0, 479.0], [9.0, 523.0], [10.0, 481.0], [11.0, 518.0], [12.0, 468.0], [13.0, 512.0], [14.0, 476.0], [15.0, 470.0], [16.0, 512.0], [1.0, 173.0], [17.0, 475.0], [18.0, 475.0], [19.0, 575.0], [20.0, 490.0], [21.0, 476.0], [22.0, 669.0], [23.0, 496.0], [24.0, 521.0], [25.0, 475.0], [26.0, 517.0], [27.0, 530.0], [28.0, 481.0], [29.0, 495.0], [30.0, 523.2258064516128]], "isOverall": false, "label": "Get Order Confirm Form-8", "isController": false}, {"data": [[22.750000000000014, 509.93333333333317]], "isOverall": false, "label": "Get Order Confirm Form-8-Aggregated", "isController": false}, {"data": [[2.0, 159.0], [3.0, 472.0], [4.0, 478.0], [5.0, 476.0], [6.0, 497.0], [7.0, 474.0], [8.0, 532.0], [9.0, 523.0], [10.0, 159.0], [11.0, 521.0], [12.0, 477.0], [13.0, 513.0], [14.0, 521.0], [15.0, 475.0], [16.0, 515.0], [1.0, 519.0], [17.0, 540.0], [18.0, 478.0], [19.0, 523.0], [20.0, 529.0], [21.0, 475.0], [22.0, 476.0], [23.0, 505.0], [24.0, 173.0], [25.0, 479.0], [26.0, 522.0], [27.0, 480.0], [28.0, 482.0], [29.0, 521.0], [30.0, 502.9677419354839]], "isOverall": false, "label": "Get Order Confirm Form-9", "isController": false}, {"data": [[22.750000000000014, 484.7666666666667]], "isOverall": false, "label": "Get Order Confirm Form-9-Aggregated", "isController": false}, {"data": [[25.0, 640.0], [28.0, 473.0], [30.0, 508.51724137931024]], "isOverall": false, "label": "Get Bulldog-9", "isController": false}, {"data": [[29.883333333333333, 510.11666666666673]], "isOverall": false, "label": "Get Bulldog-9-Aggregated", "isController": false}, {"data": [[25.0, 589.0], [28.0, 469.0], [30.0, 495.206896551724]], "isOverall": false, "label": "Get Bulldog-8", "isController": false}, {"data": [[29.883333333333333, 496.33333333333326]], "isOverall": false, "label": "Get Bulldog-8-Aggregated", "isController": false}, {"data": [[25.0, 493.0], [28.0, 671.0], [30.0, 495.3793103448278]], "isOverall": false, "label": "Get Bulldog-7", "isController": false}, {"data": [[29.883333333333333, 498.2666666666667]], "isOverall": false, "label": "Get Bulldog-7-Aggregated", "isController": false}, {"data": [[25.0, 176.0], [28.0, 710.0], [30.0, 306.7758620689656]], "isOverall": false, "label": "Get Bulldog-6", "isController": false}, {"data": [[29.883333333333333, 311.3166666666665]], "isOverall": false, "label": "Get Bulldog-6-Aggregated", "isController": false}, {"data": [[25.0, 179.0], [28.0, 174.0], [30.0, 238.5172413793103]], "isOverall": false, "label": "Get Bulldog-1", "isController": false}, {"data": [[29.883333333333333, 236.45000000000007]], "isOverall": false, "label": "Get Bulldog-1-Aggregated", "isController": false}, {"data": [[25.0, 157.0], [28.0, 172.0], [30.0, 281.551724137931]], "isOverall": false, "label": "Get Bulldog-0", "isController": false}, {"data": [[29.883333333333333, 277.65]], "isOverall": false, "label": "Get Bulldog-0-Aggregated", "isController": false}, {"data": [[17.0, 1312.0], [18.0, 875.0], [21.0, 1279.0], [22.0, 861.0], [23.0, 864.5], [24.0, 866.5], [27.0, 1592.0], [14.0, 875.0], [28.0, 1013.6666666666666], [15.0, 969.5], [30.0, 1043.8837209302326]], "isOverall": false, "label": "Get Koi Fish", "isController": false}, {"data": [[27.583333333333332, 1045.2333333333331]], "isOverall": false, "label": "Get Koi Fish-Aggregated", "isController": false}, {"data": [[25.0, 161.0], [28.0, 639.0], [30.0, 271.4999999999999]], "isOverall": false, "label": "Get Bulldog-5", "isController": false}, {"data": [[29.883333333333333, 275.7833333333334]], "isOverall": false, "label": "Get Bulldog-5-Aggregated", "isController": false}, {"data": [[25.0, 156.0], [28.0, 512.0], [30.0, 256.68965517241384]], "isOverall": false, "label": "Get Bulldog-4", "isController": false}, {"data": [[29.883333333333333, 259.26666666666654]], "isOverall": false, "label": "Get Bulldog-4-Aggregated", "isController": false}, {"data": [[25.0, 499.0], [28.0, 170.0], [30.0, 232.3965517241379]], "isOverall": false, "label": "Get Bulldog-3", "isController": false}, {"data": [[29.883333333333333, 235.80000000000004]], "isOverall": false, "label": "Get Bulldog-3-Aggregated", "isController": false}, {"data": [[25.0, 176.0], [28.0, 475.0], [30.0, 237.6724137931034]], "isOverall": false, "label": "Get Bulldog-2", "isController": false}, {"data": [[29.883333333333333, 240.59999999999994]], "isOverall": false, "label": "Get Bulldog-2-Aggregated", "isController": false}, {"data": [[8.0, 160.0], [10.0, 493.0], [11.0, 474.0], [12.0, 484.0], [13.0, 504.0], [14.0, 533.0], [15.0, 541.0], [16.0, 608.0], [17.0, 536.0], [18.0, 316.5], [20.0, 523.0], [21.0, 477.0], [23.0, 489.0], [6.0, 158.0], [24.0, 520.0], [26.0, 873.5], [27.0, 505.0], [7.0, 157.0], [29.0, 537.5], [30.0, 464.8857142857143]], "isOverall": false, "label": "Get Fish-9", "isController": false}, {"data": [[24.9, 467.13333333333344]], "isOverall": false, "label": "Get Fish-9-Aggregated", "isController": false}, {"data": [[30.0, 1040.4]], "isOverall": false, "label": "Get Iguana Reptiles", "isController": false}, {"data": [[30.0, 1040.4]], "isOverall": false, "label": "Get Iguana Reptiles-Aggregated", "isController": false}, {"data": [[8.0, 160.0], [10.0, 697.0], [11.0, 516.0], [12.0, 532.0], [13.0, 516.0], [14.0, 521.0], [15.0, 495.0], [16.0, 511.0], [17.0, 523.0], [18.0, 501.5], [20.0, 525.0], [21.0, 524.5], [23.0, 525.0], [6.0, 163.0], [24.0, 510.0], [26.0, 741.0], [27.0, 582.0], [7.0, 159.0], [29.0, 527.5], [30.0, 497.71428571428555]], "isOverall": false, "label": "Get Fish-7", "isController": false}, {"data": [[24.9, 494.81666666666666]], "isOverall": false, "label": "Get Fish-7-Aggregated", "isController": false}, {"data": [[8.0, 160.0], [10.0, 524.0], [11.0, 501.0], [12.0, 536.0], [13.0, 474.0], [14.0, 488.0], [15.0, 517.0], [16.0, 522.0], [17.0, 483.0], [18.0, 500.5], [20.0, 485.0], [21.0, 531.0], [23.0, 529.0], [6.0, 157.5], [24.0, 482.0], [26.0, 770.0], [27.0, 549.0], [7.0, 160.0], [29.0, 496.5], [30.0, 461.8571428571428]], "isOverall": false, "label": "Get Fish-8", "isController": false}, {"data": [[24.9, 467.25000000000006]], "isOverall": false, "label": "Get Fish-8-Aggregated", "isController": false}, {"data": [[8.0, 680.0], [10.0, 473.0], [11.0, 482.0], [12.0, 535.0], [13.0, 539.0], [14.0, 512.0], [15.0, 468.0], [16.0, 651.0], [17.0, 538.0], [18.0, 611.0], [20.0, 477.0], [21.0, 500.5], [23.0, 480.0], [6.0, 695.5], [24.0, 479.0], [26.0, 450.0], [27.0, 476.0], [7.0, 704.0], [29.0, 593.0], [30.0, 329.6]], "isOverall": false, "label": "Get Fish-5", "isController": false}, {"data": [[24.9, 420.09999999999997]], "isOverall": false, "label": "Get Fish-5-Aggregated", "isController": false}, {"data": [[8.0, 643.0], [10.0, 478.0], [11.0, 695.0], [12.0, 527.0], [13.0, 645.0], [14.0, 538.0], [15.0, 470.0], [16.0, 729.0], [17.0, 524.0], [18.0, 330.0], [20.0, 541.0], [21.0, 478.0], [23.0, 474.0], [6.0, 674.5], [24.0, 726.0], [26.0, 590.0], [27.0, 568.0], [7.0, 641.0], [29.0, 563.0], [30.0, 317.2571428571428]], "isOverall": false, "label": "Get Fish-6", "isController": false}, {"data": [[24.9, 419.0333333333334]], "isOverall": false, "label": "Get Fish-6-Aggregated", "isController": false}, {"data": [[8.0, 160.0], [10.0, 528.0], [11.0, 477.0], [12.0, 159.0], [13.0, 481.0], [14.0, 162.0], [15.0, 478.0], [16.0, 518.0], [17.0, 527.0], [18.0, 569.5], [20.0, 554.0], [21.0, 517.0], [23.0, 470.0], [6.0, 403.5], [24.0, 524.0], [26.0, 477.5], [27.0, 596.0], [7.0, 642.0], [29.0, 526.0], [30.0, 225.57142857142864]], "isOverall": false, "label": "Get Fish-3", "isController": false}, {"data": [[24.9, 329.2333333333333]], "isOverall": false, "label": "Get Fish-3-Aggregated", "isController": false}, {"data": [[8.0, 725.0], [10.0, 534.0], [11.0, 518.0], [12.0, 524.0], [13.0, 481.0], [14.0, 515.0], [15.0, 531.0], [16.0, 513.0], [17.0, 533.0], [18.0, 606.5], [20.0, 522.0], [21.0, 511.0], [23.0, 484.0], [6.0, 701.0], [24.0, 527.0], [26.0, 499.5], [27.0, 614.0], [7.0, 666.0], [29.0, 493.5], [30.0, 259.9142857142857]], "isOverall": false, "label": "Get Fish-4", "isController": false}, {"data": [[24.9, 383.68333333333334]], "isOverall": false, "label": "Get Fish-4-Aggregated", "isController": false}, {"data": [[8.0, 707.0], [10.0, 176.0], [11.0, 179.0], [12.0, 522.0], [13.0, 181.0], [14.0, 517.0], [15.0, 175.0], [16.0, 493.0], [17.0, 169.0], [18.0, 599.0], [20.0, 164.0], [21.0, 318.0], [23.0, 534.0], [6.0, 452.0], [24.0, 160.0], [26.0, 345.0], [27.0, 358.0], [7.0, 162.0], [29.0, 338.0], [30.0, 285.97142857142865]], "isOverall": false, "label": "Get Fish-1", "isController": false}, {"data": [[24.9, 316.13333333333327]], "isOverall": false, "label": "Get Fish-1-Aggregated", "isController": false}, {"data": [[8.0, 679.0], [10.0, 485.0], [11.0, 523.0], [12.0, 518.0], [13.0, 538.0], [14.0, 480.0], [15.0, 483.0], [16.0, 170.0], [17.0, 519.0], [18.0, 342.0], [20.0, 541.0], [21.0, 344.0], [23.0, 163.0], [6.0, 671.0], [24.0, 468.0], [26.0, 476.5], [27.0, 340.0], [7.0, 693.0], [29.0, 349.5], [30.0, 265.85714285714295]], "isOverall": false, "label": "Get Fish-2", "isController": false}, {"data": [[24.9, 343.51666666666665]], "isOverall": false, "label": "Get Fish-2-Aggregated", "isController": false}, {"data": [[8.0, 652.0], [10.0, 715.0], [11.0, 722.0], [12.0, 642.0], [13.0, 721.0], [14.0, 654.0], [15.0, 696.0], [16.0, 686.0], [17.0, 655.0], [18.0, 655.0], [20.0, 683.0], [21.0, 665.5], [23.0, 660.0], [6.0, 897.0], [24.0, 644.0], [26.0, 692.0], [27.0, 685.0], [7.0, 652.0], [29.0, 657.5], [30.0, 319.40000000000003]], "isOverall": false, "label": "Get Fish-0", "isController": false}, {"data": [[24.9, 474.41666666666663]], "isOverall": false, "label": "Get Fish-0-Aggregated", "isController": false}, {"data": [[30.0, 253.7166666666667]], "isOverall": false, "label": "Get Iguana Reptiles-1", "isController": false}, {"data": [[30.0, 253.7166666666667]], "isOverall": false, "label": "Get Iguana Reptiles-1-Aggregated", "isController": false}, {"data": [[29.0, 369.75], [30.0, 311.0357142857142]], "isOverall": false, "label": "Get Persian Cats-6", "isController": false}, {"data": [[29.933333333333334, 314.94999999999993]], "isOverall": false, "label": "Get Persian Cats-6-Aggregated", "isController": false}, {"data": [[30.0, 258.35]], "isOverall": false, "label": "Get Iguana Reptiles-0", "isController": false}, {"data": [[30.0, 258.35]], "isOverall": false, "label": "Get Iguana Reptiles-0-Aggregated", "isController": false}, {"data": [[29.0, 427.5], [30.0, 498.982142857143]], "isOverall": false, "label": "Get Persian Cats-7", "isController": false}, {"data": [[29.933333333333334, 494.2166666666668]], "isOverall": false, "label": "Get Persian Cats-7-Aggregated", "isController": false}, {"data": [[30.0, 255.3]], "isOverall": false, "label": "Get Iguana Reptiles-3", "isController": false}, {"data": [[30.0, 255.3]], "isOverall": false, "label": "Get Iguana Reptiles-3-Aggregated", "isController": false}, {"data": [[29.0, 480.5], [30.0, 499.3214285714286]], "isOverall": false, "label": "Get Persian Cats-8", "isController": false}, {"data": [[29.933333333333334, 498.0666666666667]], "isOverall": false, "label": "Get Persian Cats-8-Aggregated", "isController": false}, {"data": [[30.0, 255.10000000000002]], "isOverall": false, "label": "Get Iguana Reptiles-2", "isController": false}, {"data": [[30.0, 255.10000000000002]], "isOverall": false, "label": "Get Iguana Reptiles-2-Aggregated", "isController": false}, {"data": [[29.0, 486.75], [30.0, 495.57142857142856]], "isOverall": false, "label": "Get Persian Cats-9", "isController": false}, {"data": [[29.933333333333334, 494.98333333333335]], "isOverall": false, "label": "Get Persian Cats-9-Aggregated", "isController": false}, {"data": [[18.0, 179.0], [21.0, 177.0], [24.0, 180.0], [25.0, 178.0], [27.0, 385.0], [30.0, 239.64705882352942]], "isOverall": false, "label": "Get Dog-0", "isController": false}, {"data": [[29.08333333333334, 240.7666666666667]], "isOverall": false, "label": "Get Dog-0-Aggregated", "isController": false}, {"data": [[18.0, 175.0], [21.0, 171.5], [24.0, 171.0], [25.0, 177.5], [27.0, 364.6666666666667], [30.0, 251.54901960784315]], "isOverall": false, "label": "Get Dog-2", "isController": false}, {"data": [[29.08333333333334, 249.45000000000002]], "isOverall": false, "label": "Get Dog-2-Aggregated", "isController": false}, {"data": [[18.0, 179.0], [21.0, 175.5], [24.0, 170.0], [25.0, 171.0], [27.0, 395.0], [30.0, 244.2941176470588]], "isOverall": false, "label": "Get Dog-1", "isController": false}, {"data": [[29.08333333333334, 244.76666666666657]], "isOverall": false, "label": "Get Dog-1-Aggregated", "isController": false}, {"data": [[18.0, 159.0], [21.0, 333.5], [24.0, 158.0], [25.0, 156.0], [27.0, 489.6666666666667], [30.0, 244.17647058823525]], "isOverall": false, "label": "Get Dog-4", "isController": false}, {"data": [[29.08333333333334, 253.63333333333335]], "isOverall": false, "label": "Get Dog-4-Aggregated", "isController": false}, {"data": [[30.0, 473.58333333333337]], "isOverall": false, "label": "Get Iguana Reptiles-9", "isController": false}, {"data": [[30.0, 473.58333333333337]], "isOverall": false, "label": "Get Iguana Reptiles-9-Aggregated", "isController": false}, {"data": [[18.0, 160.0], [21.0, 338.5], [24.0, 178.0], [25.0, 166.5], [27.0, 518.3333333333334], [30.0, 236.47058823529412]], "isOverall": false, "label": "Get Dog-3", "isController": false}, {"data": [[29.08333333333334, 249.38333333333327]], "isOverall": false, "label": "Get Dog-3-Aggregated", "isController": false}, {"data": [[30.0, 472.26666666666665]], "isOverall": false, "label": "Get Iguana Reptiles-8", "isController": false}, {"data": [[30.0, 472.26666666666665]], "isOverall": false, "label": "Get Iguana Reptiles-8-Aggregated", "isController": false}, {"data": [[18.0, 156.0], [21.0, 329.0], [24.0, 160.0], [25.0, 166.0], [27.0, 690.3333333333334], [30.0, 282.7843137254902]], "isOverall": false, "label": "Get Dog-6", "isController": false}, {"data": [[29.08333333333334, 296.64999999999986]], "isOverall": false, "label": "Get Dog-6-Aggregated", "isController": false}, {"data": [[18.0, 175.0], [21.0, 387.5], [24.0, 170.0], [25.0, 166.0], [27.0, 679.3333333333334], [30.0, 274.88235294117635]], "isOverall": false, "label": "Get Dog-5", "isController": false}, {"data": [[29.08333333333334, 291.8166666666666]], "isOverall": false, "label": "Get Dog-5-Aggregated", "isController": false}, {"data": [[2.0, 1524.0], [3.0, 910.0], [4.0, 1476.0], [5.0, 852.0], [6.0, 836.0], [7.0, 858.0], [8.0, 884.0], [9.0, 1496.0], [10.0, 1442.0], [11.0, 1551.0], [12.0, 828.0], [13.0, 856.0], [14.0, 1158.0], [15.0, 823.0], [16.0, 869.0], [1.0, 886.0], [17.0, 1612.0], [18.0, 820.0], [19.0, 917.0], [20.0, 873.0], [21.0, 858.0], [22.0, 1013.0], [23.0, 841.0], [24.0, 857.0], [25.0, 849.0], [26.0, 876.0], [27.0, 865.0], [28.0, 823.0], [29.0, 874.0], [30.0, 1335.032258064516]], "isOverall": false, "label": "Get Order Confirm Form", "isController": false}, {"data": [[22.750000000000014, 1178.5500000000004]], "isOverall": false, "label": "Get Order Confirm Form-Aggregated", "isController": false}, {"data": [[18.0, 475.0], [21.0, 341.5], [24.0, 160.0], [25.0, 316.0], [27.0, 613.0], [30.0, 530.7254901960782]], "isOverall": false, "label": "Get Dog-8", "isController": false}, {"data": [[29.08333333333334, 514.2666666666665]], "isOverall": false, "label": "Get Dog-8-Aggregated", "isController": false}, {"data": [[30.0, 275.80000000000007]], "isOverall": false, "label": "Get Iguana Reptiles-5", "isController": false}, {"data": [[30.0, 275.80000000000007]], "isOverall": false, "label": "Get Iguana Reptiles-5-Aggregated", "isController": false}, {"data": [[18.0, 156.0], [21.0, 511.5], [24.0, 158.0], [25.0, 315.5], [27.0, 680.3333333333334], [30.0, 510.0980392156864]], "isOverall": false, "label": "Get Dog-7", "isController": false}, {"data": [[29.08333333333334, 500.4000000000001]], "isOverall": false, "label": "Get Dog-7-Aggregated", "isController": false}, {"data": [[30.0, 243.55000000000004]], "isOverall": false, "label": "Get Iguana Reptiles-4", "isController": false}, {"data": [[30.0, 243.55000000000004]], "isOverall": false, "label": "Get Iguana Reptiles-4-Aggregated", "isController": false}, {"data": [[30.0, 474.71666666666664]], "isOverall": false, "label": "Get Iguana Reptiles-7", "isController": false}, {"data": [[30.0, 474.71666666666664]], "isOverall": false, "label": "Get Iguana Reptiles-7-Aggregated", "isController": false}, {"data": [[18.0, 537.0], [21.0, 348.5], [24.0, 170.0], [25.0, 337.0], [27.0, 382.0], [30.0, 520.6078431372549]], "isOverall": false, "label": "Get Dog-9", "isController": false}, {"data": [[29.08333333333334, 496.2500000000001]], "isOverall": false, "label": "Get Dog-9-Aggregated", "isController": false}, {"data": [[30.0, 308.5]], "isOverall": false, "label": "Get Iguana Reptiles-6", "isController": false}, {"data": [[30.0, 308.5]], "isOverall": false, "label": "Get Iguana Reptiles-6-Aggregated", "isController": false}, {"data": [[11.0, 832.0], [16.0, 1435.0], [17.0, 1197.0], [18.0, 1011.0], [19.0, 1509.0], [21.0, 872.0], [22.0, 852.0], [23.0, 820.0], [24.0, 1187.0], [6.0, 1484.0], [25.0, 843.3333333333334], [26.0, 838.5], [28.0, 863.0], [29.0, 876.0], [30.0, 1160.7878787878788]], "isOverall": false, "label": "Remove One Cat From Cart", "isController": false}, {"data": [[26.799999999999997, 1076.933333333333]], "isOverall": false, "label": "Remove One Cat From Cart-Aggregated", "isController": false}, {"data": [[29.0, 343.5], [30.0, 256.3571428571429]], "isOverall": false, "label": "Get Persian Cats-0", "isController": false}, {"data": [[29.933333333333334, 262.1666666666667]], "isOverall": false, "label": "Get Persian Cats-0-Aggregated", "isController": false}, {"data": [[29.0, 337.75], [30.0, 267.23214285714283]], "isOverall": false, "label": "Get Persian Cats-1", "isController": false}, {"data": [[29.933333333333334, 271.93333333333334]], "isOverall": false, "label": "Get Persian Cats-1-Aggregated", "isController": false}, {"data": [[29.0, 247.25], [30.0, 258.53571428571433]], "isOverall": false, "label": "Get Persian Cats-2", "isController": false}, {"data": [[29.933333333333334, 257.78333333333336]], "isOverall": false, "label": "Get Persian Cats-2-Aggregated", "isController": false}, {"data": [[29.0, 337.0], [30.0, 285.1071428571429]], "isOverall": false, "label": "Get Persian Cats-3", "isController": false}, {"data": [[29.933333333333334, 288.56666666666666]], "isOverall": false, "label": "Get Persian Cats-3-Aggregated", "isController": false}, {"data": [[29.0, 261.75], [30.0, 260.03571428571433]], "isOverall": false, "label": "Get Persian Cats-4", "isController": false}, {"data": [[29.933333333333334, 260.15]], "isOverall": false, "label": "Get Persian Cats-4-Aggregated", "isController": false}, {"data": [[29.0, 376.5], [30.0, 291.96428571428567]], "isOverall": false, "label": "Get Persian Cats-5", "isController": false}, {"data": [[29.933333333333334, 297.59999999999997]], "isOverall": false, "label": "Get Persian Cats-5-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 30.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 852.7, "minX": 1.70700366E12, "maxY": 91514.66666666667, "series": [{"data": [[1.70700366E12, 67845.46666666666], [1.70700378E12, 852.7], [1.70700372E12, 88648.96666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.70700366E12, 64705.333333333336], [1.70700378E12, 1025.8333333333333], [1.70700372E12, 91514.66666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70700378E12, "title": "Bytes Throughput Over Time"}},
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
                }
};