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
   * Merge a SolidToken Object's data into this SolidToken Object's Data.
   *
   * @protected
   * @param {DTO} dto
   * @param {ColorToken.Data} dto.data Data to be merged into this Token Object's data.
   * @returns {This} This SolidToken.
   */
   mergeData({ data }) {
    this.data = SolidToken.mergeColors({ destination: this.data, source: data });

    return this;
  }

  /**
   * Normalize the Data of this SolidToken.
   *
   * @protected
   * @returns {This} This SolidToken.
   */
  normalizeData() {
    this.data = SolidToken.normalizeColors({ colors: this.data, format: this.format });

    return this;
  }


  /**
   * Normalize SolidToken Colors.
   *
   * @param {DTO} dto
   * @param {ColorToken.Colors} dto.colors Colors to be normalized.
   * @param {ColorToken.Format} dto.format Format of the provided Colors.
   * @returns {ColorToken.Colors} The provided ColorToken Colors, normalized.
   */
   static normalizeColors({ colors, format }) {
    let normalized;

    switch (format) {
      case ColorToken.CONSTANTS.TOKEN_FORMATS.STANDARD:
        normalized = colors;
        break;

      case ColorToken.CONSTANTS.TOKEN_FORMATS.AUTOMATED:
        normalized = Object.entries(colors).reduce(
          (mutated, [key, value]) => ({
            ...mutated,
            [key]: ColorToken.normalizeGrades({ format, grades: value }),
          }),
          {}
        );
        break;

      default:
        throw new Error(`models.ColorToken.normalizeColors() :: "${format}" is not a supported format`);
    }

    return normalized;
  }

    /**
   * Normalize ColorToken Grades.
   *
   * @param {DTO} dto
   * @param {ColorToken.Grades} dto.colors Grades to be normalized.
   * @param {ColorToken.Format} dto.format Format of the provided Grades.
   * @returns {ColorToken.Grades} The provided ColorToken Grades, normalized.
   */
     static normalizeGrades({ format, grades }) {
      let normalized;
  
      switch (format) {
        case ColorToken.CONSTANTS.TOKEN_FORMATS.STANDARD:
          normalized = grades;
          break;
  
        case ColorToken.CONSTANTS.TOKEN_FORMATS.AUTOMATED:
          normalized = Object.entries(grades);
          break;
  
        default:
          throw new Error(`models.ColorToken.normalizeGrades() :: "${format}" is not a supported format`);
      }
  
      return normalized;
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
