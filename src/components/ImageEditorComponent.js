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
		position: 'absolute'
	},
	inputNote: {
		color: '#007477',
		borderRadius: '2px',
		fontSize: '12px',
		width: '400px',
		textAlign: 'center',
		marginTop: '-35px'
	}
};

class Image extends Component {
	constructor( props ) {
		super(props);
		const { src } = props.contentState.getEntity(props.entityKey).getData();
		this.focus = () => this.refs.inputNote.focus();
		this.state = {
			src: src,
			isMouseInside: false
		}
	}



	mouseEnter = () => {
		this.setState({ isMouseInside: true });
	}
	mouseLeave = () => {
		this.setState({ isMouseInside: false });
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
				<img src={this.state.src} width='100%'/>			
				<div style={styles.inputNote}>
					<input type='text' ref='inputNote'/>
				</div>			
				<br/>
			<button onClick={this.focus} >xóa</button>
			</div>
		);
	}
}

export default Image;