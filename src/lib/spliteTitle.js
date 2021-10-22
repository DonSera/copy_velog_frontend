export function splitDate(date) {
    const splitDate = date.split('오');
    return splitDate[0];
}

export function splitTitle(title) {
    if (title.indexOf('#') === 0) {
        return title.slice(2);
    }
    return title;
}

export function splitSubTitle(subTitle) {
    if (subTitle.indexOf('#') === 0) {
        if (subTitle.slice(3).trim() === '') {
            return '';
        } else {
            return subTitle.slice(3);
        }
    }
    return subTitle;
}

export function renderPostOutput(title, subTitle, content, tags, setMKObj) {
    let convertTitle = title.trim();
    let convertSubTitle = subTitle.trim();
    convertTitle = `# ${convertTitle}`;
    convertSubTitle = `### ${convertSubTitle}`;

    setMKObj({
        title: convertTitle,
        subTitle: convertSubTitle,
        content: content,
        tags: tags
    })
}


export function enterTag(tags, tag, setTags, setTag) {
    const preTags = tags.slice();
    const smallTag = tag.toLowerCase();
    if (preTags.indexOf(smallTag) < 0 && smallTag !== '') {
        preTags.push(smallTag);
        setTags(preTags);
    }
    setTag('')
}