import React, { Component } from 'react'
import { Modal, ListGroup, ListGroupItem } from 'react-bootstrap'

import util from './util'

import { connect } from 'react-redux'

class Coin extends Component {
	get name() {
		return this.props.prices[this.props.coin] && this.props.prices[this.props.coin].name
	}

	get purchases() {
		return [...this.props.purchases.filter((p) => (
			((p.from.type === 'crypto') && (p.from.id === this.props.coin)) ||
			((p.to.type === 'crypto') && (p.to.id === this.props.coin))
		))].sort((a, b) => a.date - b.date)
	}

	render() {
		return (
			<Modal show={this.props.show} onHide={this.props.onHide}>
				<Modal.Header closeButton>
					<Modal.Title>{this.name}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<ListGroup>
						{this.purchases.map((purchase) => (
							<ListGroupItem key={purchase}>
								{util.toJSON(purchase)}
							</ListGroupItem>
						))}
					</ListGroup>
				</Modal.Body>
			</Modal>
		)
	}
}

export default connect(
	(state) => ({
		purchases: state.portfolio.purchases,

		prices: state.prices,
	}),

	{
	},
)(Coin)
