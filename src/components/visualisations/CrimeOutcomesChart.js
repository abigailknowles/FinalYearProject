import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
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
                colors: [
                    '#02ccf9'
                ],
                xaxis: {
                    categories: ["Suspect charged", "Unable to prosecute", "Local resolution", "Offender cautioned", "Investigation complete", "No further action"]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [50, 100, 150, 20, 40, 200]
                }
            ]
        };
    }

    // crime outcomes
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
        fetch("https://data.police.uk/api/outcomes-at-location?date=2021-01&poly=52.268,0.543:52.794,0.238:52.130,0.478")
            .then(res => res.json())
            .then((result) => {
                var labels = [];
                var o = [];
                var out = this.groupByOutcome(result);
                console.log("outrrr", out.length)
                for (let i = 0; i < out.length; i++) {
                    o.push(out.groups[i].group.count);
                    console.log("o", o);
                }
                // for (let i = 0; i < result.groups.length; i++) {
                //   labels.push(result.groups[i].key);
                // }
                // console.log(out.groups[0].code, out.groups[0].group.count,);
                // console.log(out.groups[1].group.count);
                // console.log(out.groups[2].group.count);
                // console.log(out.groups[3].group.count);
                // console.log(out.groups[4].group.count);
                // console.log(out.groups[5].group.count);
                // console.log(out.groups[6].group.count);
                // console.log(out.groups[7].group.count);

                var myStringArray = out;
                var arrayLength = myStringArray.length;
                for (var i = 0; i < arrayLength; i++) {
                    console.log(myStringArray[i]);
                }
                this.setState({
                    outcomes: out,
                    result: result,
                    total: result.length,
                    options: {
                        labels: labels
                    }
                });
                console.log("outcomes", this.state.outcomes);
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
                <Jumbotron className="personal-details-jumbotron" align="center">
                    <Chart options={this.state.options} series={this.state.series} labels={this.state.labels} type="donut" width="400" />
                </Jumbotron>
            </>
        );
    }
}

export default withRouter(CrimeOutcomesChart);
