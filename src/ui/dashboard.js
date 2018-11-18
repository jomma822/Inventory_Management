import React, { Component } from 'react';
import { Grid, Statistic } from 'semantic-ui-react';
import { getStats } from '../redux/modules';
import { connect } from 'react-redux';

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getStats()
    }

    financial(totalStockPrice) {
        return Number.parseFloat(totalStockPrice).toFixed(2);
      }

    render() {
        const { stats } = this.props.dashboard;
        const { totalStockPrice } = stats;
        const stockPrice = this.financial(totalStockPrice);
        return (
            <Grid>
                <Grid.Row columns={3} textAlign='center'>
                    <Grid.Column>
                        <Statistic>
                            <Statistic.Value>{stats.totalSuppliers || 0}</Statistic.Value>
                            <Statistic.Label>Suppliers</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                    <Grid.Column>
                        <Statistic>
                            <Statistic.Value>{stats.totalBrands || 0}</Statistic.Value>
                            <Statistic.Label>Brands</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                    <Grid.Column>
                        <Statistic>
                            <Statistic.Value>{stats.totalProducts || 0}</Statistic.Value>
                            <Statistic.Label>Products</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} textAlign='center'>
                    <Grid.Column>
                        <Statistic>
                            <Statistic.Value>{stats.totalStockQuantity || 0}</Statistic.Value>
                            <Statistic.Label>Available Stock Quantity</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                    <Grid.Column>
                        <Statistic>
                            <Statistic.Value>${stockPrice || 0}</Statistic.Value>
                            <Statistic.Label>Available Stock Price</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStats: () => dispatch(getStats())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);