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