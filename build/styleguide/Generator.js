const ejs = require('ejs');
const fs = require('fs');
const marked = require('marked');

const titleCase = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
const titleCaseFilename = filename => titleCase(filename.match(/_?([^.]+)/)[1]);

class Generator {

	static parseDoc(node) {
		return {
			filename: titleCaseFilename(node.name),
			children: node.children ? node.children.map(Generator.parseDoc) : [],
			html: !node.children && marked(fs.readFileSync(node.path, 'utf8')),
		};
	}

	static parseVar(node, variables) {
		return {
			filename: titleCaseFilename(node.name),
			children: node.children
				? node.children.map(childNode => Generator.parseVar(childNode, variables))
				: [],
			html: !node.children && ejs.render(fs.readFileSync(node.path, 'utf8'), variables),
		};
	}

	static parseComponent(node, components) {
		return {
			filename: titleCaseFilename(node.name),
			components: components[node.path] || [],
			children: node.children
				? node.children.map(childNode => Generator.parseComponent(childNode, components))
				: [],
		};
	}

	static filterComponent(node) {
		node.children = node.children.filter(Generator.filterComponent);

		return node.children.length || node.components.length;
	}

}

module.exports = Generator;
