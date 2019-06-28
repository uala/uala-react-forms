/**
 * A simple facade to cast interfaces.
 *
 * @param {Object} Interface - the interface to cast
 *
 * @returns {Object} - the casted interface
 */
const castInterface = Interface => Object.assign({}, Interface);

export default castInterface;
