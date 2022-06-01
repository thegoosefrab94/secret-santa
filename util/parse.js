export function parse(buffer) {
    if (!buffer) return {};
    return buffer.split('\n').map(currentPair => {
        const [santa, victim] = currentPair.split('-');
        const obj = {};
        obj[santa] = victim;
        return obj;
    }).reduce((current, prev) => {
        return {
            ...current,
            ...prev
        };
    }, {});
}