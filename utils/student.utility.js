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

const isEligibleForJob = (student, job) => {
  if (student.yearDown === "Yes") return false;

  const criteria = [
    { jobValue: job.cgpa, studentValue: student.cgpa },
    { jobValue: job.automataScore, studentValue: student.automataScore },
    { jobValue: job.elqScore, studentValue: student.elqScore },
    { jobValue: job.percentage10th, studentValue: student.percentage10th },
    { jobValue: job.activeBacklogs, studentValue: student.activeBacklogs },
    { jobValue: job.passiveBacklogs, studentValue: student.passiveBacklogs },
  ];

  for (let { jobValue, studentValue } of criteria) {
    if (jobValue !== -1 && jobValue > studentValue) return false;
  }

  if (
    (student.after10thAppearedFor === "12th" &&
      job.percentage12th !== -1 &&
      job.percentage12th > student.percentage12th) ||
    (student.after10thAppearedFor === "Diploma" &&
      job.percentageDiploma !== -1 &&
      job.percentageDiploma > student.percentageDiploma)
  ) {
    return false;
  }

  if (job.eligibleBranches && !job.eligibleBranches.includes(student.branch)) {
    return false;
  }

  return true;
};

module.exports = { calculateCGPA, isEligibleForJob };
