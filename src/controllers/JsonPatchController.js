import jsonpatch from 'jsonpatch';

export default {
  /**
   * Patches JSON document and returns patched JSON doc
   *
   * @param {Object} request Express request object
   * @param {Object} response Express response object
   * @param {next} next Express middleware next function
   *
   * @returns {json}
   */
  patchJson(request, response, next) {
    try {
      const { document, patch } = request.body;

      const patchedDoc = jsonpatch.apply_patch(document, [patch]);

      return response.status(200).json({
        message: 'Patch successful',
        patchedDocument: patchedDoc,
      });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  },
};
