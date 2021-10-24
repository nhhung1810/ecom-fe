export const dateFormat = (date, option = defaultOptions) => {
    // CHECK MDN FOR ACCEPT FORMAT DATE STRING
    const formatter = new Date(date)
    // FORMAT TODAY STRING
    const today = new Date()
    if(today.toDateString() === formatter.toDateString()){
        let tmp = formatter.toLocaleDateString("en-US", option)
        tmp = tmp.split(",")
        tmp[0] = "Today"
        tmp = tmp.join(",")
        return tmp
    }
    return formatter.toLocaleDateString("en-US", option)
}

var defaultOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
};
