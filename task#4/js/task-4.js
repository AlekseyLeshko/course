function addAttrForCloneElement(attrVal, clonedElement) {
	if (typeof attrVal == "object") {
		clonedElement.setAttribute(attrVal.name, attrVal.value);
	}
}

function createCloneElementWithAttrs(element) {
	var clonedElement = document.createElement(element.tagName);

	var attrs = element.attributes;
	for(var attrKey in attrs) {
		addAttrForCloneElement(attrs[attrKey], clonedElement);
	}

	return clonedElement;
}

function whetherToCopyText(node, clonedNode) {
	return node == null || clonedNode == null || node.textContent == "" || node.tagName == "DIV";
}

function copyText(node, clonedNode) {
	if (whetherToCopyText(node, clonedNode)) {
		return;
	}

	clonedNode.textContent = node.textContent;
}

function cloneChildren(element, clonedElement) {
	var elementItems = element.getElementsByTagName('*');
	for(var i = 0; i < elementItems.length; i++) {
		clonedElement.appendChild(clone(elementItems[i]));
	}
}

function clone(element) {
	if (element == null) {
		return element;
	}

	var clonedElement = createCloneElementWithAttrs(element);
	copyText(element, clonedElement);
	cloneChildren(element, clonedElement);
	return clonedElement;
}

var divId = "elementToClone";

function testCloneNode() {
	var element = document.getElementById(divId);
	var clonedElement = element.cloneNode(true);
	clonedElement.style.opacity = "0.1";
	element.parentNode.appendChild(clonedElement);
}

function testclone() {
	var domElement = document.getElementById(divId);
	var clonedElement = clone(domElement);
	clonedElement.style.opacity = "0.5";
	domElement.parentNode.appendChild(clonedElement);
}

testCloneNode();
testclone();