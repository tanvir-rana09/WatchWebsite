

function setLocalStorageItem(key, value, ttl = 7200000) {
    const now = new Date();

    // `item` is an object which contains the original value and the expiry time
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    // const string = typeof value == "string" ? value:
    localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorageItem(key) {
    const itemStr = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item?.value;
}

export { setLocalStorageItem, getLocalStorageItem };
