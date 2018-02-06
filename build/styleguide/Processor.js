const directory = require('directory-tree');
const ejs = require('ejs');
const fm = require('front-matter');
const marked = require('marked');
const path = require('path');

const Generator = require('./Generator');

class Processor {

	constructor(exampleTemplateFile) {
		this.components = null;
		this.exampleIndex = null;
		this.exampleTemplate = null;
		this.exampleTemplateFile = exampleTemplateFile;
		this.variables = null;
		this.renderer = new marked.Renderer();

		this.reset();
		this.handler = this.handler.bind(this);
		this.renderer.code = this.code.bind(this);
	}

	reset() {
		this.components = {};
		this.exampleIndex = 0;
		this.exampleTemplate = this.exampleTemplateFile.read();
		this.variables = {};
	}

	code(code, lang) {
		const id = `example-${this.exampleIndex += 1}`;

		return ejs.render(this.exampleTemplate, {
			code,
			lang,
			id,
		});
	}

	handler(root) {
		const relPath = path.relative(process.cwd(), root.source.input.file);

		root.walkDecls((decl) => {
			const variable = decl.prop.match(/\$(\w+(-\w+)?)(--(\w+(-\w+)?))?/);
			const type = variable && variable[1];

			if (!variable || decl.value.substr(0, 1) === '$' || decl.value.match(/\W*!default/)) {
				return;
			}

			if (!this.variables[type]) {
				this.variables[type] = [];
			}

			this.variables[type].push({
				modifier: variable && (variable[4] || false),
				value: decl.value,
			});
		});

		root.walkComments((comment) => {
			// skip non-styleguide comments
			if (comment.text.substr(0, 3) !== '---') {
				return;
			}

			const content = fm(comment.text);

			if (content.body.substr(0, 3) === '---') {
				content.body = content.body.substr(3);
			}

			if (!this.components[relPath]) {
				this.components[relPath] = [];
			}

			this.components[relPath].push({
				attributes: content.attributes,
				html: marked(content.body.trim(), { renderer: this.renderer }),
			});
		});
	}

	data({ docs, sass, vars }) {
		return {
			variables: this.variables,
			nodes: {
				docs: directory(docs, ['.md']).children
					.map(Generator.parseDoc),
				vars: directory(vars, ['.html']).children
					.map(node => Generator.parseVar(node, this.variables)),
				components: directory(sass, ['.scss']).children
					.map(node => Generator.parseComponent(node, this.components))
					.filter(Generator.filterComponent),
			},
		};
	}

}

module.exports = Processor;
