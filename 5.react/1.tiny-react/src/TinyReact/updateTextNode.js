export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
    const textContent = virtualDOM.props.textContent;
    if (textContent !== oldVirtualDOM.props.textContent) {
        oldDOM.textContent = textContent;
        oldDOM._virtualDOM = virtualDOM;
    }
}
