import React, { Component } from 'react';
import {
	CompositeDecorator,
	ContentBlock,
	ContentState,
	Editor,
	EditorState,
	convertFromHTML,
	convertToRaw,
} from 'draft-js';
import Image from './ImageEditorComponent';
const editorId = 'Drafted';

export default  class HTMLConvertExample extends React.Component {
	constructor(props) {
		super(props);
		const decorator = new CompositeDecorator([
			{
				strategy: findImageEntities,
				component: Image,
			},
		]);
		this.state = {
			editorState: EditorState.createEmpty(
				decorator
			),			
		};
		this.focus = () => {
			this.domEditor.focus();
		}
		this.onChange = (editorState) => {
      this.setState({editorState});			
		}
		this.logState = () => {
			const content = this.state.editorState.getCurrentContent();
			console.log(content)
			console.log(convertToRaw(content));
		};
		this.setDomEditorRef = ref => this.domEditor = ref;
	}
	componentDidMount(){
		this.domEditor.focus()
	}
	render() {
		return (
			<div style={styles.root}>
				<div style={{marginBottom: 10}}>
					Sample HTML converted into Draft content state
				</div>
				<div style={styles.editor} onClick={this.focus}>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange} ref={this.setDomEditorRef}
					/>
				</div>
				<input
					onClick={this.logState}
					style={styles.button}
					type="button"
					value="Log State"
				/>
			</div>
		);
	}
}
function findLinkEntities(contentBlock, callback, contentState) {
	contentBlock.findEntityRanges(
		(character) => {
			const entityKey = character.getEntity();
			return (
				entityKey !== null &&
				contentState.getEntity(entityKey).getType() === 'LINK'
			);
		},
		callback
	);
}
const Link = (props) => {
	const {url} = props.contentState.getEntity(props.entityKey).getData();
	return (
		<a href={url} style={styles.link}>
			{props.children}
		</a>
	);
};
function findImageEntities(contentBlock, callback, contentState) {
	contentBlock.findEntityRanges(
		(character) => {
			const entityKey = character.getEntity();
			return (
				entityKey !== null &&
				contentState.getEntity(entityKey).getType() === 'IMAGE'
			);
		},
		callback
	);
}
// const Image = (props) => {
// 	const { src } = props.contentState.getEntity(props.entityKey).getData();
// 	return (
// 		<div style={styles.divImage}>
// 			<span style={styles.noteImage}>xóa</span>
// 			<img className='d-block mx-auto' src={src} width='100%' />
// 			<br/>
// 			<span style={styles.noteImage}>note</span>
// 		</div>
// 	);
// };
const styles = {
	root: {
		fontFamily: '\'Helvetica\', sans-serif',
		padding: 20,
		width: 600,
	},
	editor: {
		border: '1px solid #ccc',
		cursor: 'text',
		minHeight: 80,
		padding: 10,
	},
	button: {
		marginTop: 10,
		textAlign: 'center',
	}
};