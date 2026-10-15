import { tasks } from "../config/journey";

export function createBlankDay() {
  return {
    checks: {},
    note: "",
    gratitude: "",
    updatedAt: null,
  };
}

export function countCheckedTasks(checks = {}) {
  return tasks.filter((task) => checks[task.id]).length;
}

export function isDayComplete(checks = {}) {
  const requiredTasks = tasks.filter((task) => !task.optional);

  return requiredTasks.every((task) => checks[task.id]);
}

export function hasAnyCheckedTask(checks = {}) {
  return tasks.some((task) => checks[task.id]);
}

export function calculateProgress(checks = {}) {
  return Math.round((countCheckedTasks(checks) / tasks.length) * 100);
}
