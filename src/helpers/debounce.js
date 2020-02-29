export default (func, time) => {
    let timeout;

    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, time);
    };
};