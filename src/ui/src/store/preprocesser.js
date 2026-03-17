export const preprocess = (data, module) => {
    let transformedData = {};
    switch (module) {
        case "plan":
            transformedData = { ...data, priorityStatus: 0 };
            break;
        default:
            transformedData = { ...data };
    }
    return transformedData;
}