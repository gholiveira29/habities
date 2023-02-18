export const GenerateProgressPercentage = (total: number, completd: number) => {
    return Math.round((completd / total) * 100);
}
