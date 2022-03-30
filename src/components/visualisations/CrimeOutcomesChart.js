import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Chart from "react-apexcharts";

class CrimeOutcomesChart extends Component {
    constructor() {
        super();
        this.state = {
            options: {
                fill: {
                    type: 'solid'
                },
                title: {
                    text: "Crime Outcomes",
                    align: 'center'
                },
                colors: [
                    '#02ccf9'
                ],
                xaxis: {
                    categories: []
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
        fetch("https://data.police.uk/api/outcomes-at-location?date=2021-12&poly=52.268,0.543:52.794,0.238:52.130,0.478")
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
                                width="540"
                                height="320"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(CrimeOutcomesChart);
