import React from 'react'
import ReactApexChart from 'react-apexcharts';
//import * as API_DEVICE from "../displayuser/display-user-api";
import * as API_USERS from "../client/client-api";
import * as API_DEVICE from "../displayuser/display-user-api";
import {over} from 'stompjs'
import SockJS from 'sockjs-client'


class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data1:[],
            data2: [],
            isLoaded: false,

            series: [{
                name: "",
                data:[],
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Product Trends by Month',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories:[],// this.props.state.data2,
                }
            },
        };
    }

    registerUser(id){
        let Sock= new SockJS('http://localhost:8083/wb');
        let stompClient = over(Sock);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            setTimeout(function() {
                //let id=this.props.props.location.state.id;
                stompClient.subscribe('/user/' + id + '/private', function (payload) {
                    console.log("RESSSSSSSSSSSSSSSSS")
                    let payloadData= JSON.parse(payload.body);
                    console.log(payloadData.message);
                    alert(payloadData.message)
                });
            }, 500);});
        //stompClient.connect({}, this.onConnect(stompClient), this.onError);
    }
    onError=(err)=>{
        console.log(err);
    }
    onConnect(stompClient){
        let id=this.props.props.location.state.id;
        console.log("in Connect");
        stompClient.subscribe('/user/'+id+'/private', this.onPrivateMessageRecived);
    }

     onPrivateMessageRecived=(payload)=>{
        console.log("in Message");
        let payloadData= JSON.parse(payload.body);
        console.log(payloadData.message);
        alert(payloadData.message)
    }

    componentDidMount() {
        this.getConsumptionForDevice(this.props.props.location.state.id);
        this.registerUser(this.props.props.location.state.id);
        this.timer = setInterval(() =>  this.getConsumptionForDevice(this.props.props.location.state.id), 5000);
    }

     getConsumptionForDevice(idDevice){
        return API_DEVICE.getSmartDeviceByUsers(idDevice, (result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    series: [{
                        name: result['deviceName'],
                        data:result['averageConsumptionList'],
                    }],

                    options: {
                        chart: {
                            height: 350,
                            type: 'line',
                            zoom: {
                                enabled: false
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        title: {
                            text: 'Product Trends by Month',
                            align: 'left'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories:result['listOfHours'],
                        }
                    },
                    isLoaded: true,
                 });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }


    render() {

        // console.log(this.props.state);
        return (
            <div id="chart">
                {this.state.isLoaded &&<ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />}
            </div>
        );
    }
}

export default ApexChart
