/**
 * Common object definitions.
 * @module public/types
 */

/**
 * Context used for lap React components, please see individual components as not all properties are required for all compoments.
 * @typedef lapContext {@link lapContext}
 * @property {object.<string, number>} multipliers - A map containing multipliers with <description for the Select, mile conversion multiplier>.
 * @property {object.<string, object>} refData - A map containing Select data with <Select name, data for the Select>.
 */

/**
 * A map of objects each containing data to populate specific Select drop downs and other data such as multiplier values.
 * @typedef refData {@link refData}
 * @property {string} Key - Name of the Select drop down
 * @property {number} Value - The data that will be used to populate the individual Select Options.
 */

/**
 * Object holding data for each dropdown along with any other pertitent data.
 * @typedef dropDown {@link dropDown}
 * @property {string} desc - Text description for the Select Option value
 * @property {number} conversion - Only for unit data: The mile conversion multiplier.
 */

/**
 * Map which holds mile distance multipliers to convert between miles and any other distance unit.
 * @typedef multipliers {@link multipliers}
 * @property {string} Key - Name of the multiplier eg. mile
 * @property {number} Value - The multiplier itself
 */

/**
 * Object used to contain data about the lap.
 * @typedef lap {@link lap}
 * @property {number} id - Lap id
 * @property {string} time - Time taken to complete the lap
 * @property {Float} distance - What was the distance convered
 * @property {string} unit - What was the distance unit: mile, metre, etc
 */
