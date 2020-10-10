
const Storage = {
    /**
     * Get the JSON.parse version of the item stored
     */
    getItem: (key) => {
        let item = localStorage.getItem(process.env.REACT_APP_SOCIAL_NETWORK_KEY + '_' + key);     
        if (item)
            return JSON.parse(item);

        return item;
    },
    removeItem: (key) => {
         localStorage.removeItem(process.env.REACT_APP_SOCIAL_NETWORK_KEY + '_' + key);
    },
    /**
     * Stringify and calls localStorage.setItem();
     */
    setItem: (key, value) => {
        localStorage.setItem(process.env.REACT_APP_SOCIAL_NETWORK_KEY + '_' + key, JSON.stringify(value));
    }
}


export default Storage;