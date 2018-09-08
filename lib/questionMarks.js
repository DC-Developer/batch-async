import printValueQuestionMarks from './keyValueQuestionMarks';
import printKeyValueQuestions from './valueQuestionMarks';
import isColumn from './questionType'
/**
*@param {String} type - String indicating the type of sql statement
*@param {Array} cols - Array of MySQL column values
**/
module.exports = function generateQuestionMarks(type, cols) {
    var generateQuestionMarksImplementation = isValueOnly(type) ? printValueQuestionMarks(cols) : printKeyValueQuestions(cols);
}
