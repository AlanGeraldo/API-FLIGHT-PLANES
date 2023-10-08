import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Plane = sequelize.define('planes', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },

    planeNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'plane_number'
    },

    model: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },

    maxCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'max_capacity'
    },

    airline: {
        type: DataTypes.ENUM('AeroGlobe', 'AeroTronix', 'AirQuest', 'VelocityAir', 'StartLink'),
        allowNull: false
    },

    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

export default Plane