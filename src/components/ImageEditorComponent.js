import React, { Component } from 'react';
import { Entity, Modifier } from 'draft-js';
import { Progress } from 'reactstrap';

const styles = {
	noteImage: {
		marginTop: 10,
		textAlign: 'center',
	},
	divImage: {
		margin: 'auto',
    width: '70%',
		textAlign: 'center'
	},
	divAction: {
		textAlign: 'right',
		position: 'absolute',
		width: '375px',
		margin: '20px 0px 20px 0px'

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
		this.inputImage = React.createRef();
		this.state = {
			src: src,
			isMouseInside: false,
			file: null,
			style: {opacity: '0.5'},
			isLoading: true,
			isDelete: false
		}
		this.clickInputImage = () => {
			this.inputImage.current.click();
		}

		this.onChangeFile = (event) => {
			this.setState({
				file: event.target.files[0],
				src:  URL.createObjectURL(event.target.files[0]),
				style: {opacity: '0.5'}
			});	
			props.contentState.replaceEntityData(props.entityKey, {src: URL.createObjectURL(event.target.files[0])});	
		}
		
		this.onDelete = () =>{
			// this.setState({
			// 	isDelete: true
			// });	
			//props.contentState.replaceEntityData(props.entityKey, null);
			console.log(props.children[0].props.block);

			console.log(props.entityKey);
			console.log(props.contentState.getBlockForKey(props.key));
		}

		if(this.state.isLoading) {
			setTimeout( () =>{
				this.setState({
					style: {opacity: '1'},
					isLoading: false,
				});
			},2000);
		}
	}



	mouseEnter = () => {
		this.setState({ isMouseInside: true });
	}
	mouseLeave = () => {
		this.setState({ isMouseInside: false });
	}

	

	render() {
		if(this.state.isDelete){
			return <br/>;
		}
		return (		
				<div style={styles.divImage} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
					{
						this.state.isMouseInside ? 
							<div style={styles.divAction}>
								<button onClick={this.onDelete}>xóa</button>
								<button onClick={this.clickInputImage} >chon anh khac</button>
								<input ref={this.inputImage} type='file' style={{display: 'none'}}  onChange={this.onChangeFile}/>
							</div>
						: null
					} 
					{
						this.state.isLoading ? 
						<div className='loader'/>
						: null
					} 
					<img className='img-compose' src={this.state.src} style={this.state.style} width='400px' alt='hình ảnh copy'/>			
				</div>
		);
	}
}

export default Image;