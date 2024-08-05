export const dispatchList = (dispatchLists = []) => {
    return dispatchLists?.reduce((allDispatchLists, item) => {
        return allDispatchLists?.concat(item.DispatchLists);
    }, []);
};