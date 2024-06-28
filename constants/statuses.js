/**
 * @typedef Status
 * @property {string} name - title of the status which will be submitted to back-end
 * @property {string} [color] - prefer color for background-color, text-color and etc.
 */

const colors = {
  error: "danger",
  primary: "danger",
  success: "var(--success)",
};

/**
 * @type {Object.<number, Status>}
 */
const _statuses = Object.freeze({
  1: { name: "در حال بررسی", color: colors.primary },
  2: { name: "رد شده", color: colors.error },
  3: { name: "تایید شده", color: colors.success },
  4: { name: "منقضی شده" },
  5: { name: "نهایی شده" },
  6: { name: "حل شده" },
  7: { name: "فعال" },
  8: { name: "غیرفعال" },
  9: { name: "در انتظار پاسخ" },
  10: { name: "بسته شده" },
  11: { name: "منتشر شده" },
  12: { name: "پیش نویس" },
  13: { name: "عدم انتشار" },
  14: { name: "مشاهده شده" },
  15: { name: "مشاهده نشده" },
  16: { name: "پرداخت شده" },
  17: { name: "در انتظار پرداخت" },
  18: { name: "لغو پرداخت" },
  19: { name: "انتخاب شده" },
  20: { name: "تکمیل شده" },
  21: { name: "خرید ناقص" },
  22: { name: "در انتظار بررسی" },
  23: { name: "پرداخت نشده" },
  24: { name: "رای داده شده" },
  25: { name: "ارجاع شده" },
  26: { name: "آزاد نشده" },
  27: { name: "آزاد شده" },
  28: { name: "در حال انجام" },
  29: { name: "لغو شده توسط فریلنسر" },
  30: { name: "لغو شده توسط کارفرما" },
  31: { name: "لغو شده توسط ادمین" },
  32: { name: "پیشنهاد توسط کارفرما انتخاب شد" },
  33: { name: "پیشنهاد توسط فریلنسر قبول شد" },
  34: { name: "درخواست ویرایش زمان پیشنهاد" },
  35: { name: "درخواست ویرایش مبلغ پیشنهاد" },
  36: { name: "درخواست ویرایش مبلغ و زمان پیشنهاد" },
  37: { name: "درخواست اتمام پروژه" },
  38: { name: "پروژه تکمیل شده" },
  39: { name: "پیشنهاد توسط فریلنسر رد شد" },
  40: { name: "لغو شده" },
});

export const statuses = {
  project: getStatuses([1, 2, 3]),
  user: getStatuses([1, 2, 3]),
  category: getStatuses([7, 8]),
  property: getStatuses([1, 2, 3]),
};

/**
 * generate array of statuses to use in pages like admin
 * @param {Array.<number>} ids - status local ids
 * @returns {Array.<Status>}
 */
export function getStatuses(ids) {
  return Object.entries(_statuses)
    .filter(([key, _]) => ids.includes(+key))
    .reduce((arr, [_, value]) => [...arr, value], []);
}

/**
 * get a single status Object
 * @param {string} name - the name which you want to find
 * @returns {Object.<Status>}
 */
export function getStatusByName(name) {
  const status = Object.entries(_statuses).find(
    ([_, value]) => value.name == name,
  );
  return status ? status[1] : {};
}

/**
 *
 * @param {string} service - entity of the status
 * @returns {Array.<string>}
 */
export function getStatusNames(service) {
  if (statuses[service] == undefined) return [];

  return statuses[service].map((status) => status.name);
}

/**
 *
 * @param {number} id - id of status => look for id on _statuses object at top of the statuses.js file
 * @returns {string} - title of status (example: id = 3 => returns 'تایید شده' )
 */
export function getStatusById(id) {
  return _statuses[id]?.name ?? "";
}
