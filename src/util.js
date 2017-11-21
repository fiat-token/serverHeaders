const range = (start, stop, step) =>
{
    if (!stop) 
    {
        // one param defined
        stop = start;
        start = 0;
    }

    if (!step) step = 1;

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) return [];

    const result = [];

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) 
    {
        result.push(i);
    }

    return result;
}

module.exports = { range }