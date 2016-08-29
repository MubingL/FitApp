// Flot Charts sample data for SB Admin template

// Flot Line Chart with Tooltips
$(document).ready(function() {
    console.log("document ready");
    var offset = 0;
    plot();

    function plot() {
    var date = new Date();
    var newDate = new Date(date.getTime()-7*24*3600000);
    var newDate1 = new Date(date.getTime()-6*24*3600000);
    var newDate2 = new Date(date.getTime()-5*24*3600000);
    var newDate3 = new Date(date.getTime()-4*24*3600000);
    var newDate4 = new Date(date.getTime()-3*24*3600000);
    var newDate5 = new Date(date.getTime()-2*24*3600000);
    var newDate6 = new Date(date.getTime()-24*3600000);
    var data = $("#header5").text();
    var dateData = [];
    dateData = data.split(",");

    console.log("date data: " + dateData);
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
            hoverable: false
        },
        legend: {
            show: false
        },
        tooltip: true,
        tooltipOpts: {
            content: "Date: %x, Hours: %y"
        }
    };
    var barData = {
        label: "bar",
        data: [
            [newDate, 7.5],
            [newDate1, 8],
            [newDate2, 6],
            [newDate3, 6.5],
            [newDate4, 7],
            [newDate5, 8],
            [newDate6, 6]
        ]
    };
    $.plot($("#flot-line-chart"), [barData], barOptions);
    }
});

// Flot Pie Chart with Tooltips
$(function() {

    var data = [{
        label: "Series 0",
        data: 1
    }, {
        label: "Series 1",
        data: 3
    }, {
        label: "Series 2",
        data: 9
    }, {
        label: "Series 3",
        data: 20
    }];


});

// Flot Line Charts - Multiple Axes - With Data
$(function() {
    var oilprices = [
        [10.26, 370],
        [10.27, 380],
        [10.28, 250],
        [10.29, 350],
        [10.30, 400],
        [10.31, 370],
        [10.32, 380],
    ];
    var exchangerates = [
        
    ];

    function euroFormatter(v, axis) {
        return v.toFixed(axis.tickDecimals) + "€";
    }

    function doPlot(position) {
        $.plot($("#flot-multiple-axes-chart"), [{
            data: oilprices,
            label: "Calorie/day"
        }, {
        }], {
            xaxes: [{
                mode: 'time'
            }],
            yaxes: [{
                min: 0
            }, {
                // align if we are to the right
                alignTicksWithAxis: position == "right" ? 1 : null,
                position: position,
                tickFormatter: euroFormatter
            }],
            legend: {
                position: 'sw'
            },
            grid: {
                hoverable: true //IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s for %x was %y",
                xDateFormat: "%0d",

                onHover: function(flotItem, $tooltipEl) {
                    // console.log(flotItem, $tooltipEl);
                }
            }

        });
    }

    doPlot("right");

    $("button").click(function() {
        doPlot($(this).text());
    });
});

// Flot Chart Dynamic Chart

$(function() {

    var container = $("#flot-moving-line-chart");


    var maximum = container.outerWidth() / 2 || 300;

    //

    var data = [];

    function getRandomData() {

        if (data.length) {
            data = data.slice(1);
        }

        while (data.length < maximum) {
            var previous = data.length ? data[data.length - 1] : 50;
            var y = 80 + Math.random() * 10 - 5;
            data.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }

        // zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }

    //

    series = [{
        data: getRandomData(),
        lines: {
            fill: true
        }
    }];

    //

    var plot = $.plot(container, series, {
        grid: {
            borderWidth: 1,
            minBorderMargin: 20,
            labelMargin: 10,
            backgroundColor: {
                colors: ["#fff", "#e4f4f4"]
            },
            margin: {
                top: 8,
                bottom: 20,
                left: 20
            },
            markings: function(axes) {
                var markings = [];
                var xaxis = axes.xaxis;
                for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                    markings.push({
                        xaxis: {
                            from: x,
                            to: x + xaxis.tickSize
                        },
                        color: "rgba(232, 232, 255, 0.2)"
                    });
                }
                return markings;
            }
        },
        xaxis: {
            tickFormatter: function() {
                return "";
            }
        },
        yaxis: {
            min: 0,
            max: 110
        },
        legend: {
            show: true
        }
    });

    // Update the random dataset at 25FPS for a smoothly-animating chart

    setInterval(function updateRandom() {
        series[0].data = getRandomData();
        plot.setData(series);
        plot.draw();
    }, 40);

});

// Flot Chart Bar Graph

$(function() {
    var date = new Date();
    var newDate = new Date(date.getTime()-7*24*3600000);
    var newDate1 = new Date(date.getTime()-6*24*3600000);
    var newDate2 = new Date(date.getTime()-5*24*3600000);
    var newDate3 = new Date(date.getTime()-4*24*3600000);
    var newDate4 = new Date(date.getTime()-3*24*3600000);
    var newDate5 = new Date(date.getTime()-2*24*3600000);
    var newDate6 = new Date(date.getTime()-24*3600000);
    var data = $("#header5").text();
    var dateData = [];
    dateData = data.split(",");

    console.log("date data: " + dateData);
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
            content: "Date: %x, Hours: %y"
        }
    };
    var barData = {
        label: "bar",
        data: [
            [newDate, 6430],
            [newDate1, 4500],
            [newDate2, 3673],
            [newDate3, 4000],
            [newDate4, 5050],
            [newDate5, 6067],
            [newDate6, 5789]
        ]
    };
    $.plot($("#flot-bar-chart"), [barData], barOptions);

});