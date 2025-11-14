const getCatYearNote = (age: number) => {
    if (age === 1) {
        return 'год';
    }
    if (age < 5) {
        return 'года';
    }
    return 'лет';
};

export default getCatYearNote;
