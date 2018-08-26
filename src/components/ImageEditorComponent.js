import React, { Component } from 'react';

const styles = {
	noteImage: {
		marginTop: 10,
		textAlign: 'center',
	},
	divImage: {
		margin: 'auto',
    width: '70%',
		padding: '10px',
		textAlign: 'center'
	},
	divAction: {
		textAlign: 'center',
		position: 'absolute',	
		width: '50%',
	}
};

class Image extends Component {
	constructor( props ) {
		super(props);
		const { src } = props.contentState.getEntity(props.entityKey).getData();
		this.state = {
			src: src,
			isMouseInside: true
		}
	}

	mouseEnter = () => {
		this.setState({ isMouseInside: true });
	}
	mouseLeave = () => {
		this.setState({ isMouseInside: true });
	}

	render() {
		function ButtonAction() {
			return(
				<div style={styles.divAction}>
					<button >xóa</button>
					<button onClick={() => {}} >chon anh khac</button>
					<input type='file' style={{display: 'none'}}/>
				</div>	
			);
		}
		return (
			<div style={styles.divImage} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
				{this.state.isMouseInside ? <ButtonAction/> : null} 				
				<img className='d-block mx-auto' src={this.state.src} width='100%' />
				<br/>
				<span style={styles.noteImage}>note</span>
			</div>
		);
	}
}

export default Image;