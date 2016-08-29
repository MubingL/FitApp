
$(document).ready(function() {
  var text = $("#hSleep").text();
    var results = [];
    var data = [];
    results = text.split(",");
    // alert(results);
    console.log("results: " + text);
    for(var i = results.length-1; i >= 0; i--) {
        data.push([new Date(results[i-1]).getTime(), results[i]]);
        i--;
    }

    var barOptions = {
        series: {
            bars: {
                show: true,
                barWidth: 43200000
            }
        },
        xaxis: {
            mode: "time",
            timeformat: "%m/%d",
            minTickSize: [1, "day"]
        },
        grid: {
            hoverable: true
        },
        legend: {
            show: false
        },
        tooltip: true,
        tooltipOpts: {
            content: "Date: %x, Minutes: %y"
        }
    };
    var barData = {
        label: "bar",
        data: data
    };
    $.plot($("#flot-line-chart"), [barData], barOptions);

    text = $("#hSteps").text();
    results = text.split(",");
    data = [];
    for(var i = results.length-1; i >= 0; i--) {
        data.push([new Date(results[i-1]).getTime(), results[i]]);
        i--;
    }
    var options = {
        series: {
            lines: {
                show: true
            },
            points: {
                show: true
            }
        },
        grid: {
            hoverable: true //IMPORTANT! this is needed for tooltip to work
        },
        xaxis: {
            mode: "time",
            timeformat: "%m/%d",
            minTickSize: [1, "day"]
        },
        tooltip: true,
        tooltipOpts: {
            content: "'Date: %x.1, Steps: %y",
            shifts: {
                x: -60,
                y: 25
            }
        }
    };
    var plotObj = $.plot($("#flot-bar-chart"), [{
            data: data,
            label: "Steps"
        }],
        options);

    text = $("#hDistance").text();
    results = text.split(",");
    data = [];
    //alert(text);
    for(var i = results.length-1; i >= 0; i--) {
        data.push([new Date(results[i-1]).getTime(), results[i]]);
        i--;
    }

    var options = {
        series: {
            lines: {
                show: true
            },
            points: {
                show: true
            }
        },
        grid: {
            hoverable: true //IMPORTANT! this is needed for tooltip to work
        },
        xaxis: {
            mode: "time",
            timeformat: "%m/%d",
            minTickSize: [1, "day"]
        },
        tooltip: true,
        tooltipOpts: {
            content: "'Date: %x.1, Heart Rates: %y",
            shifts: {
                x: -60,
                y: 25
            }
        }
    };
    var plotObj = $.plot($("#flot-moving-line-chart"), [{
            data: data,
            label: "Heart Rates"
        }],
        options);

    text = $("#hCalories").text();
    results = text.split(",");
    data = [];
    for(var i = results.length-1; i >= 0; i--) {
        data.push([new Date(results[i-1]).getTime(), results[i]]);
        i--;
    }
    var options = {
        series: {
            lines: {
                show: true
            },
            points: {
                show: true
            }
        },
        grid: {
            hoverable: true //IMPORTANT! this is needed for tooltip to work
        },
        xaxis: {
            mode: "time",
            timeformat: "%m/%d",
            minTickSize: [1, "day"]
        },
        tooltip: true,
        tooltipOpts: {
            content: "'Date: %x.1, Steps: %y",
            shifts: {
                x: -60,
                y: 25
            }
        }
    };
    var plotObj = $.plot($("#flot-multiple-axes-chart"), [{
            data: data,
            label: "Calories"
        }],
        options);
});

