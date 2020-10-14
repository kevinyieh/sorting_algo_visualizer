export const setAttributes = (element, attributes) => {
    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    })
}