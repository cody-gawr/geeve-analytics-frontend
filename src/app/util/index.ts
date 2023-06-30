export function splitName(label: string) {
    const regex = /\w+\s\w+(?=\s)|\w+/g;
    return label.toString().trim().match(regex);
}

export function formatXLabel(label: string | number) {
    if (label && typeof label == 'string') {
        const names = splitName(label);
        const name = names[0].split(' ');
        if (names.length == 3) {
            return `${names[0]}`;
        } else if (names.length == 2) {
            if (name.length == 2) {
            return `${names[0][0]} ${name[1]}`;
            } else {
            return `${names[0][0]} ${names[1]}`;
            }
        } else {
            return `${names[0]}`;
        }
    }
    return label;
}

export function formatXTooltipLabel(label: string, yValue: string){
    if (label) {
        return `${label}:$${yValue}`;
    }
    return label
}