const Token = require("../token");

/**
 * Token used to represent a gradient token collection.
 */
class SolidToken extends Token {
  /**
   * Construct a new ColorToken.
   *
   * @param {Token.Config} config SolidToken configuration Object.
   */
  constructor(config) {
    super({ category: Token.CONSTANTS.CATEGORIES.COLOR, ...config });
  }

  /**
   * Merge a SolidToken Object's data into this SolidToken Object's data.
   *
   * @param {DTO} dto
   * @param {SolidToken.Data} dto.data Data to be merged into this Token Object's data.
   * @returns {This} This SolidToken.
   */
  mergeData({ data }) {
    this.data = { gradation: SolidToken.mergeGradations({ destination: this.data.gradation, source: data.gradation }) };

    return this;
  }

  /**
   * Normalize the Data of this SolidToken.
   *
   * @returns {This} This SolidToken.
   */
  normalizeData() {
    this.data = { gradation: SolidToken.normalizeGradations({ format: this.format, gradations: this.data.gradation }) };

    return this;
  }

  /**
   * Constants associated with the SolidToken Object.
   *
   * @type {SolidToken.Constants}
   */
  static get CONSTANTS() {
    return { ...Token.CONSTANTS };
  }
}

module.exports = SolidToken;
