// const { districtList, getDoctorList } = require('./request');
// require('./proxy');

// const store = require('./store');

// setInterval(() => {
//     if (store.has('cookie')) {
//         console.log('--------------------------------');
//         console.log(store.get('cookie'));
//     }
// }, 5000);

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Input, Form } from 'antd';
import { Select } from 'antd';


export class App extends Component {

    componentWillMount = () => {

    }

    render() {
        // const electron = window.electron;
        // console.log(electron);

        //console.log(window.require('remote').getGlobal('sharedObject').someProperty);


        const { Option } = Select;
        const { Item: FormItem } = Form;
        return (
            <div style={{ padding: 20 }}>
                <Form>
                    <FormItem label="cookie">
                        <Input style={{ width: 500 }}></Input>
                    </FormItem>
                    <FormItem label="districtList">
                        <Select style={{ width: 500 }}>
                            <Option value="1">1</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="dutyDeptList">
                        <Select style={{ width: 500 }}>
                            <Option value="1">1</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="getRegistDate">
                        <Select style={{ width: 500 }}>
                            <Option value="1">1</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="getDoctorList">
                        <Select style={{ width: 500 }}>
                            <Option value="1">1</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="getDoctorDetail">
                        <Select style={{ width: 500 }}>
                            <Option value="1">1</Option>
                        </Select>
                    </FormItem>
                </Form>

            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));
