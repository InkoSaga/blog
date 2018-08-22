var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');
require('jest-enzyme');

enzyme.configure({ adapter: new Adapter() });
