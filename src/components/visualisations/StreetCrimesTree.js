import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Chart from "react-apexcharts";
import Loading from '../Loading';

class CrimeOutcomesChart extends Component {
    constructor() {
        super();
        this.state = {
            series: [
                {
                    data: [
                        {
                            x: [],
                            y: []
                        },

                    ]
                }
            ],
            options: {
                legend: {
                    show: false
                },
                chart: {
                    height: 350,
                    type: 'treemap'
                },
                title: {
                    text: 'Street Crimes',
                    align: 'center'
                },
                colors: [
                    '#ff80aa', '#cce6ff', '#adebad', '#ffaa80', '#99bbff', '#ff4000', '#990099', '#d98cd9', '#74bec8', '#7ee9cf'
                ],
                plotOptions: {
                    treemap: {
                        distributed: true,
                        enableShades: false
                    }
                }
            },
        };
    }

    isGroupInArray(groups, category) {
        var isFound = false;
        for (var key in groups) {
            if (groups[key].category === category) {
                isFound = true;
            }
        }
        return isFound;
    }

    getByGroupName(arr, category) {
        var group = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].category === category) {
                group.push(arr[i]);
            }
        }
        return { group: group, count: group.length };
    }

    groupBy(arr) {
        var groups = [];

        for (var i = 0; i < arr.length; i++) {
            var category = arr[i].category;
            if (this.isGroupInArray(groups, category) === false)
                groups.push({ category: category, group: this.getByGroupName(arr, category) })
        }
        return { groups: groups, count: arr.length };
    }

    textFormatter(category) {
        const cat = category;
        const capitalCat = cat.charAt(0).toUpperCase() + cat.slice(1);
        return capitalCat.replaceAll('-', ' ');
    }

    StreetCrimes() {
        fetch(`https://data.police.uk/api/crimes-street/all-crime?poly=${this.props.poly}`)
            .then(res => res.json())
            .then(
                (result) => {
                    const x = [];
                    const y = [];
                    var categories = this.groupBy(result);
                    for (let i = 0; i < categories.groups.length; i++) {
                        var cat = this.textFormatter(categories.groups[i].category)
                        x.push(cat);
                    }
                    for (let i = 0; i < categories.groups.length; i++) {
                        y.push(categories.groups[i].group.count);
                    }
                    for (let i = 0; i < 9; i++) {
                        this.setState({
                            series: [
                                {
                                    data: [
                                        {
                                            x: x[0],
                                            y: y[0]
                                        },
                                        {
                                            x: x[1],
                                            y: y[1]
                                        },
                                        {
                                            x: x[2],
                                            y: y[2]
                                        },
                                        {
                                            x: x[3],
                                            y: y[3]
                                        },
                                        {
                                            x: x[4],
                                            y: y[4]
                                        },
                                        {
                                            x: x[5],
                                            y: y[5]
                                        },
                                        {
                                            x: x[6],
                                            y: y[6]
                                        },
                                        {
                                            x: x[7],
                                            y: y[7]
                                        },
                                        {
                                            x: x[8],
                                            y: y[8]
                                        },
                                    ]
                                }
                            ]

                        });
                    }
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.StreetCrimes();
    }

    render() {
        const { isLoaded } = this.state;
        return (
            <>

                <Jumbotron className="personal-details-jumbotron" align="center">
                    {/* {!isLoaded
                        ? <div><Loading /></div>
                        :
                        <> */}
                    <Chart options={this.state.options} series={this.state.series} type="treemap" height={350} />
                    {/* </>
                    } */}
                </Jumbotron>

            </>
        );
    }
}

export default withRouter(CrimeOutcomesChart);
