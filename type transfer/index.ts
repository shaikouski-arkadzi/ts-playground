interface Department {
  name: string;
  budget: number;
}

const department: Department = {
  name: "web-dev",
  budget: 50000,
};

interface Project {
  name: string;
  projectBudget: number;
}

function transformDepartment(department: Department, amount: number): Project {
  return {
    name: department.name,
    projectBudget: amount,
  };
}

const mainProject: Project = transformDepartment(department, 4000);

export {};
