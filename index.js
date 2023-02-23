// @ts-check

/**@param {typeof import("yup")} yup */
const Yup2Zod = (yup) => {
  yup.addMethod(/**@type {any}*/ (yup.Schema), "safeParse", function (value) {
    try {
      return { success: true, data: this.validateSync(value) };
    } catch (error) {
      if (yup.ValidationError.isError(error)) {
        return { success: false, error };
      }
      throw error;
    }
  });
};

export { Yup2Zod };
