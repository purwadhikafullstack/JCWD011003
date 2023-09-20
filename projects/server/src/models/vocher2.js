const Voucher = sequelize.define("vouchers", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discountType: {
      type: DataTypes.ENUM('percentage', 'amount'),
      allowNull: false
    },
    discountValue: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minimumPurchaseAmount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    specificProductId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
 });
 