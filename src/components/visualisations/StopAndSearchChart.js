import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import Chart from "react-apexcharts";

class StopAndSearchChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forces: [],
            searchedForce: "bedfordshire",
            series: [],
            options: {
                labels: [],
                plotOptions: {
                    pie: {
                        dataLabels: {
                            offset: -5
                        }
                    }
                },
                title: {
                    text: "Stop and search",
                    align: 'center'
                },
                colors: [
                    '#ffc1f8', '#fff88b', '#a0a1f5', '#02ccf9', '#ffa366', '#f75e5b'
                ],
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex]
                        return [name, val.toFixed(1) + '%']
                    }
                },
                legend: {
                    show: false,
                }
            },
        };
    }

    exists(key, array) {
        var isFound = false;
        for (let i = 0; i < array.length; i++) {
            if (array[i].key === key) {
                isFound = true;
            }
        }
        return isFound;
    }

    getByKey(key, arr) {
        var array = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].object_of_search === key) {
                array.push(arr[i]);
            }
        }
        return { outcomes: array, count: array.length };
    }

    groupOutcomes(arr) {
        var groups = [];

        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].object_of_search;
            if (this.exists(key, groups) === false)
                groups.push({ key: key, outcomes: this.getByKey(key, arr) })
        }

        return { groups: groups, count: arr.length };
    }

    policeForces() {
        fetch("https://data.police.uk/api/forces")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    forces: result
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    stopAndSearch(force) {
        if (force === undefined) {
            force = this.state.searchedForce
        }
        fetch(`https://data.police.uk/api/stops-force?force=${force}`)
            .then(res => res.json())
            .then((data) => {
                var labels = [];
                var result = this.groupOutcomes(data);
                for (let i = 0; i < result.groups.length; i++) {
                    labels.push(result.groups[i].key);
                }
                const series = [];
                for (let i = 0; i < result.groups.length; i++) {
                    series.push(result.groups[i].outcomes.count);
                }
                this.setState({
                    isLoaded: true,
                    stopSearchResult: data,
                    filteredData: result,
                    total: data.length,
                    isShown: true,
                    series: series,
                    options: {
                        labels: labels
                    }
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: true,
                        info: { id: "no-results-found", description: "No results found" }
                    });
                }
            )

        return "Total: " + this.state.total
    }

    componentDidMount() {
        this.stopAndSearch();
        this.policeForces();
    }

    changeHandler(force) {
        this.stopAndSearch(force);
    }

    render() {
        const { forces } = this.state;
        const sel = forces.map(force => ({ label: force.name, value: force.id }))

        return (
            <>
                <Select
                    options={sel}
                    placeholder="Search by a police force"
                    onChange={sel => this.changeHandler(sel.value)}
                />
                <Chart options={this.state.options} series={this.state.series} labels={this.state.labels} type="donut" width="380" />
            </>
        );
    }
}

export default withRouter(StopAndSearchChart);
