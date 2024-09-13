const isObjectEqual = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true; // Check for primitive types or reference equality

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false; // Return false if either is not an object or is null
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false; // Check if objects have the same number of keys

    for (let key of keys1) {
        if (!keys2.includes(key)) return false; // Check if both objects have the same keys
        if (!isObjectEqual(obj1[key], obj2[key])) return false; // Recursively compare each value
    }

    return true; // All checks passed
};

export default isObjectEqual;