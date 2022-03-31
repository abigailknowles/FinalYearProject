import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Chart from "react-apexcharts";

class CrimeOutcomesChart extends Component {
    constructor() {
        super();
        this.state = {
            options: {
                plotOptions: {
                    bar: {
                        barHeight: '100%',
                        distributed: true,
                        horizontal: true,
                        dataLabels: {
                            position: 'bottom'
                        },
                    }
                },
                colors: ['#ccf3ff', '#74bec8', '#d8bfff', '#f75e5b', '#fff88b', '#e80b8c', '#938fff', '#f7c6af', '#ffa661', '#7ee9cf', '#ffeefe',
                    '#d2f9d0', '#e0f49c', '#02ccf9', '#ffc1f8', '#ffa0ab', '#f0f0f5', '#ffdd99', '#ffe0e0', '#b3d9ff', '#ff6666', '#99ff99', '#b8ffdb',
                    '#e6e6ff', '#ff80aa', '#adebeb', '#ccccff', '#00cccc', '#ff9999', '#fff88d', '#99ffff', '#ffa366', '#ebfafa', '#ffffcc', '#f9e6ff', '#faebf5',
                    '#ffe6cc', '#e6e6e6', '#6666cc', '#ffdd99'
                ],
                // dataLabels: {
                //     enabled: true,
                //     textAnchor: 'start',
                //     style: {
                //         colors: ['#000']
                //     },
                //     formatter: function (val, opt) {
                //         return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                //     },
                //     offsetX: 0,
                //     dropShadow: {
                //         enabled: true
                //     }
                // },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                xaxis: {
                    categories: [],
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
                title: {
                    text: 'Crime Outcomes',
                    align: 'center',
                    floating: true
                },
                tooltip: {
                    theme: 'dark',
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function () {
                                return ''
                            }
                        }
                    }
                }
            },
            series: [
                {
                    name: "series-1",
                    data: []
                }
            ]
        };
    }

    isOutcomeInArray(groups, code) {
        var isFound = false;
        for (var key in groups) {
            if (groups[key].code === code) {
                isFound = true;
            }
        }

        return isFound;
    }

    getByOutcomeName(arr, code) {
        var group = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].category.name === code) {
                group.push(arr[i]);
            }
        }
        return { group: group, count: group.length };
    }

    groupByOutcome(arr) {
        var groups = [];

        for (var i = 0; i < arr.length; i++) {
            var code = arr[i].category.name;
            if (this.isOutcomeInArray(groups, code) === false)
                groups.push({ code: code, group: this.getByOutcomeName(arr, code) })
        }

        return { groups: groups, count: arr.length };
    }

    componentDidMount() {
        this.crimeOutcomes();
    }

    crimeOutcomes() {
        const categories = [];
        fetch("https://data.police.uk/api/outcomes-at-location?poly=52.268,0.543:52.794,0.238:52.130,0.478")
            .then(r => r.json())
            .then((res) => {
                var out = this.groupByOutcome(res);
                for (let i = 0; i < out.groups.length; i++) {
                    categories.push(out.groups[i].code);
                }
                const data = [];
                for (let i = 0; i < out.groups.length; i++) {
                    data.push(out.groups[i].group.count);
                }
                this.setState({
                    series: [
                        {
                            data: data
                        }
                    ],
                    options: {
                        labels: categories
                    }
                });
            },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
        return "Total: " + this.state.total
    }

    render() {

        return (
            <>
                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="bar"
                                width="500"
                                height="380"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(CrimeOutcomesChart);
