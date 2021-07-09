module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'sample2',
        {
            name2: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            email2: {
                type: DataTypes.STRING(50),
                allowNull: true
            }
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true,
            freezeTableName: true,
        }
    )
};