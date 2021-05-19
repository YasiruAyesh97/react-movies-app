import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;

    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
}

//_.slice(array, [start=0], [end=array.length])