import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getReports } from '../redux/modules';
import { Table, Header, Form, Button } from 'semantic-ui-react';

class Report extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true,
            startDate: '',
            endDate: ''
        }
    }

    handleChange(evt){
        const state = Object.assign({}, this.state, { [evt.target.name]: evt.target.value });
        this.setState(state);
        this.validate(state);
    }

    validate(state) {
        const { startDate, endDate } = state;
        const temp1 = startDate.split("-");
        const temp2 = endDate.split("-");
        // 1, 2, 0
        const sDate = temp1[1] + "-" + temp1[2] + "-" + temp1[0];
        const eDate = temp2[1] + "-" + temp2[2] + "-" + temp2[0];
        console.log(sDate)
        console.log(eDate)
        const str = new Date();
        // console.log(str);

        if ( sDate < Date.parse(str.getMonth() + "-" + str.getDate()+ "-" + str.getYear())) {
            this.setState({ buttonDisabled: true });
        } else {
            this.setState({ buttonDisabled: false });
        }

        if ( eDate < Date.parse(str.getMonth() + "-" + str.getDate()+ "-" + str.getYear())) {
            this.setState({ buttonDisabled: true });
        } else {
            this.setState({ buttonDisabled: false });
        }
    }

   // Date.parse(value) < Date.parse(dateToday.getMonth() + "/" + dateToday.getDate() + "/" + dateToday.getYear())


    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth()+1)).slice(-2),
            day  = ("0" + date.getDate()).slice(-2);
        return [ date.getFullYear(), mnth, day ].join("-");
    }

    getReports() {
        this.props.getReports(this.state.startDate, this.state.endDate);
    }

    render() {
        const { reports } = this.props;
        return (
            <div>
                <Header>
                    <Header.Content>
                        Reports
                    </Header.Content>
                </Header>
                <Form>
                    <Form.Field>
                        <label>Start Date: </label>
                        <input 
                            name='startDate'
                            type='date'
                            value={this.state.startDate} 
                            onChange={this.handleChange.bind(this)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>End Date: </label>
                        <input 
                            name='endDate'
                            type='date'
                            value={this.state.endDate} 
                            onChange={this.handleChange.bind(this)}
                        />
                    </Form.Field>
                </Form>
                {
                    this.state.buttonDisabled === true &&
                    <label> <sup>*</sup> Please fill the mandatory fileds</label>
                }
                <br />
                <Button 
                    primary
                    disabled={this.state.buttonDisabled}
                    onClick={this.getReports.bind(this)}>Get Reports</Button>
            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Product Name</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                {
                    reports.map(report => {
                        return (
                            <Table.Row>
                                <Table.Cell >{report.supplierEmail}</Table.Cell>
                                <Table.Cell>{report.productName}</Table.Cell>
                                <Table.Cell>{report.quantity}</Table.Cell>
                                <Table.Cell>{report.quantity}</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
                </Table.Body>
            </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reports: state.supplier.reports
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReports: (startDate, endDate) => dispatch(getReports(startDate, endDate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);