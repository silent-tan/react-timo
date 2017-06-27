import './_style.scss';
import React, {PropTypes} from 'react';
import classNames from 'classnames';

class Flex extends React.Component {
	render() {
		const {
			flex,
			auto,
			none,
			width,
			height,
			row,
			column,
			wrap,
			nowrap,
			justifyStart,
			justifyEnd,
			justifyCenter,
			justifyBetween,
			justifyAround,
			alignStart,
			alignEnd,
			alignCenter,
			alignBaseline,
			alignStretch,
			className,
			style,
			...rest
		} = this.props;
		const cn = classNames({
			'tm-flex': true,
			'tm-flex-flex': flex,
			'tm-flex-auto': auto,
			'tm-flex-none': none || width || height,
			'tm-flex-row': row,
			'tm-flex-column': column,
			'tm-flex-wrap': wrap,
			'tm-flex-nowrap': nowrap,
			'tm-flex-justify-start': justifyStart,
			'tm-flex-justify-end': justifyEnd,
			'tm-flex-justify-center': justifyCenter,
			'tm-flex-justify-between': justifyBetween,
			'tm-flex-justify-around': justifyAround,
			'tm-flex-align-start': alignStart,
			'tm-flex-align-end': alignEnd,
			'tm-flex-align-center': alignCenter,
			'tm-flex-align-baseline': alignBaseline,
			'tm-flex-align-stretch': alignStretch
		}, className);
		// TODO 有待商榷，WebkitFlex 是否会生效？
		let s = Object.assign({}, style);
		if (flex) {
			s.flex = (typeof flex === 'boolean')
				? 1
				: flex;
			s.WebKitFlex = (typeof flex === 'boolean')
				? 1
				: flex;
		}
		if (height) {
			s.height = height;
		}
		if (width) {
			s.width = width;
		}
		return <div {...rest} className={cn} style={s}>{this.props.children}</div>;
	}
}
Flex.propTypes = {
	flex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
	auto: PropTypes.bool,
	none: PropTypes.bool,
	width: PropTypes.string,
	height: PropTypes.string,
	row: PropTypes.bool,
	column: PropTypes.bool,
	wrap: PropTypes.bool,
	nowrap: PropTypes.bool,
	justifyStart: PropTypes.bool,
	justifyEnd: PropTypes.bool,
	justifyCenter: PropTypes.bool,
	justifyBetween: PropTypes.bool,
	justifyAround: PropTypes.bool,
	alignStart: PropTypes.bool,
	alignEnd: PropTypes.bool,
	alignCenter: PropTypes.bool,
	alignBaseline: PropTypes.bool,
	alignStretch: PropTypes.bool
};
export default Flex;
