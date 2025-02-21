const calculateCGPA = (student) => {
  const semesters = [
    student.sgpaFeSem1,
    student.sgpaFeSem2,
    student.sgpaSeSem1,
    student.sgpaSeSem2,
    student.sgpaTeSem1,
    student.sgpaTeSem2,
    student.sgpaBeSem1,
    student.sgpaBeSem2,
  ].filter((sgpa) => sgpa !== -1);

  return semesters.length
    ? semesters.reduce((a, b) => a + b, 0) / semesters.length
    : 0;
};

module.exports = { calculateCGPA };
