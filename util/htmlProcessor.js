const { parse } = require('node-html-parser');

/**
 * Returns HTML with id set as value and list of headings
 * @param {string} html Input HTML as a string
 */
export const addIdToHeadings = (html) => {
    let output = parse(html);
    const ids = [
        ...output.getElementsByTagName('h1').map(setIdinHeading),
        ...output.getElementsByTagName('h2').map(setIdinHeading),
        ...output.getElementsByTagName('h3').map(setIdinHeading),
        ...output.getElementsByTagName('video').map(setIdInVideo),
    ];
    return {
        html: output.toString(),
        ids,
    }
}

/**
 * Replace space with dash and lower case the string
 * @param {String} string Input title
 */
export const convertTextToId = (string) => {
    return string.toLowerCase().replace(/ /g, '-');
}

const setIdinHeading = (heading) => {
    const id = convertTextToId(heading.textContent);
    heading.setAttribute('id', id);

    return {
        id,
        title: heading.textContent,
        tag: heading.tagName,
    };
}

const setIdInVideo = (heading, index) => {
    const id = `video-${index + 1}`;
    heading.setAttribute('id', id);

    return {
        id,
        title: `Video ${index + 1}`,
        tag: heading.tagName,
    };
}