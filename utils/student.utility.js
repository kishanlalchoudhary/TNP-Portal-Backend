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

  if (!semesters.length) return 0;

  const sum = semesters.reduce((acc, sgpa) => acc + sgpa, 0);
  const cgpa = sum / semesters.length;
  return parseFloat(cgpa.toFixed(2));
};

module.exports = { calculateCGPA };
