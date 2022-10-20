const Token = require("../token");

/**
 * Token used to represent a gradient token collection.
 */
class SolidToken extends Token {
  /**
   * Construct a new SolidToken.
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
   * @param {SolidToken.Data} dto.data Data to be merged into this Token Object's data.
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
   * Merge SolidToken Grades into an existing SolidToken's Grades.
   *
   * @private
   * @param {DTO} dto
   * @param {SolidToken.Grades} dto.source SolidToken Grades to merge into the destination SolidToken Grades.
   * @param {SolidToken.Grades} dto.destination SolidToken Grades to be receiving a merge.
   * @returns {SolidToken.Grades} Merged SolidToken Grades.
   */
     static mergeColors({ destination, source }) {
      return Object.entries(source).reduce(
        (final, [color, value]) => ({
          ...final,
        }),
        { ...destination }
      );
    }

      /**
   * Merge SolidToken Grades into an existing SolidToken's Grades.
   *
   * @param {DTO} dto
   * @param {SolidToken.Grades} dto.source SolidToken Grades to merge into the destination SolidToken Grades.
   * @param {SolidToken.Grades} dto.destination SolidToken Grades to be receiving a merge.
   * @returns {SolidToken.Grades} Merged SolidToken Grades.
   */
  static mergeGrades({ destination, source }) {
    return Object.entries(source).reduce((final, [grade, value]) => ({ ...final, [grade]: value }), { ...destination });
  }


  /**
   * Normalize SolidToken Colors.
   *
   * @param {DTO} dto
   * @param {SolidToken.Colors} dto.colors Colors to be normalized.
   * @param {SolidToken.Format} dto.format Format of the provided Colors.
   * @returns {SolidToken.Colors} The provided SolidToken Colors, normalized.
   */
   static normalizeColors({ colors, format }) {
    let normalized;

    switch (format) {
      case SolidToken.CONSTANTS.TOKEN_FORMATS.STANDARD:
        normalized = colors;
        break;

      case SolidToken.CONSTANTS.TOKEN_FORMATS.AUTOMATED:
        normalized = Object.entries(colors).reduce(
          (mutated, [key, value]) => {
            const normalized = SolidToken.normalizeGrades({ format, grades: value });
            return {solid: {...mutated.solid, ...normalized.solid}};
          },
          {}
        );
        break;

      default:
        throw new Error(`models.SolidToken.normalizeColors() :: "${format}" is not a supported format`);
    }

    return normalized;
  }

    /**
   * Normalize SolidToken Grades.
   *
   * @param {DTO} dto
   * @param {SolidToken.Grades} dto.colors Grades to be normalized.
   * @param {SolidToken.Format} dto.format Format of the provided Grades.
   * @returns {SolidToken.Grades} The provided SolidToken Grades, normalized.
   */
     static normalizeGrades({ format, grades }) {
      let normalized;
  
      switch (format) {
        case SolidToken.CONSTANTS.TOKEN_FORMATS.STANDARD:
          normalized = grades;
          break;
  
        case SolidToken.CONSTANTS.TOKEN_FORMATS.AUTOMATED:
          normalized = Object.entries(grades).reduce(
            (
              mutated,
              [
                key,
                {
                  rgba: { r, g, b, a },
                },
              ]
            ) => {
              const tokenized = key.split("-");
              const value = tokenized.pop();
              const scheme = tokenized.pop();
              const theme = tokenized.pop();
              const level = tokenized.pop();
              mutated[level] = mutated[level] || {};
              mutated[level][theme] = mutated[level][theme] || {};
              mutated[level][theme][scheme] = mutated[level][theme][scheme] || {};
              mutated[level][theme][scheme][value] = mutated[level][theme][scheme][value] || {};
              mutated[level][theme][scheme][value] = `rgba(${r}, ${g}, ${b}, ${a})`;
              return {...mutated};
          },
            {}
          );
          break;
  
        default:
          throw new Error(`models.SolidToken.normalizeGrades() :: "${format}" is not a supported format`);
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
