import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Input, Form, Select, Button } from 'antd';

const ipc = window.require('electron').ipcRenderer

export class App extends Component {

    state = {
        isStart: false,
        cookie: '',
        districtList: [],
        districtCode: 0,
        dutyDeptList: [],
        deptId: 0,
        getRegistDate: [],
        date: '',
        getDoctorList: [],
        doctorid: 0,
        schedul: [],
        schedulid: 0
    }

    handleStartClick = () => {
        ipc.send('startProxy');

        this.setState({ isStart: true })
    }

    handleStopClick = () => {
        ipc.send('stopProxy');

        this.setState({ isStart: false })
    }

    districtList = () => {
        const res = ipc.sendSync('districtList');
        const { data, state } = JSON.parse(res.text);
        if (state == 1) {
            let list = []
            for (const k in data) {
                list.push({
                    id: k,
                    text: data[k].name + '-' + data[k].address
                });
            }
            this.setState({ districtList: list });
        }
    }

    dutyDeptList = (code) => {
        const res = ipc.sendSync('dutyDeptList', code);
        const { data, state } = JSON.parse(res.text);
        if (state == 1) {
            this.setState({ dutyDeptList: data });
        }
    }

    getRegistDate = () => {
        const res = ipc.sendSync('getRegistDate');
        const { data, state } = JSON.parse(res.text);
        if (state == 1) {
            let list = []
            for (const k in data) {
                list.push({
                    id: data[k].date,
                    text: data[k].week + '-' + data[k].date + '-' + data[k].stop
                });
            }
            this.setState({ getRegistDate: list });
        }
    }

    request = () => {
        this.districtList();
        this.getRegistDate();
    }

    handleReload = () => {
        this.request();

    }

    handleDistrictListChange = (val) => {
        this.setState({
            districtCode: val, dutyDeptList: []
        }, () => {
            this.dutyDeptList(this.state.districtCode);
        })
    }

    handleDateChange = (val) => {
        this.setState({ date: val }, () => {
            const { districtCode, deptId, date } = this.state;
            const res = ipc.sendSync('getDoctorList', JSON.stringify({ districtCode, deptId, date }));
            const { data, state } = res
            if (state == 1) {
                this.setState({ getDoctorList: data })
            }

        })
    }

    handleDoctorListChange = (val) => {
        console.log(1);
        this.setState({ doctorid: val }, () => {
            let { districtCode, doctorid, date } = this.state;
            doctorid = doctorid.replace(/-.*/, '');
            console.log('send');
            const res = ipc.sendSync('getDoctorDetail', JSON.stringify({ districtCode, doctorid, date }));
            if (res.state == 1) {
                const schedul = res.data.schedul;
                this.setState({ schedul: schedul })
            }
        });
    }

    render() {
        ipc.on('cookie', (event, message) => {
            this.setState({ cookie: message });
        });

        const { Option } = Select;
        const { Item: FormItem } = Form;
        return (
            <div style={{ padding: 20 }}>

                <Form>
                    <FormItem>
                        {
                            this.state.isStart ? <Button onClick={this.handleStopClick}>停止服务</Button> : <Button onClick={this.handleStartClick}>启动服务</Button>
                        }
                    </FormItem>
                    <FormItem label="cookie" className="eee">
                        <Input readOnly value={this.state.cookie} style={{ width: 500 }}></Input>
                    </FormItem>
                    <FormItem>

                        <Button onClick={this.handleReload}>reload</Button>

                    </FormItem>
                    <FormItem label="districtList">
                        <Select style={{ width: 500 }} onChange={this.handleDistrictListChange}>
                            {
                                this.state.districtList.map(item => {
                                    return <Option key={item.id} value={item.id}>{item.text}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                    <FormItem label="dutyDeptList">
                        <Select style={{ width: 500 }} onChange={(val) => this.setState({ deptId: val })}>
                            {
                                this.state.dutyDeptList.map(item => {
                                    return <Option key={item.deptId} value={item.deptId}>{item.deptName}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                    <FormItem label="getRegistDate">
                        <Select style={{ width: 500 }} onChange={this.handleDateChange}>
                            {
                                this.state.getRegistDate.map(item => {
                                    return <Option key={item.id} value={item.id}>{item.text}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                    <FormItem label="getDoctorList">
                        <Select style={{ width: 500 }} onChange={this.handleDoctorListChange}>
                            {
                                this.state.getDoctorList.map((item, index) => {
                                    return <Option value={item.doctorid + '-' + index} key={item.doctorid + '-' + index}>{item.docName + '-' + item.period + '-' + item.SeqNoStrLast}</Option>
                                })
                            }
                        </Select>
                    </FormItem>

                    <FormItem label="schedul">
                        <Select style={{ width: 500 }} onChange={this.handleSchedulChange}>
                            {
                                this.state.schedul.filter(f => f.SeqNoStrLast > 0).map((item, index) => {
                                    return <Option value={item.schedulid}>{item.deptName + '-' + item.date + '-' + item.period + '-' + item.SeqNoStrLast}</Option>
                                })
                            }
                        </Select>
                    </FormItem>
                </Form>

            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
