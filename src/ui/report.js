import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import { getReports } from '../redux/modules';
import { Table, Header, Form, Button } from 'semantic-ui-react';
import moment from 'moment';

class Report extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: true,
        }
    }


    handleChange(evt){
        const state = Object.assign({}, this.state, { [evt.target.name]: evt.target.value });
        this.setState({ [evt.target.name]: evt.target.value });
        this.setState(state);
        this.isFutureStartDate(state);
        this.isFutureEndDate(state);
    }

    isFutureStartDate(state) {
        let { startDate } = state;
        let today = new Date();
        let dd = today.getDate();

        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();
        if (dd<10) {
            dd='0'+dd;
        } 

        if (mm<10) {
            mm='0'+mm;
        }

        today = yyyy+'-'+mm+'-'+dd;

        startDate = moment(startDate);
        today = moment(today);

        if (startDate.diff(today) < 0) {
            this.setState({ buttonDisabled: true });
        } 
    }

    isFutureEndDate(state) {
        let { endDate, startDate } = state;
        let today = new Date();
        let dd = today.getDate();

        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();
        if (dd<10) {
            dd='0'+dd;
        } 

        if (mm<10) {
            mm='0'+mm;
        }

        today = yyyy+'-'+mm+'-'+dd;

        endDate = moment(endDate);
        today = moment(today);

        if (endDate.diff(startDate) < 0 || endDate.diff(today) > 0) {
            this.setState({ buttonDisabled: true });
        } else {
            this.setState({ buttonDisabled: false });
        }
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
                <br />
                <Button 
                    disabled={this.state.buttonDisabled}
                    onClick={this.getReports.bind(this)}>Get Reports</Button>
            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Product Name</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Updated Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                {
                    (!reports === undefined || !reports.length == 0)
                        ? reports.map(report => {
                        return (
                            <Table.Row>
                                <Table.Cell >{report.supplierEmail}</Table.Cell>
                                <Table.Cell>{report.productName}</Table.Cell>
                                <Table.Cell>{report.quantity}</Table.Cell>
                                <Table.Cell>{report.updatedQuantity}</Table.Cell>
                                <Table.Cell>{`${report.localDateTime.monthValue}-${report.localDateTime.dayOfMonth}-${report.localDateTime.year}`}</Table.Cell>
                            </Table.Row>
                        )
                    }) : 'No records found'
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