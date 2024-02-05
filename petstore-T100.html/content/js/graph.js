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
        data: {"result": {"minY": 1.0, "minX": 100.0, "maxY": 180.0, "series": [{"data": [[300.0, 4.0], [600.0, 1.0], [700.0, 2.0], [100.0, 134.0], [400.0, 23.0], [800.0, 2.0], [500.0, 34.0]], "isOverall": false, "label": "Get Cats-5", "isController": false}, {"data": [[400.0, 25.0], [100.0, 129.0], [800.0, 1.0], [500.0, 45.0]], "isOverall": false, "label": "Get Reptiles-0", "isController": false}, {"data": [[600.0, 4.0], [300.0, 3.0], [700.0, 1.0], [100.0, 147.0], [400.0, 15.0], [500.0, 30.0]], "isOverall": false, "label": "Get Cats-4", "isController": false}, {"data": [[700.0, 1.0], [100.0, 153.0], [400.0, 13.0], [200.0, 1.0], [500.0, 32.0]], "isOverall": false, "label": "Get Reptiles-1", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [100.0, 154.0], [400.0, 18.0], [500.0, 25.0]], "isOverall": false, "label": "Get Cats-3", "isController": false}, {"data": [[300.0, 1.0], [100.0, 142.0], [400.0, 18.0], [500.0, 39.0]], "isOverall": false, "label": "Get Reptiles-2", "isController": false}, {"data": [[300.0, 2.0], [600.0, 2.0], [100.0, 150.0], [400.0, 23.0], [500.0, 23.0]], "isOverall": false, "label": "Get Cats-2", "isController": false}, {"data": [[300.0, 3.0], [600.0, 3.0], [100.0, 157.0], [400.0, 10.0], [500.0, 27.0]], "isOverall": false, "label": "Get Cats-1", "isController": false}, {"data": [[100.0, 153.0], [400.0, 13.0], [200.0, 1.0], [500.0, 33.0]], "isOverall": false, "label": "Get Cats-0", "isController": false}, {"data": [[600.0, 6.0], [300.0, 1.0], [700.0, 9.0], [400.0, 65.0], [100.0, 1.0], [500.0, 118.0]], "isOverall": false, "label": "Get Reptiles-7", "isController": false}, {"data": [[300.0, 2.0], [600.0, 6.0], [700.0, 7.0], [400.0, 55.0], [800.0, 3.0], [100.0, 1.0], [900.0, 1.0], [500.0, 125.0]], "isOverall": false, "label": "Get Reptiles-8", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 4.0], [300.0, 1.0], [700.0, 9.0], [400.0, 71.0], [100.0, 3.0], [800.0, 3.0], [900.0, 1.0], [500.0, 107.0]], "isOverall": false, "label": "Get Reptiles-9", "isController": false}, {"data": [[600.0, 1.0], [400.0, 20.0], [100.0, 139.0], [500.0, 40.0]], "isOverall": false, "label": "Get Reptiles-3", "isController": false}, {"data": [[300.0, 2.0], [600.0, 4.0], [700.0, 1.0], [400.0, 14.0], [100.0, 135.0], [500.0, 44.0]], "isOverall": false, "label": "Get Reptiles-4", "isController": false}, {"data": [[600.0, 5.0], [300.0, 15.0], [700.0, 1.0], [400.0, 19.0], [100.0, 121.0], [500.0, 39.0]], "isOverall": false, "label": "Get Reptiles-5", "isController": false}, {"data": [[300.0, 15.0], [600.0, 4.0], [700.0, 3.0], [100.0, 122.0], [400.0, 17.0], [800.0, 2.0], [500.0, 37.0]], "isOverall": false, "label": "Get Reptiles-6", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [100.0, 157.0], [400.0, 24.0], [500.0, 17.0]], "isOverall": false, "label": "Cart Details-2", "isController": false}, {"data": [[600.0, 1.0], [100.0, 164.0], [400.0, 19.0], [500.0, 16.0]], "isOverall": false, "label": "Cart Details-1", "isController": false}, {"data": [[100.0, 151.0], [400.0, 20.0], [500.0, 29.0]], "isOverall": false, "label": "Cart Details-0", "isController": false}, {"data": [[300.0, 10.0], [600.0, 4.0], [700.0, 3.0], [100.0, 144.0], [400.0, 16.0], [800.0, 1.0], [500.0, 22.0]], "isOverall": false, "label": "Cart Details-6", "isController": false}, {"data": [[300.0, 7.0], [600.0, 2.0], [700.0, 1.0], [100.0, 146.0], [400.0, 16.0], [500.0, 27.0], [1000.0, 1.0]], "isOverall": false, "label": "Cart Details-5", "isController": false}, {"data": [[300.0, 1.0], [100.0, 159.0], [400.0, 21.0], [800.0, 1.0], [500.0, 18.0]], "isOverall": false, "label": "Cart Details-4", "isController": false}, {"data": [[300.0, 1.0], [100.0, 157.0], [400.0, 20.0], [900.0, 1.0], [500.0, 21.0]], "isOverall": false, "label": "Cart Details-3", "isController": false}, {"data": [[300.0, 1.0], [600.0, 8.0], [700.0, 6.0], [400.0, 66.0], [100.0, 4.0], [800.0, 5.0], [900.0, 1.0], [500.0, 109.0]], "isOverall": false, "label": "Get Cats-9", "isController": false}, {"data": [[600.0, 13.0], [700.0, 6.0], [400.0, 73.0], [100.0, 4.0], [800.0, 2.0], [200.0, 1.0], [500.0, 101.0]], "isOverall": false, "label": "Get Cats-8", "isController": false}, {"data": [[600.0, 4.0], [700.0, 7.0], [400.0, 82.0], [800.0, 1.0], [100.0, 2.0], [500.0, 104.0]], "isOverall": false, "label": "Cart Details-9", "isController": false}, {"data": [[600.0, 9.0], [700.0, 5.0], [400.0, 67.0], [800.0, 3.0], [100.0, 3.0], [900.0, 1.0], [500.0, 112.0]], "isOverall": false, "label": "Get Cats-7", "isController": false}, {"data": [[600.0, 4.0], [700.0, 6.0], [400.0, 91.0], [100.0, 3.0], [200.0, 2.0], [800.0, 1.0], [900.0, 4.0], [500.0, 89.0]], "isOverall": false, "label": "Cart Details-8", "isController": false}, {"data": [[300.0, 23.0], [600.0, 4.0], [700.0, 2.0], [100.0, 129.0], [400.0, 11.0], [800.0, 2.0], [500.0, 29.0]], "isOverall": false, "label": "Get Cats-6", "isController": false}, {"data": [[600.0, 4.0], [700.0, 1.0], [400.0, 93.0], [800.0, 2.0], [900.0, 1.0], [500.0, 98.0], [1000.0, 1.0]], "isOverall": false, "label": "Cart Details-7", "isController": false}, {"data": [[1100.0, 12.0], [1200.0, 5.0], [1300.0, 3.0], [1400.0, 22.0], [1500.0, 22.0], [800.0, 106.0], [1600.0, 2.0], [1700.0, 3.0], [900.0, 17.0], [1900.0, 1.0], [1000.0, 7.0]], "isOverall": false, "label": "Get Adult Male Persian Cat", "isController": false}, {"data": [[1100.0, 9.0], [1200.0, 7.0], [1300.0, 3.0], [1400.0, 19.0], [1500.0, 35.0], [800.0, 79.0], [1600.0, 10.0], [1700.0, 2.0], [900.0, 20.0], [1800.0, 4.0], [1000.0, 12.0]], "isOverall": false, "label": "Get Reptiles", "isController": false}, {"data": [[300.0, 1.0], [700.0, 2.0], [100.0, 176.0], [400.0, 4.0], [500.0, 17.0]], "isOverall": false, "label": "Remove One Cat From Cart-4", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [100.0, 168.0], [400.0, 9.0], [800.0, 1.0], [500.0, 20.0]], "isOverall": false, "label": "Remove One Cat From Cart-3", "isController": false}, {"data": [[600.0, 2.0], [300.0, 16.0], [700.0, 3.0], [100.0, 154.0], [400.0, 6.0], [500.0, 18.0], [1000.0, 1.0]], "isOverall": false, "label": "Remove One Cat From Cart-6", "isController": false}, {"data": [[300.0, 5.0], [700.0, 2.0], [100.0, 160.0], [400.0, 9.0], [800.0, 2.0], [500.0, 22.0]], "isOverall": false, "label": "Remove One Cat From Cart-5", "isController": false}, {"data": [[100.0, 178.0], [400.0, 6.0], [500.0, 16.0]], "isOverall": false, "label": "Remove One Cat From Cart-0", "isController": false}, {"data": [[300.0, 1.0], [600.0, 2.0], [700.0, 1.0], [100.0, 169.0], [400.0, 11.0], [800.0, 1.0], [500.0, 15.0]], "isOverall": false, "label": "Remove One Cat From Cart-2", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [100.0, 167.0], [400.0, 16.0], [500.0, 15.0]], "isOverall": false, "label": "Remove One Cat From Cart-1", "isController": false}, {"data": [[1100.0, 16.0], [1200.0, 8.0], [1400.0, 11.0], [1500.0, 25.0], [800.0, 81.0], [1600.0, 6.0], [1700.0, 2.0], [900.0, 31.0], [1900.0, 1.0], [1000.0, 19.0]], "isOverall": false, "label": "Get Cats", "isController": false}, {"data": [[2100.0, 5.0], [2200.0, 2.0], [2400.0, 1.0], [2900.0, 1.0], [800.0, 51.0], [900.0, 17.0], [1000.0, 11.0], [1100.0, 6.0], [1200.0, 3.0], [1300.0, 4.0], [1400.0, 3.0], [1500.0, 4.0], [1600.0, 24.0], [1700.0, 41.0], [1800.0, 14.0], [1900.0, 10.0], [2000.0, 3.0]], "isOverall": false, "label": "Get Fish", "isController": false}, {"data": [[300.0, 1.0], [600.0, 7.0], [700.0, 2.0], [400.0, 80.0], [800.0, 3.0], [100.0, 2.0], [900.0, 1.0], [500.0, 104.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-7", "isController": false}, {"data": [[300.0, 13.0], [600.0, 2.0], [700.0, 2.0], [100.0, 139.0], [400.0, 18.0], [800.0, 3.0], [500.0, 23.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-6", "isController": false}, {"data": [[600.0, 5.0], [700.0, 5.0], [400.0, 88.0], [800.0, 2.0], [100.0, 5.0], [900.0, 3.0], [500.0, 92.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-9", "isController": false}, {"data": [[600.0, 7.0], [700.0, 2.0], [400.0, 86.0], [100.0, 2.0], [200.0, 1.0], [900.0, 2.0], [500.0, 99.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-8", "isController": false}, {"data": [[600.0, 3.0], [100.0, 152.0], [400.0, 26.0], [500.0, 19.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-3", "isController": false}, {"data": [[100.0, 150.0], [400.0, 21.0], [500.0, 29.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-2", "isController": false}, {"data": [[300.0, 7.0], [600.0, 6.0], [700.0, 2.0], [100.0, 139.0], [400.0, 17.0], [800.0, 1.0], [500.0, 28.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-5", "isController": false}, {"data": [[600.0, 3.0], [300.0, 2.0], [100.0, 157.0], [400.0, 15.0], [900.0, 1.0], [500.0, 22.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-4", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [100.0, 162.0], [400.0, 18.0], [500.0, 18.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-1", "isController": false}, {"data": [[100.0, 148.0], [400.0, 24.0], [200.0, 1.0], [500.0, 27.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-0", "isController": false}, {"data": [[600.0, 9.0], [300.0, 1.0], [700.0, 3.0], [400.0, 79.0], [100.0, 10.0], [800.0, 1.0], [500.0, 96.0], [1000.0, 1.0]], "isOverall": false, "label": "Remove One Cat From Cart-8", "isController": false}, {"data": [[600.0, 10.0], [700.0, 4.0], [400.0, 82.0], [100.0, 5.0], [900.0, 2.0], [500.0, 97.0]], "isOverall": false, "label": "Remove One Cat From Cart-7", "isController": false}, {"data": [[600.0, 6.0], [700.0, 4.0], [400.0, 92.0], [100.0, 13.0], [800.0, 1.0], [1000.0, 1.0], [500.0, 83.0]], "isOverall": false, "label": "Remove One Cat From Cart-9", "isController": false}, {"data": [[1100.0, 7.0], [1200.0, 2.0], [1300.0, 2.0], [1400.0, 24.0], [1500.0, 21.0], [800.0, 116.0], [1600.0, 3.0], [900.0, 13.0], [1800.0, 2.0], [1000.0, 10.0]], "isOverall": false, "label": "Cart Details", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 19.0], [700.0, 4.0], [1400.0, 1.0], [400.0, 56.0], [100.0, 13.0], [200.0, 1.0], [800.0, 2.0], [900.0, 1.0], [500.0, 102.0]], "isOverall": false, "label": "Get Koi Fish-9", "isController": false}, {"data": [[600.0, 13.0], [700.0, 11.0], [400.0, 59.0], [100.0, 9.0], [800.0, 7.0], [200.0, 1.0], [500.0, 100.0]], "isOverall": false, "label": "Get Koi Fish-8", "isController": false}, {"data": [[300.0, 7.0], [600.0, 4.0], [700.0, 3.0], [400.0, 12.0], [100.0, 159.0], [500.0, 15.0]], "isOverall": false, "label": "Get Koi Fish-5", "isController": false}, {"data": [[600.0, 5.0], [300.0, 5.0], [700.0, 1.0], [100.0, 167.0], [400.0, 8.0], [200.0, 1.0], [500.0, 13.0]], "isOverall": false, "label": "Get Koi Fish-4", "isController": false}, {"data": [[600.0, 19.0], [700.0, 5.0], [400.0, 64.0], [100.0, 9.0], [800.0, 8.0], [200.0, 1.0], [900.0, 1.0], [500.0, 92.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Koi Fish-7", "isController": false}, {"data": [[300.0, 17.0], [600.0, 7.0], [700.0, 2.0], [100.0, 160.0], [400.0, 9.0], [500.0, 5.0]], "isOverall": false, "label": "Get Koi Fish-6", "isController": false}, {"data": [[600.0, 1.0], [700.0, 1.0], [100.0, 179.0], [400.0, 6.0], [200.0, 1.0], [500.0, 12.0]], "isOverall": false, "label": "Get Koi Fish-1", "isController": false}, {"data": [[100.0, 180.0], [400.0, 8.0], [200.0, 1.0], [500.0, 11.0]], "isOverall": false, "label": "Get Koi Fish-0", "isController": false}, {"data": [[300.0, 2.0], [700.0, 2.0], [100.0, 172.0], [400.0, 4.0], [200.0, 1.0], [500.0, 19.0]], "isOverall": false, "label": "Get Koi Fish-3", "isController": false}, {"data": [[300.0, 4.0], [600.0, 3.0], [100.0, 170.0], [400.0, 10.0], [200.0, 2.0], [500.0, 11.0]], "isOverall": false, "label": "Get Koi Fish-2", "isController": false}, {"data": [[1100.0, 16.0], [1200.0, 9.0], [1300.0, 4.0], [1400.0, 13.0], [1500.0, 15.0], [800.0, 85.0], [1600.0, 4.0], [1700.0, 3.0], [900.0, 31.0], [1800.0, 1.0], [1900.0, 2.0], [1000.0, 17.0]], "isOverall": false, "label": "Get Persian Cats", "isController": false}, {"data": [[2600.0, 1.0], [800.0, 98.0], [900.0, 28.0], [1000.0, 12.0], [1100.0, 17.0], [1200.0, 6.0], [1300.0, 6.0], [1400.0, 6.0], [1500.0, 15.0], [1600.0, 3.0], [1700.0, 5.0], [1800.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "Get Bulldog", "isController": false}, {"data": [[2200.0, 1.0], [800.0, 82.0], [900.0, 31.0], [1000.0, 22.0], [1100.0, 12.0], [1200.0, 7.0], [1300.0, 8.0], [1400.0, 9.0], [1500.0, 17.0], [1600.0, 5.0], [1700.0, 1.0], [1900.0, 1.0], [500.0, 1.0], [2000.0, 3.0]], "isOverall": false, "label": "Get Dog", "isController": false}, {"data": [[11200.0, 3.0], [11100.0, 2.0], [10800.0, 1.0], [11600.0, 16.0], [11700.0, 16.0], [11300.0, 9.0], [11400.0, 6.0], [11500.0, 11.0], [11900.0, 14.0], [12100.0, 12.0], [12000.0, 12.0], [12200.0, 6.0], [11800.0, 13.0], [12300.0, 6.0], [12600.0, 8.0], [12500.0, 3.0], [12700.0, 3.0], [12400.0, 3.0], [13200.0, 1.0], [12800.0, 2.0], [13000.0, 1.0], [12900.0, 1.0], [14100.0, 2.0], [13900.0, 1.0], [15300.0, 1.0], [15100.0, 3.0], [14900.0, 2.0], [15600.0, 2.0], [15500.0, 2.0], [15800.0, 3.0], [15700.0, 1.0], [15400.0, 1.0], [16300.0, 1.0], [15900.0, 2.0], [16000.0, 2.0], [16200.0, 1.0], [16800.0, 2.0], [17200.0, 2.0], [16900.0, 1.0], [17400.0, 1.0], [16400.0, 2.0], [17100.0, 2.0], [16700.0, 1.0], [17500.0, 2.0], [18400.0, 3.0], [17900.0, 1.0], [17700.0, 1.0], [18200.0, 1.0], [17600.0, 1.0], [18000.0, 1.0], [17800.0, 1.0], [18300.0, 2.0], [18600.0, 1.0], [18500.0, 1.0], [21400.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[100.0, 162.0], [400.0, 18.0], [500.0, 20.0]], "isOverall": false, "label": "Get Order Confirm Form-0", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0], [100.0, 168.0], [400.0, 12.0], [500.0, 17.0]], "isOverall": false, "label": "Get Order Confirm Form-1", "isController": false}, {"data": [[300.0, 3.0], [700.0, 1.0], [100.0, 167.0], [400.0, 16.0], [500.0, 13.0]], "isOverall": false, "label": "Get Order Confirm Form-2", "isController": false}, {"data": [[300.0, 2.0], [600.0, 2.0], [100.0, 168.0], [400.0, 10.0], [500.0, 18.0]], "isOverall": false, "label": "Get Order Confirm Form-3", "isController": false}, {"data": [[300.0, 1.0], [100.0, 170.0], [400.0, 13.0], [500.0, 16.0]], "isOverall": false, "label": "Get Order Confirm Form-4", "isController": false}, {"data": [[600.0, 7.0], [300.0, 3.0], [100.0, 156.0], [400.0, 14.0], [500.0, 20.0]], "isOverall": false, "label": "Get Order Confirm Form-5", "isController": false}, {"data": [[600.0, 4.0], [300.0, 8.0], [700.0, 3.0], [100.0, 159.0], [400.0, 8.0], [800.0, 2.0], [900.0, 1.0], [500.0, 15.0]], "isOverall": false, "label": "Get Order Confirm Form-6", "isController": false}, {"data": [[600.0, 9.0], [300.0, 1.0], [700.0, 6.0], [400.0, 76.0], [800.0, 2.0], [100.0, 3.0], [500.0, 103.0]], "isOverall": false, "label": "Get Order Confirm Form-7", "isController": false}, {"data": [[600.0, 9.0], [1400.0, 1.0], [700.0, 3.0], [400.0, 88.0], [800.0, 3.0], [100.0, 6.0], [500.0, 90.0]], "isOverall": false, "label": "Get Order Confirm Form-8", "isController": false}, {"data": [[600.0, 5.0], [300.0, 1.0], [700.0, 2.0], [400.0, 80.0], [800.0, 1.0], [100.0, 6.0], [900.0, 1.0], [500.0, 104.0]], "isOverall": false, "label": "Get Order Confirm Form-9", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 7.0], [700.0, 9.0], [400.0, 68.0], [200.0, 2.0], [100.0, 11.0], [800.0, 4.0], [900.0, 1.0], [500.0, 94.0], [1000.0, 3.0]], "isOverall": false, "label": "Get Bulldog-9", "isController": false}, {"data": [[600.0, 9.0], [300.0, 1.0], [1300.0, 1.0], [700.0, 5.0], [400.0, 76.0], [800.0, 4.0], [100.0, 3.0], [900.0, 1.0], [500.0, 99.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Bulldog-8", "isController": false}, {"data": [[600.0, 6.0], [300.0, 1.0], [700.0, 7.0], [400.0, 73.0], [100.0, 8.0], [800.0, 4.0], [900.0, 2.0], [500.0, 98.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Bulldog-7", "isController": false}, {"data": [[300.0, 14.0], [600.0, 6.0], [700.0, 7.0], [1500.0, 1.0], [100.0, 144.0], [800.0, 4.0], [400.0, 6.0], [900.0, 1.0], [500.0, 17.0]], "isOverall": false, "label": "Get Bulldog-6", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [100.0, 176.0], [400.0, 7.0], [800.0, 1.0], [500.0, 11.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Bulldog-1", "isController": false}, {"data": [[600.0, 1.0], [100.0, 170.0], [400.0, 8.0], [800.0, 1.0], [500.0, 20.0]], "isOverall": false, "label": "Get Bulldog-0", "isController": false}, {"data": [[1100.0, 20.0], [1200.0, 8.0], [1400.0, 4.0], [1500.0, 6.0], [800.0, 92.0], [1600.0, 7.0], [1700.0, 4.0], [900.0, 31.0], [1800.0, 1.0], [1000.0, 23.0], [500.0, 4.0]], "isOverall": false, "label": "Get Koi Fish", "isController": false}, {"data": [[600.0, 6.0], [300.0, 12.0], [1200.0, 1.0], [700.0, 2.0], [100.0, 150.0], [400.0, 11.0], [800.0, 1.0], [500.0, 17.0]], "isOverall": false, "label": "Get Bulldog-5", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 3.0], [600.0, 2.0], [700.0, 1.0], [400.0, 9.0], [100.0, 162.0], [900.0, 1.0], [500.0, 21.0]], "isOverall": false, "label": "Get Bulldog-4", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [1200.0, 1.0], [700.0, 1.0], [400.0, 11.0], [100.0, 161.0], [500.0, 22.0]], "isOverall": false, "label": "Get Bulldog-3", "isController": false}, {"data": [[700.0, 3.0], [100.0, 169.0], [400.0, 9.0], [900.0, 1.0], [500.0, 17.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Bulldog-2", "isController": false}, {"data": [[600.0, 17.0], [1300.0, 1.0], [700.0, 7.0], [1400.0, 1.0], [100.0, 20.0], [400.0, 56.0], [800.0, 2.0], [900.0, 2.0], [500.0, 94.0]], "isOverall": false, "label": "Get Fish-9", "isController": false}, {"data": [[1100.0, 13.0], [1200.0, 12.0], [1300.0, 2.0], [1400.0, 14.0], [1500.0, 20.0], [800.0, 85.0], [1600.0, 10.0], [1700.0, 1.0], [900.0, 26.0], [1800.0, 1.0], [1000.0, 16.0]], "isOverall": false, "label": "Get Iguana Reptiles", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 13.0], [300.0, 1.0], [1200.0, 1.0], [700.0, 8.0], [100.0, 18.0], [200.0, 1.0], [400.0, 61.0], [800.0, 3.0], [900.0, 3.0], [500.0, 90.0]], "isOverall": false, "label": "Get Fish-7", "isController": false}, {"data": [[600.0, 8.0], [700.0, 8.0], [100.0, 26.0], [400.0, 41.0], [800.0, 7.0], [900.0, 2.0], [500.0, 107.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Fish-8", "isController": false}, {"data": [[600.0, 13.0], [300.0, 9.0], [1200.0, 1.0], [700.0, 8.0], [1500.0, 1.0], [400.0, 33.0], [100.0, 79.0], [900.0, 1.0], [500.0, 55.0]], "isOverall": false, "label": "Get Fish-5", "isController": false}, {"data": [[600.0, 13.0], [300.0, 12.0], [700.0, 11.0], [100.0, 83.0], [400.0, 21.0], [1700.0, 1.0], [500.0, 58.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Fish-6", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 7.0], [300.0, 1.0], [700.0, 8.0], [1400.0, 1.0], [100.0, 104.0], [400.0, 29.0], [800.0, 1.0], [500.0, 48.0]], "isOverall": false, "label": "Get Fish-3", "isController": false}, {"data": [[600.0, 14.0], [700.0, 10.0], [100.0, 93.0], [400.0, 27.0], [500.0, 55.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Fish-4", "isController": false}, {"data": [[600.0, 6.0], [700.0, 3.0], [100.0, 130.0], [400.0, 26.0], [900.0, 1.0], [500.0, 33.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Fish-1", "isController": false}, {"data": [[600.0, 11.0], [300.0, 1.0], [700.0, 4.0], [100.0, 115.0], [400.0, 22.0], [800.0, 1.0], [500.0, 46.0]], "isOverall": false, "label": "Get Fish-2", "isController": false}, {"data": [[600.0, 59.0], [700.0, 38.0], [800.0, 1.0], [100.0, 96.0], [400.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "Get Fish-0", "isController": false}, {"data": [[300.0, 3.0], [100.0, 163.0], [400.0, 10.0], [200.0, 1.0], [900.0, 1.0], [500.0, 22.0]], "isOverall": false, "label": "Get Iguana Reptiles-1", "isController": false}, {"data": [[600.0, 4.0], [300.0, 15.0], [700.0, 5.0], [100.0, 141.0], [400.0, 13.0], [900.0, 1.0], [500.0, 20.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Persian Cats-6", "isController": false}, {"data": [[100.0, 156.0], [400.0, 16.0], [500.0, 28.0]], "isOverall": false, "label": "Get Iguana Reptiles-0", "isController": false}, {"data": [[600.0, 12.0], [700.0, 6.0], [400.0, 66.0], [100.0, 2.0], [800.0, 4.0], [900.0, 2.0], [500.0, 108.0]], "isOverall": false, "label": "Get Persian Cats-7", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [100.0, 150.0], [400.0, 12.0], [200.0, 1.0], [900.0, 1.0], [500.0, 33.0]], "isOverall": false, "label": "Get Iguana Reptiles-3", "isController": false}, {"data": [[600.0, 9.0], [300.0, 1.0], [700.0, 8.0], [400.0, 69.0], [800.0, 5.0], [100.0, 1.0], [900.0, 3.0], [500.0, 104.0]], "isOverall": false, "label": "Get Persian Cats-8", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [100.0, 152.0], [400.0, 14.0], [800.0, 1.0], [200.0, 1.0], [500.0, 29.0]], "isOverall": false, "label": "Get Iguana Reptiles-2", "isController": false}, {"data": [[600.0, 11.0], [700.0, 3.0], [400.0, 75.0], [100.0, 5.0], [800.0, 1.0], [900.0, 5.0], [500.0, 100.0]], "isOverall": false, "label": "Get Persian Cats-9", "isController": false}, {"data": [[600.0, 2.0], [100.0, 167.0], [400.0, 17.0], [500.0, 14.0]], "isOverall": false, "label": "Get Dog-0", "isController": false}, {"data": [[600.0, 4.0], [300.0, 3.0], [700.0, 1.0], [1400.0, 1.0], [100.0, 167.0], [400.0, 7.0], [800.0, 1.0], [500.0, 16.0]], "isOverall": false, "label": "Get Dog-2", "isController": false}, {"data": [[600.0, 1.0], [100.0, 173.0], [400.0, 8.0], [500.0, 18.0]], "isOverall": false, "label": "Get Dog-1", "isController": false}, {"data": [[300.0, 5.0], [600.0, 1.0], [700.0, 2.0], [400.0, 9.0], [100.0, 155.0], [900.0, 1.0], [500.0, 26.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Dog-4", "isController": false}, {"data": [[600.0, 9.0], [700.0, 4.0], [400.0, 66.0], [800.0, 5.0], [100.0, 5.0], [900.0, 1.0], [500.0, 109.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Iguana Reptiles-9", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [100.0, 168.0], [400.0, 13.0], [500.0, 15.0]], "isOverall": false, "label": "Get Dog-3", "isController": false}, {"data": [[600.0, 11.0], [700.0, 7.0], [100.0, 3.0], [400.0, 57.0], [800.0, 2.0], [500.0, 119.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Iguana Reptiles-8", "isController": false}, {"data": [[300.0, 15.0], [600.0, 2.0], [700.0, 5.0], [400.0, 6.0], [100.0, 147.0], [800.0, 2.0], [900.0, 2.0], [500.0, 20.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Dog-6", "isController": false}, {"data": [[600.0, 7.0], [300.0, 10.0], [1200.0, 1.0], [700.0, 2.0], [1400.0, 1.0], [100.0, 151.0], [400.0, 8.0], [800.0, 2.0], [500.0, 18.0]], "isOverall": false, "label": "Get Dog-5", "isController": false}, {"data": [[1100.0, 7.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 13.0], [1500.0, 20.0], [800.0, 122.0], [1600.0, 2.0], [1700.0, 1.0], [900.0, 23.0], [1800.0, 1.0], [1900.0, 1.0], [1000.0, 8.0]], "isOverall": false, "label": "Get Order Confirm Form", "isController": false}, {"data": [[1100.0, 3.0], [600.0, 12.0], [700.0, 7.0], [400.0, 61.0], [800.0, 6.0], [100.0, 3.0], [200.0, 1.0], [900.0, 4.0], [500.0, 102.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Dog-8", "isController": false}, {"data": [[600.0, 4.0], [300.0, 15.0], [700.0, 5.0], [100.0, 133.0], [400.0, 12.0], [200.0, 1.0], [800.0, 1.0], [900.0, 2.0], [500.0, 27.0]], "isOverall": false, "label": "Get Iguana Reptiles-5", "isController": false}, {"data": [[600.0, 17.0], [700.0, 9.0], [400.0, 62.0], [800.0, 4.0], [100.0, 3.0], [900.0, 4.0], [500.0, 99.0], [1000.0, 2.0]], "isOverall": false, "label": "Get Dog-7", "isController": false}, {"data": [[300.0, 5.0], [600.0, 3.0], [100.0, 142.0], [400.0, 12.0], [800.0, 1.0], [900.0, 1.0], [500.0, 36.0]], "isOverall": false, "label": "Get Iguana Reptiles-4", "isController": false}, {"data": [[600.0, 9.0], [300.0, 2.0], [700.0, 5.0], [400.0, 71.0], [100.0, 3.0], [800.0, 4.0], [500.0, 106.0]], "isOverall": false, "label": "Get Iguana Reptiles-7", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 17.0], [1300.0, 1.0], [700.0, 3.0], [400.0, 48.0], [100.0, 10.0], [800.0, 1.0], [900.0, 4.0], [500.0, 113.0], [1000.0, 2.0]], "isOverall": false, "label": "Get Dog-9", "isController": false}, {"data": [[300.0, 11.0], [600.0, 4.0], [700.0, 6.0], [100.0, 130.0], [400.0, 13.0], [200.0, 1.0], [800.0, 2.0], [500.0, 32.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Iguana Reptiles-6", "isController": false}, {"data": [[1100.0, 12.0], [1200.0, 5.0], [1300.0, 4.0], [1400.0, 6.0], [1500.0, 11.0], [800.0, 132.0], [900.0, 16.0], [1800.0, 1.0], [1900.0, 1.0], [1000.0, 12.0]], "isOverall": false, "label": "Remove One Cat From Cart", "isController": false}, {"data": [[600.0, 1.0], [100.0, 162.0], [400.0, 18.0], [200.0, 1.0], [500.0, 18.0]], "isOverall": false, "label": "Get Persian Cats-0", "isController": false}, {"data": [[300.0, 2.0], [700.0, 2.0], [100.0, 166.0], [400.0, 10.0], [500.0, 20.0]], "isOverall": false, "label": "Get Persian Cats-1", "isController": false}, {"data": [[600.0, 2.0], [300.0, 1.0], [700.0, 1.0], [100.0, 156.0], [400.0, 15.0], [500.0, 25.0]], "isOverall": false, "label": "Get Persian Cats-2", "isController": false}, {"data": [[300.0, 1.0], [600.0, 2.0], [700.0, 1.0], [100.0, 159.0], [400.0, 17.0], [800.0, 1.0], [500.0, 19.0]], "isOverall": false, "label": "Get Persian Cats-3", "isController": false}, {"data": [[300.0, 2.0], [600.0, 2.0], [100.0, 152.0], [400.0, 18.0], [500.0, 26.0]], "isOverall": false, "label": "Get Persian Cats-4", "isController": false}, {"data": [[600.0, 1.0], [300.0, 8.0], [700.0, 2.0], [100.0, 139.0], [400.0, 25.0], [800.0, 1.0], [500.0, 23.0], [1000.0, 1.0]], "isOverall": false, "label": "Get Persian Cats-5", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 21400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 12.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 17096.0, "series": [{"data": [[0.0, 17096.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 8879.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 413.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 12.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 1.5, "minX": 1.70700486E12, "maxY": 95.2987098665883, "series": [{"data": [[1.70700492E12, 92.19689239332133], [1.70700486E12, 95.2987098665883], [1.70700498E12, 1.5]], "isOverall": false, "label": "Load Testing", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70700498E12, "title": "Active Threads Over Time"}},
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
        data : {"result": {"minY": 373.73333333333335, "minX": 1.70700486E12, "maxY": 283988.4666666667, "series": [{"data": [[1.70700492E12, 240367.43333333332], [1.70700486E12, 283988.4666666667], [1.70700498E12, 373.73333333333335]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.70700492E12, 257011.5], [1.70700486E12, 266644.73333333334], [1.70700498E12, 436.3333333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70700498E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 174.0, "minX": 1.70700486E12, "maxY": 13302.138613861385, "series": [{"data": [[1.70700492E12, 323.23], [1.70700486E12, 244.51999999999995]], "isOverall": false, "label": "Get Cats-5", "isController": false}, {"data": [[1.70700492E12, 333.3636363636365], [1.70700486E12, 265.940594059406]], "isOverall": false, "label": "Get Reptiles-0", "isController": false}, {"data": [[1.70700492E12, 272.88], [1.70700486E12, 251.66000000000008]], "isOverall": false, "label": "Get Cats-4", "isController": false}, {"data": [[1.70700492E12, 272.0909090909091], [1.70700486E12, 233.84158415841577]], "isOverall": false, "label": "Get Reptiles-1", "isController": false}, {"data": [[1.70700492E12, 273.1300000000001], [1.70700486E12, 229.32000000000002]], "isOverall": false, "label": "Get Cats-3", "isController": false}, {"data": [[1.70700492E12, 302.76767676767673], [1.70700486E12, 240.22772277227727]], "isOverall": false, "label": "Get Reptiles-2", "isController": false}, {"data": [[1.70700492E12, 288.44], [1.70700486E12, 225.6700000000001]], "isOverall": false, "label": "Get Cats-2", "isController": false}, {"data": [[1.70700492E12, 281.92], [1.70700486E12, 210.53]], "isOverall": false, "label": "Get Cats-1", "isController": false}, {"data": [[1.70700492E12, 278.72], [1.70700486E12, 234.20000000000002]], "isOverall": false, "label": "Get Cats-0", "isController": false}, {"data": [[1.70700492E12, 536.7575757575754], [1.70700486E12, 513.5544554455445]], "isOverall": false, "label": "Get Reptiles-7", "isController": false}, {"data": [[1.70700492E12, 540.2828282828286], [1.70700486E12, 529.8019801980199]], "isOverall": false, "label": "Get Reptiles-8", "isController": false}, {"data": [[1.70700492E12, 542.6565656565657], [1.70700486E12, 520.4356435643565]], "isOverall": false, "label": "Get Reptiles-9", "isController": false}, {"data": [[1.70700492E12, 316.8181818181819], [1.70700486E12, 238.94059405940592]], "isOverall": false, "label": "Get Reptiles-3", "isController": false}, {"data": [[1.70700492E12, 313.50505050505046], [1.70700486E12, 261.6930693069308]], "isOverall": false, "label": "Get Reptiles-4", "isController": false}, {"data": [[1.70700492E12, 337.6969696969698], [1.70700486E12, 254.57425742574267]], "isOverall": false, "label": "Get Reptiles-5", "isController": false}, {"data": [[1.70700492E12, 349.4343434343435], [1.70700486E12, 245.51485148514854]], "isOverall": false, "label": "Get Reptiles-6", "isController": false}, {"data": [[1.70700492E12, 239.03000000000003], [1.70700486E12, 244.65000000000006]], "isOverall": false, "label": "Cart Details-2", "isController": false}, {"data": [[1.70700492E12, 235.99], [1.70700486E12, 226.38000000000005]], "isOverall": false, "label": "Cart Details-1", "isController": false}, {"data": [[1.70700492E12, 263.4199999999999], [1.70700486E12, 256.03]], "isOverall": false, "label": "Cart Details-0", "isController": false}, {"data": [[1.70700492E12, 262.34], [1.70700486E12, 257.14000000000004]], "isOverall": false, "label": "Cart Details-6", "isController": false}, {"data": [[1.70700492E12, 264.42], [1.70700486E12, 248.49]], "isOverall": false, "label": "Cart Details-5", "isController": false}, {"data": [[1.70700492E12, 234.07], [1.70700486E12, 242.70000000000005]], "isOverall": false, "label": "Cart Details-4", "isController": false}, {"data": [[1.70700492E12, 255.99999999999997], [1.70700486E12, 230.39000000000004]], "isOverall": false, "label": "Cart Details-3", "isController": false}, {"data": [[1.70700492E12, 529.5000000000003], [1.70700486E12, 527.0699999999998]], "isOverall": false, "label": "Get Cats-9", "isController": false}, {"data": [[1.70700492E12, 528.0399999999998], [1.70700486E12, 516.6899999999999]], "isOverall": false, "label": "Get Cats-8", "isController": false}, {"data": [[1.70700492E12, 506.52000000000004], [1.70700486E12, 521.7800000000001]], "isOverall": false, "label": "Cart Details-9", "isController": false}, {"data": [[1.70700492E12, 526.6800000000003], [1.70700486E12, 526.6800000000001]], "isOverall": false, "label": "Get Cats-7", "isController": false}, {"data": [[1.70700492E12, 514.3200000000003], [1.70700486E12, 514.1499999999999]], "isOverall": false, "label": "Cart Details-8", "isController": false}, {"data": [[1.70700492E12, 314.8400000000001], [1.70700486E12, 240.78000000000006]], "isOverall": false, "label": "Get Cats-6", "isController": false}, {"data": [[1.70700492E12, 516.6399999999998], [1.70700486E12, 516.69]], "isOverall": false, "label": "Cart Details-7", "isController": false}, {"data": [[1.70700492E12, 1111.37], [1.70700486E12, 1046.6299999999994]], "isOverall": false, "label": "Get Adult Male Persian Cat", "isController": false}, {"data": [[1.70700492E12, 1239.9393939393942], [1.70700486E12, 1086.920792079208]], "isOverall": false, "label": "Get Reptiles", "isController": false}, {"data": [[1.70700492E12, 211.2135922330097], [1.70700486E12, 213.53608247422687]], "isOverall": false, "label": "Remove One Cat From Cart-4", "isController": false}, {"data": [[1.70700492E12, 219.0388349514563], [1.70700486E12, 231.32989690721652]], "isOverall": false, "label": "Remove One Cat From Cart-3", "isController": false}, {"data": [[1.70700492E12, 236.20388349514562], [1.70700486E12, 238.4432989690721]], "isOverall": false, "label": "Remove One Cat From Cart-6", "isController": false}, {"data": [[1.70700492E12, 223.51960784313732], [1.70700486E12, 246.8979591836734]], "isOverall": false, "label": "Remove One Cat From Cart-5", "isController": false}, {"data": [[1.70700492E12, 213.2941176470588], [1.70700486E12, 214.29591836734693]], "isOverall": false, "label": "Remove One Cat From Cart-0", "isController": false}, {"data": [[1.70700492E12, 219.80392156862746], [1.70700486E12, 230.95918367346943]], "isOverall": false, "label": "Remove One Cat From Cart-2", "isController": false}, {"data": [[1.70700492E12, 221.72549019607845], [1.70700486E12, 229.46938775510202]], "isOverall": false, "label": "Remove One Cat From Cart-1", "isController": false}, {"data": [[1.70700492E12, 1135.55], [1.70700486E12, 1038.2399999999996]], "isOverall": false, "label": "Get Cats", "isController": false}, {"data": [[1.70700492E12, 1070.7499999999998], [1.70700486E12, 1566.5514705882358]], "isOverall": false, "label": "Get Fish", "isController": false}, {"data": [[1.70700492E12, 515.9699999999999], [1.70700486E12, 519.51]], "isOverall": false, "label": "Get Adult Male Persian Cat-7", "isController": false}, {"data": [[1.70700492E12, 276.5900000000001], [1.70700486E12, 253.28000000000011]], "isOverall": false, "label": "Get Adult Male Persian Cat-6", "isController": false}, {"data": [[1.70700492E12, 519.4100000000001], [1.70700486E12, 516.8900000000001]], "isOverall": false, "label": "Get Adult Male Persian Cat-9", "isController": false}, {"data": [[1.70700492E12, 510.04999999999995], [1.70700486E12, 521.0799999999999]], "isOverall": false, "label": "Get Adult Male Persian Cat-8", "isController": false}, {"data": [[1.70700492E12, 268.45], [1.70700486E12, 235.2]], "isOverall": false, "label": "Get Adult Male Persian Cat-3", "isController": false}, {"data": [[1.70700492E12, 262.69000000000005], [1.70700486E12, 247.9799999999999]], "isOverall": false, "label": "Get Adult Male Persian Cat-2", "isController": false}, {"data": [[1.70700492E12, 287.58000000000004], [1.70700486E12, 259.13000000000017]], "isOverall": false, "label": "Get Adult Male Persian Cat-5", "isController": false}, {"data": [[1.70700492E12, 254.1799999999999], [1.70700486E12, 233.01999999999998]], "isOverall": false, "label": "Get Adult Male Persian Cat-4", "isController": false}, {"data": [[1.70700492E12, 241.45999999999995], [1.70700486E12, 227.59999999999994]], "isOverall": false, "label": "Get Adult Male Persian Cat-1", "isController": false}, {"data": [[1.70700492E12, 285.35999999999996], [1.70700486E12, 242.04]], "isOverall": false, "label": "Get Adult Male Persian Cat-0", "isController": false}, {"data": [[1.70700492E12, 498.94174757281536], [1.70700486E12, 505.31958762886603]], "isOverall": false, "label": "Remove One Cat From Cart-8", "isController": false}, {"data": [[1.70700492E12, 501.378640776699], [1.70700486E12, 523.8453608247423]], "isOverall": false, "label": "Remove One Cat From Cart-7", "isController": false}, {"data": [[1.70700492E12, 488.14423076923055], [1.70700486E12, 502.95833333333337]], "isOverall": false, "label": "Remove One Cat From Cart-9", "isController": false}, {"data": [[1.70700492E12, 1062.8799999999997], [1.70700486E12, 1060.29]], "isOverall": false, "label": "Cart Details", "isController": false}, {"data": [[1.70700492E12, 553.4285714285712], [1.70700486E12, 501.3414634146343]], "isOverall": false, "label": "Get Koi Fish-9", "isController": false}, {"data": [[1.70700492E12, 529.3506493506493], [1.70700486E12, 531.0000000000001]], "isOverall": false, "label": "Get Koi Fish-8", "isController": false}, {"data": [[1.70700492E12, 260.32], [1.70700486E12, 220.94399999999996]], "isOverall": false, "label": "Get Koi Fish-5", "isController": false}, {"data": [[1.70700492E12, 225.82666666666665], [1.70700486E12, 224.51199999999997]], "isOverall": false, "label": "Get Koi Fish-4", "isController": false}, {"data": [[1.70700492E12, 540.9736842105266], [1.70700486E12, 523.0161290322584]], "isOverall": false, "label": "Get Koi Fish-7", "isController": false}, {"data": [[1.70700492E12, 250.64000000000001], [1.70700486E12, 210.43999999999994]], "isOverall": false, "label": "Get Koi Fish-6", "isController": false}, {"data": [[1.70700492E12, 237.7066666666667], [1.70700486E12, 191.30400000000003]], "isOverall": false, "label": "Get Koi Fish-1", "isController": false}, {"data": [[1.70700492E12, 224.02739726027391], [1.70700486E12, 199.85826771653552]], "isOverall": false, "label": "Get Koi Fish-0", "isController": false}, {"data": [[1.70700492E12, 231.13333333333333], [1.70700486E12, 212.67200000000014]], "isOverall": false, "label": "Get Koi Fish-3", "isController": false}, {"data": [[1.70700492E12, 235.06666666666663], [1.70700486E12, 205.68000000000006]], "isOverall": false, "label": "Get Koi Fish-2", "isController": false}, {"data": [[1.70700492E12, 1093.9500000000003], [1.70700486E12, 1057.7500000000005]], "isOverall": false, "label": "Get Persian Cats", "isController": false}, {"data": [[1.70700492E12, 1075.0860215053763], [1.70700486E12, 1054.4299065420569]], "isOverall": false, "label": "Get Bulldog", "isController": false}, {"data": [[1.70700492E12, 1091.3333333333335], [1.70700486E12, 1076.627272727272]], "isOverall": false, "label": "Get Dog", "isController": false}, {"data": [[1.70700492E12, 12972.51515151515], [1.70700486E12, 13302.138613861385]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.70700492E12, 238.5266666666666], [1.70700486E12, 254.14583333333334], [1.70700498E12, 185.5]], "isOverall": false, "label": "Get Order Confirm Form-0", "isController": false}, {"data": [[1.70700492E12, 220.38], [1.70700486E12, 239.25000000000003], [1.70700498E12, 177.5]], "isOverall": false, "label": "Get Order Confirm Form-1", "isController": false}, {"data": [[1.70700492E12, 223.22666666666672], [1.70700486E12, 225.95833333333334], [1.70700498E12, 174.0]], "isOverall": false, "label": "Get Order Confirm Form-2", "isController": false}, {"data": [[1.70700492E12, 219.51333333333324], [1.70700486E12, 236.25000000000003], [1.70700498E12, 334.5]], "isOverall": false, "label": "Get Order Confirm Form-3", "isController": false}, {"data": [[1.70700492E12, 216.56666666666663], [1.70700486E12, 222.04166666666669], [1.70700498E12, 332.0]], "isOverall": false, "label": "Get Order Confirm Form-4", "isController": false}, {"data": [[1.70700492E12, 241.46666666666658], [1.70700486E12, 246.79166666666652], [1.70700498E12, 329.0]], "isOverall": false, "label": "Get Order Confirm Form-5", "isController": false}, {"data": [[1.70700492E12, 234.60666666666674], [1.70700486E12, 247.22916666666666], [1.70700498E12, 336.5]], "isOverall": false, "label": "Get Order Confirm Form-6", "isController": false}, {"data": [[1.70700492E12, 517.3509933774833], [1.70700486E12, 533.7446808510638], [1.70700498E12, 350.0]], "isOverall": false, "label": "Get Order Confirm Form-7", "isController": false}, {"data": [[1.70700492E12, 504.2781456953641], [1.70700486E12, 541.2340425531913], [1.70700498E12, 481.5]], "isOverall": false, "label": "Get Order Confirm Form-8", "isController": false}, {"data": [[1.70700492E12, 506.8807947019867], [1.70700486E12, 510.6808510638297], [1.70700498E12, 346.0]], "isOverall": false, "label": "Get Order Confirm Form-9", "isController": false}, {"data": [[1.70700492E12, 536.9139784946237], [1.70700486E12, 515.7009345794393]], "isOverall": false, "label": "Get Bulldog-9", "isController": false}, {"data": [[1.70700492E12, 536.7526881720427], [1.70700486E12, 527.6448598130843]], "isOverall": false, "label": "Get Bulldog-8", "isController": false}, {"data": [[1.70700492E12, 536.9032258064518], [1.70700486E12, 511.6822429906539]], "isOverall": false, "label": "Get Bulldog-7", "isController": false}, {"data": [[1.70700492E12, 277.08695652173924], [1.70700486E12, 275.6944444444444]], "isOverall": false, "label": "Get Bulldog-6", "isController": false}, {"data": [[1.70700492E12, 205.4347826086957], [1.70700486E12, 224.1018518518519]], "isOverall": false, "label": "Get Bulldog-1", "isController": false}, {"data": [[1.70700492E12, 233.02173913043472], [1.70700486E12, 231.03703703703704]], "isOverall": false, "label": "Get Bulldog-0", "isController": false}, {"data": [[1.70700492E12, 1068.26582278481], [1.70700486E12, 981.8595041322313]], "isOverall": false, "label": "Get Koi Fish", "isController": false}, {"data": [[1.70700492E12, 250.46739130434773], [1.70700486E12, 253.72222222222217]], "isOverall": false, "label": "Get Bulldog-5", "isController": false}, {"data": [[1.70700492E12, 227.91304347826082], [1.70700486E12, 252.29629629629608]], "isOverall": false, "label": "Get Bulldog-4", "isController": false}, {"data": [[1.70700492E12, 248.8913043478261], [1.70700486E12, 239.41666666666674]], "isOverall": false, "label": "Get Bulldog-3", "isController": false}, {"data": [[1.70700492E12, 237.13043478260872], [1.70700486E12, 227.97222222222229]], "isOverall": false, "label": "Get Bulldog-2", "isController": false}, {"data": [[1.70700492E12, 534.5409836065572], [1.70700486E12, 503.8776978417265]], "isOverall": false, "label": "Get Fish-9", "isController": false}, {"data": [[1.70700492E12, 1174.5353535353534], [1.70700486E12, 1016.2277227722774]], "isOverall": false, "label": "Get Iguana Reptiles", "isController": false}, {"data": [[1.70700492E12, 529.4833333333333], [1.70700486E12, 508.3428571428571]], "isOverall": false, "label": "Get Fish-7", "isController": false}, {"data": [[1.70700492E12, 531.258064516129], [1.70700486E12, 495.304347826087]], "isOverall": false, "label": "Get Fish-8", "isController": false}, {"data": [[1.70700492E12, 273.0862068965516], [1.70700486E12, 443.85915492957747]], "isOverall": false, "label": "Get Fish-5", "isController": false}, {"data": [[1.70700492E12, 241.07017543859638], [1.70700486E12, 447.909090909091]], "isOverall": false, "label": "Get Fish-6", "isController": false}, {"data": [[1.70700492E12, 240.53448275862073], [1.70700486E12, 402.83098591549293]], "isOverall": false, "label": "Get Fish-3", "isController": false}, {"data": [[1.70700492E12, 233.45614035087718], [1.70700486E12, 434.8111888111888]], "isOverall": false, "label": "Get Fish-4", "isController": false}, {"data": [[1.70700492E12, 243.3859649122807], [1.70700486E12, 327.46853146853135]], "isOverall": false, "label": "Get Fish-1", "isController": false}, {"data": [[1.70700492E12, 247.17543859649118], [1.70700486E12, 364.8461538461538]], "isOverall": false, "label": "Get Fish-2", "isController": false}, {"data": [[1.70700492E12, 207.39999999999998], [1.70700486E12, 535.6896551724138]], "isOverall": false, "label": "Get Fish-0", "isController": false}, {"data": [[1.70700492E12, 252.7575757575758], [1.70700486E12, 215.65346534653455]], "isOverall": false, "label": "Get Iguana Reptiles-1", "isController": false}, {"data": [[1.70700492E12, 277.67999999999984], [1.70700486E12, 254.90000000000003]], "isOverall": false, "label": "Get Persian Cats-6", "isController": false}, {"data": [[1.70700492E12, 282.1919191919192], [1.70700486E12, 222.85148514851485]], "isOverall": false, "label": "Get Iguana Reptiles-0", "isController": false}, {"data": [[1.70700492E12, 533.7600000000001], [1.70700486E12, 532.64]], "isOverall": false, "label": "Get Persian Cats-7", "isController": false}, {"data": [[1.70700492E12, 285.6161616161616], [1.70700486E12, 230.96039603960395]], "isOverall": false, "label": "Get Iguana Reptiles-3", "isController": false}, {"data": [[1.70700492E12, 539.8800000000003], [1.70700486E12, 536.0100000000002]], "isOverall": false, "label": "Get Persian Cats-8", "isController": false}, {"data": [[1.70700492E12, 289.06060606060595], [1.70700486E12, 220.00000000000003]], "isOverall": false, "label": "Get Iguana Reptiles-2", "isController": false}, {"data": [[1.70700492E12, 511.3200000000001], [1.70700486E12, 538.2899999999998]], "isOverall": false, "label": "Get Persian Cats-9", "isController": false}, {"data": [[1.70700492E12, 239.2413793103448], [1.70700486E12, 228.8849557522124]], "isOverall": false, "label": "Get Dog-0", "isController": false}, {"data": [[1.70700492E12, 237.22471910112355], [1.70700486E12, 235.20720720720715]], "isOverall": false, "label": "Get Dog-2", "isController": false}, {"data": [[1.70700492E12, 229.56179775280896], [1.70700486E12, 212.21621621621622]], "isOverall": false, "label": "Get Dog-1", "isController": false}, {"data": [[1.70700492E12, 255.50561797752803], [1.70700486E12, 248.8198198198198]], "isOverall": false, "label": "Get Dog-4", "isController": false}, {"data": [[1.70700492E12, 543.2020202020203], [1.70700486E12, 509.6534653465347]], "isOverall": false, "label": "Get Iguana Reptiles-9", "isController": false}, {"data": [[1.70700492E12, 224.20224719101125], [1.70700486E12, 223.30630630630642]], "isOverall": false, "label": "Get Dog-3", "isController": false}, {"data": [[1.70700492E12, 540.4848484848484], [1.70700486E12, 527.5445544554455]], "isOverall": false, "label": "Get Iguana Reptiles-8", "isController": false}, {"data": [[1.70700492E12, 255.90909090909085], [1.70700486E12, 267.5267857142856]], "isOverall": false, "label": "Get Dog-6", "isController": false}, {"data": [[1.70700492E12, 269.4831460674157], [1.70700486E12, 253.4774774774776]], "isOverall": false, "label": "Get Dog-5", "isController": false}, {"data": [[1.70700492E12, 1012.0529801324502], [1.70700486E12, 1067.723404255319], [1.70700498E12, 864.5]], "isOverall": false, "label": "Get Order Confirm Form", "isController": false}, {"data": [[1.70700492E12, 549.1111111111114], [1.70700486E12, 556.8181818181816]], "isOverall": false, "label": "Get Dog-8", "isController": false}, {"data": [[1.70700492E12, 321.66666666666674], [1.70700486E12, 244.04950495049496]], "isOverall": false, "label": "Get Iguana Reptiles-5", "isController": false}, {"data": [[1.70700492E12, 553.6333333333337], [1.70700486E12, 546.2272727272729]], "isOverall": false, "label": "Get Dog-7", "isController": false}, {"data": [[1.70700492E12, 308.54545454545456], [1.70700486E12, 237.78217821782172]], "isOverall": false, "label": "Get Iguana Reptiles-4", "isController": false}, {"data": [[1.70700492E12, 528.3232323232322], [1.70700486E12, 519.0]], "isOverall": false, "label": "Get Iguana Reptiles-7", "isController": false}, {"data": [[1.70700492E12, 530.3666666666666], [1.70700486E12, 542.7545454545455]], "isOverall": false, "label": "Get Dog-9", "isController": false}, {"data": [[1.70700492E12, 340.7272727272728], [1.70700486E12, 241.89108910891085]], "isOverall": false, "label": "Get Iguana Reptiles-6", "isController": false}, {"data": [[1.70700492E12, 983.5288461538461], [1.70700486E12, 983.6041666666665]], "isOverall": false, "label": "Remove One Cat From Cart", "isController": false}, {"data": [[1.70700492E12, 255.71], [1.70700486E12, 223.63]], "isOverall": false, "label": "Get Persian Cats-0", "isController": false}, {"data": [[1.70700492E12, 241.32999999999998], [1.70700486E12, 219.39999999999992]], "isOverall": false, "label": "Get Persian Cats-1", "isController": false}, {"data": [[1.70700492E12, 259.8], [1.70700486E12, 236.38999999999996]], "isOverall": false, "label": "Get Persian Cats-2", "isController": false}, {"data": [[1.70700492E12, 258.31], [1.70700486E12, 227.49999999999997]], "isOverall": false, "label": "Get Persian Cats-3", "isController": false}, {"data": [[1.70700492E12, 261.89], [1.70700486E12, 238.7499999999999]], "isOverall": false, "label": "Get Persian Cats-4", "isController": false}, {"data": [[1.70700492E12, 292.49000000000007], [1.70700486E12, 249.60999999999996]], "isOverall": false, "label": "Get Persian Cats-5", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70700498E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.70700486E12, "maxY": 3274.2574257425736, "series": [{"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Cats-5", "isController": false}, {"data": [[1.70700492E12, 333.32323232323233], [1.70700486E12, 265.920792079208]], "isOverall": false, "label": "Get Reptiles-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Cats-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Reptiles-1", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Cats-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Reptiles-2", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Cats-2", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Cats-1", "isController": false}, {"data": [[1.70700492E12, 278.72], [1.70700486E12, 234.17999999999992]], "isOverall": false, "label": "Get Cats-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Reptiles-7", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Reptiles-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Reptiles-9", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Reptiles-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Reptiles-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Reptiles-5", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Reptiles-6", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Cart Details-2", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Cart Details-1", "isController": false}, {"data": [[1.70700492E12, 263.34000000000003], [1.70700486E12, 255.9299999999999]], "isOverall": false, "label": "Cart Details-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Cart Details-6", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Cart Details-5", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Cart Details-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Cart Details-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Cats-9", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Cats-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Cart Details-9", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Cats-7", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Cart Details-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Cats-6", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Cart Details-7", "isController": false}, {"data": [[1.70700492E12, 285.3100000000001], [1.70700486E12, 241.97]], "isOverall": false, "label": "Get Adult Male Persian Cat", "isController": false}, {"data": [[1.70700492E12, 333.32323232323233], [1.70700486E12, 265.920792079208]], "isOverall": false, "label": "Get Reptiles", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-6", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-5", "isController": false}, {"data": [[1.70700492E12, 213.2843137254902], [1.70700486E12, 214.26530612244898]], "isOverall": false, "label": "Remove One Cat From Cart-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-2", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-1", "isController": false}, {"data": [[1.70700492E12, 278.72], [1.70700486E12, 234.17999999999992]], "isOverall": false, "label": "Get Cats", "isController": false}, {"data": [[1.70700492E12, 203.32812500000003], [1.70700486E12, 558.8602941176467]], "isOverall": false, "label": "Get Fish", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-7", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-6", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-9", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-2", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-5", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Adult Male Persian Cat-1", "isController": false}, {"data": [[1.70700492E12, 285.3100000000001], [1.70700486E12, 241.97]], "isOverall": false, "label": "Get Adult Male Persian Cat-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-7", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Remove One Cat From Cart-9", "isController": false}, {"data": [[1.70700492E12, 263.34000000000003], [1.70700486E12, 255.9299999999999]], "isOverall": false, "label": "Cart Details", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-9", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-5", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-7", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-6", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-1", "isController": false}, {"data": [[1.70700492E12, 224.00000000000003], [1.70700486E12, 199.8503937007874]], "isOverall": false, "label": "Get Koi Fish-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Koi Fish-2", "isController": false}, {"data": [[1.70700492E12, 255.66999999999996], [1.70700486E12, 223.61000000000004]], "isOverall": false, "label": "Get Persian Cats", "isController": false}, {"data": [[1.70700492E12, 232.3548387096775], [1.70700486E12, 231.4766355140188]], "isOverall": false, "label": "Get Bulldog", "isController": false}, {"data": [[1.70700492E12, 240.87777777777794], [1.70700486E12, 227.20909090909095]], "isOverall": false, "label": "Get Dog", "isController": false}, {"data": [[1.70700492E12, 3013.757575757577], [1.70700486E12, 3274.2574257425736]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.70700492E12, 238.47333333333333], [1.70700486E12, 254.08333333333331], [1.70700498E12, 185.5]], "isOverall": false, "label": "Get Order Confirm Form-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0], [1.70700498E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-1", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0], [1.70700498E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-2", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0], [1.70700498E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0], [1.70700498E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0], [1.70700498E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-5", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0], [1.70700498E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-6", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0], [1.70700498E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-7", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0], [1.70700498E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0], [1.70700498E12, 0.0]], "isOverall": false, "label": "Get Order Confirm Form-9", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Bulldog-9", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Bulldog-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Bulldog-7", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Bulldog-6", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Bulldog-1", "isController": false}, {"data": [[1.70700492E12, 232.96739130434787], [1.70700486E12, 230.96296296296308]], "isOverall": false, "label": "Get Bulldog-0", "isController": false}, {"data": [[1.70700492E12, 224.37974683544303], [1.70700486E12, 198.40495867768598]], "isOverall": false, "label": "Get Koi Fish", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Bulldog-5", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Bulldog-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Bulldog-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Bulldog-2", "isController": false}, {"data": [[1.70700492E12, 534.5409836065572], [1.70700486E12, 503.85611510791387]], "isOverall": false, "label": "Get Fish-9", "isController": false}, {"data": [[1.70700492E12, 282.1616161616161], [1.70700486E12, 222.8415841584159]], "isOverall": false, "label": "Get Iguana Reptiles", "isController": false}, {"data": [[1.70700492E12, 529.4833333333333], [1.70700486E12, 508.32142857142884]], "isOverall": false, "label": "Get Fish-7", "isController": false}, {"data": [[1.70700492E12, 531.258064516129], [1.70700486E12, 495.2971014492753]], "isOverall": false, "label": "Get Fish-8", "isController": false}, {"data": [[1.70700492E12, 273.0862068965516], [1.70700486E12, 443.83098591549305]], "isOverall": false, "label": "Get Fish-5", "isController": false}, {"data": [[1.70700492E12, 241.05263157894726], [1.70700486E12, 447.88811188811184]], "isOverall": false, "label": "Get Fish-6", "isController": false}, {"data": [[1.70700492E12, 240.51724137931038], [1.70700486E12, 402.80281690140845]], "isOverall": false, "label": "Get Fish-3", "isController": false}, {"data": [[1.70700492E12, 233.45614035087718], [1.70700486E12, 434.7552447552449]], "isOverall": false, "label": "Get Fish-4", "isController": false}, {"data": [[1.70700492E12, 243.03508771929825], [1.70700486E12, 327.07692307692326]], "isOverall": false, "label": "Get Fish-1", "isController": false}, {"data": [[1.70700492E12, 246.78947368421055], [1.70700486E12, 364.69230769230774]], "isOverall": false, "label": "Get Fish-2", "isController": false}, {"data": [[1.70700492E12, 207.34545454545454], [1.70700486E12, 535.2689655172412]], "isOverall": false, "label": "Get Fish-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-1", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-6", "isController": false}, {"data": [[1.70700492E12, 282.1616161616161], [1.70700486E12, 222.8415841584159]], "isOverall": false, "label": "Get Iguana Reptiles-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-7", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-2", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-9", "isController": false}, {"data": [[1.70700492E12, 239.21839080459765], [1.70700486E12, 228.84955752212394]], "isOverall": false, "label": "Get Dog-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Dog-2", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Dog-1", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Dog-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-9", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Dog-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Dog-6", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Dog-5", "isController": false}, {"data": [[1.70700492E12, 238.0860927152318], [1.70700486E12, 255.65957446808508], [1.70700498E12, 185.5]], "isOverall": false, "label": "Get Order Confirm Form", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Dog-8", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-5", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Dog-7", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-7", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Dog-9", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Iguana Reptiles-6", "isController": false}, {"data": [[1.70700492E12, 215.61538461538467], [1.70700486E12, 211.76041666666669]], "isOverall": false, "label": "Remove One Cat From Cart", "isController": false}, {"data": [[1.70700492E12, 255.66999999999996], [1.70700486E12, 223.61000000000004]], "isOverall": false, "label": "Get Persian Cats-0", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-1", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-2", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-3", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-4", "isController": false}, {"data": [[1.70700492E12, 0.0], [1.70700486E12, 0.0]], "isOverall": false, "label": "Get Persian Cats-5", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.70700498E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 153.0, "minX": 1.70700486E12, "maxY": 2911.0, "series": [{"data": [[1.70700492E12, 2245.0], [1.70700486E12, 2911.0], [1.70700498E12, 885.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.70700492E12, 806.0], [1.70700486E12, 818.0], [1.70700498E12, 747.9999999999998]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.70700492E12, 1545.4799999999996], [1.70700486E12, 1607.58], [1.70700498E12, 885.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.70700492E12, 918.0], [1.70700486E12, 904.0], [1.70700498E12, 878.8499999999999]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.70700492E12, 153.0], [1.70700486E12, 153.0], [1.70700498E12, 170.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.70700492E12, 469.0], [1.70700486E12, 320.0], [1.70700498E12, 190.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.70700498E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
                }