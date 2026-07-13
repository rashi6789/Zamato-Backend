// Import every model before syncing so Sequelize creates every table,
// including tables that are not referenced by a route during startup.
require('./UserModel');
require('./VendorModel');
require('./CategoryModel');
require('./ProductModel');
require('./OrderModel');
require('./OrderItemModel');

