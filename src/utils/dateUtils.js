import { START_DATE, JOURNEY_LENGTH } from "../config/journey";

export function dateAt(index) {
  const date = new Date(`${START_DATE}T12:00:00`);
  date.setDate(date.getDate() + index);
  return date;
}

export function dateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

export function formatDate(date, options = { day: "numeric", month: "short" }) {
  return new Intl.DateTimeFormat("pt-BR", options)
    .format(date)
    .replace(".", "");
}

export function getJourneyDates() {
  return Array.from({ length: JOURNEY_LENGTH }, (_, index) => dateAt(index));
}

export function getTodayIndex() {
  const today = dateKey(new Date());

  return getJourneyDates().findIndex((date) => dateKey(date) === today);
}
