import React, { Component } from 'react';
import {
	convertFromRaw,
	EditorState,removeEditorStyles, convertFromHTML, convertToRaw, convertFromHTMLToContentBlocks
} from 'draft-js';

import Editor from 'draft-js-plugins-editor';

import createImagePlugin from 'draft-js-image-plugin';

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

/* eslint-disable */
const initialState = {
		"entityMap": {
				"0": {
						"type": "IMAGE",
						"mutability": "IMMUTABLE",
						"data": {
								"src": "/images/canada-landscape-small.jpg"
						}
				}
		},
		"blocks": [{
				"key": "9gm3s",
				"text": "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
				"type": "unstyled",
				"depth": 0,
				"inlineStyleRanges": [],
				"entityRanges": [],
				"data": {}
		}, {
				"key": "ov7r",
				"text": " ",
				"type": "atomic",
				"depth": 0,
				"inlineStyleRanges": [],
				"entityRanges": [{
						"offset": 0,
						"length": 1,
						"key": 0
				}],
				"data": {}
		}, {
				"key": "e23a8",
				"text": "See advanced examples further down …",
				"type": "unstyled",
				"depth": 0,
				"inlineStyleRanges": [],
				"entityRanges": [],
				"data": {}
		}]
};
	/* eslint-enable */
function addExtraData(e) {
	var clipboardData = e.clipboardData;

	var someObj = {
			"test": { "test": "test" }
	}

	var selection = window.getSelection()

	console.log("called addExtraData")
	console.log(selection)

	e.clipboardData.setData('text/plain', selection)
	e.clipboardData.setData('test', JSON.stringify(someObj))

	e.preventDefault()
}
	//document.addEventListener('paste', getExtraData);
export default class SimpleImageEditor extends Component {

	state = {
		editorState: EditorState.createWithContent(convertFromRaw(initialState)),
	};

	onChange = (editorState) => {
		this.setState({
			editorState,
		});
	};

	focus = () => {
		this.editor.focus();
	};

	render() {
		this.handlePastedText = (text, html, editorState) => {
			//e.clipboardData.getData('test', JSON.stringify(someObj))
			console.log(text, html, editorState);
			console.log(convertFromHTML(html));
		}
		return (
			<div>
				<div className='editor' onClick={this.focus}>
					<Editor
						editorState={this.state.editorState}
						onChange={this.onChange}
						plugins={plugins} 
						handlePastedText={this.handlePastedText}
						ref={(element) => { this.editor = element; }}
					/>
				</div>
			</div>
		);
	}
}
